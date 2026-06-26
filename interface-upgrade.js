// Unified career interface layer. Loaded after all gameplay systems.
(function () {
    'use strict';

    function uiEnsureState() {
        state.uiNotifications = Array.isArray(state.uiNotifications) ? state.uiNotifications : [];
        state.transferShortlist = Array.isArray(state.transferShortlist) ? state.transferShortlist : [];
    }

    function uiStripHtml(value) {
        const element = document.createElement('div');
        element.innerHTML = String(value || '');
        return element.textContent || '';
    }

    function uiTeamRank(name) {
        return [...teamsRating].sort((a, b) => b.points - a.points).findIndex(team => team.name === name) + 1;
    }

    function uiAverage(values, fallback = 0) {
        return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : fallback;
    }

    function uiRolePenalty(players, player) {
        if (!player || (player.role !== 'AWP' && player.role !== 'IGL')) return 0;
        return players.filter(item => item.role === player.role).length >= 2 ? 5 : 0;
    }

    function uiEffectiveSkill(players, player) {
        return Math.max(0, Math.min(100, player.skill - uiRolePenalty(players, player)));
    }

    function uiRosterPenalty(players) {
        return uiAverage(players.map(player => uiRolePenalty(players, player)), 0);
    }

    window.getRoleDuplicationPenalty = uiRolePenalty;
    window.getEffectiveRosterSkill = function (players) {
        return uiAverage(players.map(player => uiEffectiveSkill(players, player) + (player.form || 0)), 70);
    };

    function uiEnsureShell() {
        const topbar = document.querySelector('.career-topbar');
        if (topbar && !document.getElementById('career-resource-bar')) {
            topbar.insertAdjacentHTML('beforeend', `<div id="career-resource-bar" class="career-resource-bar"></div><button id="career-inbox-button" class="career-inbox-button" onclick="openCareerInbox()"><span>Повідомлення</span><b id="career-inbox-count">0</b></button>`);
        }
        if (!document.getElementById('career-inbox-modal')) {
            document.body.insertAdjacentHTML('beforeend', `<div id="career-inbox-modal" class="career-ui-modal"><section class="career-ui-window inbox-window"><header><div><small>КАР'ЄРА</small><h2>Центр повідомлень</h2></div><button onclick="closeCareerInbox()" aria-label="Закрити">×</button></header><div id="career-inbox-list"></div></section></div>`);
        }
        if (!document.getElementById('player-profile-modal')) {
            document.body.insertAdjacentHTML('beforeend', `<div id="player-profile-modal" class="career-ui-modal"><section class="career-ui-window player-profile-window"><header><div><small>ДОСЬЄ ГРАВЦЯ</small><h2 id="player-profile-title">Гравець</h2></div><button onclick="closeUiPlayerProfile()" aria-label="Закрити">×</button></header><div id="player-profile-body"></div></section></div>`);
        }
    }

    function uiRenderResourceBar() {
        const bar = document.getElementById('career-resource-bar');
        if (!bar) return;
        const morale = Math.round(uiAverage(state.players.map(player => player.career?.morale || 60), 60));
        const event = state.majorCircuit?.events?.[state.majorCircuit.activeEventId];
        const run = state.majorCircuit?.eliminationRun;
        if (false && run) {
            const waitingEvent = state.majorCircuit?.events?.[run.eventId];
            const stageLabels = { swiss: 'Швейцарський етап', quarterfinal: '1/4 фіналу', semifinal: '1/2 фіналу', final: 'Фінал', complete: 'Завершено' };
            panel.innerHTML = `<div class="next-match-head"><div><small>${run.waitFor === 'playoff' ? 'ОЧІКУВАННЯ ПЛЕЙ-ОФ' : 'СИМУЛЯЦІЯ ТУРНІРУ'}</small><h3>${escapeLiveText(waitingEvent?.name || 'Major Circuit')}</h3></div><span>${escapeLiveText(waitingEvent ? (stageLabels[waitingEvent.stage] || waitingEvent.stage) : '')}</span></div>
                <div class="major-elimination-hub standalone"><div><small>${run.waitFor === 'playoff' ? 'ВАША КОМАНДА ВЖЕ В ПЛЕЙ-ОФ' : 'ТУРНІР ПРОДОВЖУЄТЬСЯ БЕЗ ВАШОЇ КОМАНДИ'}</small><b>${escapeLiveText(run.reason || 'Очікування наступного етапу')}</b><span>Зіграйте симуляцію наступного туру, щоб турнір дійшов до вашого наступного матчу або фіналу.</span></div><button type="button" onclick="simulateEliminatedTournamentStep()">Симулювати наступний тур</button><button type="button" class="secondary" onclick="openTournamentWindow(true)">Таблиця</button></div>`;
            return;
        }
        bar.innerHTML = `<span><small>БЮДЖЕТ</small><b>$${state.money}</b></span><span><small>РОЗВИТОК</small><b>${state.trainingPoints || 0} TP</b></span><span><small>МОРАЛЬ</small><b>${morale}</b></span><span><small>ВТОМА</small><b>${Math.round(state.trainingFatigue || 0)}</b></span><span><small>ЗІГРАНІСТЬ</small><b>${Math.round(state.chemistry || 0)}%</b></span><span class="resource-event"><small>ТУРНІР</small><b>${escapeLiveText(event?.name || 'Між турнірами')}</b></span>`;
    }

    function uiRenderHub() {
        const panel = document.querySelector('.next-match-panel');
        if (!panel) return;
        const run = state.majorCircuit?.eliminationRun;
        if (run) {
            const waitingEvent = state.majorCircuit?.events?.[run.eventId];
            if (!waitingEvent || waitingEvent.completed) {
                state.majorCircuit.eliminationRun = null;
            } else {
            const stageLabels = { swiss: 'Swiss', quarterfinal: '1/4', semifinal: '1/2', final: 'Final', complete: 'Done' };
            panel.innerHTML = `<div class="next-match-head"><div><small>${run.waitFor === 'playoff' ? 'ОЧІКУВАННЯ ПЛЕЙ-ОФ' : 'СИМУЛЯЦІЯ ТУРНІРУ'}</small><h3>${escapeLiveText(waitingEvent?.name || 'Major Circuit')}</h3></div><span>${escapeLiveText(waitingEvent ? (stageLabels[waitingEvent.stage] || waitingEvent.stage) : '')}</span></div>
                <div class="major-elimination-hub standalone"><div><small>${run.waitFor === 'playoff' ? 'ВАША КОМАНДА ВЖЕ В ПЛЕЙ-ОФ' : 'ТУРНІР ПРОДОВЖУЄТЬСЯ БЕЗ ВАШОЇ КОМАНДИ'}</small><b>${escapeLiveText(run.reason || 'Очікування наступного етапу')}</b><span>Симулюйте наступний тур, поки Swiss не сформує плей-оф або турнір не завершиться.</span></div><button type="button" onclick="simulateEliminatedTournamentStep()">Симулювати наступний тур</button><button type="button" class="secondary" onclick="openTournamentWindow(true)">Таблиця</button></div>`;
            return;
            }
        }
        const opponent = getTeamByName(state.currentEnemy?.name);
        const ownRank = uiTeamRank(state.userTeamFullName);
        const enemyRank = uiTeamRank(opponent?.name);
        const ownTeam = teamsRating.find(team => team.isPlayer);
        const event = state.majorCircuit?.events?.[state.majorCircuit.activeEventId];
        panel.innerHTML = `<div class="next-match-head"><div><small>НАСТУПНИЙ МАТЧ</small><h3>${escapeLiveText(event?.name || 'Сезонний матч')}</h3></div><span>${escapeLiveText(event?.stage || state.tournamentStage || '')}</span></div>
            <div class="next-match-versus"><div class="match-club own">${teamLogoHtml(state.userTeamFullName, 'team-logo team-logo-xl')}<span><b>${escapeLiveText(state.userTeamFullName)}</b><small>#${ownRank || '-'} · ${Math.round(ownTeam?.points || 0)} pts</small></span></div><strong>VS</strong><div class="match-club">${teamLogoHtml(opponent?.name, 'team-logo team-logo-xl')}<span><b id="ui-enemy-name">${escapeLiveText(opponent?.name || state.currentEnemy?.name || '-')}</b><small>#${enemyRank || '-'} · ${Math.round(opponent?.points || 0)} pts</small></span></div></div>
            <div class="next-match-actions"><button onclick="startVetoPhase()">Почати матч</button><button class="${window.isCurrentMatchPrepared?.() ? 'prepared' : ''}" onclick="openMatchPreparation()">${window.isCurrentMatchPrepared?.() ? 'Підготовлено' : 'Підготовка'}</button><button onclick="openTournamentWindow(true)">Турнір</button></div>`;

        let quick = document.getElementById('career-quick-actions');
        if (!quick) {
            quick = document.createElement('section');
            quick.id = 'career-quick-actions';
            quick.className = 'career-quick-actions';
            panel.insertAdjacentElement('afterend', quick);
        }
        const nextCalendar = (state.calendar || []).find(match => match.isPlayer && !match.completed);
        quick.innerHTML = `<button onclick="switchTab('club')"><small>КОМАНДА</small><b>Керування складом</b><span>${state.players.length} гравців · ефективний Rating ${Math.round(window.getEffectiveRosterSkill(state.players))}</span></button><button onclick="switchTab('training')"><small>ГОТОВНІСТЬ</small><b>Підготовка карт</b><span>${state.trainingPoints || 0} TP · бонуси мап до 30</span></button><button onclick="switchTab('rating')"><small>КАЛЕНДАР</small><b>${nextCalendar ? `Тур ${nextCalendar.week}` : 'Найближчі події'}</b><span>${nextCalendar ? `${escapeLiveText(nextCalendar.teamA)} — ${escapeLiveText(nextCalendar.teamB)}` : 'Відкрити світ CS2'}</span></button>`;
    }

    function uiRenderRoster() {
        const container = document.getElementById('roster-list-container');
        if (!container) return;
        const order = { IGL: 0, AWP: 1, Entry: 2, Lurker: 3, Rifler: 4 };
        const players = state.players.map((player, index) => ({ player, index })).sort((a, b) => (order[a.player.role] ?? 9) - (order[b.player.role] ?? 9));
        const duplicateRoles = ['IGL', 'AWP'].filter(role => state.players.filter(player => player.role === role).length >= 2);
        container.innerHTML = `${duplicateRoles.length ? `<div class="role-penalty-warning"><b>Конфлікт ролей</b><span>${duplicateRoles.join(' та ')}: кожен гравець цієї ролі отримує −5 ефективного Rating у матчах.</span></div>` : ''}<div class="squad-role-grid">${players.map(({ player, index }) => { const form = player.form || 0; const penalty = uiRolePenalty(state.players, player); return `<button class="squad-role-player ${penalty ? 'role-penalized' : ''}" onclick="openUiPlayerProfile(${index})"><span class="role-code">${escapeLiveText(player.role)}</span><div><b>${escapeLiveText(player.name)}</b><small>${penalty ? 'Конфлікт ролі · −5 Rating' : form > 1 ? 'Відмінна форма' : form > 0 ? 'Добра форма' : form < -1 ? 'Слабка форма' : 'Нейтральна форма'}</small></div><strong>${uiEffectiveSkill(state.players, player)}</strong><i class="form-indicator ${form > 0 ? 'good' : form < 0 ? 'bad' : ''}">${penalty ? `База ${player.skill}` : `${form >= 0 ? '+' : ''}${form}`}</i></button>`; }).join('')}</div>`;
        document.querySelectorAll('.career-badges span').forEach(badge => { if (badge.textContent.includes('років')) badge.remove(); });
    }

    function uiRenderTrainingWeek() {
        const panel = document.getElementById('career-training-panel');
        if (!panel || !panel.querySelector('.training-balance')) return;
        let calendar = document.getElementById('training-week-calendar');
        if (!calendar) {
            calendar = document.createElement('div');
            calendar.id = 'training-week-calendar';
            calendar.className = 'training-week-calendar';
            const balance = panel.querySelector('.training-balance');
            balance?.insertAdjacentElement('afterend', calendar);
        }
        const preset = state.trainingPreset || 'balanced';
        const schedules = {
            balanced: ['Aim', 'Тактика', 'Карти', 'Відновлення', 'Підготовка'],
            aim: ['Aim', 'Aim', 'Дуелі', 'Відновлення', 'Aim'],
            tactics: ['Демо', 'Тактика', 'Карти', 'Тактика', 'Відновлення'],
            recovery: ['Відпочинок', 'Психолог', 'Легка сесія', 'Відпочинок', 'Командна зустріч']
        };
        const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ'];
        calendar.innerHTML = (schedules[preset] || schedules.balanced).map((item, index) => `<span><small>${days[index]}</small><b>${item}</b></span>`).join('');
    }

    function uiRenderTransferTools() {
        const panel = document.querySelector('.transfer-search-panel');
        if (!panel) return;
        let bar = document.getElementById('transfer-view-toolbar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'transfer-view-toolbar';
            bar.className = 'transfer-view-toolbar';
            panel.querySelector('.transfer-search-summary')?.insertAdjacentElement('beforebegin', bar);
        }
        bar.innerHTML = `<span><b>Ринок гравців</b><small>Сортуйте результати й відкривайте переговори</small></span><button onclick="toggleTransferShortlist()">Список спостереження <i>${state.transferShortlist.length}</i></button>`;
        document.querySelectorAll('.transfer-search-card').forEach(card => {
            card.classList.add('compact-transfer-row');
            const title = card.querySelector('.transfer-search-title b')?.textContent.trim();
            const team = card.querySelector('.transfer-search-tags span')?.textContent.trim();
            if (!title || card.querySelector('.shortlist-button')) return;
            const active = state.transferShortlist.some(item => item.player === title && item.team === team);
            card.insertAdjacentHTML('beforeend', `<button class="shortlist-button ${active ? 'active' : ''}" onclick="event.stopPropagation(); toggleShortlistPlayer('${encodeURIComponent(title)}','${encodeURIComponent(team || '')}')">${active ? 'Відстежується' : 'Стежити'}</button>`);
        });
    }

    function uiRenderWorldTools() {
        const ratingPanel = document.getElementById('rating-table-container')?.parentElement;
        if (!ratingPanel || document.getElementById('world-tier-filter')) return;
        const filters = document.createElement('div');
        filters.id = 'world-tier-filter';
        filters.className = 'world-tier-filter';
        filters.innerHTML = `<button class="active" onclick="filterWorldRating('all',this)">Усі</button><button onclick="filterWorldRating('tier1',this)">Tier 1</button><button onclick="filterWorldRating('tier2',this)">Tier 2</button><button onclick="filterWorldRating('tier3',this)">Tier 3</button>`;
        ratingPanel.querySelector('h3')?.insertAdjacentElement('afterend', filters);
    }

    function uiMatchProbability() {
        const enemy = getTeamByName(state.currentEnemy?.name);
        if (!enemy) return 0.5;
        const likelyMap = enemy.mapFocus || officialMaps.find(map => map !== enemy.weakMap) || officialMaps[0];
        const ownPower = typeof window.getUserCompetitivePower === 'function' ? window.getUserCompetitivePower(likelyMap) : window.getEffectiveRosterSkill(state.players);
        const enemyPower = typeof window.getCompetitiveTeamPower === 'function' ? window.getCompetitiveTeamPower(enemy, likelyMap) : window.getEffectiveRosterSkill(enemy.players || []);
        const probability = typeof window.calculatePowerWinChance === 'function'
            ? window.calculatePowerWinChance(ownPower, enemyPower, 25, 0.16, 0.84)
            : 1 / (1 + Math.pow(10, (enemyPower - ownPower) / 28));
        return Math.max(0.16, Math.min(0.84, probability));
    }

    function uiDecimalOdds(probability) {
        return Math.max(1.05, 1 / Math.max(0.01, probability * 1.06)).toFixed(2);
    }

    function uiOddsHtml(probability, compact = false) {
        const enemy = getTeamByName(state.currentEnemy?.name);
        const ownOdds = uiDecimalOdds(probability);
        const enemyOdds = uiDecimalOdds(1 - probability);
        return `<span class="odds-title"><small>CS2 ODDS</small><b>${compact ? 'LIVE' : 'BO3'}</b></span><span class="odds-team own"><small>${escapeLiveText(state.userTeamTag || state.userTeamFullName)}</small><b>${ownOdds}</b></span><i>${Math.round(probability * 100)}%</i><span class="odds-team"><small>${escapeLiveText(enemy?.name || state.currentEnemy?.name || 'Суперник')}</small><b>${enemyOdds}</b></span>`;
    }

    function uiRenderMatchOdds() {
        const versus = document.querySelector('.next-match-panel .next-match-versus');
        if (versus) {
            let preMatchOdds = document.getElementById('pre-match-odds');
            if (!preMatchOdds) {
                preMatchOdds = document.createElement('div');
                preMatchOdds.id = 'pre-match-odds';
                preMatchOdds.className = 'bookmaker-odds';
                versus.insertAdjacentElement('afterend', preMatchOdds);
            }
            preMatchOdds.innerHTML = uiOddsHtml(uiMatchProbability());
        }
        const probabilityBar = document.getElementById('live-win-probability');
        if (!probabilityBar) return;
        const roundScore = (document.getElementById('live-score')?.textContent || '0:0').match(/(\d+)\s*:\s*(\d+)/);
        const seriesScore = (document.getElementById('live-series-score')?.textContent || '0-0').match(/(\d+)\s*-\s*(\d+)/);
        const roundDelta = Number(roundScore?.[1] || 0) - Number(roundScore?.[2] || 0);
        const seriesDelta = Number(seriesScore?.[1] || 0) - Number(seriesScore?.[2] || 0);
        const liveProbability = Math.max(0.08, Math.min(0.92, uiMatchProbability() + roundDelta * 0.022 + seriesDelta * 0.12));
        let liveOdds = document.getElementById('live-match-odds');
        if (!liveOdds) {
            liveOdds = document.createElement('div');
            liveOdds.id = 'live-match-odds';
            liveOdds.className = 'bookmaker-odds live-bookmaker-odds';
            probabilityBar.insertAdjacentElement('afterend', liveOdds);
        }
        liveOdds.innerHTML = uiOddsHtml(liveProbability, true);
    }

    function uiRenderMatchProbability() {
        const board = document.querySelector('#match-screen .score-board');
        if (!board) return;
        let probability = document.getElementById('live-win-probability');
        if (!probability) {
            probability = document.createElement('div');
            probability.id = 'live-win-probability';
            probability.className = 'live-win-probability';
            board.insertAdjacentElement('afterend', probability);
        }
        const score = (document.getElementById('live-score')?.textContent || '0:0').match(/(\d+)\s*:\s*(\d+)/);
        const own = Number(score?.[1] || 0); const enemy = Number(score?.[2] || 0);
        const chance = Math.max(8, Math.min(92, Math.round((uiMatchProbability() + (own - enemy) * 0.022) * 100)));
        probability.innerHTML = `<span><small>ШАНС НА ПЕРЕМОГУ</small><b>${chance}%</b></span><div><i style="width:${chance}%"></i></div>`;
    }

    function uiDecorateOpponentRolePenalty() {
        const team = getTeamByName(state.currentEnemy?.name);
        const lineup = document.querySelector('#opponent-report-panel .opponent-lineup');
        if (!team || !lineup) return;
        const duplicateRoles = ['IGL', 'AWP'].filter(role => team.players.filter(player => player.role === role).length >= 2);
        lineup.querySelectorAll('span').forEach((row, index) => {
            const player = team.players[index];
            const penalty = uiRolePenalty(team.players, player);
            row.classList.toggle('role-penalized', Boolean(penalty));
            if (penalty) {
                const details = row.querySelector('em');
                if (details) details.textContent = `${player.role} · ${uiEffectiveSkill(team.players, player)} (−5)`;
            }
        });
        let warning = document.getElementById('opponent-role-penalty');
        if (!duplicateRoles.length) {
            warning?.remove();
            return;
        }
        if (!warning) {
            warning = document.createElement('div');
            warning.id = 'opponent-role-penalty';
            warning.className = 'role-penalty-warning opponent-role-penalty';
            lineup.insertAdjacentElement('beforebegin', warning);
        }
        warning.innerHTML = `<b>Конфлікт ролей суперника</b><span>${duplicateRoles.join(' та ')}: відповідні гравці мають −5 до ефективного Rating.</span>`;
    }

    function uiRenderAll() {
        if (!state?.userTeamFullName) return;
        uiEnsureState(); uiEnsureShell(); uiRenderResourceBar(); uiRenderHub(); uiRenderRoster(); uiRenderTrainingWeek(); uiRenderTransferTools(); uiRenderWorldTools(); uiRenderMatchProbability(); uiRenderMatchOdds(); uiDecorateOpponentRolePenalty(); uiRenderInbox();
    }

    window.openUiPlayerProfile = function (index) {
        const player = state.players[index];
        if (!player) return;
        const stats = player.stats || {};
        const kd = (Number(stats.kills || 0) / Math.max(1, Number(stats.deaths || 0))).toFixed(2);
        document.getElementById('player-profile-title').textContent = player.name;
        const rolePenalty = uiRolePenalty(state.players, player);
        document.getElementById('player-profile-body').innerHTML = `<div class="player-profile-hero ${rolePenalty ? 'role-penalized' : ''}"><span>${escapeLiveText(player.role)}</span><strong>${uiEffectiveSkill(state.players, player)}</strong><div><b>${escapeLiveText(player.name)}</b><small>${rolePenalty ? `Базовий Rating ${player.skill} · конфлікт ролі −5` : `Форма ${player.form >= 0 ? '+' : ''}${player.form || 0} · мораль ${Math.round(player.career?.morale || 60)}`}</small></div></div><div class="player-profile-metrics"><span><small>МАТЧІ</small><b>${stats.matches || 0}</b></span><span><small>K/D</small><b>${kd}</b></span><span><small>RATING</small><b>${Number(stats.rating || 1).toFixed(2)}</b></span><span><small>MVP</small><b>${stats.mvps || 0}</b></span><span><small>ЦІНА</small><b>$${getTransferPrice(player, 1)}</b></span></div><div class="player-development-card"><span><b>Розвиток Rating</b><small>${player.skill >= 100 ? 'Досягнуто максимум' : `${player.developmentXp || 0}/100 XP до наступного Rating`}</small></span><div><i style="width:${player.skill >= 100 ? 100 : player.developmentXp || 0}%"></i></div></div><div class="player-profile-detail"><span><small>Характер</small><b>${escapeLiveText(player.career?.personality || 'Командний')}</b></span><span><small>Позиція</small><b>${escapeLiveText(player.career?.favoritePosition || player.role)}</b></span><span><small>Улюблені карти</small><b>${escapeLiveText((player.career?.favoriteMaps || []).join(', ') || '-')}</b></span><span><small>Тренувальний план</small><b>${escapeLiveText(player.trainingPlan || 'balanced')}</b></span></div>`;
        document.getElementById('player-profile-modal').style.display = 'flex';
    };
    window.closeUiPlayerProfile = function () { document.getElementById('player-profile-modal').style.display = 'none'; };
    window.openCareerInbox = function () { document.getElementById('career-inbox-modal').style.display = 'flex'; state.uiNotifications.forEach(item => item.read = true); uiRenderInbox(); autoSave('inbox-read'); };
    window.closeCareerInbox = function () { document.getElementById('career-inbox-modal').style.display = 'none'; };
    function uiRenderInbox() { const list = document.getElementById('career-inbox-list'); if (!list) return; const unread = state.uiNotifications.filter(item => !item.read).length; const count = document.getElementById('career-inbox-count'); if (count) { count.textContent = unread; count.style.display = unread ? 'grid' : 'none'; } list.innerHTML = state.uiNotifications.length ? state.uiNotifications.map(item => `<article class="${item.read ? '' : 'unread'}"><span></span><div><b>${escapeLiveText(item.title)}</b><p>${escapeLiveText(item.text)}</p><small>Сезон ${item.season}</small></div></article>`).join('') : '<div class="inbox-empty">Нових повідомлень немає.</div>'; }
    window.toggleShortlistPlayer = function (playerEncoded, teamEncoded) { const player = decodeURIComponent(playerEncoded); const team = decodeURIComponent(teamEncoded); const index = state.transferShortlist.findIndex(item => item.player === player && item.team === team); if (index >= 0) state.transferShortlist.splice(index, 1); else state.transferShortlist.push({ player, team }); applyTransferSearch(); autoSave('transfer-shortlist'); };
    window.toggleTransferShortlist = function () { const only = !document.body.classList.contains('shortlist-only'); document.body.classList.toggle('shortlist-only', only); document.querySelectorAll('.transfer-search-card').forEach(card => { const name = card.querySelector('.transfer-search-title b')?.textContent.trim(); const team = card.querySelector('.transfer-search-tags span')?.textContent.trim(); card.style.display = !only || state.transferShortlist.some(item => item.player === name && item.team === team) ? '' : 'none'; }); };
    window.filterWorldRating = function (tier, button) { document.querySelectorAll('#world-tier-filter button').forEach(item => item.classList.toggle('active', item === button)); const sorted = [...teamsRating].sort((a,b) => b.points-a.points); document.querySelectorAll('.world-rating-row, .simple-rating-row').forEach((row,index) => { const team = sorted[index]; row.style.display = tier === 'all' || (team && getTeamTierKey(team.name) === tier) ? '' : 'none'; }); };

    const logBeforeInterface = logSystem;
    logSystem = function (message) { logBeforeInterface(message); if (state?.userTeamFullName) { uiEnsureState(); const text = uiStripHtml(message); state.uiNotifications.unshift({ id: Date.now() + Math.random(), title: text.split(':')[0].slice(0, 60) || 'Новина клубу', text, season: state.seasonNumber, read: false }); state.uiNotifications = state.uiNotifications.slice(0, 30); uiRenderInbox(); } };
    const updateBeforeInterface = updateUI;
    updateUI = function () { updateBeforeInterface(); uiRenderAll(); };
    const transferBeforeInterface = window.applyTransferSearch;
    window.applyTransferSearch = function () { const result = transferBeforeInterface(); uiRenderTransferTools(); return result; };
    const liveStatsBeforeInterface = renderLiveStatsBoard;
    renderLiveStatsBoard = function (...args) { const result = liveStatsBeforeInterface(...args); uiRenderMatchProbability(); uiRenderMatchOdds(); return result; };
    const teamSkillBeforeRolePenalty = getTeamSkill;
    getTeamSkill = function (...args) { return teamSkillBeforeRolePenalty(...args) - uiRosterPenalty(state.players); };
    const opponentPowerBeforeRolePenalty = getOpponentMapPower;
    getOpponentMapPower = function (team, ...args) { return opponentPowerBeforeRolePenalty(team, ...args) - uiRosterPenalty(team?.players || []); };
    const scoutBeforeRolePenalty = scoutTeam;
    scoutTeam = function (teamName) { const result = scoutBeforeRolePenalty(teamName); const team = getTeamByName(teamName); if (team) { const rows = document.querySelectorAll('.world-player-ratings > div'); rows.forEach((row, index) => { const player = team.players[index]; const penalty = uiRolePenalty(team.players, player); if (!penalty) return; const rating = row.querySelector('strong'); if (rating) rating.textContent = `Rating ${uiEffectiveSkill(team.players, player)} (−5)`; row.classList.add('role-penalized'); }); } return result; };
    const loadBeforeInterface = window.onload;
    window.onload = function (event) { if (typeof loadBeforeInterface === 'function') loadBeforeInterface.call(this, event); uiRenderAll(); };
})();
