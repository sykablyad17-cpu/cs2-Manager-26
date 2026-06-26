// Season circuit: six qualifiers, ESL Pro League and the Cologne Major.
(function () {
    'use strict';

    const CIRCUIT_VERSION = 2;
    const QUALIFIER_WAVES = [
        [
            { id: 'iem-usa-26', name: 'IEM USA 26', size: 16, swissRounds: 5, prizePool: 28000, points: { champion: 520, finalist: 360, semifinal: 230, quarterfinal: 140, swiss: 60 } },
            { id: 'blast-bounty-26', name: 'BLAST Bounty 26', size: 16, swissRounds: 5, prizePool: 20000, points: { champion: 420, finalist: 290, semifinal: 180, quarterfinal: 110, swiss: 45 } }
        ],
        [
            { id: 'iem-germany-26', name: 'IEM Germany 26', size: 16, swissRounds: 5, prizePool: 32000, points: { champion: 540, finalist: 375, semifinal: 240, quarterfinal: 150, swiss: 65 } },
            { id: 'blast-open-26', name: 'BLAST Open 26', size: 16, swissRounds: 5, prizePool: 22000, points: { champion: 440, finalist: 300, semifinal: 190, quarterfinal: 115, swiss: 50 } }
        ],
        [
            { id: 'starladder-26', name: 'StarLadder StarSeries 26', size: 16, swissRounds: 5, prizePool: 35000, points: { champion: 560, finalist: 390, semifinal: 250, quarterfinal: 155, swiss: 70 } },
            { id: 'xse-pro-league-26', name: 'XSE Pro League 26', size: 16, swissRounds: 5, prizePool: 24000, points: { champion: 460, finalist: 315, semifinal: 200, quarterfinal: 120, swiss: 55 } }
        ],
        [
            { id: 'iem-dallas-26', name: 'IEM Dallas 26', size: 16, swissRounds: 5, prizePool: 30000, points: { champion: 500, finalist: 340, semifinal: 220, quarterfinal: 135, swiss: 55 } },
            { id: 'cct-global-finals-26', name: 'CCT Global Finals 26', size: 16, swissRounds: 5, prizePool: 18000, points: { champion: 360, finalist: 245, semifinal: 160, quarterfinal: 95, swiss: 40 } }
        ],
        [
            { id: 'iem-rio-26', name: 'IEM Rio 26', size: 16, swissRounds: 5, prizePool: 31000, points: { champion: 515, finalist: 350, semifinal: 225, quarterfinal: 140, swiss: 58 } },
            { id: 'yalla-compass-26', name: 'YaLLa Compass 26', size: 16, swissRounds: 5, prizePool: 19000, points: { champion: 370, finalist: 255, semifinal: 165, quarterfinal: 100, swiss: 42 } }
        ],
        [
            { id: 'pgl-bucharest-26', name: 'PGL Bucharest 26', size: 16, swissRounds: 5, prizePool: 33000, points: { champion: 535, finalist: 370, semifinal: 235, quarterfinal: 145, swiss: 62 } },
            { id: 'thunderpick-26', name: 'Thunderpick World Cup 26', size: 16, swissRounds: 5, prizePool: 21000, points: { champion: 390, finalist: 270, semifinal: 175, quarterfinal: 105, swiss: 45 } }
        ]
    ];
    const ESL_CONFIG = { id: 'esl-pro-league-26', name: 'ESL Pro League 26', size: 24, swissRounds: 5, league: true, prizePool: 40000, points: {} };
    const MAJOR_CONFIG = { id: 'cologne-major-26', name: 'IEM Cologne Major 26', size: 16, swissRounds: 5, major: true, prizePool: 80000, points: {} };
    const STAGE_LABELS = { swiss: 'Швейцарський етап', quarterfinal: '1/4 фіналу', semifinal: '1/2 фіналу', final: 'Фінал', complete: 'Завершено' };

    function mcTeam(name) {
        return typeof getTeamByName === 'function'
            ? getTeamByName(name)
            : teamsRating.find(team => team.name === name);
    }

    let mcWorldCacheKey = '';
    let mcWorldCache = [];

    function mcSortedWorld() {
        const key = teamsRating.map(team => `${team.name}:${Math.round(team.points || 0)}`).join('|');
        if (key !== mcWorldCacheKey) {
            mcWorldCacheKey = key;
            mcWorldCache = [...teamsRating].sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
        }
        return [...mcWorldCache];
    }

    function mcStanding(name) {
        const team = mcTeam(name);
        return {
            name,
            wins: 0,
            losses: 0,
            mapDiff: 0,
            opponents: [],
            seedPoints: team?.points || 0,
            swissStatus: 'active',
            isPlayer: name === state.userTeamFullName
        };
    }

    function mcCreateEvent(config, participants) {
        return {
            id: config.id,
            name: config.name,
            config: { ...config },
            participants: [...participants],
            standings: participants.map(mcStanding),
            stage: 'swiss',
            swissRound: 0,
            pendingPairings: null,
            playoffTeams: [],
            placements: {},
            matches: [],
            playerStats: {},
            completed: false,
            mvp: null
        };
    }

    function mcCreateCircuit() {
        const points = {};
        teamsRating.forEach(team => { points[team.name] = 0; });
        return {
            version: CIRCUIT_VERSION,
            season: state.seasonNumber || 1,
            phase: 0,
            events: {},
            currentEventIds: [],
            activeEventId: null,
            majorPoints: points,
            teamEvents: {},
            eslInvites: [],
            majorInvites: [],
            tournamentMvps: [],
            playerBaselines: (state.players || []).reduce((result, player) => {
                result[player.name] = {
                    matches: player.stats?.matches || 0,
                    kills: player.stats?.kills || 0,
                    deaths: player.stats?.deaths || 0,
                    mvps: player.stats?.mvps || 0,
                    rating: Number(player.stats?.rating || 1),
                    skill: player.skill,
                    tournamentMvps: player.tournamentMvps || 0
                };
                return result;
            }, {}),
            initialized: false
        };
    }

    function mcEnsureCircuit() {
        if (!state.userTeamFullName || !Array.isArray(teamsRating) || teamsRating.length < 24) return null;
        if (!state.majorCircuit || state.majorCircuit.version !== CIRCUIT_VERSION) {
            state.majorCircuit = mcCreateCircuit();
        }
        const circuit = state.majorCircuit;
        teamsRating.forEach(team => {
            if (!Number.isFinite(circuit.majorPoints[team.name])) circuit.majorPoints[team.name] = 0;
        });
        state.majorSeasonHistory = Array.isArray(state.majorSeasonHistory) ? state.majorSeasonHistory : [];
        if (!circuit.initialized) {
            circuit.initialized = true;
            mcInitializePhase();
        }
        mcRepairCircuitState();
        return circuit;
    }

    function mcInitializePhase() {
        const circuit = state.majorCircuit;
        if (!circuit) return;
        circuit.currentEventIds = [];
        circuit.activeEventId = null;
        const ranked = mcSortedWorld().map(team => team.name);

        if (circuit.phase < QUALIFIER_WAVES.length) {
            const configs = QUALIFIER_WAVES[circuit.phase];
            let seedOffset = 0;
            const groups = configs.map(config => {
                const group = ranked.slice(seedOffset, seedOffset + config.size);
                seedOffset += config.size;
                return group;
            });
            configs.forEach((config, index) => {
                const event = mcCreateEvent(config, groups[index]);
                circuit.events[event.id] = event;
                circuit.currentEventIds.push(event.id);
                if (event.participants.includes(state.userTeamFullName)) circuit.activeEventId = event.id;
            });
            if (typeof window.onMajorCircuitPhaseStarted === 'function') window.onMajorCircuitPhaseStarted(circuit.phase, circuit.currentEventIds);
            mcLog(`Розпочато одночасно <b>${configs[0].name}</b> та <b>${configs[1].name}</b>.`);
            mcPrepareNextOpponent();
            return;
        }

        if (circuit.phase === QUALIFIER_WAVES.length) {
            circuit.eslInvites = mcMajorPointRanking().slice(0, 24).map(row => row.name);
            const event = mcCreateEvent(ESL_CONFIG, circuit.eslInvites);
            circuit.events[event.id] = event;
            circuit.currentEventIds = [event.id];
            if (typeof window.onMajorCircuitPhaseStarted === 'function') window.onMajorCircuitPhaseStarted(circuit.phase, circuit.currentEventIds);
            if (event.participants.includes(state.userTeamFullName)) {
                circuit.activeEventId = event.id;
                mcLog(`<b>${state.userTeamFullName}</b> отримує запрошення на ESL Pro League 26.`);
                mcPrepareNextOpponent();
            } else {
                mcApplyWorldPenalty(state.userTeamFullName, 100, 'не потрапила до ESL Pro League 26');
                mcSimulateEventToEnd(event);
                circuit.majorInvites = mcRankEvent(event).slice(0, 16).map(row => row.name);
                circuit.phase = QUALIFIER_WAVES.length + 1;
                mcInitializePhase();
            }
            return;
        }

        if (circuit.phase === QUALIFIER_WAVES.length + 1) {
            const invites = circuit.majorInvites.length ? circuit.majorInvites : [];
            const event = mcCreateEvent(MAJOR_CONFIG, invites);
            circuit.events[event.id] = event;
            circuit.currentEventIds = [event.id];
            if (typeof window.onMajorCircuitPhaseStarted === 'function') window.onMajorCircuitPhaseStarted(circuit.phase, circuit.currentEventIds);
            if (event.participants.includes(state.userTeamFullName)) {
                circuit.activeEventId = event.id;
                mcLog(`<b>${state.userTeamFullName}</b> кваліфікувалася на IEM Cologne Major 26.`);
                mcPrepareNextOpponent();
            } else {
                mcApplyWorldPenalty(state.userTeamFullName, 55, 'не кваліфікувалася на IEM Cologne Major 26');
                mcSimulateEventToEnd(event);
                mcFinishSeason();
            }
        }
    }

    function mcMajorPointRanking() {
        const circuit = state.majorCircuit;
        return mcSortedWorld().map(team => ({
            name: team.name,
            points: circuit.majorPoints[team.name] || 0,
            worldPoints: team.points,
            isPlayer: team.name === state.userTeamFullName
        })).sort((a, b) => b.points - a.points || b.worldPoints - a.worldPoints || a.name.localeCompare(b.name));
    }

    function mcRankEvent(event) {
        return [...event.standings].sort((a, b) =>
            b.wins - a.wins || a.losses - b.losses || b.mapDiff - a.mapDiff || b.seedPoints - a.seedPoints || a.name.localeCompare(b.name)
        );
    }

    function mcPairSwiss(event) {
        const activeRows = mcRankEvent(event).filter(row => row.swissStatus !== 'qualified' && row.swissStatus !== 'eliminated');
        const pairings = [];

        const canPair = (a, b) => !!a && !!b && !a.opponents.includes(b.name) && !b.opponents.includes(a.name);
        const solvePairs = rows => {
            if (!rows.length) return [];
            const [first, ...rest] = rows;
            for (let index = 0; index < rest.length; index++) {
                const candidate = rest[index];
                if (!canPair(first, candidate)) continue;
                const remaining = rest.filter((_, itemIndex) => itemIndex !== index);
                const solved = solvePairs(remaining);
                if (solved) return [[first.name, candidate.name], ...solved];
            }
            return null;
        };

        const grouped = activeRows.reduce((result, row) => {
            const key = `${row.wins}-${row.losses}`;
            result[key] = result[key] || [];
            result[key].push(row);
            return result;
        }, {});

        const groupKeys = Object.keys(grouped).sort((a, b) => {
            const [aw, al] = a.split('-').map(Number);
            const [bw, bl] = b.split('-').map(Number);
            return bw - aw || al - bl;
        });

        let floater = null;
        groupKeys.forEach(key => {
            const group = [...grouped[key]];
            if (floater) group.unshift(floater);
            floater = null;

            if (group.length % 2 === 1) floater = group.pop();
            let solved = solvePairs(group);

            if (!solved && group.length > 2) {
                floater = group.pop();
                solved = solvePairs(group);
            }

            if (solved) pairings.push(...solved);
            else {
                while (group.length > 1) {
                    const first = group.shift();
                    const opponentIndex = group.findIndex(candidate => canPair(first, candidate));
                    if (opponentIndex < 0) {
                        floater = floater || first;
                        continue;
                    }
                    pairings.push([first.name, group.splice(opponentIndex, 1)[0].name]);
                }
                if (group.length) floater = floater || group[0];
            }
        });

        if (floater) {
            const existingTeams = new Set(pairings.flat());
            const opponent = activeRows.find(row => row.name !== floater.name && !existingTeams.has(row.name) && canPair(floater, row));
            if (opponent) pairings.push([floater.name, opponent.name]);
            else pairings.push([floater.name, null]);
        }

        return pairings;
    }

    function mcPlayoffPairs(teams) {
        if (teams.length === 8) return [[teams[0], teams[7]], [teams[3], teams[4]], [teams[1], teams[6]], [teams[2], teams[5]]];
        if (teams.length === 4) return [[teams[0], teams[1]], [teams[2], teams[3]]];
        if (teams.length === 2) return [[teams[0], teams[1]]];
        return [];
    }

    function mcEnsurePairings(event) {
        if (event.stage === 'swiss' && event.pendingPairings) {
            const rows = new Map(event.standings.map(row => [row.name, row]));
            const valid = event.pendingPairings.every(pair => {
                const rowA = rows.get(pair[0]);
                const rowB = rows.get(pair[1]);
                if (!rowA || rowA.swissStatus !== 'active') return false;
                if (!pair[1]) return true;
                if (!rowB || rowB.swissStatus !== 'active') return false;
                if (rowA.wins !== rowB.wins || rowA.losses !== rowB.losses) return false;
                return !rowA.opponents.includes(rowB.name) && !rowB.opponents.includes(rowA.name);
            });
            if (!valid) event.pendingPairings = null;
        }
        if (event.pendingPairings) return event.pendingPairings;
        event.pendingPairings = event.stage === 'swiss'
            ? mcPairSwiss(event)
            : mcPlayoffPairs(event.playoffTeams);
        return event.pendingPairings;
    }

    function mcRepairCircuitState() {
        const circuit = state.majorCircuit;
        if (!circuit || circuit.__repairing) return;
        circuit.__repairing = true;
        try {
            circuit.currentEventIds = (circuit.currentEventIds || []).filter(id => circuit.events?.[id]);
            const activeEvent = circuit.events?.[circuit.activeEventId];
            if (activeEvent?.completed) circuit.activeEventId = null;
            if (circuit.eliminationRun) {
                const runEvent = circuit.events?.[circuit.eliminationRun.eventId];
                if (!runEvent || runEvent.completed) circuit.eliminationRun = null;
            }
            Object.values(circuit.events || {}).forEach(event => {
                if (!event) return;
                event.standings = Array.isArray(event.standings) ? event.standings : [];
                event.matches = Array.isArray(event.matches) ? event.matches : [];
                event.playoffTeams = Array.isArray(event.playoffTeams) ? event.playoffTeams : [];
                event.placements = event.placements || {};
                if (event.stage === 'swiss') {
                    event.standings.forEach(row => {
                        row.opponents = Array.isArray(row.opponents) ? row.opponents : [];
                        row.swissStatus = row.swissStatus || 'active';
                        if (row.swissStatus === 'active' && row.wins >= 3) row.swissStatus = 'qualified';
                        if (row.swissStatus === 'active' && row.losses >= 3) row.swissStatus = 'eliminated';
                    });
                    if (event.pendingPairings) {
                        const rows = new Map(event.standings.map(row => [row.name, row]));
                        const valid = event.pendingPairings.every(pair => {
                            const rowA = rows.get(pair?.[0]);
                            const rowB = rows.get(pair?.[1]);
                            if (!rowA || rowA.swissStatus !== 'active') return false;
                            if (!pair?.[1]) return true;
                            if (!rowB || rowB.swissStatus !== 'active') return false;
                            if (rowA.wins !== rowB.wins || rowA.losses !== rowB.losses) return false;
                            return !rowA.opponents.includes(rowB.name) && !rowB.opponents.includes(rowA.name);
                        });
                        if (!valid) event.pendingPairings = null;
                    }
                }
            });
        } finally {
            circuit.__repairing = false;
        }
    }

    function mcGetPlayerTournamentAction() {
        const circuit = state.majorCircuit;
        if (!circuit) return { type: 'none' };
        if (circuit.eliminationRun) {
            const event = circuit.events?.[circuit.eliminationRun.eventId];
            return event && !event.completed
                ? { type: circuit.eliminationRun.waitFor === 'playoff' ? 'simulate-to-playoff' : 'simulate-event', event }
                : { type: 'repair' };
        }
        const event = circuit.events?.[circuit.activeEventId];
        if (!event || event.completed) return { type: 'none' };
        if (event.stage === 'swiss') {
            const row = event.standings.find(item => item.name === state.userTeamFullName);
            if (row?.swissStatus === 'qualified') return { type: 'simulate-to-playoff', event };
            if (row?.swissStatus === 'eliminated') return { type: 'simulate-event', event };
        }
        const pair = mcEnsurePairings(event).find(item => item.includes(state.userTeamFullName));
        return pair ? { type: 'play-match', event, pair } : { type: 'simulate-event', event };
    }

    function mcSimulateMatch(teamAName, teamBName, bestOf = 3) {
        const teamA = mcTeam(teamAName);
        const teamB = mcTeam(teamBName);
        if (bestOf === 5 && teamA && teamB) {
            let scoreA = 0;
            let scoreB = 0;
            const maps = [];
            const used = new Set();
            while (scoreA < 3 && scoreB < 3) {
                const candidates = officialMaps.filter(map => !used.has(map));
                const mapName = candidates[Math.floor(Math.random() * candidates.length)] || officialMaps[maps.length % officialMaps.length];
                used.add(mapName);
                const chance = typeof calculateMapWinChance === 'function' ? calculateMapWinChance(teamA, teamB, mapName) : 0.5;
                const aWon = Math.random() < chance;
                if (aWon) scoreA++; else scoreB++;
                const rounds = typeof createRoundScore === 'function' ? createRoundScore(aWon) : (aWon ? [13, 9] : [9, 13]);
                maps.push({ map: mapName, teamARounds: rounds[0], teamBRounds: rounds[1], winner: aWon ? teamAName : teamBName });
            }
            return { teamA: teamAName, teamB: teamBName, scoreA, scoreB, maps };
        }
        if (teamA && teamB && typeof simulateDetailedBo3 === 'function') {
            const result = simulateDetailedBo3(teamA, teamB);
            return { teamA: teamAName, teamB: teamBName, scoreA: result.scoreA, scoreB: result.scoreB, maps: result.details || [] };
        }
        const powerA = teamA?.players ? (typeof getEffectiveRosterSkill === 'function' ? getEffectiveRosterSkill(teamA.players) * teamA.players.length : teamA.players.reduce((sum, player) => sum + player.skill + (player.form || 0), 0)) : 350;
        const powerB = teamB?.players ? (typeof getEffectiveRosterSkill === 'function' ? getEffectiveRosterSkill(teamB.players) * teamB.players.length : teamB.players.reduce((sum, player) => sum + player.skill + (player.form || 0), 0)) : 350;
        const aWins = Math.random() < Math.max(0.2, Math.min(0.8, powerA / (powerA + powerB)));
        return { teamA: teamAName, teamB: teamBName, scoreA: aWins ? 2 : Math.random() < 0.55 ? 1 : 0, scoreB: aWins ? (Math.random() < 0.55 ? 1 : 0) : 2, maps: [] };
    }

    function mcApplyMatch(event, result, stage) {
        const aWon = result.scoreA > result.scoreB;
        const winner = aWon ? result.teamA : result.teamB;
        const loser = aWon ? result.teamB : result.teamA;
        const rowA = event.standings.find(row => row.name === result.teamA);
        const rowB = event.standings.find(row => row.name === result.teamB);
        if (rowA && rowB) {
            rowA.opponents.push(rowB.name);
            rowB.opponents.push(rowA.name);
            rowA.mapDiff += result.scoreA - result.scoreB;
            rowB.mapDiff += result.scoreB - result.scoreA;
            if (aWon) { rowA.wins++; rowB.losses++; } else { rowB.wins++; rowA.losses++; }
        }
        mcRecordEventPlayerStats(event, result, winner);
        event.matches.push({ ...result, stage, round: event.swissRound + 1 });
        mcUpdateWorldAfterMatch(winner, loser, result);
        mcAddCalendarMatch(event, result, stage);
        return { winner, loser };
    }

    function mcSwissQualificationCutoff(event) {
        if (event.config.league) return 16;
        return 8;
    }

    function mcApplySwissStatuses(event) {
        const cutoff = mcSwissQualificationCutoff(event);
        mcRankEvent(event).forEach(row => {
            if (row.swissStatus !== 'active') return;
            const qualified = event.standings.filter(item => item.swissStatus === 'qualified').length;
            if (row.wins >= 3 && qualified < cutoff) row.swissStatus = 'qualified';
            else if (row.losses >= 3) row.swissStatus = 'eliminated';
        });
    }

    function mcShouldCompleteSwiss(event) {
        const cutoff = mcSwissQualificationCutoff(event);
        const qualified = event.standings.filter(row => row.swissStatus === 'qualified').length;
        const active = event.standings.filter(row => row.swissStatus === 'active').length;
        return qualified >= cutoff || active <= 1 || event.swissRound >= event.config.swissRounds;
    }

    function mcRecordEventPlayerStats(event, result, winnerName) {
        event.playerStats = event.playerStats || {};
        const mapCount = Math.max(2, Number(result.scoreA || 0) + Number(result.scoreB || 0));
        const detailedRounds = (result.maps || []).reduce((sum, map) => sum + Number(map.teamARounds || 0) + Number(map.teamBRounds || 0), 0);
        const rounds = detailedRounds || mapCount * 21;
        const matchRows = [];
        [result.teamA, result.teamB].forEach(teamName => {
            const team = mcTeam(teamName);
            const won = teamName === winnerName;
            (team?.players || []).forEach(player => {
                const key = `${teamName}::${player.name}`;
                const skill = typeof getRoleDuplicationPenalty === 'function'
                    ? player.skill - getRoleDuplicationPenalty(team.players, player)
                    : player.skill;
                const rating = Math.max(0.55, Math.min(1.85,
                    0.73 + (skill - 65) / 70 + (player.form || 0) / 90 + (won ? 0.1 : -0.04) + (Math.random() - 0.5) * 0.18
                ));
                const kills = Math.max(5, Math.round(rounds * Math.max(0.42, Math.min(0.86, 0.43 + rating * 0.18))));
                const deaths = Math.max(5, Math.round(rounds * Math.max(0.42, Math.min(0.78, 0.73 - rating * 0.11))));
                const row = event.playerStats[key] || { name: player.name, team: teamName, role: player.role, matches: 0, kills: 0, deaths: 0, ratingTotal: 0, mvps: 0 };
                row.matches++;
                row.kills += kills;
                row.deaths += deaths;
                row.ratingTotal += rating;
                row.lastRating = rating;
                event.playerStats[key] = row;
                if (teamName !== state.userTeamFullName) {
                    player.stats = { matches: 0, kills: 0, deaths: 0, rating: 1, mvps: 0, ...(player.stats || {}) };
                    const previousMatches = player.stats.matches;
                    player.stats.matches++;
                    player.stats.kills += kills;
                    player.stats.deaths += deaths;
                    player.stats.rating = Number(((Number(player.stats.rating || 1) * previousMatches + rating) / player.stats.matches).toFixed(2));
                    player.form = Math.max(-5, Math.min(5, (player.form || 0) + (won ? (Math.random() < 0.55 ? 1 : 0) : (Math.random() < 0.55 ? -1 : 0))));
                    if (typeof window.addPlayerLevelProgress === 'function') window.addPlayerLevelProgress(player, won ? 8 : -8);
                }
                matchRows.push({ row, player, teamName });
            });
        });
        const matchMvp = matchRows.sort((a, b) => b.row.lastRating - a.row.lastRating)[0];
        if (matchMvp) {
            matchMvp.row.mvps++;
            if (matchMvp.teamName !== state.userTeamFullName) matchMvp.player.stats.mvps++;
        }
    }

    function mcEventPlayerRanking(event) {
        return Object.values(event.playerStats || {}).map(row => ({
            ...row,
            kd: Number((row.kills / Math.max(1, row.deaths)).toFixed(2)),
            rating: Number((row.ratingTotal / Math.max(1, row.matches)).toFixed(2))
        })).sort((a, b) => b.rating - a.rating || b.kd - a.kd || b.mvps - a.mvps || a.name.localeCompare(b.name));
    }

    function mcEventLeadersHtml(event) {
        const leaders = mcEventPlayerRanking(event).slice(0, 5);
        return `<div class="major-live-players"><div class="major-live-players-title"><span><small>LIVE СТАТИСТИКА</small><b>Найкращі гравці турніру</b></span><em>${event.matches.length} матчів зіграно</em></div>${leaders.length ? `<div class="major-live-player-head"><span>#</span><span>Гравець</span><span>Матчі</span><span>K/D</span><span>Rating</span><span>MVP</span></div>${leaders.map((player, index) => `<div class="major-live-player-row"><i>${index + 1}</i><span><b>${escapeLiveText(player.name)}</b><small>${escapeLiveText(player.team)} · ${escapeLiveText(player.role)}</small></span><em>${player.matches}</em><em>${player.kd}</em><strong>${player.rating}</strong><em>${player.mvps}</em></div>`).join('')}` : '<p>Статистика зʼявиться після завершення першого туру.</p>'}</div>`;
    }

    function mcUpdateWorldAfterMatch(winnerName, loserName, result) {
        const winner = mcTeam(winnerName);
        const loser = mcTeam(loserName);
        if (winner) {
            winner.chemistry = Math.min(100, (winner.chemistry || 70) + 1);
            if (typeof addRecentResult === 'function') addRecentResult(winner, true);
            winner.matchesPlayed = (winner.matchesPlayed || 0) + 1;
            winner.matchWins = (winner.matchWins || 0) + 1;
        }
        if (loser) {
            loser.chemistry = Math.max(45, (loser.chemistry || 70) - 1);
            if (typeof addRecentResult === 'function') addRecentResult(loser, false);
            loser.matchesPlayed = (loser.matchesPlayed || 0) + 1;
        }
        (result?.maps || []).forEach(map => {
            if (winner?.name !== state.userTeamFullName && typeof updateTeamMapDevelopment === 'function') updateTeamMapDevelopment(winner, map.map, map.winner === winner.name);
            if (loser?.name !== state.userTeamFullName && typeof updateTeamMapDevelopment === 'function') updateTeamMapDevelopment(loser, map.map, map.winner === loser.name);
        });
    }

    function mcAddCalendarMatch(event, result, stage) {
        state.calendar = Array.isArray(state.calendar) ? state.calendar : [];
        state.calendar.unshift({
            id: Date.now() + Math.floor(Math.random() * 100000),
            season: state.seasonNumber,
            week: state.matchWeek || 1,
            tier: event.name,
            stage: STAGE_LABELS[stage] || stage,
            teamA: result.teamA,
            teamB: result.teamB,
            scoreA: result.scoreA,
            scoreB: result.scoreB,
            score: `${result.scoreA}-${result.scoreB}`,
            maps: result.maps || [],
            isPlayer: result.teamA === state.userTeamFullName || result.teamB === state.userTeamFullName
        });
        state.calendar = state.calendar.slice(0, 180);
    }

    function mcApplyGroupWorldPoints(event) {
        if (event.groupWorldAwarded) return;
        event.groupWorldAwarded = true;
        mcRankEvent(event).forEach((row, index) => {
            const team = mcTeam(row.name);
            if (!team) return;
            const qualified = row.swissStatus === 'qualified' || event.playoffTeams.includes(row.name) || event.placements[row.name] === 'qualified';
            const base = event.config.league ? (qualified ? 24 : -18) : (qualified ? 18 : -12);
            const recordBonus = row.wins * 3 - row.losses * 2 + Math.max(-4, Math.min(8, row.mapDiff));
            const seedBonus = Math.max(0, 6 - index);
            team.points = Math.max(0, Math.round(team.points + base + recordBonus + seedBonus));
        });
    }

    function mcCompleteSwiss(event) {
        const ranked = mcRankEvent(event);
        if (event.config.league) {
            ranked.slice(0, 16).forEach(row => { row.swissStatus = 'qualified'; event.placements[row.name] = 'qualified'; });
            ranked.slice(16).forEach(row => { row.swissStatus = 'eliminated'; event.placements[row.name] = 'league'; });
            mcApplyGroupWorldPoints(event);
            event.stage = 'complete';
            event.completed = true;
            mcAwardEvent(event);
            return;
        }
        event.playoffTeams = ranked.slice(0, 8).map(row => {
            row.swissStatus = 'qualified';
            return row.name;
        });
        ranked.slice(8).forEach(row => { row.swissStatus = 'eliminated'; event.placements[row.name] = 'swiss'; });
        mcApplyGroupWorldPoints(event);
        event.stage = 'quarterfinal';
        event.pendingPairings = null;
    }

    function mcAdvancePlayoffStage(event, winners, losers) {
        const placement = event.stage === 'quarterfinal' ? 'quarterfinal' : event.stage === 'semifinal' ? 'semifinal' : 'finalist';
        losers.forEach(name => { event.placements[name] = placement; });
        if (event.stage === 'final') {
            event.placements[winners[0]] = 'champion';
            event.stage = 'complete';
            event.completed = true;
            event.playoffTeams = [];
            event.pendingPairings = null;
            mcAwardEvent(event);
            return;
        }
        event.playoffTeams = winners;
        event.stage = event.stage === 'quarterfinal' ? 'semifinal' : 'final';
        event.pendingPairings = null;
    }

    function mcSimulateEventStep(event) {
        if (!event || event.completed) return;
        const pairings = mcEnsurePairings(event);
        const winners = [];
        const losers = [];
        pairings.forEach(pair => {
            if (!pair[1]) {
                const row = event.standings.find(item => item.name === pair[0]);
                if (row) {
                    row.wins++;
                    row.mapDiff += 2;
                    event.matches.push({ teamA: pair[0], teamB: 'BYE', scoreA: 2, scoreB: 0, maps: [], stage: event.stage, round: event.swissRound + 1, bye: true });
                }
                winners.push(pair[0]);
                return;
            }
            const outcome = mcApplyMatch(event, mcSimulateMatch(pair[0], pair[1], event.stage === 'final' ? 5 : 3), event.stage);
            winners.push(outcome.winner);
            losers.push(outcome.loser);
        });
        event.pendingPairings = null;
        if (event.stage === 'swiss') {
            event.swissRound++;
            mcApplySwissStatuses(event);
            if (mcShouldCompleteSwiss(event)) mcCompleteSwiss(event);
            state.matchWeek = (state.matchWeek || 1) + 1;
        } else {
            mcAdvancePlayoffStage(event, winners, losers);
            state.matchWeek = (state.matchWeek || 1) + 1;
        }
    }

    function mcSimulateEventToEnd(event) {
        let guard = 0;
        while (!event.completed && guard++ < 12) mcSimulateEventStep(event);
    }

    function mcContinuationLabel(event) {
        if (!event) return 'Симулювати турнір';
        if (event.stage === 'swiss') return `Симулювати Swiss тур ${event.swissRound + 1}`;
        if (event.stage === 'quarterfinal') return 'Симулювати 1/4';
        if (event.stage === 'semifinal') return 'Симулювати 1/2';
        if (event.stage === 'final') return 'Симулювати фінал';
        return 'Симулювати наступний етап';
    }

    function mcStartEliminationRun(event, reason = 'Виліт із турніру', options = {}) {
        const circuit = state.majorCircuit;
        if (!event || !circuit) return;
        event.pendingPairings = null;
        circuit.eliminationRun = {
            eventId: event.id,
            reason,
            waitFor: options.waitFor || 'event-complete',
            startedAtStage: event.stage,
            startedAtRound: event.swissRound,
            completed: false
        };
        circuit.activeEventId = null;
        mcLog(`<b>${state.userTeamFullName}</b>: ${reason}. Турнір буде дограватися вручну по етапах через головний екран.`);
    }

    function mcHandleUserWaitingState(event) {
        const circuit = state.majorCircuit;
        if (!event || !circuit || event.completed || circuit.eliminationRun) return false;
        const playerRow = event.standings.find(row => row.name === state.userTeamFullName);
        if (event.stage === 'swiss' && playerRow?.swissStatus === 'qualified') {
            mcStartEliminationRun(event, 'вже вийшла у плей-оф. Дограйте решту Swiss-турів, щоб сформувати сітку 1/4 фіналу', { waitFor: 'playoff' });
            return true;
        }
        if (event.stage === 'swiss' && playerRow?.swissStatus === 'eliminated') {
            mcStartEliminationRun(event, 'не вийшла зі Swiss/групового етапу');
            return true;
        }
        return false;
    }

    function mcCompleteEliminationRunIfReady(event) {
        const circuit = state.majorCircuit;
        if (!circuit?.eliminationRun || !event) return;
        const allCurrentCompleted = circuit.currentEventIds.every(id => circuit.events[id]?.completed);
        if (!event.completed || !allCurrentCompleted) return;
        circuit.eliminationRun.completed = true;
        circuit.eliminationRun = null;
        mcLog(`<b>${event.name}</b> завершено. Повна статистика турніру доступна у вікні симуляції турнірів.`);
        mcAdvancePhaseAfterEvent(event);
    }

    function mcResolveStaleEliminationRun() {
        const circuit = state.majorCircuit;
        const run = circuit?.eliminationRun;
        if (!run) return;
        const event = circuit.events[run.eventId];
        if (event && !event.completed) return;
        circuit.eliminationRun = null;
        if (event && circuit.currentEventIds.every(id => circuit.events[id]?.completed)) {
            mcAdvancePhaseAfterEvent(event);
        }
    }

    window.simulateEliminatedTournamentStep = function () {
        const circuit = mcEnsureCircuit();
        const run = circuit?.eliminationRun;
        const event = run ? circuit.events[run.eventId] : null;
        if (!event || event.completed) {
            if (circuit) circuit.eliminationRun = null;
            mcRenderAll();
            return;
        }
        const beforeStage = event.stage;
        circuit.currentEventIds.forEach(id => {
            const item = circuit.events[id];
            if (item && !item.completed) mcSimulateEventStep(item);
        });
        const afterLabel = event.completed ? 'фінал завершено' : (STAGE_LABELS[event.stage] || event.stage);
        mcLog(`${event.name}: симуляція етапу <b>${STAGE_LABELS[beforeStage] || beforeStage}</b>. Поточний стан: <b>${afterLabel}</b>.`);
        if (run.waitFor === 'playoff' && event.stage !== 'swiss' && !event.completed && event.playoffTeams.includes(state.userTeamFullName)) {
            circuit.eliminationRun = null;
            circuit.activeEventId = event.id;
            mcLog(`<b>${state.userTeamFullName}</b> дочекалася завершення Swiss і виходить у плей-оф.`);
            mcPrepareNextOpponent();
            mcRenderAll();
            if (typeof updateUI === 'function') updateUI();
            autoSave('major-qualified-playoff-ready');
            return;
        }
        mcCompleteEliminationRunIfReady(event);
        mcRenderAll();
        if (typeof updateUI === 'function') updateUI();
        autoSave('major-eliminated-step');
    };

    function mcAdvanceOtherEvents(activeEvent) {
        const circuit = state.majorCircuit;
        circuit.currentEventIds.forEach(id => {
            const event = circuit.events[id];
            if (event && event.id !== activeEvent.id && !event.completed) mcSimulateEventStep(event);
        });
    }

    function mcRecordPlayerMatch(opponentName, playerWon) {
        const circuit = mcEnsureCircuit();
        const event = circuit && circuit.events[circuit.activeEventId];
        if (!event || event.completed) return;
        const pairings = mcEnsurePairings(event);
        const playerPair = pairings.find(pair => pair.includes(state.userTeamFullName));
        if (!playerPair) return;
        if (!playerPair[1]) {
            const row = event.standings.find(item => item.name === state.userTeamFullName);
            if (row) { row.wins++; row.mapDiff += 2; }
            event.pendingPairings = null;
            event.swissRound++;
            mcApplySwissStatuses(event);
            if (mcShouldCompleteSwiss(event)) mcCompleteSwiss(event);
            state.matchWeek = (state.matchWeek || 1) + 1;
            if (!mcHandleUserWaitingState(event)) mcPrepareNextOpponent();
            mcRenderAll();
            autoSave('major-circuit-bye');
            return;
        }
        const isPlayerA = playerPair[0] === state.userTeamFullName;
        const mapTarget = event.stage === 'final' ? 3 : 2;
        const playerScore = Math.max(0, Math.min(mapTarget, Number(seriesState.playerScore) || (playerWon ? mapTarget : Math.max(0, mapTarget - 1))));
        const enemyScore = Math.max(0, Math.min(mapTarget, Number(seriesState.enemyScore) || (playerWon ? Math.max(0, mapTarget - 1) : mapTarget)));
        const result = {
            teamA: playerPair[0],
            teamB: playerPair[1],
            scoreA: isPlayerA ? playerScore : enemyScore,
            scoreB: isPlayerA ? enemyScore : playerScore,
            maps: typeof toPlayerCalendarMapDetails === 'function' ? toPlayerCalendarMapDetails() : []
        };
        const winners = [];
        const losers = [];
        pairings.forEach(pair => {
            if (!pair[1]) {
                const byeRow = event.standings.find(row => row.name === pair[0]);
                if (byeRow) { byeRow.wins++; byeRow.mapDiff += 2; }
                winners.push(pair[0]);
                return;
            }
            const matchResult = pair === playerPair ? result : mcSimulateMatch(pair[0], pair[1], event.stage === 'final' ? 5 : 3);
            const outcome = mcApplyMatch(event, matchResult, event.stage);
            winners.push(outcome.winner);
            losers.push(outcome.loser);
        });
        event.pendingPairings = null;
        mcAdvanceOtherEvents(event);
        if (typeof window.onMajorCircuitPlayerMatchFinished === 'function') {
            window.onMajorCircuitPlayerMatchFinished(playerWon, event, result);
        }

        const playedStage = event.stage;
        if (event.stage === 'swiss') {
            event.swissRound++;
            mcApplySwissStatuses(event);
            if (mcShouldCompleteSwiss(event)) mcCompleteSwiss(event);
            state.matchWeek = (state.matchWeek || 1) + 1;
        } else {
            mcAdvancePlayoffStage(event, winners, losers);
            state.matchWeek = (state.matchWeek || 1) + 1;
        }

        if (event.completed) {
            const champion = Object.keys(event.placements || {}).find(name => event.placements[name] === 'champion');
            if (champion === state.userTeamFullName) {
                mcLog(`<b>${state.userTeamFullName}</b> виграла ${event.name}. Турнір завершено, результат додано до статистики.`);
            }
            const allCurrentCompleted = circuit.currentEventIds.every(id => circuit.events[id]?.completed);
            if (allCurrentCompleted) mcAdvancePhaseAfterEvent(event);
            else {
                const nextEvent = circuit.currentEventIds.map(id => circuit.events[id]).find(item => item && !item.completed);
                if (nextEvent) {
                    circuit.activeEventId = null;
                    circuit.eliminationRun = {
                        eventId: nextEvent.id,
                        reason: `${event.name} завершено. Дограйте паралельний турнір, щоб перейти до наступної фази.`,
                        waitFor: 'event-complete',
                        startedAtStage: nextEvent.stage,
                        startedAtRound: nextEvent.swissRound,
                        completed: false
                    };
                }
            }
            mcRenderAll();
            autoSave('major-circuit-event-complete');
            return;
        }

        const playerRow = event.standings.find(row => row.name === state.userTeamFullName);
        const playerSwissActive = event.stage === 'swiss' && (!playerRow || playerRow.swissStatus === 'active');
        const playerStillAlive = !event.completed && (playerSwissActive || event.playoffTeams.includes(state.userTeamFullName));
        if (mcHandleUserWaitingState(event)) {
            mcRenderAll();
            autoSave('major-circuit-waiting');
            return;
        }
        if (!playerStillAlive) {
            const reason = playerRow?.swissStatus === 'eliminated'
                ? 'не вийшла зі Swiss/групового етапу'
                : `вилетіла на етапі ${STAGE_LABELS[playedStage] || playedStage}`;
            mcStartEliminationRun(event, reason);
        }
        mcPrepareNextOpponent();
        mcRenderAll();
        autoSave('major-circuit-match');
    }

    function mcAdvancePhaseAfterEvent(event) {
        const circuit = state.majorCircuit;
        if (circuit.phase < QUALIFIER_WAVES.length) {
            circuit.phase++;
            mcInitializePhase();
            return;
        }
        if (circuit.phase === QUALIFIER_WAVES.length) {
            circuit.majorInvites = mcRankEvent(event).slice(0, 16).map(row => row.name);
            if (!circuit.majorInvites.includes(state.userTeamFullName)) {
                mcApplyWorldPenalty(state.userTeamFullName, 55, 'не пройшла ліговий етап ESL Pro League 26');
            }
            circuit.phase = QUALIFIER_WAVES.length + 1;
            mcInitializePhase();
            return;
        }
        if (circuit.phase === QUALIFIER_WAVES.length + 1) mcFinishSeason();
    }

    function mcPrepareNextOpponent() {
        const circuit = state.majorCircuit;
        const event = circuit && circuit.events[circuit.activeEventId];
        if (!event || event.completed) return;
        if (mcHandleUserWaitingState(event)) return;
        const action = mcGetPlayerTournamentAction();
        if (action.type !== 'play-match') return;
        const pair = action.pair;
        const opponentName = pair[0] === state.userTeamFullName ? pair[1] : pair[0];
        const opponent = mcTeam(opponentName);
        state.currentEnemy = {
            name: opponentName,
            skill: opponent?.players ? (typeof getEffectiveRosterSkill === 'function' ? getEffectiveRosterSkill(opponent.players) : opponent.players.reduce((sum, player) => sum + player.skill + (player.form || 0), 0) / Math.max(1, opponent.players.length)) : 70
        };
        const enemyEl = document.getElementById('ui-enemy-name');
        if (enemyEl) enemyEl.textContent = `${opponentName} · ${event.name}`;
        if (typeof window.onMajorCircuitOpponentChanged === 'function') window.onMajorCircuitOpponentChanged(opponentName, event);
    }

    function mcTournamentMvp(event) {
        const placementBonus = { champion: 0.14, finalist: 0.08, semifinal: 0.045, quarterfinal: 0.02, qualified: 0.025, swiss: 0 };
        const liveRows = mcEventPlayerRanking(event).map(row => ({
            ...row,
            score: row.rating + (row.kd - 1) * 0.08 + (row.mvps || 0) * 0.03 + (placementBonus[event.placements[row.team]] || 0)
        })).sort((a, b) => b.score - a.score);
        if (liveRows[0]?.matches) return { name: liveRows[0].name, team: liveRows[0].team, rating: liveRows[0].rating };
        let best = null;
        event.participants.forEach(teamName => {
            const team = mcTeam(teamName);
            (team?.players || []).forEach(player => {
                const realRating = Number(player.stats?.rating || 1);
                const projected = realRating + (player.skill - 75) / 160 + (player.form || 0) / 100 + (placementBonus[event.placements[teamName]] || 0) + Math.random() * 0.05;
                if (!best || projected > best.rating) best = { name: player.name, team: teamName, rating: Number(projected.toFixed(2)) };
            });
        });
        if (best && best.team === state.userTeamFullName) {
            const player = state.players.find(item => item.name === best.name);
            if (player) player.tournamentMvps = (player.tournamentMvps || 0) + 1;
        }
        return best;
    }

    function mcAwardEvent(event) {
        if (event.awarded) return;
        event.awarded = true;
        const circuit = state.majorCircuit;
        const worldPlacement = { champion: 55, finalist: 34, semifinal: 22, quarterfinal: 12, qualified: 10, swiss: -8, league: -16 };
        event.participants.forEach(teamName => {
            const placement = event.placements[teamName] || 'swiss';
            const points = event.config.points?.[placement] || 0;
            const prizeShare = { champion: 0.5, finalist: 0.24, semifinal: 0.09, quarterfinal: 0.035, qualified: 0.015, swiss: 0.005, league: 0.003 }[placement] || 0;
            const prize = Math.round((event.config.prizePool || 0) * prizeShare);
            circuit.majorPoints[teamName] = (circuit.majorPoints[teamName] || 0) + points;
            circuit.teamEvents[teamName] = circuit.teamEvents[teamName] || [];
            circuit.teamEvents[teamName].push({ event: event.name, placement, points, prize });
            const team = mcTeam(teamName);
            if (team) team.points = Math.max(0, Math.round(team.points + (worldPlacement[placement] || 0)));
            if (teamName === state.userTeamFullName && prize > 0) state.money += prize;
        });
        event.mvp = mcTournamentMvp(event);
        if (event.mvp) circuit.tournamentMvps.push({ event: event.name, ...event.mvp });
        const userResult = circuit.teamEvents[state.userTeamFullName]?.find(item => item.event === event.name);
        if (userResult) mcLog(`${event.name}: результат <b>${mcPlacementLabel(userResult.placement)}</b>, Major Points +${userResult.points}, призові +$${userResult.prize}.`);
    }

    function mcApplyWorldPenalty(teamName, amount, reason) {
        const team = mcTeam(teamName);
        if (team) team.points = Math.max(0, team.points - amount);
        mcLog(`<b>${teamName}</b> ${reason}. Штраф світового рейтингу: -${amount} pts.`);
    }

    function mcPlacementLabel(placement) {
        return {
            champion: 'Чемпіон', finalist: 'Фіналіст', semifinal: 'Півфінал', quarterfinal: 'Чвертьфінал',
            swiss: 'Швейцарський етап', qualified: 'Топ-16', league: 'Поза топ-16'
        }[placement] || placement;
    }

    function mcPlayerSnapshot(circuit) {
        return state.players.map(player => {
            const base = circuit.playerBaselines?.[player.name] || { matches: 0, kills: 0, deaths: 0, mvps: 0, rating: 1, tournamentMvps: 0 };
            const totalMatches = player.stats?.matches || 0;
            const matches = Math.max(0, totalMatches - base.matches);
            const kills = Math.max(0, (player.stats?.kills || 0) - base.kills);
            const deaths = Math.max(0, (player.stats?.deaths || 0) - base.deaths);
            const weightedRating = matches > 0
                ? ((Number(player.stats?.rating || 1) * totalMatches) - (base.rating * base.matches)) / matches
                : Number(player.stats?.rating || 1);
            return {
                name: player.name,
                role: player.role,
                skill: player.skill,
                matches,
                kd: Number((kills / Math.max(1, deaths)).toFixed(2)),
                rating: Number(Math.max(0.5, weightedRating).toFixed(2)),
                matchMvps: Math.max(0, (player.stats?.mvps || 0) - base.mvps),
                tournamentMvps: Math.max(0, (player.tournamentMvps || 0) - base.tournamentMvps)
            };
        });
    }

    function mcCompletedEventSnapshot(event) {
        const champion = Object.keys(event.placements || {}).find(name => event.placements[name] === 'champion');
        return {
            name: event.name,
            tier: event.config?.tier || 'Major Circuit',
            champion: champion || '',
            mvp: event.mvp ? { ...event.mvp } : null,
            matches: event.matches?.length || 0,
            leaders: mcEventPlayerRanking(event).slice(0, 8).map(player => ({
                name: player.name,
                team: player.team,
                matches: player.matches,
                kd: player.kd,
                rating: player.rating,
                mvps: player.mvps
            }))
        };
    }

    function mcArchivedCompletedEventsHtml(events = []) {
        if (!events.length) return '';
        return `<section class="major-completed-events detailed"><h3>Повна статистика турнірів сезону</h3>${events.map(event => `
            <article class="major-completed-event-detail">
                <header><span><small>${escapeLiveText(event.tier)}</small><b>${escapeLiveText(event.name)}</b></span><strong>${event.champion ? `Чемпіон: ${escapeLiveText(event.champion)}` : 'Завершено'}</strong></header>
                <div class="major-completed-stats"><span>Матчів <b>${event.matches}</b></span><span>MVP <b>${event.mvp ? `${escapeLiveText(event.mvp.name)} · ${event.mvp.rating}` : '-'}</b></span><span>Командний підсумок <b>${event.champion || '-'}</b></span></div>
                <div class="major-completed-player-table"><div><span>#</span><span>Гравець</span><span>Матчі</span><span>K/D</span><span>Rating</span><span>MVP</span></div>${event.leaders.map((player, index) => `<div><span>${index + 1}</span><b>${escapeLiveText(player.name)}<small>${escapeLiveText(player.team)}</small></b><span>${player.matches}</span><span>${player.kd}</span><strong>${player.rating}</strong><span>${player.mvps}</span></div>`).join('')}</div>
            </article>
        `).join('')}</section>`;
    }

    function mcFinishSeason() {
        const circuit = state.majorCircuit;
        if (typeof window.onMajorCircuitSeasonEnding === 'function') window.onMajorCircuitSeasonEnding(circuit);
        const seasonAwards = typeof window.calculateCareerSeasonAwards === 'function'
            ? window.calculateCareerSeasonAwards(circuit)
            : null;
        state.majorSeasonHistory.unshift({
            season: state.seasonNumber,
            team: state.userTeamFullName,
            majorPoints: circuit.majorPoints[state.userTeamFullName] || 0,
            majorPointsPlace: mcMajorPointRanking().findIndex(row => row.name === state.userTeamFullName) + 1,
            events: [...(circuit.teamEvents[state.userTeamFullName] || [])],
            completedEvents: Object.values(circuit.events).filter(event => event.completed).map(mcCompletedEventSnapshot),
            players: mcPlayerSnapshot(circuit),
            tournamentMvps: circuit.tournamentMvps.filter(item => item.team === state.userTeamFullName),
            allMvps: [...circuit.tournamentMvps],
            awards: seasonAwards
        });
        if (typeof window.onMajorCircuitSeasonFinished === 'function') window.onMajorCircuitSeasonFinished(state.majorSeasonHistory[0]);
        state.majorSeasonHistory = state.majorSeasonHistory.slice(0, 6);
        mcLog(`Сезон ${state.seasonNumber} завершено. Повний звіт додано до архіву.`);
        state.seasonNumber++;
        state.majorCircuit = mcCreateCircuit();
        state.majorCircuit.season = state.seasonNumber;
        state.majorCircuit.initialized = true;
        mcInitializePhase();
        autoSave('major-season-finished');
    }

    function mcLog(message) {
        if (typeof logSystem === 'function') logSystem(message);
    }

    function mcRenderTournamentPanel() {
        const panel = document.getElementById('tournament-tier-panel');
        const circuit = state.majorCircuit;
        if (!panel || !circuit) return;
        const event = circuit.events[circuit.activeEventId] || circuit.events[circuit.currentEventIds[0]];
        const userRow = event?.standings.find(row => row.name === state.userTeamFullName);
        panel.innerHTML = `
            <div class="major-panel-head"><div><small>СЕЗОН ${state.seasonNumber}</small><h3>${event ? escapeLiveText(event.name) : 'Major Circuit 26'}</h3></div><span>${event ? escapeLiveText(STAGE_LABELS[event.stage] || event.stage) : '-'}</span></div>
            <div class="major-panel-stats"><span>Турнір <b>${event ? `${event.participants.length} команд` : '-'}</b></span><span>Етап <b>${event ? escapeLiveText(STAGE_LABELS[event.stage] || event.stage) : '-'}</b></span><span>Баланс <b>${userRow ? `${userRow.wins}-${userRow.losses}` : '-'}</b></span></div>
            <button class="open-tournament-btn" onclick="openTournamentWindow(true)">Відкрити сезонний турнір</button>`;
    }

    function mcRenderEliminationHub() {
        const panel = document.querySelector('.next-match-panel');
        const circuit = state.majorCircuit;
        if (!panel || !circuit) return;
        panel.querySelector('.major-elimination-hub')?.remove();
        const run = circuit.eliminationRun;
        if (!run) return;
        const event = circuit.events[run.eventId];
        if (!event || event.completed) return;
        const champion = Object.keys(event.placements || {}).find(name => event.placements[name] === 'champion');
        const waitingForPlayoff = run.waitFor === 'playoff';
        panel.insertAdjacentHTML('beforeend', `
            <div class="major-elimination-hub">
                <div>
                    <small>${waitingForPlayoff ? 'ВАША КОМАНДА ВЖЕ В ПЛЕЙ-ОФ' : 'ТУРНІР ПРОДОВЖУЄТЬСЯ БЕЗ ВАШОЇ КОМАНДИ'}</small>
                    <b>${escapeLiveText(event.name)} · ${escapeLiveText(STAGE_LABELS[event.stage] || event.stage)}</b>
                    <span>${escapeLiveText(run.reason || 'Виліт із турніру')}${champion ? ` · Чемпіон: ${escapeLiveText(champion)}` : ''}</span>
                </div>
                <button type="button" onclick="simulateEliminatedTournamentStep()">${escapeLiveText(mcContinuationLabel(event))}</button>
                <button type="button" class="secondary" onclick="openTournamentWindow(true)">Таблиця</button>
            </div>
        `);
    }

    function mcEventTable(event) {
        const ranked = mcRankEvent(event);
        const qualificationCutoff = event.config.league ? 16 : 8;
        return `<section class="major-event-card ${event.id === state.majorCircuit.activeEventId ? 'active' : ''}">
            <div class="major-event-title"><div><h3>${escapeLiveText(event.name)}</h3><small>${escapeLiveText(STAGE_LABELS[event.stage] || event.stage)} · ${event.participants.length} команд</small></div>${event.mvp ? `<span>MVP <b>${escapeLiveText(event.mvp.name)}</b> · ${event.mvp.rating}</span>` : ''}</div>
            <div class="major-event-table"><div class="major-table-head"><span>#</span><span>Команда</span><span>W-L</span><span>MD</span><span>MP</span></div>${ranked.map((row, index) => `<div class="major-table-row ${row.isPlayer ? 'player' : ''} ${index < qualificationCutoff ? 'qualified' : ''}"><span>${index + 1}</span><span class="major-team-name">${teamLogoHtml(row.name)}${escapeLiveText(row.name)}</span><span>${row.wins}-${row.losses}</span><span>${row.mapDiff >= 0 ? '+' : ''}${row.mapDiff}</span><span>${state.majorCircuit.majorPoints[row.name] || 0}</span></div>`).join('')}</div>
            ${event.stage !== 'swiss' && event.stage !== 'complete' ? mcBracketHtml(event) : ''}
            ${mcEventLeadersHtml(event)}
        </section>`;
    }

    function mcBracketHtml(event) {
        const pairs = mcEnsurePairings(event);
        return `<div class="major-bracket"><b>${escapeLiveText(STAGE_LABELS[event.stage] || event.stage)}</b>${pairs.map(pair => `<span><em>${teamLogoHtml(pair[0])}${escapeLiveText(pair[0])}</em><i>vs</i><em>${teamLogoHtml(pair[1])}${escapeLiveText(pair[1])}</em></span>`).join('')}</div>`;
    }

    function mcCompletedEventSummaryHtml(event) {
        const champion = Object.keys(event.placements || {}).find(name => event.placements[name] === 'champion');
        const finalMatch = [...(event.matches || [])].reverse().find(match => match.stage === 'final') || [...(event.matches || [])].reverse()[0];
        const leaders = mcEventPlayerRanking(event).slice(0, 8);
        const userResult = state.majorCircuit.teamEvents[state.userTeamFullName]?.find(item => item.event === event.name);
        return `<article class="major-completed-event-detail">
            <header>
                <span><small>${escapeLiveText(event.config?.tier || 'Major Circuit')}</small><b>${escapeLiveText(event.name)}</b></span>
                <strong>${champion ? `Чемпіон: ${teamLogoHtml(champion)}${escapeLiveText(champion)}` : event.config.league ? 'Ліга завершена' : 'Турнір завершено'}</strong>
            </header>
            <div class="major-completed-stats">
                <span>Матчів <b>${event.matches?.length || 0}</b></span>
                <span>MVP <b>${event.mvp ? `${escapeLiveText(event.mvp.name)} · ${event.mvp.rating}` : '-'}</b></span>
                <span>Ваш результат <b>${userResult ? `${mcPlacementLabel(userResult.placement)} · +${userResult.points} MP` : 'Не брали участь'}</b></span>
            </div>
            ${finalMatch ? `<div class="major-completed-final"><small>${escapeLiveText(STAGE_LABELS[finalMatch.stage] || finalMatch.stage || 'Останній матч')}</small><b>${teamLogoHtml(finalMatch.teamA)}${escapeLiveText(finalMatch.teamA)} <em>${finalMatch.scoreA}-${finalMatch.scoreB}</em> ${teamLogoHtml(finalMatch.teamB)}${escapeLiveText(finalMatch.teamB)}</b></div>` : ''}
            <div class="major-completed-player-table">
                <div><span>#</span><span>Гравець</span><span>Матчі</span><span>K/D</span><span>Rating</span><span>MVP</span></div>
                ${leaders.map((player, index) => `<div><span>${index + 1}</span><b>${escapeLiveText(player.name)}<small>${escapeLiveText(player.team)}</small></b><span>${player.matches}</span><span>${player.kd}</span><strong>${player.rating}</strong><span>${player.mvps}</span></div>`).join('')}
            </div>
        </article>`;
    }

    function mcSeasonArchiveHtml() {
        const latest = state.majorSeasonHistory?.[0];
        if (!latest) return '<div class="major-empty-history">Архів сезону зʼявиться після завершення Cologne Major.</div>';
        return `<section class="major-season-archive"><div class="major-event-title"><div><h3>Архів сезону ${latest.season}</h3><small>Major Points: ${latest.majorPoints} · місце #${latest.majorPointsPlace}</small></div></div>
            <div class="major-archive-events">${latest.events.map(item => `<span>${escapeLiveText(item.event)}<b>${mcPlacementLabel(item.placement)} · +${item.points} MP · $${item.prize || 0}</b></span>`).join('')}</div>
            <div class="major-player-table"><div><span>Гравець</span><span>Матчі</span><span>K/D</span><span>Rating</span><span>MVP</span></div>${latest.players.map(player => `<div><b>${escapeLiveText(player.name)}</b><span>${player.matches}</span><span>${player.kd}</span><span>${player.rating}</span><span>${player.matchMvps} / T${player.tournamentMvps}</span></div>`).join('')}</div>
            ${mcArchivedCompletedEventsHtml(latest.completedEvents)}
            ${typeof window.renderCareerAwardsHtml === 'function' ? window.renderCareerAwardsHtml(latest.awards) : ''}
        </section>`;
    }

    function mcRenderTournamentWindow() {
        const circuit = mcEnsureCircuit();
        const body = document.getElementById('tournament-window-body');
        const subtitle = document.getElementById('tournament-window-subtitle');
        if (!circuit || !body || !subtitle) return;
        subtitle.textContent = `Сезон ${state.seasonNumber} · Major Circuit · чесний Swiss та посів плей-оф`;
        const timelineNames = [
            ...QUALIFIER_WAVES.map(wave => wave.map(item => item.name.replace(' 26', '')).join(' / ')),
            'ESL Pro League',
            'Cologne Major'
        ];
        const completedEvents = Object.values(circuit.events).filter(event => event.completed && !circuit.currentEventIds.includes(event.id));
        body.innerHTML = `<div class="major-circuit-window">
            <div class="major-timeline">${timelineNames.map((name, index) => `<span class="${index < circuit.phase ? 'done' : index === circuit.phase ? 'current' : ''}"><i>${index + 1}</i>${name}</span>`).join('')}</div>
            ${circuit.currentEventIds.map(id => mcEventTable(circuit.events[id])).join('')}
            ${completedEvents.length ? `<section class="major-completed-events detailed"><h3>Повна статистика завершених турнірів</h3>${completedEvents.map(event => mcCompletedEventSummaryHtml(event)).join('')}</section>` : ''}
            <div class="major-mvp-list"><h3>MVP турнірів сезону</h3>${circuit.tournamentMvps.map(item => `<span><b>${escapeLiveText(item.event)}</b>${escapeLiveText(item.name)} · ${escapeLiveText(item.team)} · ${item.rating}</span>`).join('') || '<small>MVP визначиться після завершення першого турніру.</small>'}</div>
            ${mcSeasonArchiveHtml()}
        </div>`;
    }

    function mcRenderArchivePanel() {
        const slot = document.getElementById('world-tournament-slot');
        if (!slot) return;
        let archive = document.getElementById('major-season-archive-panel');
        if (!archive) {
            archive = document.createElement('div');
            archive.id = 'major-season-archive-panel';
            archive.className = 'panel major-season-summary-panel';
            slot.appendChild(archive);
        }
        const latest = state.majorSeasonHistory?.[0];
        archive.innerHTML = latest
            ? `<h3>Останній сезон</h3><div class="major-panel-stats"><span>Major Points <b>${latest.majorPoints}</b></span><span>Місце <b>#${latest.majorPointsPlace}</b></span><span>Турнірних MVP <b>${latest.tournamentMvps.length}</b></span></div><button onclick="openTournamentWindow(true)">Повна статистика сезону</button>`
            : '<h3>Архів сезонів</h3><p>Повна статистика гравців і турнірів зʼявиться після першого Cologne Major.</p>';
    }

    function mcRenderAll() {
        if (!state.majorCircuit) return;
        mcResolveStaleEliminationRun();
        const activeEvent = state.majorCircuit.events[state.majorCircuit.activeEventId];
        if (activeEvent) mcHandleUserWaitingState(activeEvent);
        mcRenderTournamentPanel();
        mcRenderEliminationHub();
        mcRenderArchivePanel();
        const event = state.majorCircuit.events[state.majorCircuit.activeEventId];
        const stage = document.getElementById('ui-tournament-stage');
        if (stage && event) stage.innerHTML = `🏆 ${escapeLiveText(event.name)} · ${escapeLiveText(STAGE_LABELS[event.stage] || event.stage)}`;
        if (document.getElementById('tournament-modal')?.style.display === 'flex') mcRenderTournamentWindow();
    }

    const updateUIBeforeMajorCircuit = updateUI;
    updateUI = function () {
        mcEnsureCircuit();
        updateUIBeforeMajorCircuit();
        mcRenderAll();
    };

    const rollNextEnemyBeforeMajorCircuit = rollNextEnemy;
    rollNextEnemy = function () {
        const circuit = mcEnsureCircuit();
        if (circuit?.eliminationRun) return;
        if (circuit?.activeEventId) return mcPrepareNextOpponent();
        return rollNextEnemyBeforeMajorCircuit();
    };

    simulateTournamentRoundForAllTiers = function (opponentName, isPlayerWin) {
        mcRecordPlayerMatch(opponentName, isPlayerWin);
    };

    window.runMajorCircuitSwissSelfTest = function (iterations = 200) {
        const errors = [];
        const config = { id: 'self-test', name: 'Swiss Self Test', size: 16, swissRounds: 5, prizePool: 0, points: {} };
        const calendarBefore = Array.isArray(state.calendar) ? [...state.calendar] : state.calendar;
        const weekBefore = state.matchWeek;
        try {
            for (let run = 0; run < iterations; run++) {
                const names = Array.from({ length: 16 }, (_, index) => `Test Team ${index + 1}`);
                const event = mcCreateEvent(config, names);
                let guard = 0;
                while (event.stage === 'swiss' && !event.completed && guard++ < 8) {
                    event.pendingPairings = mcPairSwiss(event);
                    event.pendingPairings.forEach(pair => {
                        const rowA = event.standings.find(row => row.name === pair[0]);
                        const rowB = event.standings.find(row => row.name === pair[1]);
                        if (!rowA || rowA.swissStatus !== 'active') errors.push(`Run ${run}: inactive team paired`);
                        if (rowA && rowB && (rowA.wins !== rowB.wins || rowA.losses !== rowB.losses)) errors.push(`Run ${run}: score mismatch ${rowA.wins}-${rowA.losses} vs ${rowB.wins}-${rowB.losses}`);
                        if (rowA && rowB && rowA.opponents.includes(rowB.name)) errors.push(`Run ${run}: repeated opponent`);
                    });
                    mcSimulateEventStep(event);
                }
                const qualified = event.standings.filter(row => row.swissStatus === 'qualified');
                const active = event.standings.filter(row => row.swissStatus === 'active');
                event.standings.forEach(row => {
                    if (row.wins >= 3 && row.swissStatus !== 'qualified') errors.push(`Run ${run}: ${row.name} has 3 wins but is not qualified`);
                    if (row.losses >= 3 && row.swissStatus !== 'eliminated') errors.push(`Run ${run}: ${row.name} has 3 losses but is not eliminated`);
                    if (new Set(row.opponents).size !== row.opponents.length) errors.push(`Run ${run}: duplicate opponent history`);
                });
                if (qualified.length !== 8) errors.push(`Run ${run}: expected 8 playoff teams, got ${qualified.length}`);
                if (active.length) errors.push(`Run ${run}: active teams left after Swiss`);
            }
        } finally {
            state.calendar = calendarBefore;
            state.matchWeek = weekBefore;
        }
        return { ok: errors.length === 0, iterations, errors: errors.slice(0, 20), errorCount: errors.length };
    };

    const finishBo3BeforeMajorCircuit = finishBo3Series;
    finishBo3Series = function (isPlayerWin) {
        state.tournamentStage = STAGES.regular;
        state.tournamentMatchesPlayed = 0;
        state.tournamentWins = 0;
        state.tournamentLosses = 0;
        finishBo3BeforeMajorCircuit(isPlayerWin);
        mcRenderAll();
    };

    renderTournamentWindow = mcRenderTournamentWindow;

    const openTournamentWindowBeforeMajorCircuit = window.openTournamentWindow;
    window.openTournamentWindow = function (show = true) {
        openTournamentWindowBeforeMajorCircuit(show);
        mcRenderTournamentWindow();
    };

    const onloadBeforeMajorCircuit = window.onload;
    window.onload = function (event) {
        if (typeof onloadBeforeMajorCircuit === 'function') onloadBeforeMajorCircuit.call(this, event);
        mcEnsureCircuit();
        mcRenderAll();
    };
})();
