// Transfer windows, opponent reports and end-of-season awards.
(function () {
    'use strict';

    const PHASE_NAMES = ['Перед IEM USA / BLAST Bounty', 'Перед IEM Germany / BLAST Open', 'Перед StarSeries / XSE', 'Перед ESL Pro League', 'Перед Cologne Major'];

    function csEnsureState() {
        state.aiTransferHistory = Array.isArray(state.aiTransferHistory) ? state.aiTransferHistory : [];
        state.transferWindowHistory = Array.isArray(state.transferWindowHistory) ? state.transferWindowHistory : [];
        const phase = state.majorCircuit?.phase ?? 0;
        const key = `${state.seasonNumber}-${phase}`;
        if (!state.transferWindow || !state.transferWindow.key) {
            csOpenTransferWindow(phase, key, true);
        }
    }

    function csOpenTransferWindow(phase, forcedKey, initial = false) {
        if (!state.userTeamFullName) return;
        state.aiTransferHistory = Array.isArray(state.aiTransferHistory) ? state.aiTransferHistory : [];
        state.transferWindowHistory = Array.isArray(state.transferWindowHistory) ? state.transferWindowHistory : [];
        const key = forcedKey || `${state.seasonNumber}-${phase}`;
        if (state.transferWindow?.key === key && state.transferWindow.open) return;
        state.transferWindow = {
            open: true,
            phase,
            key,
            title: PHASE_NAMES[phase] || 'Між турнірами',
            openedAt: Date.now()
        };
        if (!state.transferWindowHistory.includes(key)) {
            state.transferWindowHistory.push(key);
        }
        if (!initial && typeof logSystem === 'function') logSystem(`Трансферне вікно відкрито: <b>${state.transferWindow.title}</b>.`);
        csRenderTransferCenter();
        if (typeof autoSave === 'function') autoSave('transfer-window-opened');
    }

    function csCloseTransferWindow() {
        if (!state.transferWindow?.open) return;
        state.transferWindow.open = false;
        state.transferWindow.closedAt = Date.now();
        if (typeof logSystem === 'function') logSystem('Трансферне вікно закрито до завершення поточного турніру.');
        csRenderTransferCenter();
        if (typeof autoSave === 'function') autoSave('transfer-window-closed');
    }

    function csRecordTransfer(record) {
        state.aiTransferHistory.unshift({
            id: Date.now() + Math.floor(Math.random() * 100000),
            season: state.seasonNumber,
            phase: state.majorCircuit?.phase || 0,
            ...record
        });
        state.aiTransferHistory = state.aiTransferHistory.slice(0, 30);
    }

    function csAiTeams() {
        return teamsRating.filter(team => !team.isPlayer && team.players?.length === 5);
    }

    function csRunClubTransfer() {
        const teams = csAiTeams();
        if (teams.length < 2) return;
        const buyers = [...teams].sort((a, b) => b.points - a.points);
        const buyer = buyers[Math.floor(Math.random() * Math.min(12, buyers.length))];
        const weakestIndex = buyer.players.reduce((best, player, index, list) => player.skill < list[best].skill ? index : best, 0);
        const outgoing = buyer.players[weakestIndex];
        const targets = teams.flatMap(team => team === buyer ? [] : team.players.map((player, playerIndex) => ({ team, player, playerIndex })))
            .filter(item => item.player.skill >= outgoing.skill + 2 && item.player.skill <= outgoing.skill + 12)
            .sort((a, b) => b.player.skill - a.player.skill);
        if (!targets.length) return;
        const target = targets[Math.floor(Math.random() * Math.min(18, targets.length))];
        const fee = Math.max(0, getTransferPrice(target.player, 1) - Math.floor(getTransferPrice(outgoing, 1) * 0.75));
        buyer.players[weakestIndex] = createPlayerProfile(target.player.name, weakestIndex, target.player);
        target.team.players[target.playerIndex] = createPlayerProfile(outgoing.name, target.playerIndex, outgoing);
        buyer.chemistry = Math.max(45, (buyer.chemistry || 70) - 5);
        target.team.chemistry = Math.max(45, (target.team.chemistry || 70) - 3);
        csRecordTransfer({
            type: 'club', player: target.player.name, from: target.team.name, to: buyer.name,
            outgoing: outgoing.name, fee
        });
    }

    function csRunFreeAgentSigning() {
        if (typeof ensureFreeAgentState !== 'function') return;
        ensureFreeAgentState();
        if (!state.freeAgents.length) return;
        const teams = csAiTeams().sort((a, b) => a.points - b.points);
        const team = teams[Math.floor(Math.random() * Math.min(12, teams.length))];
        if (!team) return;
        const weakestIndex = team.players.reduce((best, player, index, list) => player.skill < list[best].skill ? index : best, 0);
        const weakest = team.players[weakestIndex];
        const candidateIndex = state.freeAgents.reduce((best, player, index, list) => player.skill > list[best].skill ? index : best, 0);
        const candidate = state.freeAgents[candidateIndex];
        if (!candidate || candidate.skill <= weakest.skill) return;
        team.players[weakestIndex] = createPlayerProfile(candidate.name, weakestIndex, candidate);
        state.freeAgents.splice(candidateIndex, 1);
        state.freeAgents.push(createPlayerProfile(weakest.name, state.freeAgents.length, { ...weakest, id: `fa-ai-${Date.now()}` }));
        team.chemistry = Math.max(45, (team.chemistry || 70) - 4);
        csRecordTransfer({ type: 'free', player: candidate.name, from: 'Вільні агенти', to: team.name, outgoing: weakest.name, fee: 0 });
    }

    function csRunAiTransferWindow() {
        if (!Array.isArray(teamsRating) || teamsRating.length < 24) return;
        csRunClubTransfer();
        csRunClubTransfer();
        csRunFreeAgentSigning();
        const newest = state.aiTransferHistory.slice(0, 3);
        newest.forEach(item => {
            const terms = item.type === 'free' ? ' як вільного агента' : item.fee ? ` за $${item.fee}` : ' обміном без доплати';
            if (typeof logSystem === 'function') logSystem(`<b>${item.to}</b> підписала ${escapeLiveText(item.player)}${terms}.`);
        });
    }

    function csCanTransfer(showMessage = true) {
        const open = !!state.transferWindow?.open;
        if (!open && showMessage) alert('Трансферне вікно закрите. Наступна можливість буде між турнірами.');
        return open;
    }

    function csRenderTransferCenter() {
        const panel = document.querySelector('#transfers-tab .transfer-search-panel');
        const grid = panel?.querySelector('.transfer-search-grid');
        if (!panel || !grid) return;
        let banner = document.getElementById('transfer-window-banner');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'transfer-window-banner';
            panel.insertBefore(banner, grid);
        }
        const open = !!state.transferWindow?.open;
        banner.className = `transfer-window-banner ${open ? 'open' : 'closed'}`;
        banner.innerHTML = `<span><i></i><b>${open ? 'ТРАНСФЕРНЕ ВІКНО ВІДКРИТО' : 'ТРАНСФЕРНЕ ВІКНО ЗАКРИТО'}</b><small>${open ? escapeLiveText(state.transferWindow.title) : 'Угоди доступні після завершення турніру'}</small></span><strong>${open ? 'Можна проводити угоди' : 'Ростери зафіксовані'}</strong>`;

        let feed = document.getElementById('ai-transfer-feed');
        if (!feed) {
            feed = document.createElement('section');
            feed.id = 'ai-transfer-feed';
            feed.className = 'ai-transfer-feed';
            panel.insertBefore(feed, document.getElementById('transfer-search-summary'));
        }
        feed.innerHTML = `<div class="ai-transfer-head"><h3>Реакція клубів на ваші угоди</h3><small>Суперники підписують вільного агента лише після продажу вам гравця</small></div><div>${state.aiTransferHistory.slice(0, 6).map(item => `<span><b>${escapeLiveText(item.player)}</b><small>${escapeLiveText(item.from)} → ${escapeLiveText(item.to)}</small><strong>${item.fee ? '$' + item.fee : 'FREE'}</strong></span>`).join('') || '<p>Угод ще не було.</p>'}</div>`;
        panel.querySelectorAll('.transfer-negotiate-button, .transfer-own-player button').forEach(button => {
            button.disabled = !open;
            button.title = open ? '' : 'Трансферне вікно закрите';
        });
    }

    function csTeamStyle(team) {
        const awp = team.players.filter(player => player.role === 'AWP').sort((a, b) => b.skill - a.skill)[0];
        const entries = team.players.filter(player => player.role === 'Entry');
        const chemistry = team.chemistry || 70;
        if (entries.length >= 2) return { name: 'Агресивні виходи', note: 'Часто прискорюються на старті раунду.' };
        if (awp && awp.skill >= 84) return { name: 'Гра навколо AWP', note: `Будують раунди навколо ${awp.name}.` };
        if (chemistry >= 82) return { name: 'Структурний контроль', note: 'Сильні у пізніх раундах і ретейках.' };
        return { name: 'Збалансована гра', note: 'Змінюють темп залежно від економіки.' };
    }

    function csPreparationRecommendation(team) {
        const players = team?.players || [];
        const awp = players.filter(player => player.role === 'AWP').sort((a, b) => b.skill - a.skill)[0];
        const entries = players.filter(player => player.role === 'Entry');
        const averageSkill = players.reduce((sum, player) => sum + player.skill, 0) / Math.max(1, players.length);
        const chemistry = team?.chemistry || 70;
        const recent = (team?.recentResults || []).slice(-5);
        const wins = recent.filter(result => result === 'W').length;
        if (entries.length >= 2) return { preset: 'deep_defense', name: 'Глухий захист', reason: 'Стримує ранні виходи й змушує агресивних entry грати довгі раунди.' };
        if (awp?.skill >= 84) return { preset: 'anti_strat', name: 'Анти-страти', reason: `Закриває позиції ${awp.name} та сильну карту суперника.` };
        if (chemistry >= 84) return { preset: 'aggressive', name: 'Агресивний стиль', reason: 'Ламає темп структурної команди ранніми дуелями й постійним тиском.' };
        if (wins >= 4) return { preset: 'structural', name: 'Структурний стиль', reason: 'Зменшує ризик проти суперника у сильній формі та дає контроль розмінів.' };
        if (averageSkill >= 86) return { preset: 'economy', name: 'Економ-контроль', reason: 'Зберігає якісні full-buy раунди проти сильнішого індивідуального складу.' };
        if (players.filter(player => ['Rifler', 'Lurker'].includes(player.role)).length >= 3) return { preset: 'retake', name: 'Командний ретейк', reason: 'Дає перевагу в розмінах проти повільних ріфлерських розіграшів.' };
        return { preset: 'balanced', name: 'Баланс', reason: 'Суперник не має однієї очевидної слабкості, тому потрібна стабільність усіх показників.' };
    }
    window.getPreparationRecommendation = csPreparationRecommendation;

    function csMapPower(team, mapName) {
        const row = team.mapStats?.[mapName] || { skill: 0, wins: 0, played: 0 };
        return (row.skill || 0) + (typeof getMapWinrate === 'function' ? getMapWinrate(row) : 0) * 0.12;
    }

    function csOpponentReportHtml(team) {
        if (!team) return '';
        if (typeof ensureTeamCompetitiveProfile === 'function') ensureTeamCompetitiveProfile(team);
        if (typeof ensureWeakMapForTeam === 'function') ensureWeakMapForTeam(team);
        const style = csTeamStyle(team);
        const recommendation = csPreparationRecommendation(team);
        const keyPlayer = [...team.players].sort((a, b) => (b.skill + (b.form || 0)) - (a.skill + (a.form || 0)))[0];
        const maps = [...officialMaps].filter(map => map !== team.weakMap).sort((a, b) => csMapPower(team, b) - csMapPower(team, a));
        const pick = team.mapFocus && team.mapFocus !== team.weakMap ? team.mapFocus : maps[0];
        const form = (team.recentResults || []).slice(-5);
        const averageSkill = Math.round(team.players.reduce((sum, player) => sum + player.skill, 0) / Math.max(1, team.players.length));
        const averageLevel = (team.players.reduce((sum, player) => sum + Number(player.level || Math.max(1, Math.round((player.skill - 55) / 3))), 0) / Math.max(1, team.players.length)).toFixed(1);
        const pickSkill = Number(team.mapStats?.[pick]?.skill || 0);
        return `<div class="opponent-report-head"><div><small>ПЕРЕДМАТЧЕВА АНАЛІТИКА</small><h3>${escapeLiveText(team.name)}</h3></div><span class="opponent-form">${form.length ? form.map(result => `<i class="${result === 'W' ? 'win' : 'loss'}">${result}</i>`).join('') : '<em>Немає матчів</em>'}</span></div>
            <div class="opponent-report-grid">
                <span><small>Стиль</small><b>${style.name}</b><em>${style.note}</em></span>
                <span><small>Ключовий гравець</small><b>${escapeLiveText(keyPlayer.name)} · ${keyPlayer.skill}</b><em>${escapeLiveText(keyPlayer.role)} · форма ${keyPlayer.form >= 0 ? '+' : ''}${keyPlayer.form || 0}</em></span>
                <span><small>Очікуваний veto</small><b>Pick ${escapeLiveText(pick)}</b><em>Ban ${escapeLiveText(team.weakMap)}</em></span>
                <span class="counter-call"><small>Рекомендований план підготовки</small><b>${recommendation.name}</b><em>${recommendation.reason}</em><button type="button" onclick="applyRecommendedPreparation('${recommendation.preset}')">Відкрити підготовку</button></span>
            </div>
            <div class="opponent-power-factors"><span><small>СИЛА СКЛАДУ</small><b>${averageSkill}</b></span><span><small>СЕРЕДНІЙ РІВЕНЬ</small><b>${averageLevel}</b></span><span><small>${escapeLiveText(pick)}</small><b>${pickSkill >= 0 ? '+' : ''}${pickSkill}/30</b></span><span><small>ЗІГРАНІСТЬ</small><b>${team.chemistry || 70}%</b></span></div>
            <div class="opponent-lineup"><small>Останній склад</small>${team.players.map(player => `<span><b>${escapeLiveText(player.name)}</b><em>${escapeLiveText(player.role)} · ${player.skill}</em></span>`).join('')}</div>`;
    }

    function csRenderOpponentReport() {
        const nextMatch = document.querySelector('.next-match-panel');
        if (!nextMatch) return;
        let report = document.getElementById('opponent-report-panel');
        if (!report) {
            report = document.createElement('section');
            report.id = 'opponent-report-panel';
            report.className = 'panel opponent-report-panel';
            nextMatch.insertAdjacentElement('afterend', report);
        }
        const team = typeof getTeamByName === 'function' ? getTeamByName(state.currentEnemy?.name) : null;
        report.innerHTML = team ? csOpponentReportHtml(team) : '<h3>Передматчева аналітика</h3><p>Суперник ще не визначений.</p>';
    }

    function csPlayerCandidates(circuit) {
        const mvpCount = {};
        (circuit?.tournamentMvps || []).forEach(item => { mvpCount[item.name] = (mvpCount[item.name] || 0) + 1; });
        return teamsRating.flatMap(team => team.players.map(player => ({
            name: player.name,
            team: team.name,
            role: player.role,
            skill: player.skill,
            rating: Number(player.stats?.rating || 1),
            matchMvps: player.stats?.mvps || 0,
            tournamentMvps: mvpCount[player.name] || 0,
            score: player.skill + Number(player.stats?.rating || 1) * 10 + (player.form || 0) + (mvpCount[player.name] || 0) * 9 + (player.stats?.mvps || 0) * 0.35
        })));
    }

    function csAwardPlayer(player) {
        return player ? { name: player.name, team: player.team, role: player.role, rating: Number(player.rating.toFixed(2)), skill: player.skill } : null;
    }

    window.calculateCareerSeasonAwards = function (circuit) {
        const candidates = csPlayerCandidates(circuit).sort((a, b) => b.score - a.score);
        const playerOfYear = candidates[0];
        const bestAwper = candidates.filter(player => player.role === 'AWP').sort((a, b) => b.score - a.score)[0];
        const bestRifler = candidates.filter(player => player.role !== 'AWP' && player.role !== 'IGL').sort((a, b) => b.score - a.score)[0];
        const breakthrough = candidates.filter(player => player.skill <= 84).sort((a, b) => b.score - a.score)[0];
        const pointRanking = teamsRating.map(team => ({ name: team.name, points: circuit.majorPoints[team.name] || 0, world: team.points })).sort((a, b) => b.points - a.points || b.world - a.world);
        const used = new Set();
        const allStar = [];
        const take = predicate => {
            const found = candidates.find(player => !used.has(player.name) && predicate(player));
            if (found) { used.add(found.name); allStar.push(csAwardPlayer(found)); }
        };
        take(player => player.role === 'IGL');
        take(player => player.role === 'AWP');
        while (allStar.length < 5) take(() => true);
        return {
            playerOfYear: csAwardPlayer(playerOfYear),
            bestAwper: csAwardPlayer(bestAwper),
            bestRifler: csAwardPlayer(bestRifler),
            breakthrough: csAwardPlayer(breakthrough),
            coachTeam: pointRanking[0]?.name || '-',
            allStar
        };
    };

    window.renderCareerAwardsHtml = function (awards) {
        if (!awards) return '';
        const award = (label, player) => `<span><small>${label}</small><b>${escapeLiveText(player?.name || '-')}</b><em>${escapeLiveText(player?.team || '')}${player ? ` · ${player.rating}` : ''}</em></span>`;
        return `<section class="season-awards"><div class="season-awards-head"><div><small>НАГОРОДИ СЕЗОНУ</small><h3>CS2 Awards</h3></div><strong>Тренер року · ${escapeLiveText(awards.coachTeam)}</strong></div><div class="season-award-grid">${award('Гравець року', awards.playerOfYear)}${award('Найкращий AWP', awards.bestAwper)}${award('Найкращий ріфлер', awards.bestRifler)}${award('Прорив року', awards.breakthrough)}</div><div class="all-star-five"><small>СИМВОЛІЧНА ЗБІРНА</small>${(awards.allStar || []).map(player => `<span><b>${escapeLiveText(player.name)}</b><em>${escapeLiveText(player.role)} · ${escapeLiveText(player.team)}</em></span>`).join('')}</div></section>`;
    };

    function csRenderAwardsPanel() {
        const slot = document.getElementById('world-tournament-slot');
        if (!slot) return;
        let panel = document.getElementById('season-awards-panel');
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'season-awards-panel';
            panel.className = 'panel season-awards-panel';
            slot.appendChild(panel);
        }
        const latest = state.majorSeasonHistory?.[0];
        panel.innerHTML = latest?.awards
            ? window.renderCareerAwardsHtml(latest.awards)
            : '<h3>Нагороди сезону</h3><p>Гравець року, найкращий AWP, ріфлер, прорив і символічна збірна визначаться після Cologne Major.</p>';
    }

    function csRenderAll() {
        csEnsureState();
        csRenderTransferCenter();
        csRenderOpponentReport();
        csRenderAwardsPanel();
    }

    window.onMajorCircuitPhaseStarted = function (phase) {
        csOpenTransferWindow(phase, `${state.seasonNumber}-${phase}`);
    };

    window.onMajorCircuitOpponentChanged = function () {
        csRenderOpponentReport();
    };

    const startVetoBeforeCareerSystems = window.startVetoPhase;
    window.startVetoPhase = function () {
        if (state.players.length >= 5) csCloseTransferWindow();
        return startVetoBeforeCareerSystems();
    };

    const openPlayerSaleBeforeWindows = window.openPlayerSale;
    window.openPlayerSale = function (index) {
        if (!csCanTransfer()) return;
        return openPlayerSaleBeforeWindows(index);
    };

    const signFreeAgentBeforeWindows = window.signFreeAgent;
    window.signFreeAgent = function (index) {
        if (!csCanTransfer()) return;
        return signFreeAgentBeforeWindows(index);
    };

    const openNegotiationBeforeWindows = window.openTransferNegotiation;
    window.openTransferNegotiation = function (teamName, index) {
        if (!csCanTransfer()) return;
        return openNegotiationBeforeWindows(teamName, index);
    };

    const applyTransferSearchBeforeWindows = window.applyTransferSearch;
    window.applyTransferSearch = function () {
        const result = applyTransferSearchBeforeWindows();
        csRenderTransferCenter();
        return result;
    };

    const updateUIBeforeCareerSystems = updateUI;
    updateUI = function () {
        updateUIBeforeCareerSystems();
        csRenderAll();
    };

    const onloadBeforeCareerSystems = window.onload;
    window.onload = function (event) {
        if (typeof onloadBeforeCareerSystems === 'function') onloadBeforeCareerSystems.call(this, event);
        csRenderAll();
    };
})();
