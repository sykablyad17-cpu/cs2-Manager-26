// Deep match management, player careers, advanced training and club events.
(function () {
    'use strict';

    const PERSONALITIES = ['Лідер', 'Професіонал', 'Командний', 'Конфліктний', 'Нестабільний'];
    const TACTICS = {
        balanced: 'Баланс', aggressive: 'Високий темп', control: 'Контроль карти',
        defensive: 'Глибокий захист', awp: 'Гра навколо AWP', entry: 'Швидкі виходи'
    };
    const TRAINING_PRESETS = {
        balanced: { name: 'Баланс', aim: 25, tactics: 25, maps: 25, rest: 25 },
        aim: { name: 'Aim-тиждень', aim: 50, tactics: 20, maps: 20, rest: 10 },
        tactics: { name: 'Тактичний табір', aim: 15, tactics: 50, maps: 25, rest: 10 },
        recovery: { name: 'Відновлення', aim: 10, tactics: 10, maps: 10, rest: 70 }
    };
    const MATCH_PREPARATION_PRESETS = {
        aggressive: { name: 'Агресивний стиль', firepower: 95, tactics: 45, maps: 55, economy: 85, teamwork: 60, psychology: 80, description: 'Швидкі виходи, ранні дуелі, постійні force-buy та мінімум складної тактики.' },
        structural: { name: 'Структурний стиль', firepower: 55, tactics: 100, maps: 85, economy: 50, teamwork: 90, psychology: 70, description: 'Повільний розумний CS, розіграші на останніх секундах і сейви зброї.' },
        anti_strat: { name: 'Анти-страти', firepower: 65, tactics: 75, maps: 100, economy: 65, teamwork: 75, psychology: 80, description: 'Читання суперника, закриття його найсильніших зон і карт.' },
        economy: { name: 'Економ-контроль', firepower: 60, tactics: 70, maps: 65, economy: 100, teamwork: 80, psychology: 70, description: 'Менеджмент грошей і дропів, мінімізація фінансових ризиків.' },
        retake: { name: 'Командний ретейк', firepower: 60, tactics: 75, maps: 70, economy: 65, teamwork: 100, psychology: 85, description: 'Гра другим номером, синхронні розміни та вибивання плентів.' },
        deep_defense: { name: 'Глухий захист', firepower: 50, tactics: 65, maps: 80, economy: 60, teamwork: 80, psychology: 100, description: 'Закрита глибока оборона, затягування раундів і захист від тиску.' },
        balanced: { name: 'Баланс', firepower: 70, tactics: 70, maps: 70, economy: 70, teamwork: 70, psychology: 70, description: 'Стандартна гра за замовчуванням зі стабільністю всіх показників.' }
    };
    const PLAYER_RADAR_OVERRIDES = {
        ZywOo: { firepower: 99, tactics: 96, maps: 99, economy: 98, teamwork: 98, psychology: 100 },
        flameZ: { firepower: 93, tactics: 87, maps: 90, economy: 92, teamwork: 91, psychology: 92 },
        ropz: { firepower: 94, tactics: 86, maps: 92, economy: 88, teamwork: 84, psychology: 90 },
        mezii: { firepower: 83, tactics: 82, maps: 81, economy: 85, teamwork: 86, psychology: 82 },
        apEX: { firepower: 74, tactics: 92, maps: 86, economy: 80, teamwork: 88, psychology: 77 }
    };
    let deepMatchRuntime = null;

    function dcHash(value) {
        return [...String(value || '')].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    }

    function dcEnsurePlayerMeta(player) {
        if (!player) return;
        const seed = dcHash(player.name);
        const rolePosition = player.role === 'AWP' ? 'Основний AWP' : player.role === 'IGL' ? 'Капітан / rotator' : player.role === 'Entry' ? 'Entry / space creator' : player.role === 'Lurker' ? 'Lurker' : 'Rifler / anchor';
        player.career = {
            age: 18 + seed % 13,
            peakAge: 24 + seed % 6,
            morale: 55 + seed % 31,
            confidence: 50 + (seed * 3) % 36,
            personality: PERSONALITIES[seed % PERSONALITIES.length],
            favoriteMaps: [officialMaps[seed % officialMaps.length], officialMaps[(seed + 3) % officialMaps.length]],
            favoritePosition: rolePosition,
            transferRequest: false,
            listed: false,
            ...(player.career || {})
        };
        player.trainingPlan = player.trainingPlan || (player.role === 'IGL' ? 'tactics' : player.role === 'AWP' ? 'aim' : 'balanced');
        player.developmentXp = Math.max(0, Math.min(99, Number(player.developmentXp) || 0));
        if (!Number.isFinite(player.level)) player.level = Math.max(1, Math.round((player.skill - 55) / 3));
        player.level = Math.max(1, Math.min(20, Math.round(player.level)));
        player.levelXp = Math.max(-99, Math.min(99, Math.round(Number(player.levelXp) || 0)));
    }

    function dcAddPlayerLevelProgress(player, amount) {
        if (!player || !amount) return;
        dcEnsurePlayerMeta(player);
        const previousLevel = player.level;
        player.levelXp += Math.round(amount);
        while (player.levelXp >= 100 && player.level < 20) {
            player.level++;
            player.levelXp -= 100;
        }
        while (player.levelXp <= -100 && player.level > 1) {
            player.level--;
            player.levelXp += 100;
        }
        if (player.level === 1 && player.levelXp < 0) player.levelXp = 0;
        if (player.level === 20 && player.levelXp > 99) player.levelXp = 99;
        if (player.level !== previousLevel && state.players.includes(player) && typeof logSystem === 'function') {
            logSystem(`<b>${escapeLiveText(player.name)}</b>: рівень ${previousLevel} → <b>${player.level}</b>.`);
        }
    }
    window.addPlayerLevelProgress = dcAddPlayerLevelProgress;

    function dcEnsureState() {
        teamsRating.forEach(team => team.players.forEach(dcEnsurePlayerMeta));
        (state.freeAgents || []).forEach(dcEnsurePlayerMeta);
        state.players.forEach(dcEnsurePlayerMeta);
        state.trainingPreset = state.trainingPreset || 'balanced';
        state.savedTrainingTemplate = state.savedTrainingTemplate || null;
        state.showMatchHistory = Array.isArray(state.showMatchHistory) ? state.showMatchHistory : [];
        state.careerEvents = Array.isArray(state.careerEvents) ? state.careerEvents : [];
        state.seasonCeremonies = Array.isArray(state.seasonCeremonies) ? state.seasonCeremonies : [];
        state.trainingPoints = Number.isFinite(state.trainingPoints) ? Math.max(0, Math.round(state.trainingPoints)) : 120;
        state.trainingPointHistory = Array.isArray(state.trainingPointHistory) ? state.trainingPointHistory : [];
        state.trainingPhaseRewards = state.trainingPhaseRewards || {};
        state.matchPace = state.matchPace === 'fast' ? 'fast' : 'normal';
        state.matchPreparation = state.matchPreparation || null;
        state.lastTrainingSummary = state.lastTrainingSummary || 'Оберіть програму відповідно до потреб складу.';
        dcEnsureShowMatchInvite();
    }

    function dcAddTrainingPoints(amount, reason) {
        dcEnsureState();
        const value = Math.max(0, Math.round(amount));
        state.trainingPoints += value;
        state.trainingPointHistory.unshift({ amount: value, reason, season: state.seasonNumber, at: Date.now() });
        state.trainingPointHistory = state.trainingPointHistory.slice(0, 20);
        if (typeof logSystem === 'function') logSystem(`Training Points: <b>+${value} TP</b> · ${escapeLiveText(reason)}.`);
    }

    function dcSpendTrainingPoints(amount) {
        dcEnsureState();
        if (state.trainingPoints < amount) return false;
        state.trainingPoints -= amount;
        return true;
    }

    function dcTrainingEfficiency() {
        const fatigue = state.trainingFatigue || 0;
        return fatigue <= 45 ? 1 : Math.max(0.55, 1 - (fatigue - 45) / 120);
    }

    function dcAddDevelopment(player, amount) {
        dcEnsurePlayerMeta(player);
        if (player.skill >= 100) return { gained: 0, level: false };
        const gained = Math.max(1, Math.round(amount * dcTrainingEfficiency()));
        player.developmentXp = (player.developmentXp || 0) + gained;
        let level = false;
        while (player.developmentXp >= 100 && player.skill < 100) {
            player.developmentXp -= 100;
            player.skill++;
            level = true;
        }
        if (player.skill >= 100) player.developmentXp = 0;
        return { gained, level };
    }

    function dcEnsureShowMatchInvite() {
        if (!state.userTeamFullName || !state.majorCircuit) return;
        const key = `${state.seasonNumber}-${state.majorCircuit.phase}`;
        if (state.showMatchInvite?.key === key || state.showMatchResolvedKey === key) return;
        if ((state.seasonNumber + state.majorCircuit.phase) % 2 === 1) {
            const opponents = teamsRating.filter(team => !team.isPlayer).sort((a, b) => Math.abs(b.points - (teamsRating.find(team => team.isPlayer)?.points || 0)) - Math.abs(a.points - (teamsRating.find(team => team.isPlayer)?.points || 0)));
            const opponent = opponents[Math.min(opponents.length - 1, (state.majorCircuit.phase * 3 + state.seasonNumber) % Math.max(1, opponents.length))];
            state.showMatchInvite = {
                key,
                opponent: opponent?.name || 'All-Star Team',
                reward: 900 + state.majorCircuit.phase * 350,
                fans: 180 + state.majorCircuit.phase * 60
            };
        }
    }

    function dcCurrentEvent() {
        return state.majorCircuit?.events?.[state.majorCircuit.activeEventId] || null;
    }

    function dcIsFinal() {
        return dcCurrentEvent()?.stage === 'final';
    }

    function dcEnsureMatchPlan() {
        state.matchPlan = {
            ctTactic: state.matchPlan?.ctTactic || 'defensive',
            tTactic: state.matchPlan?.tTactic || 'control',
            pistol: state.matchPlan?.pistol || 'utility',
            economy: state.matchPlan?.economy || 'auto',
            counter: state.matchPlan?.counter || 'anti_awp'
        };
    }

    function dcAddTimeline(type, text, round, score) {
        seriesState.timeline = Array.isArray(seriesState.timeline) ? seriesState.timeline : [];
        seriesState.timeline.push({ type, text, round, score, map: deepMatchRuntime?.mapName || '' });
        seriesState.timeline = seriesState.timeline.slice(-80);
        dcRenderLiveTimeline();
    }

    function dcRecordTactic(key, won) {
        seriesState.tacticUsage = seriesState.tacticUsage || {};
        seriesState.tacticUsage[key] = seriesState.tacticUsage[key] || { rounds: 0, wins: 0 };
        seriesState.tacticUsage[key].rounds++;
        if (won) seriesState.tacticUsage[key].wins++;
    }

    function dcEnsureMatchControls() {
        const matchBox = document.querySelector('#match-screen .match-box');
        const stats = document.getElementById('live-stats-board');
        if (!matchBox || !stats) return;
        let controls = document.getElementById('deep-match-controls');
        if (!controls) {
            controls = document.createElement('section');
            controls.id = 'deep-match-controls';
            controls.className = 'deep-match-controls';
            matchBox.insertBefore(controls, stats);
        }
        controls.innerHTML = `<div class="match-pace-toolbar"><span><small>ТЕМП МАТЧУ</small><b id="live-round-phase">Підготовка до карти</b></span><div><button class="${state.matchPace === 'normal' ? 'active' : ''}" onclick="setMatchPace('normal')">Звичайний</button><button class="${state.matchPace === 'fast' ? 'active' : ''}" onclick="setMatchPace('fast')">Швидкий</button></div></div><div id="live-key-timeline" class="live-key-timeline"></div>`;
    }

    window.setMatchPace = function (pace) {
        state.matchPace = pace === 'fast' ? 'fast' : 'normal';
        document.querySelectorAll('.match-pace-toolbar button').forEach(button => button.classList.toggle('active', button.textContent === (state.matchPace === 'fast' ? 'Швидкий' : 'Звичайний')));
        autoSave('match-pace');
    };

    function dcRoundDelay() {
        return state.matchPace === 'fast' ? 650 : 1250;
    }

    function dcAnimateRound(playerWon, round) {
        const box = document.querySelector('#match-screen .match-box');
        const phase = document.getElementById('live-round-phase');
        if (phase) phase.textContent = `Раунд ${round} · ${playerWon ? 'ваша перемога' : 'перемога суперника'}`;
        if (!box) return;
        box.classList.remove('round-won', 'round-lost', 'round-updated');
        requestAnimationFrame(() => {
            box.classList.add(playerWon ? 'round-won' : 'round-lost', 'round-updated');
            setTimeout(() => box.classList.remove('round-updated'), state.matchPace === 'fast' ? 280 : 620);
        });
    }

    function dcShowMapTransition(runtime, won) {
        const matchBox = document.querySelector('#match-screen .match-box');
        if (!matchBox) return;
        let transition = document.getElementById('series-map-transition');
        if (!transition) {
            transition = document.createElement('div');
            transition.id = 'series-map-transition';
            transition.className = 'series-map-transition';
            matchBox.appendChild(transition);
        }
        const nextPlayer = seriesState.playerScore + (won ? 1 : 0);
        const nextEnemy = seriesState.enemyScore + (won ? 0 : 1);
        transition.innerHTML = `<small>КАРТА ЗАВЕРШЕНА</small><h2>${escapeLiveText(runtime.mapName)}</h2><strong>${runtime.playerScore} : ${runtime.enemyScore}</strong><span>${won ? 'Перемога вашої команди' : 'Перемога суперника'}</span><em>Серія ${nextPlayer} — ${nextEnemy}</em>`;
        transition.classList.add('visible');
    }

    function dcTacticOptions(selected) {
        return Object.entries(TACTICS).map(([value, label]) => `<option value="${value}" ${value === selected ? 'selected' : ''}>${label}</option>`).join('');
    }

    window.updateDeepMatchPlan = function () {
        dcEnsureMatchPlan();
        state.matchPlan.ctTactic = document.getElementById('ct-tactic-select')?.value || state.matchPlan.ctTactic;
        state.matchPlan.tTactic = document.getElementById('t-tactic-select')?.value || state.matchPlan.tTactic;
        state.matchPlan.pistol = document.getElementById('pistol-strategy-select')?.value || state.matchPlan.pistol;
        state.matchPlan.economy = document.getElementById('economy-strategy-select')?.value || state.matchPlan.economy;
        state.matchPlan.counter = document.getElementById('counter-strategy-select')?.value || state.matchPlan.counter;
        autoSave('live-match-plan-updated');
    };

    function dcRenderLiveTimeline() {
        const container = document.getElementById('live-key-timeline');
        if (!container) return;
        const events = (seriesState.timeline || []).slice(-5).reverse();
        container.innerHTML = events.length ? events.map(event => `<span class="${event.type}"><i>R${event.round}</i><b>${escapeLiveText(event.text)}</b><em>${event.score}</em></span>`).join('') : '<small>Ключові моменти зʼявляться під час карти.</small>';
    }

    function dcEconomyModifier(strategy, money, pistolRound) {
        if (pistolRound) return { power: 0, spend: 0, label: 'Pistol' };
        const actual = strategy === 'auto' ? (money >= 4200 ? 'full' : money >= 2200 ? 'force' : 'eco') : strategy;
        if (actual === 'eco') return { power: -10, spend: 600, label: 'Eco' };
        if (actual === 'force') return { power: money >= 2200 ? -1 : -7, spend: Math.min(2500, money), label: 'Force' };
        return { power: money >= 4000 ? 4 : -9, spend: Math.min(4700, money), label: 'Full-buy' };
    }

    function dcCounterModifier(enemyTeam) {
        const plan = state.matchPlan.counter;
        if (!enemyTeam) return 0;
        const awp = enemyTeam.players.some(player => player.role === 'AWP' && player.skill >= 84);
        const entries = enemyTeam.players.filter(player => player.role === 'Entry').length;
        if (plan === 'anti_awp' && awp) return 3.5;
        if (plan === 'anti_entry' && entries >= 2) return 3.5;
        if (plan === 'late_round' && (enemyTeam.chemistry || 70) >= 80) return 2.5;
        if (plan === 'map_pressure' && deepMatchRuntime?.mapName === enemyTeam.weakMap) return 5;
        return -1;
    }

    function dcCareerPower(mapName) {
        const favorites = state.players.filter(player => player.career?.favoriteMaps?.includes(mapName)).length;
        const morale = state.players.reduce((sum, player) => sum + (player.career?.morale || 60), 0) / Math.max(1, state.players.length);
        const confidence = state.players.reduce((sum, player) => sum + (player.career?.confidence || 60), 0) / Math.max(1, state.players.length);
        const unstable = state.players.filter(player => player.career?.personality === 'Нестабільний').length;
        return favorites * 0.7 + (morale - 60) / 10 + (confidence - 60) / 12 + (Math.random() - 0.5) * unstable * 1.2;
    }

    function dcAdjustTeamPsychology(didWinRound, clutchForPlayer = null) {
        state.players.forEach(player => {
            dcEnsurePlayerMeta(player);
            const career = player.career;
            const resilience = career.personality === 'Лідер' || career.personality === 'Професіонал' ? 0.6 : career.personality === 'Нестабільний' ? 1.35 : 1;
            career.confidence = Math.max(0, Math.min(100, career.confidence + (didWinRound ? 0.55 : -0.45) * resilience));
            if (clutchForPlayer === true) career.morale = Math.min(100, career.morale + 1.2 * resilience);
            if (clutchForPlayer === false) career.morale = Math.max(0, career.morale - 1.1 * resilience);
        });
    }

    function dcClutchEvent(playerWonRound, playerStats, enemyStats, round, score) {
        if (Math.random() >= 0.18) return null;
        const types = ['1v1', '1v1', '1v2', '1v2', '1v3'];
        const type = types[Math.floor(Math.random() * types.length)];
        const winnerStats = playerWonRound ? playerStats : enemyStats;
        const hero = [...winnerStats].sort((a, b) => b.roundKills - a.roundKills || b.rating - a.rating)[0];
        const text = `${hero.name} виграє клатч ${type}`;
        dcAddTimeline('clutch', text, round, score);
        dcAdjustTeamPsychology(playerWonRound, playerWonRound);
        return text;
    }

    function dcSerializeStats(stat) {
        return typeof serializeLiveStat === 'function' ? serializeLiveStat(stat) : { ...stat };
    }

    startSingleMapSimulation = function (mapName, onMapEnd) {
        dcEnsureState();
        dcEnsureMatchPlan();
        document.getElementById('match-screen').style.display = 'block';
        const enemyTeam = getTeamByName(state.currentEnemy.name);
        const enemyPlayers = enemyTeam?.players?.length ? enemyTeam.players : state.players.map((player, index) => createPlayerProfile(`Enemy ${index + 1}`, index));
        const playerLiveStats = createLivePlayerStats(state.players);
        const enemyLiveStats = createLivePlayerStats(enemyPlayers);
        const runtime = {
            mapName, onMapEnd, playerLiveStats, enemyLiveStats, enemyTeam,
            playerScore: 0, enemyScore: 0, currentRound: 1, playerMoney: 800, lossStreak: 0,
            inOvertime: false, playerOt: 0, enemyOt: 0, finished: false,
            momentum: 0, timer: null
        };
        deepMatchRuntime = runtime;
        dcEnsureMatchControls();
        document.getElementById('series-map-transition')?.remove();
        const matchBox = document.querySelector('#match-screen .match-box');
        matchBox?.classList.add('map-entering');
        setTimeout(() => matchBox?.classList.remove('map-entering'), 700);
        const ticker = document.getElementById('live-ticker');
        const scoreElement = document.getElementById('live-score');
        const playerName = document.getElementById('live-player-name');
        const enemyName = document.getElementById('live-enemy-name');
        if (playerName) playerName.innerHTML = `${teamLogoHtml(state.userTeamFullName, 'team-logo team-logo-score')}<span>${escapeLiveText(state.userTeamFullName || state.userTeamTag)}</span>`;
        if (enemyName) enemyName.innerHTML = `<span>${escapeLiveText(enemyTeam?.name || state.currentEnemy.name)}</span>${teamLogoHtml(enemyTeam?.name || state.currentEnemy.name, 'team-logo team-logo-score')}`;
        ticker.innerHTML = '';
        renderLiveStatsBoard(playerLiveStats, enemyLiveStats, 0, 0, 1);
        dcAddTimeline('map', `Початок карти ${mapName}`, 1, '0-0');

        runtime.runRound = function () {
            if (runtime.finished) return;

            const round = runtime.currentRound;
            const pistolRound = round === 1 || round === 13;
            const side = (round <= 12 ? 'T' : 'CT');
            const tactic = side === 'T' ? state.matchPlan.tTactic : state.matchPlan.ctTactic;
            document.getElementById('live-tactic-display').textContent = `${side}: ${TACTICS[tactic]} · ${state.matchPlan.economy.toUpperCase()}`;
            let playerPower = getTeamSkill(mapName) + getTacticPowerModifier(tactic, mapName, round, runtime.playerMoney) + dcCareerPower(mapName);
            const enemyPower = enemyTeam ? getOpponentMapPower(enemyTeam, mapName) : state.currentEnemy.skill;
            const economy = dcEconomyModifier(state.matchPlan.economy, runtime.playerMoney, pistolRound);
            playerPower += economy.power + dcCounterModifier(enemyTeam) + runtime.momentum;
            runtime.playerMoney = Math.max(0, runtime.playerMoney - economy.spend);

            if (pistolRound) {
                if (state.matchPlan.pistol === 'rush') playerPower += state.players.filter(player => player.role === 'Entry').length * 1.5;
                if (state.matchPlan.pistol === 'utility') playerPower += (state.chemistry || 70) / 35;
                if (state.matchPlan.pistol === 'duels') playerPower += state.players.reduce((sum, player) => sum + player.skill, 0) / state.players.length > 83 ? 3 : -2;
            }

            const chance = typeof window.calculatePowerWinChance === 'function'
                ? window.calculatePowerWinChance(playerPower, enemyPower, 45, 0.14, 0.86)
                : Math.max(0.14, Math.min(0.86, playerPower / Math.max(1, playerPower + enemyPower)));
            const playerWon = Math.random() < chance;
            simulateLiveRoundStats(playerLiveStats, enemyLiveStats, playerWon);
            if (playerWon) {
                runtime.playerScore++;
                if (runtime.inOvertime) runtime.playerOt++;
                runtime.lossStreak = 0;
                runtime.playerMoney = Math.min(16000, runtime.playerMoney + 3250);
            } else {
                runtime.enemyScore++;
                if (runtime.inOvertime) runtime.enemyOt++;
                runtime.lossStreak = Math.min(5, runtime.lossStreak + 1);
                runtime.playerMoney = Math.min(16000, runtime.playerMoney + 1400 + runtime.lossStreak * 500);
            }
            dcRecordTactic(`${side}:${tactic}`, playerWon);
            dcAdjustTeamPsychology(playerWon);
            const score = `${runtime.playerScore}-${runtime.enemyScore}`;
            const clutch = dcClutchEvent(playerWon, playerLiveStats, enemyLiveStats, round, score);
            const deficitBefore = playerWon ? runtime.enemyScore - (runtime.playerScore - 1) : runtime.enemyScore - runtime.playerScore;
            if (playerWon && deficitBefore >= 5) {
                runtime.momentum = Math.min(4, runtime.momentum + 1.2);
                dcAddTimeline('comeback', `Команда починає камбек із відставання ${deficitBefore} раундів`, round, score);
            } else if (!playerWon && runtime.playerScore > runtime.enemyScore + 4) {
                runtime.momentum = Math.max(-3, runtime.momentum - 0.8);
            } else runtime.momentum *= 0.82;

            if (!clutch && (round === 1 || round === 13 || Math.abs(runtime.playerScore - runtime.enemyScore) <= 1 && round > 18)) {
                dcAddTimeline(pistolRound ? 'pistol' : 'key', `${playerWon ? state.userTeamTag : enemyTeam?.name || 'Суперник'} забирає ${pistolRound ? 'пістолетний' : 'важливий'} раунд`, round, score);
            }
            scoreElement.textContent = `${runtime.playerScore} : ${runtime.enemyScore}`;
            renderLiveStatsBoard(playerLiveStats, enemyLiveStats, runtime.playerScore, runtime.enemyScore, round);
            dcAnimateRound(playerWon, round);
            runtime.currentRound++;

            let finished = false;
            if (!runtime.inOvertime) {
                if (runtime.playerScore === 13 || runtime.enemyScore === 13) finished = true;
                else if (runtime.playerScore === 12 && runtime.enemyScore === 12) {
                    runtime.inOvertime = true; runtime.playerOt = 0; runtime.enemyOt = 0;
                    dcAddTimeline('overtime', 'Матч переходить в овертайм', round, score);
                }
            } else if (runtime.playerOt === 4 || runtime.enemyOt === 4) finished = true;
            else if (runtime.playerOt === 3 && runtime.enemyOt === 3) { runtime.playerOt = 0; runtime.enemyOt = 0; }

            if (finished) return dcFinishMap(runtime);
            runtime.timer = setTimeout(runtime.runRound, dcRoundDelay());
        };
        runtime.timer = setTimeout(runtime.runRound, state.matchPace === 'fast' ? 450 : 900);
    };

    function dcFinishMap(runtime) {
        runtime.finished = true;
        runtime.playerLiveStats.forEach(recalculateLiveStat);
        runtime.enemyLiveStats.forEach(recalculateLiveStat);
        renderLiveStatsBoard(runtime.playerLiveStats, runtime.enemyLiveStats, runtime.playerScore, runtime.enemyScore, runtime.currentRound - 1);
        addMapStatsToSeries(runtime.playerLiveStats.map(stat => ({ name: stat.name, kills: stat.kills, deaths: stat.deaths, rating: Number(stat.rating.toFixed(2)) })));
        const won = runtime.playerScore > runtime.enemyScore;
        updatePlayerMapDevelopment(runtime.mapName, won);
        runtime.playerLiveStats.forEach(stat => {
            const player = state.players.find(item => item.name === stat.name);
            if (!player) return;
            const performance = stat.rating >= 1.2 ? 1 : stat.rating < 0.8 ? -1 : 0;
            dcAddPlayerLevelProgress(player, (won ? 3 : -3) + performance);
        });
        seriesState.mapResults = Array.isArray(seriesState.mapResults) ? seriesState.mapResults : [];
        seriesState.mapResults.push({ map: runtime.mapName, winner: won ? 'player' : 'enemy', playerRounds: runtime.playerScore, enemyRounds: runtime.enemyScore, roundScore: `${runtime.playerScore}-${runtime.enemyScore}` });
        seriesState.mapDetailedStats = Array.isArray(seriesState.mapDetailedStats) ? seriesState.mapDetailedStats : [];
        seriesState.mapDetailedStats.push({ map: runtime.mapName, playerRounds: runtime.playerScore, enemyRounds: runtime.enemyScore, winner: won ? 'player' : 'enemy', playerStats: runtime.playerLiveStats.map(dcSerializeStats), enemyStats: runtime.enemyLiveStats.map(dcSerializeStats) });
        dcAddTimeline('result', `${won ? 'Перемога' : 'Поразка'} на ${runtime.mapName}`, runtime.currentRound - 1, `${runtime.playerScore}-${runtime.enemyScore}`);
        autoSave('deep-live-map-finished');
        dcShowMapTransition(runtime, won);
        setTimeout(() => runtime.onMapEnd(won ? 'player' : 'enemy'), state.matchPace === 'fast' ? 900 : 1900);
    }

    const startSeriesBeforeDeepCareer = startBo3Series;
    startBo3Series = function () {
        dcEnsureState();
        dcEnsureMatchPlan();
        seriesState.timeline = [];
        seriesState.tacticUsage = {};
        seriesState.winTarget = dcIsFinal() ? 3 : 2;
        if (seriesState.winTarget === 3) {
            const missing = officialMaps.filter(map => !vetoState.chosenMaps.includes(map));
            vetoState.chosenMaps = [...vetoState.chosenMaps, ...missing].slice(0, 5);
        }
        startSeriesBeforeDeepCareer();
    };

    playNextBo3Map = function () {
        const target = seriesState.winTarget || 2;
        if (seriesState.playerScore === target) return finishBo3Series(true);
        if (seriesState.enemyScore === target) return finishBo3Series(false);
        const mapToPlay = vetoState.chosenMaps[seriesState.currentMapIndex] || officialMaps.find(map => !vetoState.chosenMaps.includes(map)) || officialMaps[0];
        document.getElementById('live-current-map').textContent = mapToPlay;
        document.getElementById('live-series-score').textContent = `${target === 3 ? 'BO5' : 'BO3'}: ${seriesState.playerScore} - ${seriesState.enemyScore}`;
        startSingleMapSimulation(mapToPlay, winner => {
            if (winner === 'player') seriesState.playerScore++; else seriesState.enemyScore++;
            seriesState.currentMapIndex++;
            setTimeout(playNextBo3Map, state.matchPace === 'fast' ? 550 : 950);
        });
    };

    function dcTacticReportHtml() {
        const usage = Object.entries(seriesState.tacticUsage || {});
        return `<section class="post-tactic-report"><div><h3>Ефективність тактик</h3><small>Виграні раунди за кожним планом</small></div><div>${usage.map(([key, row]) => `<span><b>${escapeLiveText(key.replace(':', ' · '))}</b><strong>${Math.round(row.wins / Math.max(1, row.rounds) * 100)}%</strong><em>${row.wins}/${row.rounds} раундів</em></span>`).join('') || '<small>Даних немає.</small>'}</div></section>`;
    }

    function dcTimelineReportHtml() {
        return `<section class="post-timeline-report"><div><h3>Таймлайн матчу</h3><small>Клатчі, камбеки й ключові рішення</small></div><div>${(seriesState.timeline || []).map(event => `<span class="${event.type}"><i>${escapeLiveText(event.map)} · R${event.round}</i><b>${escapeLiveText(event.text)}</b><em>${event.score}</em></span>`).join('')}</div></section>`;
    }

    const renderReportBeforeDeepCareer = renderPostMatchReport;
    renderPostMatchReport = function (report, selection = 'all') {
        document.getElementById('series-map-transition')?.remove();
        document.querySelector('#match-screen .match-box')?.classList.remove('map-entering', 'round-won', 'round-lost', 'round-updated');
        renderReportBeforeDeepCareer(report, selection);
        const container = document.getElementById('post-match-report');
        const footer = container?.querySelector('.post-match-footer');
        if (container && footer) footer.insertAdjacentHTML('beforebegin', `<div class="post-match-analysis-grid">${dcTacticReportHtml()}${dcTimelineReportHtml()}</div>`);
    };

    function dcRenderPlayerCareerBadges() {
        document.querySelectorAll('#roster-list-container .simple-roster-row').forEach((row, index) => {
            const player = state.players[index];
            if (!player || row.querySelector('.career-badges')) return;
            row.insertAdjacentHTML('beforeend', `<div class="career-badges"><span>${player.career.age} років</span><span>${escapeLiveText(player.career.personality)}</span><span class="${player.career.morale < 40 ? 'low' : ''}">Мораль ${Math.round(player.career.morale)}</span>${player.career.transferRequest ? '<b>ПРОСИТЬ ТРАНСФЕР</b>' : ''}</div>`);
        });
    }

    function dcRenderTrainingCenter() {
        const tab = document.getElementById('training-tab');
        if (!tab) return;
        tab.querySelector('.deep-training-panel')?.remove();
        document.getElementById('career-training-panel')?.remove();
        document.getElementById('training-reminder-slot')?.remove();
        let slot = document.getElementById('map-training-slot');
        if (!slot) {
            slot = document.createElement('div');
            slot.id = 'map-training-slot';
            tab.appendChild(slot);
        }
        let panel = document.getElementById('map-mastery-panel');
        if (!panel) {
            panel = document.createElement('section');
            panel.id = 'map-mastery-panel';
            panel.className = 'panel codex-panel map-training-panel';
            slot.appendChild(panel);
        } else if (panel.parentElement !== slot) {
            slot.appendChild(panel);
        }
        ensureClubRestructureState();
        panel.innerHTML = `<div class="training-map-head"><div><small>ТРЕНУВАННЯ</small><h3>Підготовка карт</h3></div><span><b>${state.trainingPoints || 0} TP</b><em>Втома ${Math.round(state.trainingFatigue || 0)}/100</em></span></div>
            <div class="training-map-summary"><span><small>Слабка карта</small><b>${escapeLiveText(state.weakMap || '-')}</b></span><span><small>Останній план</small><b>${escapeLiveText(state.lastTrainingSummary || 'Поки без тренувань')}</b></span><span><small>Правило</small><b>Аналітика +1 за TP, максимум 30</b></span></div>
            <div id="map-buttons-zone" class="map-buttons-zone"></div>`;
        if (typeof updateMapMasteryDisplay === 'function') updateMapMasteryDisplay();
    }

    function dcEnsureMatchPreparation() {
        const opponent = state.currentEnemy?.name || 'Суперник';
        if (!state.matchPreparation || state.matchPreparation.opponent !== opponent) {
            state.matchPreparation = {
                opponent,
                preset: 'balanced',
                plans: {},
                selectedPlayer: state.players[0]?.name || '',
                completed: false,
                paid: false
            };
        }
        if (!MATCH_PREPARATION_PRESETS[state.matchPreparation.preset]) state.matchPreparation.preset = 'balanced';
        if (!state.players.some(player => player.name === state.matchPreparation.selectedPlayer)) state.matchPreparation.selectedPlayer = state.players[0]?.name || '';
        state.players.forEach(player => {
            if (!state.matchPreparation.plans[player.name]) state.matchPreparation.plans[player.name] = 'balanced';
            if (state.matchPreparation.plans[player.name] === 'aim') state.matchPreparation.plans[player.name] = 'firepower';
            if (state.matchPreparation.plans[player.name] === 'recovery') state.matchPreparation.plans[player.name] = 'psychology';
        });
        return state.matchPreparation;
    }

    const PLAYER_RADAR_AXES = [
        ['ВОГ', 'firepower'], ['ТАК', 'tactics'], ['КАР', 'maps'],
        ['ЕКО', 'economy'], ['КОМ', 'teamwork'], ['ПСИ', 'psychology']
    ];

    function dcClampMetric(value) { return Math.max(40, Math.min(100, Math.round(value))); }

    function dcPlayerRadarMetrics(player) {
        const baseRating = typeof getPlayerBaseSkill === 'function' ? getPlayerBaseSkill(player.name) : player.skill;
        const delta = player.skill - baseRating;
        if (PLAYER_RADAR_OVERRIDES[player.name]) {
            return Object.fromEntries(Object.entries(PLAYER_RADAR_OVERRIDES[player.name]).map(([key, value]) => [key, dcClampMetric(value + delta)]));
        }
        const offsets = {
            AWP: { firepower: 0, tactics: -3, maps: 0, economy: -1, teamwork: -1, psychology: 2 },
            IGL: { firepower: -7, tactics: 11, maps: 5, economy: 0, teamwork: 7, psychology: -3 },
            Entry: { firepower: 4, tactics: -3, maps: 3, economy: -1, teamwork: -4, psychology: 1 },
            Lurker: { firepower: 5, tactics: -3, maps: 4, economy: 0, teamwork: -4, psychology: 2 },
            Rifler: { firepower: 2, tactics: -1, maps: 0, economy: 2, teamwork: 2, psychology: 1 }
        }[player.role] || { firepower: 0, tactics: 0, maps: 0, economy: 0, teamwork: 0, psychology: 0 };
        return Object.fromEntries(PLAYER_RADAR_AXES.map(([label, key], index) => {
            const variation = (dcHash(`${player.name}-${key}`) % 5) - 2;
            const formEffect = key === 'firepower' || key === 'psychology' ? (player.form || 0) * 0.5 : 0;
            return [key, dcClampMetric(player.skill + offsets[key] + variation + formEffect)];
        }));
    }

    function dcTeamBaseMetrics() {
        const result = Object.fromEntries(PLAYER_RADAR_AXES.map(axis => [axis[1], 0]));
        state.players.forEach(player => {
            const metrics = dcPlayerRadarMetrics(player);
            PLAYER_RADAR_AXES.forEach(axis => { result[axis[1]] += metrics[axis[1]]; });
        });
        PLAYER_RADAR_AXES.forEach(axis => { result[axis[1]] = result[axis[1]] / Math.max(1, state.players.length); });
        result.teamwork += ((state.chemistry || 75) - 75) * 0.16;
        result.tactics += ((state.chemistry || 75) - 75) * 0.08;
        return Object.fromEntries(Object.entries(result).map(([key, value]) => [key, dcClampMetric(value)]));
    }

    function dcPreparationMetrics() {
        const preparation = dcEnsureMatchPreparation();
        const tactic = MATCH_PREPARATION_PRESETS[preparation.preset] || MATCH_PREPARATION_PRESETS.balanced;
        const team = dcTeamBaseMetrics();
        const metrics = {};
        PLAYER_RADAR_AXES.forEach(([, key]) => { metrics[key] = dcClampMetric(team[key] + (tactic[key] - 70) * 0.3); });
        return metrics;
    }

    function dcTacticCompatibility() {
        const preparation = dcEnsureMatchPreparation();
        const tactic = MATCH_PREPARATION_PRESETS[preparation.preset] || MATCH_PREPARATION_PRESETS.balanced;
        const team = dcTeamBaseMetrics();
        let weighted = 0;
        let weights = 0;
        PLAYER_RADAR_AXES.forEach(([, key]) => {
            const weight = tactic[key] / 70;
            weighted += team[key] * weight;
            weights += weight;
        });
        return Math.max(45, Math.min(99, Math.round(weighted / Math.max(1, weights))));
    }

    function dcDrawRadar(canvasId, metrics, color = '#80efb8') {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const context = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2 + 4;
        const radius = Math.min(width, height) * 0.33;
        context.clearRect(0, 0, width, height);
        context.lineWidth = 1;
        for (let ring = 1; ring <= 5; ring++) {
            context.beginPath();
            PLAYER_RADAR_AXES.forEach((axis, index) => {
                const angle = -Math.PI / 2 + index * Math.PI * 2 / PLAYER_RADAR_AXES.length;
                const value = radius * ring / 5;
                const x = centerX + Math.cos(angle) * value;
                const y = centerY + Math.sin(angle) * value;
                if (!index) context.moveTo(x, y); else context.lineTo(x, y);
            });
            context.closePath();
            context.strokeStyle = ring === 5 ? '#3d5547' : '#263a30';
            context.stroke();
        }
        PLAYER_RADAR_AXES.forEach((axis, index) => {
            const angle = -Math.PI / 2 + index * Math.PI * 2 / PLAYER_RADAR_AXES.length;
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
            context.strokeStyle = '#263a30';
            context.stroke();
        });
        context.beginPath();
        PLAYER_RADAR_AXES.forEach((axis, index) => {
            const angle = -Math.PI / 2 + index * Math.PI * 2 / PLAYER_RADAR_AXES.length;
            const value = radius * metrics[axis[1]] / 100;
            const x = centerX + Math.cos(angle) * value;
            const y = centerY + Math.sin(angle) * value;
            if (!index) context.moveTo(x, y); else context.lineTo(x, y);
        });
        context.closePath();
        context.fillStyle = color === '#80efb8' ? 'rgba(86, 215, 153, 0.35)' : 'rgba(86, 176, 235, 0.28)';
        context.fill();
        context.strokeStyle = color;
        context.lineWidth = 3;
        context.stroke();
        PLAYER_RADAR_AXES.forEach((axis, index) => {
            const angle = -Math.PI / 2 + index * Math.PI * 2 / PLAYER_RADAR_AXES.length;
            const value = radius * metrics[axis[1]] / 100;
            const x = centerX + Math.cos(angle) * value;
            const y = centerY + Math.sin(angle) * value;
            context.beginPath();
            context.arc(x, y, 4, 0, Math.PI * 2);
            context.fillStyle = '#eaf8ef';
            context.fill();
            const labelRadius = radius + 30;
            const labelX = centerX + Math.cos(angle) * labelRadius;
            const labelY = centerY + Math.sin(angle) * labelRadius;
            context.fillStyle = metrics[axis[1]] >= 80 ? '#63e6a5' : '#9eb0a3';
            context.font = '700 12px Arial';
            context.textAlign = Math.cos(angle) > 0.25 ? 'left' : Math.cos(angle) < -0.25 ? 'right' : 'center';
            context.fillText(`${axis[0]} ${Math.round(metrics[axis[1]])}`, labelX, labelY + 4);
        });
    }

    function dcDrawPreparationRadar() {
        const preparation = dcEnsureMatchPreparation();
        const selectedPlayer = state.players.find(player => player.name === preparation.selectedPlayer) || state.players[0];
        dcDrawRadar('match-preparation-radar', dcPreparationMetrics());
        if (selectedPlayer) dcDrawRadar('player-preparation-radar', dcPlayerRadarMetrics(selectedPlayer), '#69bdf2');
    }

    function dcRenderMatchPreparation() {
        const preparation = dcEnsureMatchPreparation();
        let modal = document.getElementById('match-preparation-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'match-preparation-modal';
            modal.className = 'match-preparation-modal';
            document.body.appendChild(modal);
        }
        const opponent = getTeamByName(preparation.opponent);
        const tactic = MATCH_PREPARATION_PRESETS[preparation.preset] || MATCH_PREPARATION_PRESETS.balanced;
        const selectedPlayer = state.players.find(player => player.name === preparation.selectedPlayer) || state.players[0];
        modal.innerHTML = `<section class="match-preparation-window"><header><div><small>ПІДГОТОВКА ДО НАСТУПНОГО BO3</small><h2>${escapeLiveText(state.userTeamFullName)} — ${escapeLiveText(preparation.opponent)}</h2></div><button type="button" onclick="closeMatchPreparation()" aria-label="Закрити">×</button></header><div class="preparation-opponent-strip">${teamLogoHtml(opponent?.name, 'team-logo team-logo-lg')}<span><small>СУПЕРНИК</small><b>${escapeLiveText(opponent?.name || preparation.opponent)}</b><em>Сильна карта: ${escapeLiveText(opponent?.mapFocus || '-')} · пермабан: ${escapeLiveText(opponent?.weakMap || '-')}</em></span><strong>${preparation.completed ? 'ГОТОВО' : 'ПЛАНУВАННЯ'}</strong></div><div class="match-preparation-layout"><section class="preparation-team-plan"><div class="preparation-section-head"><span><small>КОМАНДНИЙ ПЛАН</small><b>${escapeLiveText(tactic.name)}</b></span><em>Сумісність зі складом ${dcTacticCompatibility()}%</em></div><div class="preparation-preset-tabs seven-plans">${Object.entries(MATCH_PREPARATION_PRESETS).map(([key, item]) => `<button type="button" data-preparation-preset="${key}" class="${key === preparation.preset ? 'active' : ''}" onclick="selectMatchPreparationPreset('${key}')">${item.name}</button>`).join('')}</div><canvas id="match-preparation-radar" width="460" height="300" aria-label="Діаграма командної тактики"></canvas><div class="tactic-strategy-note"><small>СУТЬ СТРАТЕГІЇ</small><b>${escapeLiveText(tactic.description)}</b></div></section><section class="preparation-player-profile"><div class="preparation-section-head"><span><small>ПРОФІЛІ ГРАВЦІВ</small><b>${escapeLiveText(selectedPlayer?.name || '-')}</b></span><em>${escapeLiveText(selectedPlayer?.role || '-')} · Rating ${selectedPlayer?.skill || 0} · Рівень ${selectedPlayer?.level || 1}</em></div><div class="preparation-player-tabs">${state.players.map(player => `<button type="button" class="${player.name === selectedPlayer?.name ? 'active' : ''}" onclick="selectPreparationPlayer('${encodeURIComponent(player.name)}')">${escapeLiveText(player.name)}</button>`).join('')}</div><canvas id="player-preparation-radar" width="420" height="280" aria-label="Діаграма характеристик гравця"></canvas><div class="player-level-progress"><span>ПРОГРЕС РІВНЯ</span><b>${selectedPlayer?.levelXp >= 0 ? '+' : ''}${selectedPlayer?.levelXp || 0}/100</b></div></section></div><footer><span><small>ЕФЕКТ</small><b>Тактика враховує профілі пʼяти гравців і діє лише проти ${escapeLiveText(preparation.opponent)}</b></span><button type="button" onclick="applyMatchPreparation()" ${!preparation.paid && state.trainingPoints < 60 ? 'disabled' : ''}>${preparation.paid ? 'Зберегти зміни' : 'Провести підготовку · 60 TP'}</button></footer></section>`;
        modal.style.display = 'flex';
        requestAnimationFrame(dcDrawPreparationRadar);
    }

    window.openMatchPreparation = function () { dcEnsureState(); dcRenderMatchPreparation(); };
    window.closeMatchPreparation = function () { const modal = document.getElementById('match-preparation-modal'); if (modal) modal.style.display = 'none'; };
    window.selectMatchPreparationPreset = function (key) {
        if (!MATCH_PREPARATION_PRESETS[key]) return;
        const preparation = dcEnsureMatchPreparation();
        preparation.preset = key;
        preparation.completed = false;
        dcRenderMatchPreparation();
        autoSave('match-preparation-preset');
    };
    window.selectPreparationPlayer = function (encodedName) {
        const preparation = dcEnsureMatchPreparation();
        preparation.selectedPlayer = decodeURIComponent(encodedName);
        dcRenderMatchPreparation();
    };
    window.setMatchPreparationPlan = function (encodedName, plan) {
        const preparation = dcEnsureMatchPreparation();
        preparation.plans[decodeURIComponent(encodedName)] = plan;
        preparation.completed = false;
        dcDrawPreparationRadar();
        autoSave('match-preparation-player-plan');
    };
    window.applyMatchPreparation = function () {
        const preparation = dcEnsureMatchPreparation();
        if (!preparation.paid) {
            if (!dcSpendTrainingPoints(60)) return alert('Для передматчевої підготовки потрібно 60 TP.');
            preparation.paid = true;
        }
        preparation.completed = true;
        preparation.appliedAt = Date.now();
        const metrics = dcPreparationMetrics();
        preparation.metrics = { ...metrics };
        const tacticFatigue = { aggressive: 14, structural: 9, anti_strat: 10, economy: 7, retake: 10, deep_defense: 6, balanced: 8 }[preparation.preset] || 8;
        state.trainingFatigue = Math.max(0, Math.min(100, (state.trainingFatigue || 0) + tacticFatigue));
        state.matchesSinceTraining = 0;
        state.lastTrainingSummary = `${MATCH_PREPARATION_PRESETS[preparation.preset].name}: команда підготовлена до ${preparation.opponent}.`;
        logSystem(`Підготовка до <b>${escapeLiveText(preparation.opponent)}</b> завершена. План: ${MATCH_PREPARATION_PRESETS[preparation.preset].name}.`);
        closeMatchPreparation();
        updateUI();
        autoSave('match-preparation-applied');
    };

    function dcMatchPreparationBonus(mapName) {
        const preparation = state.matchPreparation;
        if (!preparation?.completed || preparation.opponent !== state.currentEnemy?.name) return 0;
        const metrics = preparation.metrics || dcPreparationMetrics();
        const mapFocus = mapName && (preparation.preset === 'anti_strat' || metrics.maps >= 88) ? 0.8 : 0;
        return Math.max(0, (dcTacticCompatibility() - 65) * 0.07 + mapFocus);
    }

    const teamSkillBeforeMatchPreparation = getTeamSkill;
    getTeamSkill = function (mapName = '') { return teamSkillBeforeMatchPreparation(mapName) + dcMatchPreparationBonus(mapName); };
    window.isCurrentMatchPrepared = function () { return Boolean(state.matchPreparation?.completed && state.matchPreparation.opponent === state.currentEnemy?.name); };

    window.selectTrainingPreset = function (key) { if (TRAINING_PRESETS[key]) { state.trainingPreset = key; dcRenderTrainingCenter(); autoSave('training-preset'); } };
    window.setIndividualTraining = function (index, plan) { if (state.players[index]) { state.players[index].trainingPlan = plan; autoSave('individual-training-plan'); } };
    window.saveTrainingTemplate = function () {
        state.savedTrainingTemplate = { preset: state.trainingPreset, plans: state.players.map(player => ({ name: player.name, plan: player.trainingPlan })) };
        dcRenderTrainingCenter(); autoSave('training-template-saved');
    };
    window.loadTrainingTemplate = function () {
        if (!state.savedTrainingTemplate) return;
        state.trainingPreset = state.savedTrainingTemplate.preset;
        state.players.forEach(player => { const saved = state.savedTrainingTemplate.plans.find(item => item.name === player.name); if (saved) player.trainingPlan = saved.plan; });
        dcRenderTrainingCenter(); autoSave('training-template-loaded');
    };

    window.runDeepTrainingWeek = function () {
        if (!dcSpendTrainingPoints(75)) return alert('Для тренувального тижня потрібно 75 TP.');
        const preset = TRAINING_PRESETS[state.trainingPreset] || TRAINING_PRESETS.balanced;
        const intensity = preset.aim + preset.tactics + preset.maps - preset.rest;
        state.trainingFatigue = Math.max(0, Math.min(100, (state.trainingFatigue || 0) + intensity / 8));
        const results = [];
        state.players.forEach(player => {
            const professional = player.career.personality === 'Професіонал' ? 1.25 : 1;
            const plan = player.trainingPlan;
            let xp = plan === 'aim' ? 30 + preset.aim * 0.12 : plan === 'balanced' ? 17 : plan === 'tactics' ? 20 + preset.tactics * 0.08 : plan === 'maps' ? 12 : 0;
            if (xp > 0) {
                const progress = dcAddDevelopment(player, xp * professional);
                results.push(`${player.name} +${progress.gained} XP${progress.level ? ' (+1 Rating)' : ''}`);
            }
            if (plan === 'tactics') state.chemistry = Math.min(100, state.chemistry + 1.2 * professional);
            if (plan === 'maps') player.career.favoriteMaps.forEach(map => { if (map !== state.weakMap) state.mapMastery[map].skill = clampMapSkill(state.mapMastery[map].skill + 1); });
            if (plan === 'rest') { player.career.morale = Math.min(100, player.career.morale + 12); player.form = Math.min(5, (player.form || 0) + 1); }
            else player.career.morale = Math.min(100, player.career.morale + preset.rest / 20);
        });
        state.matchesSinceTraining = 0;
        state.lastTrainingSummary = `${preset.name}: ${results.join(' · ') || 'відновлення складу'}.`;
        logSystem(`Тренувальний тиждень завершено за 75 TP: ${preset.name}.`);
        updateUI(); autoSave('deep-training-week');
    };

    window.runMajorBootcamp = function () {
        if ((state.majorCircuit?.phase || 0) < 3) return alert('Буткемп доступний перед ESL Pro League або Cologne Major.');
        if (!dcSpendTrainingPoints(150)) return alert('Для буткемпу потрібно 150 TP.');
        state.chemistry = Math.min(100, state.chemistry + 8);
        state.trainingFatigue = Math.min(100, (state.trainingFatigue || 0) + 20);
        state.players.forEach(player => { player.career.morale = Math.min(100, player.career.morale + 8); player.career.confidence = Math.min(100, player.career.confidence + 6); });
        officialMaps.forEach(map => { if (map !== state.weakMap) state.mapMastery[map].skill = clampMapSkill(state.mapMastery[map].skill + 2); });
        state.lastTrainingSummary = 'Major Bootcamp: +8 зіграності, +2 до всіх активних карт, мораль і впевненість відновлено.';
        logSystem('Передтурнірний буткемп завершено за 150 TP: +8 зіграності, +2 до підготовки карт.');
        updateUI(); autoSave('major-bootcamp');
    };

    const POINT_TRAINING_PROGRAMS = {
        general: { name: 'Командна сесія', cost: 32, fatigue: 12, description: '+12 XP кожному, +1 форма та +3 зіграності.' },
        aim: { name: 'Aim-інтенсив', cost: 45, fatigue: 20, description: '+28 XP ріфлерам та entry, +10 XP іншим.' },
        tactics: { name: 'Тактичний розбір', cost: 40, fatigue: 10, description: '+32 XP капітану, +10 XP складу та +5 зіграності.' },
        awp: { name: 'AWP-підготовка', cost: 42, fatigue: 17, description: '+36 XP снайперу та +2 його форми.' },
        recovery: { name: 'День відновлення', cost: 18, fatigue: -35, description: '-35 втоми, +8 моралі та +1 форма без росту Rating.' }
    };

    renderTrainingPrograms = function () {
        const container = document.getElementById('training-program-grid');
        if (!container) return;
        dcEnsureState();
        container.innerHTML = Object.entries(POINT_TRAINING_PROGRAMS).map(([key, program]) => `
            <article class="training-program-card ${state.trainingPoints < program.cost ? 'unavailable' : ''}">
                <div><b>${program.name}</b><small>${program.description}</small></div>
                <div class="training-program-meta"><span>${program.cost} TP</span><span>Втома ${program.fatigue >= 0 ? '+' : ''}${program.fatigue}</span></div>
                <button onclick="runTrainingProgram('${key}')" ${state.trainingPoints < program.cost ? 'disabled' : ''}>Провести</button>
            </article>
        `).join('');
    };

    window.runTrainingProgram = function (type) {
        const program = POINT_TRAINING_PROGRAMS[type];
        if (!program) return;
        if (type !== 'recovery' && state.trainingFatigue >= 90) return alert('Команда перевантажена. Спочатку проведіть день відновлення.');
        if (!dcSpendTrainingPoints(program.cost)) return alert(`Для цієї програми потрібно ${program.cost} TP.`);
        const results = [];
        if (type === 'general') {
            state.players.forEach(player => { const result = dcAddDevelopment(player, 12); player.form = Math.min(5, (player.form || 0) + 1); results.push(`${player.name} +${result.gained} XP${result.level ? ' (+1 Rating)' : ''}`); });
            state.chemistry = Math.min(100, state.chemistry + 3);
        } else if (type === 'aim') {
            state.players.forEach(player => { const focused = player.role === 'Entry' || player.role === 'Rifler' || player.role === 'Lurker'; const result = dcAddDevelopment(player, focused ? 28 : 10); if (focused) player.form = Math.min(5, (player.form || 0) + 1); results.push(`${player.name} +${result.gained} XP${result.level ? ' (+1 Rating)' : ''}`); });
        } else if (type === 'tactics') {
            state.players.forEach(player => { const result = dcAddDevelopment(player, player.role === 'IGL' ? 32 : 10); results.push(`${player.name} +${result.gained} XP${result.level ? ' (+1 Rating)' : ''}`); });
            state.chemistry = Math.min(100, state.chemistry + 5);
        } else if (type === 'awp') {
            const awpers = state.players.filter(player => player.role === 'AWP');
            if (!awpers.length) { state.trainingPoints += program.cost; return alert('У складі немає AWP. Поінти не витрачено.'); }
            awpers.forEach(player => { const result = dcAddDevelopment(player, 36); player.form = Math.min(5, (player.form || 0) + 2); results.push(`${player.name} +${result.gained} XP${result.level ? ' (+1 Rating)' : ''}`); });
        } else if (type === 'recovery') {
            state.players.forEach(player => { dcEnsurePlayerMeta(player); player.form = Math.min(5, (player.form || 0) + 1); player.career.morale = Math.min(100, player.career.morale + 8); });
        }
        state.trainingFatigue = Math.max(0, Math.min(100, state.trainingFatigue + program.fatigue));
        state.matchesSinceTraining = 0;
        state.trainingHistory.unshift({ type, season: state.seasonNumber, costTP: program.cost });
        state.trainingHistory = state.trainingHistory.slice(0, 12);
        state.lastTrainingSummary = `${program.name}: ${results.join(' · ') || 'форма й мораль відновлені'}.`;
        logSystem(`${program.name} завершено за ${program.cost} TP. Втома: ${Math.round(state.trainingFatigue)}/100.`);
        updateUI();
        autoSave(`point-training-${type}`);
    };

    window.trainTeam = function () { runTrainingProgram('general'); };

    updateMapMasteryDisplay = function () {
        const zone = document.getElementById('map-buttons-zone');
        if (!zone) return;
        ensureClubRestructureState();
        zone.innerHTML = '';
        officialMaps.forEach(map => {
            const row = state.mapMastery[map];
            const isWeak = map === state.weakMap;
            const cost = 18 + Math.max(0, row.skill) * 2;
            const button = document.createElement('button');
            button.className = `map-mastery-card ${isWeak ? 'weak-map-card' : ''}`;
            button.disabled = isWeak || state.trainingPoints < cost || row.skill >= 30;
            button.innerHTML = `<b>${escapeLiveText(map)}</b><span>${row.skill >= 0 ? '+' : ''}${row.skill}/30 скіл</span><small>WR ${getMapWinrate(row)}% · ${row.played} мап</small><small>${isWeak ? 'ПЕРМАБАН · тренування недоступне' : row.skill >= 30 ? 'МАКСИМАЛЬНА ПІДГОТОВКА' : `Аналітика +1 · ${cost} TP`}</small>`;
            if (!isWeak && row.skill < 30) button.onclick = () => {
                if (!dcSpendTrainingPoints(cost)) return alert(`Для аналітики ${map} потрібно ${cost} TP.`);
                state.mapMastery[map] = { ...row, skill: clampMapSkill(row.skill + 1) };
                state.lastTrainingSummary = `${map}: аналітика +1, поточна підготовка ${state.mapMastery[map].skill}/30.`;
                logSystem(`Аналітика ${map}: -${cost} TP, підготовка +1.`);
                updateUI(); autoSave('point-map-analysis');
            };
            zone.appendChild(button);
        });
    };

    function dcRenderShowMatch() {
        const hub = document.getElementById('hub-tab');
        if (!hub) return;
        let panel = document.getElementById('showmatch-panel');
        if (!panel) {
            panel = document.createElement('section');
            panel.id = 'showmatch-panel';
            panel.className = 'panel showmatch-panel';
            hub.appendChild(panel);
        }
        const invite = state.showMatchInvite;
        if (!invite) {
            panel.innerHTML = `<div><small>ШОУ-МАТЧІ</small><h3>Немає активних запрошень</h3><p>Організатори надсилатимуть пропозиції між турнірами.</p></div>`;
            return;
        }
        panel.innerHTML = `<div><small>ЗАПРОШЕННЯ НА ШОУ-МАТЧ</small><h3>${escapeLiveText(state.userTeamFullName)} vs ${escapeLiveText(invite.opponent)}</h3><p>Гонорар $${invite.reward}, потенційно +${invite.fans} фанатів. Матч додає втому, але піднімає мораль.</p></div><div><button onclick="acceptShowMatch()">Прийняти</button><button class="decline" onclick="declineShowMatch()">Відмовитися</button></div>`;
    }

    window.acceptShowMatch = function () {
        const invite = state.showMatchInvite;
        if (!invite) return;
        const opponent = getTeamByName(invite.opponent);
        const ownPower = getTeamSkill(state.players[0]?.career?.favoriteMaps?.[0] || 'Mirage');
        const enemyPower = opponent ? getOpponentMapPower(opponent, opponent.mapFocus || 'Mirage') : ownPower;
        const won = Math.random() < ownPower / Math.max(1, ownPower + enemyPower);
        state.money += invite.reward;
        dcAddTrainingPoints(won ? 14 : 8, `шоу-матч проти ${invite.opponent}`);
        state.fans += won ? invite.fans : Math.round(invite.fans * 0.55);
        state.trainingFatigue = Math.min(100, (state.trainingFatigue || 0) + 10);
        state.players.forEach(player => { player.career.morale = Math.min(100, player.career.morale + (won ? 6 : 2)); });
        state.showMatchHistory.unshift({ season: state.seasonNumber, opponent: invite.opponent, won, reward: invite.reward });
        state.showMatchResolvedKey = invite.key;
        state.showMatchInvite = null;
        logSystem(`Шоу-матч проти ${escapeLiveText(invite.opponent)}: <b>${won ? 'перемога' : 'поразка'}</b>, гонорар +$${invite.reward}.`);
        updateUI(); autoSave('showmatch-accepted');
    };
    window.declineShowMatch = function () {
        if (!state.showMatchInvite) return;
        state.showMatchResolvedKey = state.showMatchInvite.key;
        state.showMatchInvite = null;
        logSystem('Клуб відмовився від шоу-матчу та зберіг сили перед турніром.');
        updateUI(); autoSave('showmatch-declined');
    };

    function dcUpdateMoraleAfterMatch(won) {
        state.players.forEach(player => {
            dcEnsurePlayerMeta(player);
            const amount = won ? 5 : -6;
            const modifier = player.career.personality === 'Лідер' ? 0.7 : player.career.personality === 'Нестабільний' ? 1.35 : 1;
            player.career.morale = Math.max(0, Math.min(100, player.career.morale + amount * modifier));
            player.career.confidence = Math.max(0, Math.min(100, player.career.confidence + (won ? 7 : -7) * modifier));
            if (!won && player.career.morale < 28 && (player.career.personality === 'Конфліктний' || Math.random() < 0.18)) {
                player.career.transferRequest = true;
                state.careerEvents.unshift({ season: state.seasonNumber, type: 'transfer-request', player: player.name });
                logSystem(`<b>${escapeLiveText(player.name)}</b> незадоволений результатами й просить трансфер.`);
            }
        });
    }

    function dcAgePlayers() {
        teamsRating.forEach(team => team.players.forEach(player => {
            dcEnsurePlayerMeta(player);
            player.career.age++;
            if (player.career.age > player.career.peakAge) {
                const declineChance = Math.min(0.8, 0.18 + (player.career.age - player.career.peakAge) * 0.1);
                if (Math.random() < declineChance) player.skill = Math.max(45, player.skill - (player.career.age >= 32 ? 2 : 1));
                player.form = Math.max(-5, (player.form || 0) - 1);
            } else if (player.career.age <= 22 && Math.random() < 0.35) player.skill = Math.min(100, player.skill + 1);
            player.career.morale = Math.max(35, Math.min(85, player.career.morale));
        }));
    }

    window.onMajorCircuitPlayerMatchFinished = function (won) {
        dcUpdateMoraleAfterMatch(won);
        const reward = won ? 32 : 16;
        dcAddTrainingPoints(reward, won ? 'перемога в офіційному матчі' : 'матчевий досвід після поразки');
        autoSave('training-points-match-reward');
    };
    window.onMajorCircuitSeasonEnding = function () { dcAgePlayers(); };

    window.onMajorCircuitSeasonFinished = function (history) {
        state.seasonCeremonies.unshift({ season: history.season, awards: history.awards });
        dcShowAwardsCeremony(history);
    };

    function dcShowAwardsCeremony(history) {
        if (!history?.awards) return;
        let modal = document.getElementById('awards-ceremony-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'awards-ceremony-modal';
            modal.className = 'awards-ceremony-modal';
            document.body.appendChild(modal);
        }
        modal.innerHTML = `<div class="awards-ceremony-window"><div class="ceremony-title"><small>СЕЗОН ${history.season}</small><h2>CS2 Awards Ceremony</h2><p>Найкращі гравці та команда сезону</p></div>${window.renderCareerAwardsHtml ? window.renderCareerAwardsHtml(history.awards) : ''}<button onclick="closeAwardsCeremony()">Продовжити кар’єру</button></div>`;
        modal.style.display = 'flex';
    }
    window.closeAwardsCeremony = function () { const modal = document.getElementById('awards-ceremony-modal'); if (modal) modal.style.display = 'none'; };

    function dcRenderPreMatchSetup() {
        const report = document.getElementById('opponent-report-panel');
        if (!report) return;
        dcEnsureMatchPlan();
        let panel = document.getElementById('pre-match-tactics-panel');
        if (!panel) {
            panel = document.createElement('section');
            panel.id = 'pre-match-tactics-panel';
            panel.className = 'panel pre-match-tactics-panel';
            report.insertAdjacentElement('afterend', panel);
        }
        const enemy = getTeamByName(state.currentEnemy?.name);
        const recommendation = typeof window.getPreparationRecommendation === 'function'
            ? window.getPreparationRecommendation(enemy)
            : { preset: 'balanced', name: 'Баланс', reason: 'Стабільний план без надмірного ризику.' };
        const preparation = dcEnsureMatchPreparation();
        const activePlan = MATCH_PREPARATION_PRESETS[preparation.preset] || MATCH_PREPARATION_PRESETS.balanced;
        panel.innerHTML = `<div class="pre-match-tactics-head"><div><small>ДЕТАЛІ КОМАНДНОГО ПЛАНУ</small><h3>${escapeLiveText(activePlan.name)}</h3></div><span>Основний стиль обирається у вікні «Підготовка»</span></div>
            <div class="deep-tactic-grid pre-match-tactic-grid">
                <label>CT тактика<select id="ct-tactic-select" onchange="updateDeepMatchPlan()">${dcTacticOptions(state.matchPlan.ctTactic)}</select></label>
                <label>T тактика<select id="t-tactic-select" onchange="updateDeepMatchPlan()">${dcTacticOptions(state.matchPlan.tTactic)}</select></label>
                <label>Пістолетні<select id="pistol-strategy-select" onchange="updateDeepMatchPlan()"><option value="utility" ${state.matchPlan.pistol === 'utility' ? 'selected' : ''}>Гранати й розмін</option><option value="rush" ${state.matchPlan.pistol === 'rush' ? 'selected' : ''}>Швидкий rush</option><option value="duels" ${state.matchPlan.pistol === 'duels' ? 'selected' : ''}>Індивідуальні дуелі</option></select></label>
                <label>Економіка<select id="economy-strategy-select" onchange="updateDeepMatchPlan()"><option value="auto" ${state.matchPlan.economy === 'auto' ? 'selected' : ''}>Адаптивна</option><option value="eco" ${state.matchPlan.economy === 'eco' ? 'selected' : ''}>Обережна eco</option><option value="force" ${state.matchPlan.economy === 'force' ? 'selected' : ''}>Часті force-buy</option><option value="full" ${state.matchPlan.economy === 'full' ? 'selected' : ''}>Грати від full-buy</option></select></label>
                <label>Контрстратегія<select id="counter-strategy-select" onchange="updateDeepMatchPlan()"><option value="anti_awp" ${state.matchPlan.counter === 'anti_awp' ? 'selected' : ''}>Ізолювати AWP</option><option value="anti_entry" ${state.matchPlan.counter === 'anti_entry' ? 'selected' : ''}>Зупинити entry</option><option value="late_round" ${state.matchPlan.counter === 'late_round' ? 'selected' : ''}>Тиск у late round</option><option value="map_pressure" ${state.matchPlan.counter === 'map_pressure' ? 'selected' : ''}>Тиск на слабку карту</option></select></label>
            </div><div class="pre-match-advice"><span><small>РЕКОМЕНДАЦІЯ АНАЛІТИКА · ${escapeLiveText(recommendation.name)}</small><b>${escapeLiveText(recommendation.reason)}</b></span><button onclick="applyRecommendedPreparation('${recommendation.preset}')">Відкрити підготовку</button></div>`;
        const legacy = document.getElementById('ui-tactics');
        if (legacy) legacy.style.display = 'none';
    }

    window.applyRecommendedCounter = function (counter) {
        dcEnsureMatchPlan();
        state.matchPlan.counter = counter;
        dcRenderPreMatchSetup();
        autoSave('recommended-counter-applied');
    };

    window.applyRecommendedPreparation = function (preset) {
        const preparation = dcEnsureMatchPreparation();
        if (MATCH_PREPARATION_PRESETS[preset]) preparation.preset = preset;
        preparation.completed = false;
        dcRenderMatchPreparation();
        autoSave('recommended-preparation-opened');
    };

    let dcPurchaseNegotiation = null;

    function dcRecordClubReaction(player, team) {
        state.aiTransferHistory = Array.isArray(state.aiTransferHistory) ? state.aiTransferHistory : [];
        state.aiTransferHistory.unshift({ id: Date.now(), season: state.seasonNumber, phase: state.majorCircuit?.phase || 0, type: 'reaction', player: player.name, from: 'Вільні агенти', to: team.name, fee: 0 });
        state.aiTransferHistory = state.aiTransferHistory.slice(0, 30);
    }

    function dcSignReplacement(team, playerIndex, role) {
        ensureFreeAgentState();
        let choices = state.freeAgents.map((player, index) => ({ player, index })).filter(item => item.player.role === role);
        if (!choices.length) choices = state.freeAgents.map((player, index) => ({ player, index }));
        choices.sort((a, b) => b.player.skill - a.player.skill);
        const selected = choices[0];
        if (!selected) return;
        team.players[playerIndex] = createPlayerProfile(selected.player.name, playerIndex, selected.player);
        state.freeAgents.splice(selected.index, 1);
        team.chemistry = Math.max(45, (team.chemistry || 70) - 5);
        dcRecordClubReaction(selected.player, team);
        logSystem(`<b>${escapeLiveText(team.name)}</b> підписала ${escapeLiveText(selected.player.name)} як заміну після вашої угоди.`);
    }

    function dcTransferAcceptance(team, player, packageValue) {
        return calculateTransferAcceptance(team, player, getTransferPrice(player, 1.15), packageValue);
    }

    window.openTransferNegotiation = function (encodedTeam, playerIndex) {
        if (!state.transferWindow?.open) return;
        const team = getTeamByName(decodeURIComponent(encodedTeam));
        const player = team?.players?.[playerIndex];
        if (!team || team.isPlayer || !player) return;
        dcEnsurePlayerMeta(player);
        dcPurchaseNegotiation = { teamName: team.name, playerIndex, mode: 'buy', offer: getTransferPrice(player, 1.15) };
        const modal = ensureTransferNegotiationModal();
        modal.style.display = 'flex';
        document.getElementById('transfer-negotiation-title').textContent = `Купити ${player.name}`;
        dcRenderPurchaseNegotiation();
    };

    window.setPurchaseMode = function (mode) {
        if (!dcPurchaseNegotiation) return;
        dcPurchaseNegotiation.mode = mode;
        dcRenderPurchaseNegotiation();
    };

    function dcRenderPurchaseNegotiation() {
        const team = getTeamByName(dcPurchaseNegotiation?.teamName);
        const player = team?.players?.[dcPurchaseNegotiation?.playerIndex];
        const body = document.getElementById('transfer-negotiation-body');
        if (!team || !player || !body) return;
        const price = getTransferPrice(player, 1.15);
        const exchange = dcPurchaseNegotiation.mode === 'exchange';
        const outgoing = state.players[dcPurchaseNegotiation.outgoingIndex || 0];
        const credit = exchange && outgoing ? getPlayerSaleValue(outgoing) : 0;
        const minimum = Math.max(0, price - credit);
        const offer = Math.max(minimum, Math.min(state.money, Number(dcPurchaseNegotiation.offer) || minimum));
        dcPurchaseNegotiation.offer = offer;
        const acceptance = dcTransferAcceptance(team, player, offer + credit);
        const hasRosterSpace = exchange || state.players.length < 5;
        const canBuy = hasRosterSpace && state.money >= minimum;
        body.innerHTML = `<div class="agent-demand-strip"><span><small>Характер</small><b>${escapeLiveText(player.career.personality)}</b></span><span><small>Мораль</small><b>${Math.round(player.career.morale)}/100</b></span><span><small>Улюблені карти</small><b>${escapeLiveText(player.career.favoriteMaps.join(', '))}</b></span><span><small>Зарплата</small><b>$${getPlayerSalary(player)} / матч</b></span></div>
            <div class="transfer-candidate-line"><div><b>${escapeLiveText(player.name)}</b><span>${escapeLiveText(player.role)} · Rating ${player.skill}</span></div><div><small>Ціна клубу</small><strong>$${price}</strong></div></div>
            <div class="purchase-mode-tabs"><button class="${exchange ? '' : 'active'}" onclick="setPurchaseMode('buy')">Купівля</button><button class="${exchange ? 'active' : ''}" onclick="setPurchaseMode('exchange')">Обмін гравцями</button></div>
            ${exchange ? `<label class="purchase-player-select">Ваш гравець у пакет<select id="purchase-outgoing" onchange="changePurchaseOutgoing(this.value)">${state.players.map((item, index) => `<option value="${index}" ${index === (dcPurchaseNegotiation.outgoingIndex || 0) ? 'selected' : ''}>${escapeLiveText(item.name)} · ${item.skill} · залік $${getPlayerSaleValue(item)}</option>`).join('')}</select></label>` : (!hasRosterSpace ? '<div class="purchase-warning">У складі вже 5 гравців. Для прямої купівлі спочатку продайте одного гравця або оберіть обмін.</div>' : '<div class="purchase-note">Після угоди клуб суперника зможе підписати одного вільного агента на заміну.</div>')}
            ${state.money < minimum ? `<div class="purchase-warning">Бюджету не вистачає: потрібно щонайменше $${minimum}.</div>` : ''}
            <div class="transfer-offer-input purchase-offer"><span>$</span><input id="purchase-offer" type="number" min="${minimum}" max="${state.money}" step="100" value="${offer}" oninput="updatePurchaseOffer(this.value)"></div>
            <div class="transfer-exchange-breakdown"><span>Ціна кандидата <b>$${price}</b></span>${exchange ? `<span>Ваш гравець -25% <b>-$${credit}</b></span>` : ''}<span>Мінімальна доплата <b>$${minimum}</b></span></div>
            <div class="transfer-chance-panel ${acceptance.chance >= 70 ? 'high' : acceptance.chance >= 40 ? 'medium' : 'low'}"><div class="transfer-chance-main"><span>Ймовірність згоди</span><strong>${acceptance.chance}%</strong></div><div class="transfer-chance-bar"><i style="width:${acceptance.chance}%"></i></div><div class="transfer-factors"><span>Ваш рейтинг: #${acceptance.userRank}</span><span>Клуб гравця: #${acceptance.sourceRank}</span><span>Вартість пакета: $${offer + credit}</span><span>Бонус пропозиції: +${acceptance.offerEffect}%</span></div></div>
            <div id="transfer-negotiation-result" class="transfer-negotiation-result"></div><div class="transfer-negotiation-actions"><span>Бюджет: <b>$${state.money}</b></span><button ${!canBuy ? 'disabled' : ''} onclick="submitPurchaseOffer()">${exchange ? 'Запропонувати обмін' : 'Запропонувати купівлю'}</button></div>`;
    }

    window.changePurchaseOutgoing = function (index) { dcPurchaseNegotiation.outgoingIndex = Number(index); dcPurchaseNegotiation.offer = 0; dcRenderPurchaseNegotiation(); };
    window.updatePurchaseOffer = function (value) { dcPurchaseNegotiation.offer = Number(value) || 0; };

    window.submitPurchaseOffer = function () {
        const team = getTeamByName(dcPurchaseNegotiation?.teamName);
        const playerIndex = dcPurchaseNegotiation?.playerIndex;
        const player = team?.players?.[playerIndex];
        const exchange = dcPurchaseNegotiation?.mode === 'exchange';
        const outgoingIndex = dcPurchaseNegotiation?.outgoingIndex || 0;
        const outgoing = exchange ? state.players[outgoingIndex] : null;
        if (!team || !player || (!exchange && state.players.length >= 5)) return;
        const price = getTransferPrice(player, 1.15);
        const credit = outgoing ? getPlayerSaleValue(outgoing) : 0;
        const minimum = Math.max(0, price - credit);
        const cash = Number(dcPurchaseNegotiation.offer) || 0;
        const result = document.getElementById('transfer-negotiation-result');
        if (cash < minimum || cash > state.money) { if (result) result.textContent = 'Перевірте суму пропозиції та бюджет клубу.'; return; }
        const acceptance = dcTransferAcceptance(team, player, cash + credit);
        const key = `${team.name}::${player.name}`;
        if (Math.random() * 100 >= acceptance.chance) {
            ensureTransferNegotiationState();
            state.transferNegotiations[key] = (state.transferNegotiations[key] || 0) + 1;
            if (result) result.innerHTML = `<b>${escapeLiveText(player.name)}</b> відмовився. Вища пропозиція збільшить шанс.`;
            autoSave('purchase-rejected');
            return;
        }
        const incoming = { ...player };
        state.money -= cash;
        if (exchange) {
            state.players[outgoingIndex] = createPlayerProfile(incoming.name, outgoingIndex, { ...incoming, id: outgoing.id });
            team.players[playerIndex] = createPlayerProfile(outgoing.name, playerIndex, outgoing);
            logSystem(`Обмін завершено: <b>${escapeLiveText(incoming.name)}</b> замість ${escapeLiveText(outgoing.name)}, доплата $${cash}.`);
        } else {
            state.players.push(createPlayerProfile(incoming.name, state.players.length, incoming));
            dcSignReplacement(team, playerIndex, incoming.role);
            logSystem(`Купівлю завершено: <b>${escapeLiveText(incoming.name)}</b> за $${cash}.`);
        }
        state.chemistry = Math.max(25, state.chemistry - 12);
        delete state.transferNegotiations[key];
        dcPurchaseNegotiation = null;
        syncPlayerTeamInRating();
        autoSave(exchange ? 'player-exchange-completed' : 'player-purchase-completed');
        closeTransferNegotiation();
        updateUI();
        applyTransferSearch();
    };

    function dcDecorateTeamIdentities() {
        const userName = state.userTeamFullName;
        const enemyName = state.currentEnemy?.name;
        const header = document.getElementById('ui-team-fullname');
        if (header && userName && !header.querySelector('.team-logo')) {
            header.innerHTML = `${teamLogoHtml(userName, 'team-logo team-logo-header')}<span>${escapeLiveText(userName.toUpperCase())}</span>`;
        }
        const nextEnemy = document.getElementById('ui-enemy-name');
        if (nextEnemy) nextEnemy.querySelectorAll('.team-logo').forEach(logo => logo.remove());
        document.querySelectorAll('.world-rating-row, .simple-rating-row').forEach(row => {
            if (row.querySelector('.team-logo')) return;
            const nameElement = row.querySelector('b');
            const team = teamsRating.find(item => item.name === nameElement?.textContent.trim());
            if (team && nameElement) nameElement.insertAdjacentHTML('beforebegin', teamLogoHtml(team.name));
        });
        const reportTitle = document.querySelector('#opponent-report-panel .opponent-report-head h3');
        if (reportTitle && enemyName && !reportTitle.parentElement.querySelector('.team-logo')) {
            reportTitle.insertAdjacentHTML('beforebegin', teamLogoHtml(enemyName, 'team-logo team-logo-lg'));
        }
        const clubStatus = document.querySelector('.club-status-panel');
        if (clubStatus) {
            let pointsRow = document.getElementById('ui-training-points-row');
            if (!pointsRow) {
                pointsRow = document.createElement('div');
                pointsRow.id = 'ui-training-points-row';
                pointsRow.className = 'stat-line training-points-row';
                clubStatus.appendChild(pointsRow);
            }
            pointsRow.innerHTML = `<span>Training Points:</span><strong>${state.trainingPoints} TP</strong>`;
        }
    }

    const applyTransferSearchBeforePurchase = window.applyTransferSearch;
    window.applyTransferSearch = function () {
        const result = applyTransferSearchBeforePurchase();
        document.querySelectorAll('.transfer-negotiate-button').forEach(button => {
            if (!button.textContent.includes('Підписати')) button.textContent = 'Купити';
        });
        return result;
    };

    const renderRatingBeforeTeamLogos = renderRatingTable;
    renderRatingTable = function () {
        const result = renderRatingBeforeTeamLogos();
        dcDecorateTeamIdentities();
        return result;
    };

    const scoutTeamBeforeTeamLogos = scoutTeam;
    scoutTeam = function (teamName) {
        const result = scoutTeamBeforeTeamLogos(teamName);
        const team = getTeamByName(teamName);
        const title = document.getElementById('scout-team-name');
        if (team && title) title.innerHTML = `${teamLogoHtml(team.name, 'team-logo team-logo-lg')}<span>${escapeLiveText(team.name)}</span>`;
        if (team) document.querySelectorAll('.world-player-ratings > div').forEach((row, index) => {
            const player = team.players[index];
            if (!player) return;
            dcEnsurePlayerMeta(player);
            row.classList.add('world-player-clickable');
            row.tabIndex = 0;
            row.setAttribute('role', 'button');
            row.setAttribute('aria-label', `Відкрити профіль ${player.name}`);
            row.insertAdjacentHTML('beforeend', `<span class="world-player-level">LVL ${player.level}</span>`);
            row.onclick = () => window.openWorldPlayerProfile(encodeURIComponent(teamName), index);
            row.onkeydown = event => { if (event.key === 'Enter' || event.key === ' ') row.click(); };
        });
        return result;
    };

    window.openWorldPlayerProfile = function (encodedTeamName, playerIndex) {
        const team = getTeamByName(decodeURIComponent(encodedTeamName));
        const player = team?.players?.[playerIndex];
        if (!player) return;
        dcEnsurePlayerMeta(player);
        const stats = player.stats || {};
        const kd = (Number(stats.kills || 0) / Math.max(1, Number(stats.deaths || 0))).toFixed(2);
        let modal = document.getElementById('world-player-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'world-player-modal';
            modal.className = 'world-player-modal';
            document.body.appendChild(modal);
        }
        modal.innerHTML = `<section class="world-player-window"><header><span><small>${escapeLiveText(team.name)}</small><h2>${escapeLiveText(player.name)}</h2><em>${escapeLiveText(player.role)} · Rating ${player.skill}</em></span><button type="button" onclick="closeWorldPlayerProfile()" aria-label="Закрити">×</button></header><div class="world-player-profile-grid"><div><canvas id="world-player-radar" width="430" height="320" aria-label="Діаграма гравця"></canvas><div class="world-level-card"><span><small>РІВЕНЬ</small><strong>${player.level}</strong></span><div><b>${player.levelXp >= 0 ? '+' : ''}${player.levelXp}/100</b><i style="width:${Math.abs(player.levelXp)}%" class="${player.levelXp < 0 ? 'negative' : ''}"></i></div></div></div><div class="world-player-stat-list"><span><small>Матчі</small><b>${stats.matches || 0}</b></span><span><small>K/D</small><b>${kd}</b></span><span><small>Середній Rating</small><b>${Number(stats.rating || 1).toFixed(2)}</b></span><span><small>MVP</small><b>${stats.mvps || 0}</b></span><span><small>Форма</small><b>${player.form > 0 ? '+' : ''}${player.form || 0}</b></span><span><small>Ціна</small><b>$${getTransferPrice(player, 1.15).toLocaleString('uk-UA')}</b></span></div></div></section>`;
        modal.style.display = 'flex';
        requestAnimationFrame(() => dcDrawRadar('world-player-radar', dcPlayerRadarMetrics(player), '#69bdf2'));
    };
    window.closeWorldPlayerProfile = function () {
        const modal = document.getElementById('world-player-modal');
        if (modal) modal.style.display = 'none';
    };

    function dcRenderAll() {
        dcEnsureState();
        dcRenderPlayerCareerBadges();
        dcRenderTrainingCenter();
        dcRenderShowMatch();
        dcRenderPreMatchSetup();
        dcDecorateTeamIdentities();
        const startButton = document.querySelector('.next-match-panel button[onclick="startVetoPhase()"]');
        if (startButton) startButton.textContent = dcIsFinal() ? 'Почати фінал (BO5)' : 'Почати матч (BO3)';
    }

    const phaseHookBeforeDeepCareer = window.onMajorCircuitPhaseStarted;
    window.onMajorCircuitPhaseStarted = function (phase, ids) {
        if (typeof phaseHookBeforeDeepCareer === 'function') phaseHookBeforeDeepCareer(phase, ids);
        dcEnsureState();
        const rewardKey = `${state.seasonNumber}-${phase}`;
        if (phase > 0 && !state.trainingPhaseRewards[rewardKey]) {
            const reward = 45 + phase * 15;
            state.trainingPhaseRewards[rewardKey] = reward;
            dcAddTrainingPoints(reward, `завершення етапу Major Circuit`);
            autoSave('training-points-phase-reward');
        }
        state.showMatchInvite = null;
        dcEnsureShowMatchInvite();
        dcRenderAll();
    };

    const updateUIBeforeDeepCareer = updateUI;
    updateUI = function () {
        updateUIBeforeDeepCareer();
        dcRenderAll();
    };

    const onloadBeforeDeepCareer = window.onload;
    window.onload = function (event) {
        if (typeof onloadBeforeDeepCareer === 'function') onloadBeforeDeepCareer.call(this, event);
        dcRenderAll();
    };
})();
