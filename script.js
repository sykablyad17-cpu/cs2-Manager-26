﻿﻿﻿﻿﻿﻿﻿﻿// 1. ОФІЦІЙНА БАЗА ДАНИХ РЕЙТИНГІВ ГРАВЦІВ (МЕНЕДЖЕР 2026)
const PLAYERS_RATING_DATABASE = {
    "ZywOo": 99, "flameZ": 91, "ropz": 89, "apEX": 81, "mezii": 83,
    "makazze": 84, "b1t": 89, "w0nderful": 87, "iM": 82, "Aleksib": 76,
    "donk": 100, "sh1ro": 91, "magixx": 80, "zont1x": 83, "tN1R": 83,
    "karrigan": 71, "NiKo": 85, "TeSeS": 83, "m0NESY": 94, "kyousuke": 87,
    "FalleN": 77, "yuurih": 85, "YEKINDAR": 85, "KSCERATO": 90, "molodoy": 86,
    "arT": 79, "dumau": 84, "latto": 86, "saadzin": 83, "n1ssim": 81,
    "MAJ3R": 78, "XANTARES": 87, "woxic": 83, "soulfly": 82, "Wicadia": 86,
    "xertioN": 85, "Spinx": 86, "torzsi": 85, "JL": 80, "xelex": 82,
    "910": 87, "mzinho": 83, "cobrazera": 83, "bLitZ": 79, "Techno": 78,
    "REZ": 86, "PR": 84, "hypex": 84, "Tauson": 83, "Snax": 75,
    "Jame": 84, "zweih": 79, "xiELO": 80, "nota": 79, "BELCHONOKK": 75,
    "HeavyGod": 89, "MATYS": 83, "SunPayus": 82, "NertZ": 83, "huNter-": 79,
    "dziugss": 81, "lauNX": 82, "dem0n": 85, "Krabeni": 83, "cmtry": 81,
    "Magnojez": 85, "Boombl4": 79, "zorte": 80, "d1Ledez": 79, "S1ren": 79,
    "max": 77, "dgt": 84, "meyern": 85, "luchov": 86, "HUASOPEEK": 83,
    "npl": 85, "kensizor": 79, "s1zzi": 80, "alex666": 75, "esenthial": 79,
    "Staehr": 82, "jabbi": 81, "phzy": 78, "ryu": 79, "HooXi": 74,
    "frozen": 86, "Twistzz": 85, "broky": 77, "Neityu": 75, "jcobbb": 75,
    "MaSvAl": 77, "sFade8": 73, "AW": 74, "mo0N": 75, "tenzy": 77,
    "piriajr": 80, "snow": 77, "vsm": 76, "biguzera": 74, "saffee": 78,
    "afro": 83, "Rainwaker": 83, "Bymas": 79, "Gizmy": 77, "AZUWU": 78,
    "LNZ": 77, "brnz4n": 75, "insani": 81, "venomzera": 76, "kl1m": 79,
    "JamYoung": 81, "Jee": 80, "Mercury": 77, "Moseyuh": 79, "Zero": 78,
    "NAF": 77, "EliGE": 77, "malbsMd": 80, "siuhy": 73, "ultimate": 76,
    "slaxz-": 82, "Swisher": 77, "s1n": 75, "JBa": 77, "Lake": 79,
    "xKacpersky": 79, "cairne": 76, "sjuush": 76, "Snappi": 72, "stavn": 80,
    "Lucky": 77, "Maka": 75, "Graviti": 75, "Ex3rcice": 73, "misutaaa": 76,
    "alex": 76, "mopoz": 77, "sausol": 75, "dav1g": 73, "MartinezSa": 79,
    "tabseN": 75, "JDC": 77, "faveN": 75, "blameF": 84, "gr1ks": 82,
    "device": 82, "rain": 76, "Ag1l": 75, "sirah": 77, "poiii": 78,
    "jks": 81, "Vexite": 79, "nettik": 76, "story": 76, "INS": 76,
    "beastik": 76, "MoDo": 75, "stressarN": 76, "kisserek": 75, "SHOCK": 73
};

// ПОВНИЙ АКТУАЛЬНИЙ СПИСОК КОМАНД ІЗ РОСТУРУ
const ALL_TEAMS_DATA = {
    "Team Vitality": ["ZywOo", "flameZ", "ropz", "apEX", "mezii"],
    "Natus Vincere (NAVI)": ["makazze", "b1t", "w0nderful", "iM", "Aleksib"],
    "Team Spirit": ["donk", "sh1ro", "magixx", "zont1x", "tN1R"],
    "Team Falcons": ["karrigan", "NiKo", "TeSeS", "m0NESY", "kyousuke"],
    "FURIA Esports": ["FalleN", "yuurih", "YEKINDAR", "KSCERATO", "molodoy"],
    "Legacy": ["arT", "dumau", "latto", "saadzin", "n1ssim"],
    "Aurora Gaming": ["MAJ3R", "XANTARES", "woxic", "soulfly", "Wicadia"],
    "MOUZ": ["xertioN", "Spinx", "torzsi", "JL", "xelex"],
    "The MongolZ": ["910", "mzinho", "cobrazera", "bLitZ", "Techno"],
    "GamerLegion": ["REZ", "PR", "hypex", "Tauson", "Snax"],
    "PARIVISION": ["Jame", "zweih", "xiELO", "nota", "BELCHONOKK"],
    "G2 Esports": ["HeavyGod", "MATYS", "SunPayus", "NertZ", "huNter-"],
    "FUT Esports": ["dziugss", "lauNX", "dem0n", "Krabeni", "cmtry"],
    "BetBoom Team": ["Magnojez", "Boombl4", "zorte", "d1Ledez", "S1ren"],
    "9z Team": ["max", "dgt", "meyern", "luchov", "HUASOPEEK"],
    "B8 Esports": ["npl", "kensizor", "s1zzi", "alex666", "esenthial"],
    "Astralis": ["Staehr", "jabbi", "phzy", "ryu", "HooXi"],
    "FaZe Clan": ["frozen", "Twistzz", "broky", "Neityu", "jcobbb"],
    "magic": ["MaSvAl", "sFade8", "AW", "mo0N", "tenzy"],
    "paiN Gaming": ["piriajr", "snow", "vsm", "biguzera", "saffee"],
    "Monte": ["afro", "Rainwaker", "Bymas", "Gizmy", "AZUWU"],
    "MIBR": ["LNZ", "brnz4n", "insani", "venomzera", "kl1m"],
    "TYLOO": ["JamYoung", "Jee", "Mercury", "Moseyuh", "Zero"],
    "Team Liquid": ["NAF", "EliGE", "malbsMd", "siuhy", "ultimate"],
    "M80": ["slaxz-", "Swisher", "s1n", "JBa", "Lake"],
    "Ninjas in Pyjamas": ["xKacpersky", "cairne", "sjuush", "Snappi", "stavn"],
    "3DMAX": ["Lucky", "Maka", "Graviti", "Ex3rcice", "misutaaa"],
    "Gentle Mates": ["alex", "mopoz", "sausol", "dav1g", "MartinezSa"],
    "BIG": ["tabseN", "JDC", "faveN", "blameF", "gr1ks"],
    "100 Thieves": ["device", "rain", "Ag1l", "sirah", "poiii"],
    "FlyQuest": ["jks", "Vexite", "nettik", "story", "INS"],
    "SINNERS": ["beastik", "MoDo", "stressarN", "kisserek", "SHOCK"]
};

const TEAM_LOGOS = {
    "Team Vitality": "team-vitality.webp", "Natus Vincere (NAVI)": "navi.svg",
    "Team Spirit": "team-spirit.webp", "Team Falcons": "team-falcons.webp",
    "FURIA Esports": "furia-esports.svg", "Legacy": "legacy.webp",
    "Aurora Gaming": "aurora-gaming.webp", "MOUZ": "mouz.svg",
    "The MongolZ": "the-mongolz.webp", "GamerLegion": "gamerlegion.webp",
    "PARIVISION": "parivision.webp", "G2 Esports": "g2-esports.webp",
    "FUT Esports": "fut-esports.webp", "BetBoom Team": "betboom-team.webp",
    "9z Team": "9z-team.webp", "B8 Esports": "b8-esports.webp",
    "Astralis": "astralis.svg", "FaZe Clan": "faze-clan.webp", "magic": "magic.webp",
    "paiN Gaming": "pain-gaming.webp", "Monte": "monte.webp", "MIBR": "mibr.webp",
    "TYLOO": "tyloo.svg", "Team Liquid": "team-liquid.svg", "M80": "m80.webp",
    "Ninjas in Pyjamas": "nip.webp", "3DMAX": "3dmax.webp",
    "Gentle Mates": "gentle-mates.webp", "BIG": "big.svg", "100 Thieves": "100-thieves.webp",
    "FlyQuest": "flyquest.webp", "SINNERS": "sinners.svg"
};

function getTeamLogoPath(teamName) {
    const cleanName = String(teamName || '').replace(/ \(Tier [123]\)$/, '');
    return TEAM_LOGOS[cleanName] ? `assets/logos/${TEAM_LOGOS[cleanName]}` : '';
}

function teamLogoHtml(teamName, className = 'team-logo') {
    const path = getTeamLogoPath(teamName);
    return path ? `<img class="${className}" src="${path}" alt="" loading="lazy">` : '';
}

const REAL_ROLES_MAP = {
    "flameZ": "Rifler", "ropz": "Entry", "mezii": "Rifler",
    "apEX": "IGL", "Aleksib": "IGL", "karrigan": "IGL", "FalleN": "IGL", 
    "arT": "IGL", "MAJ3R": "IGL", "xertioN": "IGL", "bLitZ": "IGL",
    "Snax": "IGL", "Jame": "IGL", "huNter-": "IGL", "Krabeni": "IGL",
    "Boombl4": "IGL", "max": "IGL", "alex666": "IGL", "HooXi": "IGL",
    "Twistzz": "IGL", "sFade8": "IGL", "saffee": "IGL", "Gizmy": "IGL",
    "LNZ": "IGL", "JamYoung": "IGL", "siuhy": "IGL", "s1n": "IGL",
    "Snappi": "IGL", "Ex3rcice": "IGL", "dav1g": "IGL", "tabseN": "IGL",
    "Ag1l": "IGL", "INS": "IGL", "SHOCK": "IGL",

    "ZywOo": "AWP", "w0nderful": "AWP", "sh1ro": "AWP", "m0NESY": "AWP", 
    "molodoy": "AWP", "latto": "AWP", "woxic": "AWP", "torzsi": "AWP",
    "910": "AWP", "hypex": "AWP", "SunPayus": "AWP", "cmtry": "AWP",
    "zorte": "AWP", "meyern": "AWP", "s1zzi": "AWP", "phzy": "AWP",
    "broky": "AWP", "mo0N": "AWP", "afro": "AWP", "kl1m": "AWP",
    "Jee": "AWP", "ultimate": "AWP", "slaxz-": "AWP", "xKacpersky": "AWP",
    "Maka": "AWP", "MartinezSa": "AWP", "gr1ks": "AWP", "device": "AWP",
    "story": "AWP", "MoDo": "AWP"
};

function getPlayerBaseSkill(playerName) {
    return PLAYERS_RATING_DATABASE[playerName] !== undefined ? PLAYERS_RATING_DATABASE[playerName] : 70;
}

function detectPlayerRole(playerName, index) {
    if (REAL_ROLES_MAP[playerName]) return REAL_ROLES_MAP[playerName];
    const defaultRiflerRoles = ["Rifler", "Entry", "Lurker"];
    return defaultRiflerRoles[index % defaultRiflerRoles.length];
}

// --- 1. ГЛОБАЛЬНИЙ СТАН ГРИ ---
let state = {
    userTeamFullName: "",
    userTeamTag: "",
    region: "🇺🇦 Україна",
    money: 3000,
    bootcampLevel: 1,
    fans: 600,
    chemistry: 75,
    players: [], 
    currentEnemy: { name: "-", skill: 70 },
    chosenTactic: "balanced",
    selectedPlayerToReplace: null,
    
    tournamentStage: "Груповий етап",
    tournamentMatchesPlayed: 0,
    tournamentWins: 0,
    seasonNumber: 1,

    mapMastery: {
        "Anubis": 0, "Ancient": 0, "Dust 2": 0, "Mirage": 0, "Inferno": 0, "Overpass": 0, "Nuke": 0
    }
};

// --- 2. СИСТЕМА ЗБЕРЕЖЕННЯ ---
function saveGame() {
    localStorage.setItem('cs2_manager_save', JSON.stringify(state));
    console.log("💾 Гра збережена!");
}

function loadGame() {
    const savedData = localStorage.getItem('cs2_manager_save');
    if (savedData) {
        state = JSON.parse(savedData);
        console.log("📂 Збереження завантажено!");
    }
}

window.changeTactic = function(tactic) {
    state.chosenTactic = tactic;
    console.log(`🛡️ Тактику змінено на: ${tactic}`);
};

// --- 4. ЗАПУСК ---
window.onload = function() {
    loadGame(); 
    if (typeof createTeamSelectionScreen === 'function') createTeamSelectionScreen();
    if (typeof updateUI === 'function') updateUI();
};
// 1. Система MVP
function calculateMVP(playersOnMap) {
    if (!playersOnMap || playersOnMap.length === 0) return;
    let best = playersOnMap.reduce((prev, curr) => (parseFloat(curr.rating) > parseFloat(prev.rating) ? curr : prev));
    let target = state.players.find(p => p.name === best.name);
    if(target) {
        target.skill = Math.min(100, target.skill + 1);
        state.chemistry = Math.min(100, state.chemistry + 2);
        console.log(`🏆 MVP: ${target.name}! Скіл зріс до ${target.skill}.`);
        updateUI(); // Оновлюємо інтерфейс після росту скілу
    }
}

// Покращена система витрат
function processMatchExpenses() {
    // 1. Розрахунок: база + залежність від рівня буткампу
    let baseSalary = 300;
    let extraCosts = state.bootcampLevel * 50; 
    let totalExpenses = baseSalary + extraCosts;

    // 2. Списання коштів
    state.money -= totalExpenses;

    // 3. Лог для розробника (консоль F12)
    console.log(`💸 Зарплати та утримання: -$${totalExpenses} (База: $${baseSalary} + Рівень: $${extraCosts})`);
    
    // 4. Оновлення екрана для гравця
    if (typeof updateUI === 'function') {
        updateUI();
    }
}
// 3. Система тактик
window.changeTactic = function(tactic) {
    state.chosenTactic = tactic;
    state.tacticEffectiveness = (tactic === 'rush') ? 1.1 : (tactic === 'defense') ? 0.9 : 1.0;
    console.log(`🛡️ Тактику змінено на: ${tactic}`);
};
let teamsRating = [];
let teamsPreviousPositions = {}; 
const officialMaps = ["Anubis", "Ancient", "Dust 2", "Mirage", "Inferno", "Overpass", "Nuke"];
let vetoState = { availableMaps: [], step: 0, chosenMaps: [] };
let seriesState = { playerScore: 0, enemyScore: 0, currentMapIndex: 0 };
let marketPool = [];

const ctPhrases = [
    "ідеально приймає вихід на А-плант через мінус два.",
    "робить клатч 1 в 2 та дифузить бомбу на останній секунді!",
    "затискає з M4A1-S через дими й зупиняє атаку.",
    "вибиває Б-плант завдяки ідеальним флешкам."
];
const tPhrases = [
    "робить шалений ентрі-фраг з калаша та відкриває шлях на Б.",
    "ставить бомбу і закриває суперників у розіграші 2 в 2.",
    "знаходить шпарину в захисті й заходить у спину ворогам.",
    "прошиває стіну з AWP та забирає капітана ворогів."
];

function getRandomForm() {
    const forms = [-3, -1, 0, 1, 3];
    return forms[Math.floor(Math.random() * forms.length)];
}

function getFormIcon(formValue) {
    if (formValue > 1) return "📈";
    if (formValue < 0) return "📉";
    return "😐";
}

// 3. СТВОРЕННЯ ЕКРАНА ВИБОРУ КОМАНДИ НА СТАРТІ
function createTeamSelectionScreen() {
    let selectScreen = document.createElement("div");
    selectScreen.id = "startup-select-screen";
    selectScreen.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:#0f111a; z-index:99999; padding:30px; overflow-y:auto; font-family: 'Segoe UI', Arial, sans-serif; color:#f1f5f9; text-align:center;";
    
    let html = `
        <h1 style="color:#38bdf8; margin-bottom:10px; font-size:28px; text-transform:uppercase;">CS2 Pro Manager 2026</h1>
        <p style="color:#94a3b8; margin-bottom:30px;">Оберіть організацію, яку хочете очолити для виходу на Мейджор:</p>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap:15px; max-width:1100px; margin:0 auto; text-align:left;">
    `;

    Object.keys(ALL_TEAMS_DATA).forEach(tName => {
        let playersLine = ALL_TEAMS_DATA[tName].slice(0, 3).join(", ") + "...";
        html += `
            <div class="panel startup-team-card" style="background:#1e2230; border:1px solid #2d334a; padding:15px; border-radius:8px; cursor:pointer; transition:0.2s;" onclick="startGameWithTeam('${tName}')" onmouseenter="this.style.borderColor='#38bdf8'" onmouseleave="this.style.borderColor='#2d334a'">
                <div class="startup-team-name">${teamLogoHtml(tName, 'team-logo team-logo-lg')}<span>${tName}</span></div>
                <div style="color:#94a3b8; font-size:12px;">Склад: ${playersLine}</div>
            </div>
        `;
    });

    html += `</div>`;
    selectScreen.innerHTML = html;
    document.body.appendChild(selectScreen);
}

// 4. ЗАПУСК ГРИ ЗА ОБРАНУ КОМАНДУ
window.startGameWithTeam = function(teamName) {
    document.getElementById("startup-select-screen").remove();
    document.getElementById('game-interface').style.display = 'block';

    state.userTeamFullName = teamName;
    state.userTeamTag = teamName.replace(/[^A-Z0-9]/g, "").substring(0, 4) || "TEAM";
    document.getElementById('ui-team-fullname').innerText = state.userTeamFullName.toUpperCase();

    state.players = ALL_TEAMS_DATA[teamName].map((pName, index) => {
        return {
            id: "p" + (index + 1),
            name: pName,
            role: detectPlayerRole(pName, index),
            skill: getPlayerBaseSkill(pName),
            form: getRandomForm()
        };
    });

    teamsRating = [];
    Object.keys(ALL_TEAMS_DATA).forEach(tName => {
        let pArray = ALL_TEAMS_DATA[tName].map((pn, i) => ({
            name: pn,
            role: detectPlayerRole(pn, i),
            skill: getPlayerBaseSkill(pn),
            form: 0
        }));

        let avgSkill = pArray.reduce((sum, p) => sum + p.skill, 0) / 5;
        let pts = Math.floor(avgSkill * 9.5) + Math.floor(Math.random() * 50);

        teamsRating.push({
            name: tName,
            points: pts,
            isPlayer: tName === teamName,
            players: pArray
        });
    });

    savePositions();

    let myRatingIndex = teamsRating.find(t => t.isPlayer);
    if(myRatingIndex) myRatingIndex.players = state.players;

    injectMapMasteryUI();
    generateNewMarketPool();
    rollNextEnemy();
    updateUI();
    logSystem(`🚀 Ви стали головним тренером команди <b>${state.userTeamFullName}</b>! Почався Сезон ${state.seasonNumber}.`);
};

function savePositions() {
    teamsRating.sort((a, b) => b.points - a.points);
    teamsRating.forEach((team, idx) => {
        teamsPreviousPositions[team.name] = idx + 1;
    });
}

// 5. ОНОВЛЕННЯ ОСНОВНОГО UI
function updateUI() {
    document.getElementById('ui-money').innerText = `$${state.money}`;
    document.getElementById('ui-bootcamp').innerText = state.bootcampLevel;
    document.getElementById('ui-fans').innerText = `${state.fans} фан.`;
    
    let stageEl = document.getElementById('ui-tournament-stage');
    if (!stageEl) {
        stageEl = document.createElement('div');
        stageEl.id = 'ui-tournament-stage';
        stageEl.style = "background: #1e293b; padding: 6px 12px; border-radius: 6px; font-size: 13px; color: #f59e0b; font-weight: bold; margin-top: 10px; display: inline-block;";
        document.getElementById('ui-team-fullname').parentNode.appendChild(stageEl);
    }
    
    if (state.tournamentStage === "Груповий етап") {
        stageEl.innerHTML = `🏆 Сезон ${state.seasonNumber} | Група: ${state.tournamentWins}/3 перемог (Зіграно: ${state.tournamentMatchesPlayed})`;
    } else {
        stageEl.innerHTML = `🔥 СЕЗОН ${state.seasonNumber} | ЕТАП: <span style="color:#ef4444">${state.tournamentStage.toUpperCase()}</span>`;
    }

    const fansEl = document.getElementById('ui-fans');
    if (fansEl && !document.getElementById('ui-chemistry-display')) {
        let chemSpan = document.createElement('span');
        chemSpan.id = 'ui-chemistry-display';
        chemSpan.style = "margin-left: 15px; color: #10b981; font-weight: bold;";
        fansEl.parentNode.appendChild(chemSpan);
    }
    const chemDisp = document.getElementById('ui-chemistry-display');
    if (chemDisp) chemDisp.innerHTML = `🤝 Зіграність: ${state.chemistry}%`;

    const container = document.getElementById("roster-list-container");
    if(container) {
        container.innerHTML = "";
        state.players.forEach((p, index) => {
            let isSelected = state.selectedPlayerToReplace === index;
            let div = document.createElement("div");
            div.className = `player-card ${p.role === 'IGL' ? 'igl' : ''}`;
            div.style = `display: flex; justify-content: space-between; align-items: center; background: ${isSelected ? '#2d2719' : '#151824'}; padding: 10px 14px; border-radius: 8px; margin-bottom: 8px; border: 1px solid ${isSelected ? '#f59e0b' : '#23283b'}; color: #fff; cursor:pointer;`;
            
            let roleIcon = "👤";
            if (p.role === "IGL") roleIcon = "👑";
            else if (p.role === "AWP") roleIcon = "🎯";
            else if (p.role === "Entry") roleIcon = "💥";

            let displaySkill = p.skill + p.form;
            let formIcon = getFormIcon(p.form);

            div.innerHTML = `
                <span>
                    ${roleIcon} <b>${p.name}</b> 
                    <small style="color:#94a3b8; margin-left: 5px; font-weight: bold;">[${p.role}]</small>
                    <span style="margin-left:8px; font-size:12px;" title="Форма">${formIcon}</span>
                </span>
                <span class="highlight" style="color: ${isSelected ? '#f59e0b' : '#38bdf8'}">${displaySkill} <small style="font-size:10px; color:#64748b;">(${p.skill})</small> ${isSelected ? '• ОБРАНО' : ''}</span>
            `;
            
            div.onclick = () => {
                state.selectedPlayerToReplace = index;
                updateUI();
            };
            container.appendChild(div);
        });
    }
    updateMapMasteryDisplay();
}

function getTeamSkill(mapName = "") {
    let baseSkill = state.players.reduce((sum, p) => sum + (p.skill + p.form), 0) / 5;
    let chemBonus = (state.chemistry - 70) / 5;
    let mapBonus = (mapName && state.mapMastery[mapName]) ? state.mapMastery[mapName] : 0;
    return baseSkill + chemBonus + mapBonus;
}

function rollNextEnemy() {
    let filtered = teamsRating.filter(t => !t.isPlayer);
    let randomEnemy = filtered[Math.floor(Math.random() * filtered.length)];
    
    state.currentEnemy.name = randomEnemy.name;
    state.currentEnemy.skill = randomEnemy.players.reduce((sum, p) => sum + p.skill, 0) / 5;
    
    document.getElementById('ui-enemy-name').innerText = state.currentEnemy.name;
}

// 6. ТРЕНУВАННЯ ТА МАСТЕРНІСТЬ КАРТ
window.trainTeam = function() {
    state.players.forEach(p => {
        p.skill += Math.floor(Math.random() * 2) + state.bootcampLevel;
    });
    state.chemistry = Math.min(100, state.chemistry + Math.floor(Math.random() * 4) + 2);
    logSystem(`🏋️ Загальне тренування завершено! Характеристики та зіграність збільшено.`);
    updateUI();
};

window.upgradeBootcamp = function() {
    if (state.money >= 800) {
        state.money -= 800; state.bootcampLevel++;
        logSystem(`🚀 Базу модернізовано до рівня ${state.bootcampLevel}!`);
        updateUI();
    } else { logSystem("❌ Недостатньо фінансування клубу!"); }
};

function injectMapMasteryUI() {
    const hubTab = document.getElementById('hub-tab');
    if (!hubTab) return;
    
    let mapPanel = document.getElementById('map-mastery-panel');
    if (!mapPanel) {
        mapPanel = document.createElement('div');
        mapPanel.id = 'map-mastery-panel';
        mapPanel.className = 'panel';
        mapPanel.style = "margin-top:20px; padding:15px; background:#151824; border-radius:12px;";
        
        let html = `<h3 style="color:#38bdf8; margin-top:0; margin-bottom:10px;">🗺️ Підготовка карт (Бонуси на картах)</h3>
                    <div id="map-buttons-zone" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap:10px;"></div>`;
        mapPanel.innerHTML = html;
        
        const sysLogPanel = document.getElementById('sys-log-panel');
        if (sysLogPanel) sysLogPanel.parentNode.insertBefore(mapPanel, sysLogPanel);
    }
}

function updateMapMasteryDisplay() {
    const zone = document.getElementById('map-buttons-zone');
    if (!zone) return;
    zone.innerHTML = "";
    
    officialMaps.forEach(map => {
        let currentLvl = state.mapMastery[map] || 0;
        let btn = document.createElement('button');
        btn.style = "padding:6px; font-size:11px; background:#1e293b; border:1px solid #334155; text-align:center; color:#fff; width:100%; height:auto;";
        btn.innerHTML = `<b>${map}</b><br><span style="color:#10b981">+${currentLvl} Скіл</span><br><small style="color:#94a3b8">Вчити ($150)</small>`;
        btn.onclick = () => {
            if (state.money >= 150) {
                state.money -= 150;
                state.mapMastery[map] = currentLvl + 2;
                logSystem(`🗺️ Ви розібрали нові тактики на <b>${map}</b>. Бонус домінування збільшено!`);
                updateUI();
            } else {
                alert("Недостатньо грошей для аналітики тактик!");
            }
        };
        zone.appendChild(btn);
    });
}

// 7. РИНОК ТРАНСФЕРІВ (ВИКОРИСТОВУЄ РЕЙТИНГИ З БАЗИ)
function generateNewMarketPool() {
    const freeAgentsNames = ["Perfecto", "Kyojin", "smooya", "headtr1ck", "honda", "Kensi", "BOROS", "jkaem"];
    const roles = ["Rifler", "AWP", "Entry", "Lurker", "IGL"];
    marketPool = [];
    
    let shuffledNames = [...freeAgentsNames].sort(() => 0.5 - Math.random());
    
    for(let i=0; i<4; i++) {
        let pName = shuffledNames[i]; 
        let pRole = roles[Math.floor(Math.random() * roles.length)];
        let pSkill = getPlayerBaseSkill(pName);
        let pPrice = Math.floor(Math.pow(pSkill - 50, 2) * 5 + (pSkill * 10));
        
        marketPool.push({ name: pName, role: pRole, skill: pSkill, price: pPrice });
    }
}

function renderTransferMarket() {
    const listContainer = document.getElementById('transfer-list');
    if(!listContainer) return;
    listContainer.innerHTML = "";

    marketPool.forEach((player, mIndex) => {
        let card = document.createElement('div');
        card.className = "panel";
        card.style.margin = "0";
        card.style.display = "flex";
        card.style.flexDirection = "column";

        card.innerHTML = `
            <div style="font-size:16px; font-weight:bold; color:#fff; margin-bottom:5px;">${player.name}</div>
            <div style="font-size:13px; color:#94a3b8; margin-bottom:12px;">Роль: <b>${player.role}</b> | Скіл: <span class="highlight">${player.skill}</span></div>
            <button onclick="buyMarketPlayer(${mIndex})" style="margin-top:auto; padding:8px; font-size:12px; background:#2563eb; color:#fff;">
                Викупити ($${player.price})
            </button>
        `;
        listContainer.appendChild(card);
    });
}

window.buyMarketPlayer = function(marketIndex) {
    let candidate = marketPool[marketIndex];
    if (!candidate) return;

    if (state.selectedPlayerToReplace === null) {
        alert("Спочатку оберіть гравця зі своєї команди!");
        return;
    }

    if (state.money < candidate.price) {
        logSystem("❌ Недостатньо коштів на цей трансфер!");
        return;
    }

    state.money -= candidate.price;
    let replacedPlayer = state.players[state.selectedPlayerToReplace];
    
    logSystem(`🛒 Трансфер! <b>${candidate.name}</b> заменяє у складі <b>${replacedPlayer.name}</b>.`);
    state.chemistry = Math.max(30, state.chemistry - 25);

    state.players[state.selectedPlayerToReplace] = {
        id: replacedPlayer.id,
        name: candidate.name,
        role: candidate.role,
        skill: candidate.skill,
        form: 0
    };

    marketPool.splice(marketIndex, 1);
    state.selectedPlayerToReplace = null;

    updateUI();
    renderTransferMarket();
};

// 8. ТАБЛИЦЯ HLTV ЗІ СТРІЛОЧКАМИ ТРЕНДУ
function renderRatingTable() {
    const container = document.getElementById('rating-table-container');
    if(!container) return;
    container.innerHTML = "";

    teamsRating.sort((a, b) => b.points - a.points);

    teamsRating.forEach((team, index) => {
        let currentPos = index + 1;
        let prevPos = teamsPreviousPositions[team.name] || currentPos;
        
        let arrow = "😐";
        let arrowColor = "#64748b";
        
        if (currentPos < prevPos) { 
            arrow = "▲"; 
            arrowColor = "#10b981"; 
        } else if (currentPos > prevPos) { 
            arrow = "▼"; 
            arrowColor = "#ef4444"; 
        }

        let row = document.createElement('div');
        row.className = "stat-line";
        row.style.cursor = "pointer";
        row.style.transition = "0.2s";
        
        if (team.isPlayer) {
            row.style.background = "rgba(245, 158, 11, 0.1)";
            row.style.borderLeft = "4px solid #f59e0b";
            row.style.paddingLeft = "5px";
        }
        
        row.onclick = () => scoutTeam(team.name);
        row.onmouseenter = () => row.style.background = team.isPlayer ? "rgba(245, 158, 11, 0.2)" : "#222635";
        row.onmouseleave = () => row.style.background = team.isPlayer ? "rgba(245, 158, 11, 0.1)" : "transparent";

        row.innerHTML = `
            <div>
                <span style="color: #64748b; font-weight: bold; margin-right: 8px;">#${currentPos}</span>
                <span style="color: ${arrowColor}; font-weight: bold; margin-right: 12px; font-size: 11px;">${arrow}</span>
                <span style="font-weight: 500; color: ${team.isPlayer ? '#f59e0b' : '#fff'};">${team.name}</span>
            </div>
            <div class="highlight">${team.points} <span style="font-size:11px; color:#64748b;">pts</span></div>
        `;
        container.appendChild(row);
    });
}

function scoutTeam(teamName) {
    const placeholder = document.getElementById('scouting-placeholder');
    const content = document.getElementById('scouting-content');
    const title = document.getElementById('scout-team-name');
    const list = document.getElementById('scout-players-list');

    if(!placeholder || !content) return;

    placeholder.style.display = "none";
    content.style.display = "block";

    let targetTeam = teamsRating.find(t => t.name === teamName);
    title.innerText = `Ростер команди: ${targetTeam.name}`;
    list.innerHTML = "";

    targetTeam.players.forEach((player, pIndex) => {
        let calculatedPrice = Math.floor(Math.pow(player.skill - 50, 2) * 6 + (player.skill * 15));
        if (calculatedPrice < 1000) calculatedPrice = 1200;

        let div = document.createElement('div');
        div.className = "player-card";
        div.style.background = "#13151c";
        div.style.flexDirection = "column";
        div.style.alignItems = "stretch";
        div.style.gap = "8px";
        div.style.padding = "10px";

        let infoLine = document.createElement('div');
        infoLine.style.display = "flex";
        infoLine.style.justifyContent = "space-between";
        infoLine.innerHTML = `<div>👤 <b>${player.name}</b> <span style="color:#38bdf8; font-weight:bold;">[${player.role}]</span></div> <div class="highlight">Скіл: ${player.skill}</div>`;
        div.appendChild(infoLine);

        if (!targetTeam.isPlayer) {
            let buyBtn = document.createElement('button');
            buyBtn.innerText = `Викупити трансфер за $${calculatedPrice}`;
            buyBtn.style.margin = "0"; buyBtn.style.padding = "6px"; buyBtn.style.fontSize = "12px"; buyBtn.style.color = "#000";
            
            buyBtn.onclick = () => {
                if (state.selectedPlayerToReplace === null) {
                    alert("Спочатку оберіть свого гравця, якого ви хочете замінити!");
                    return;
                }
                if (state.money < calculatedPrice) {
                    alert("Недостатньо грошей!"); return;
                }

                state.money -= calculatedPrice;
                let kicked = state.players[state.selectedPlayerToReplace];
                
                logSystem(`🔥 СЕНСАЦІЯ! <b>${player.name}</b> переходить у ваш клуб із складу ${targetTeam.name}!`);
                state.chemistry = Math.max(30, state.chemistry - 25);

                state.players[state.selectedPlayerToReplace] = {
                    id: kicked.id,
                    name: player.name,
                    role: player.role,
                    skill: player.skill,
                    form: 0
                };

                targetTeam.players[pIndex] = {
                    name: kicked.name,
                    role: kicked.role,
                    skill: kicked.skill,
                    form: 0
                };

                state.selectedPlayerToReplace = null;
                updateUI();
                scoutTeam(teamName);
            };
            div.appendChild(buyBtn);
        } else {
            let info = document.createElement('div');
            info.style.fontSize = "11px"; info.style.color = "#64748b"; info.style.textAlign = "center";
            info.innerText = "Це твій гравець.";
            div.appendChild(info);
        }

        list.appendChild(div);
    });
}

function logSystem(msg) {
    const log = document.getElementById('sys-log');
    if(log) log.innerHTML = `• ${msg}<br>${log.innerHTML}`;
}

// 9. СТАДІЯ MAP VETO (PICK/BAN)
window.startVetoPhase = function() {
    const tacticsSelect = document.getElementById('ui-tactics');
    if (tacticsSelect) state.chosenTactic = tacticsSelect.value;
    document.getElementById('game-interface').style.display = 'none';
    document.getElementById('veto-screen').style.display = 'block';
    
    vetoState.availableMaps = [...officialMaps];
    vetoState.step = 0; vetoState.chosenMaps = [];
    
    document.getElementById('veto-log').innerHTML = "=== Початок стадії Pick/Ban ===";
    renderVetoMaps(); processVetoStep();
};

function renderVetoMaps() {
    const container = document.getElementById('veto-maps-container');
    if(!container) return;
    container.innerHTML = "";
    vetoState.availableMaps.forEach(map => {
        let btn = document.createElement('button');
        btn.innerText = map; btn.style.margin = "0";
        if (vetoState.step % 2 === 0) {
            btn.onclick = () => handleVetoAction(map);
        } else {
            btn.disabled = true; btn.style.background = "#222635"; btn.style.color = "#475569";
        }
        container.appendChild(btn);
    });
}

function processVetoStep() {
    const turnEl = document.getElementById('veto-turn');
    if(!turnEl) return;
    if (vetoState.step === 0) turnEl.innerText = `Твій хід: ЗАБАНЬ першу карту`;
    else if (vetoState.step === 1) { turnEl.innerText = `${state.currentEnemy.name} робить бан...`; setTimeout(() => enemyVetoAction("ban"), 1000); }
    else if (vetoState.step === 2) turnEl.innerText = `Твій хід: ОБЕРИ свій пік (Map 1)`;
    else if (vetoState.step === 3) { turnEl.innerText = `${state.currentEnemy.name} обирає карту...`; setTimeout(() => enemyVetoAction("pick"), 1000); }
    else if (vetoState.step === 4) turnEl.innerText = `Твій хід: ЗАБАНЬ останню карту`;
    else if (vetoState.step === 5) { turnEl.innerText = `${state.currentEnemy.name} робить бан...`; setTimeout(() => enemyVetoAction("ban"), 1000); }
    else {
        let decider = vetoState.availableMaps[0];
        vetoState.chosenMaps.push(decider);
        document.getElementById('veto-screen').style.display = 'none';
        startBo3Series();
    }
    renderVetoMaps();
}

function handleVetoAction(mapName) {
    vetoState.availableMaps = vetoState.availableMaps.filter(m => m !== mapName);
    if (vetoState.step === 0 || vetoState.step === 4) {
        document.getElementById('veto-log').innerHTML = `• ❌ Ти забанив: <b>${mapName}</b><br>${document.getElementById('veto-log').innerHTML}`;
    } else {
        vetoState.chosenMaps.push(mapName);
        document.getElementById('veto-log').innerHTML = `• ⭐ Твій пік: <b>${mapName}</b><br>${document.getElementById('veto-log').innerHTML}`;
    }
    vetoState.step++; processVetoStep();
}

function enemyVetoAction(actionType) {
    let rIndex = Math.floor(Math.random() * vetoState.availableMaps.length);
    let chosenMap = vetoState.availableMaps[rIndex];
    vetoState.availableMaps = vetoState.availableMaps.filter(m => m !== chosenMap);
    
    if (actionType === "ban") {
        document.getElementById('veto-log').innerHTML = `• ❌ ${state.currentEnemy.name} забанив: <b>${chosenMap}</b><br>${document.getElementById('veto-log').innerHTML}`;
    } else {
        vetoState.chosenMaps.push(chosenMap);
        document.getElementById('veto-log').innerHTML = `• ⭐ ${state.currentEnemy.name} обрав: <b>${chosenMap}</b><br>${document.getElementById('veto-log').innerHTML}`;
    }
    vetoState.step++; processVetoStep();
}

// 10. СИМУЛЯЦІЯ СЕРІЇ МАТЧІВ
function startBo3Series() {
    seriesState.playerScore = 0; seriesState.enemyScore = 0; seriesState.currentMapIndex = 0;
    document.getElementById('live-score').innerText = "0 : 0";
    document.getElementById('live-series-score').innerText = `Серія: 0 - 0`;
    
    if (document.getElementById('live-player-name')) {
        document.getElementById('live-player-name').innerText = state.userTeamTag;
    }
    if (document.getElementById('live-enemy-name')) {
        document.getElementById('live-enemy-name').innerText = state.currentEnemy.name.substring(0, 4).toUpperCase();
    }
    
    let tacticNames = { balanced: "⚖️ Стандарт", rush: "🔥 Агресія", defense: "🛡️ Захист" };
    document.getElementById('live-tactic-display').innerText = `Тактика: ${tacticNames[state.chosenTactic]}`;
    
    savePositions();
    playNextBo3Map();
}

function playNextBo3Map() {
    if (seriesState.playerScore === 2) { finishBo3Series(true); return; }
    if (seriesState.enemyScore === 2) { finishBo3Series(false); return; }

    let mapToPlay = vetoState.chosenMaps[seriesState.currentMapIndex];
    document.getElementById('live-current-map').innerText = mapToPlay;
    document.getElementById('live-series-score').innerText = `Серія: ${seriesState.playerScore} - ${seriesState.enemyScore}`;
    
    startSingleMapSimulation(mapToPlay, (winner) => {
        if (winner === "player") seriesState.playerScore++;
        else seriesState.enemyScore++;
        
        seriesState.currentMapIndex++;
        setTimeout(playNextBo3Map, 1500);
    });
}

function startSingleMapSimulation(mapName, onMapEnd) {
    document.getElementById('match-screen').style.display = 'block';
    let pRoundScore = 0, eRoundScore = 0, currentRound = 1, playerLossStreak = 0, playerRoundMoney = 800;
    let inOvertime = false, otCount = 0, pOtScore = 0, eOtScore = 0;

    const ticker = document.getElementById('live-ticker');
    const scoreEl = document.getElementById('live-score');
    ticker.innerHTML = `<span style="color:#f59e0b; font-weight:bold;">--- СТАРТ КАРТИ: ${mapName.toUpperCase()} ---</span>`;

    let matchInterval = setInterval(() => {
        let teamPower = getTeamSkill(mapName);
        let ecoPenalty = 0;
        
        if (state.chosenTactic === "rush") { teamPower += Math.random() < 0.5 ? 4 : -2; }
        else if (state.chosenTactic === "defense") { teamPower += 1.5; }

        if (currentRound !== 1 && currentRound !== 13 && !inOvertime) {
            if (playerRoundMoney < 3000) { ecoPenalty = 14; }
        }

        let totalPower = (teamPower - ecoPenalty) + state.currentEnemy.skill;
        let winChance = (teamPower - ecoPenalty) / totalPower;
        
        let roundWinner = Math.random() < winChance ? "player" : "enemy";
        let randPlayer = state.players[Math.floor(Math.random() * 5)].name;
        let logText = "";

        if (roundWinner === "player") {
            pRoundScore++; if (inOvertime) pOtScore++; playerLossStreak = 0;
            playerRoundMoney = Math.min(playerRoundMoney + 3250, 16000);
            let phrase = Math.random() < 0.5 ? ctPhrases[Math.floor(Math.random() * ctPhrases.length)] : tPhrases[Math.floor(Math.random() * tPhrases.length)];
            logText = `<span style="color:#38bdf8;">[${state.userTeamTag}] Рнд ${currentRound}:</span> 🔥 <b>${randPlayer}</b> ${phrase}`;
        } else {
            eRoundScore++; if (inOvertime) eOtScore++; playerLossStreak = Math.min(playerLossStreak + 1, 5);
            playerRoundMoney = Math.min(playerRoundMoney + 1400 + (playerLossStreak * 500), 16000);
            logText = `<span style="color:#f87171;">[${state.currentEnemy.name.substring(0,4).toUpperCase()}] Рнд ${currentRound}:</span> Програно раунд.`;
        }

        ticker.innerHTML = `${logText}<br>${ticker.innerHTML}`;
        scoreEl.innerText = `${pRoundScore} : ${eRoundScore}`;
        currentRound++;

        let isMapOver = false;
        if (!inOvertime) {
            if (pRoundScore === 13 || eRoundScore === 13) isMapOver = true;
            else if (pRoundScore === 12 && eRoundScore === 12) { inOvertime = true; otCount = 1; pOtScore = 0; eOtScore = 0; }
        } else {
            if (pOtScore === 4 || eOtScore === 4) isMapOver = true;
            else if (pOtScore === 3 && eOtScore === 3) { otCount++; pOtScore = 0; eOtScore = 0; }
        }

        if (isMapOver) {
            clearInterval(matchInterval);
            setTimeout(() => onMapEnd(pRoundScore > eRoundScore ? "player" : "enemy"), 1000);
        }
    }, 400);
}

function finishBo3Series(isPlayerWin) {
    document.getElementById('game-interface').style.display = 'block';
    document.getElementById('match-screen').style.display = 'none';
    switchTab('hub');

    let playerTeamInRating = teamsRating.find(t => t.isPlayer);
    
    let sponsorBonus = Math.floor(state.fans * 0.5);
    let prizeModifier = 1; 

    if (state.tournamentStage === "Півфінал") prizeModifier = 2;
    if (state.tournamentStage === "Фінал") prizeModifier = 4;

    if (isPlayerWin) {
        let prize = 3000 * prizeModifier; 
        let newFans = (Math.floor(Math.random() * 80) + 100) * prizeModifier;
        let pointsGained = (Math.floor(Math.random() * 15) + 20) * prizeModifier;

        state.money += (prize + sponsorBonus); 
        state.fans += newFans;
        
        if (playerTeamInRating) playerTeamInRating.points += pointsGained;
        if (state.tournamentStage === "Груповий етап") state.tournamentWins++;
        
        logSystem(`🏆 <b>МАТЧ ВИГРАНО!</b> Приз: +$${prize}, Спонсори: +$${sponsorBonus}, +${newFans} фанатів.`);
        
        if (state.tournamentStage === "Півфінал") {
            state.tournamentStage = "Фінал";
            logSystem("🔥 Команда виходить у ГРАНД-ФІНАЛ турніру!");
        } else if (state.tournamentStage === "Фінал") {
            logSystem(`👑 ЧЕМПІОНИ! Ви виграли головний кубок сезону ${state.seasonNumber}! +$5000 бонус.`);
            state.money += 5000;
            resetToNextSeason();
        }
    } else {
        let pointsLost = Math.floor(Math.random() * 10) + 12;
        state.money += (500 + sponsorBonus);
        if (playerTeamInRating) playerTeamInRating.points = Math.max(0, playerTeamInRating.points - pointsLost);

        logSystem(`❌ <b>ПОРАЗКА В СЕРІЇ.</b> Втрата -${pointsLost} HLTV. Фінансова підтримка: +$500.`);
        
        if (state.tournamentStage === "Півфінал" || state.tournamentStage === "Фінал") {
            logSystem("💔 Ви вилетіли з плей-офф. Починається підготовка до нового сезону.");
            resetToNextSeason();
        }
    }

    if (state.tournamentStage === "Груповий етап") {
        state.tournamentMatchesPlayed++;
        if (state.tournamentMatchesPlayed === 3) {
            if (state.tournamentWins >= 2) {
                state.tournamentStage = "Півфінал";
                logSystem("🎉 Вітаємо! Ви пройшли групу й вийшли у Плей-офф (Півфінал)!");
            } else {
                logSystem("😢 Не набрано потрібної кількості перемог у групі. Сезон провалено.");
                resetToNextSeason();
            }
        }
    }

    state.players.forEach(p => { p.form = getRandomForm(); });

    teamsRating.forEach(t => {
        if (!t.isPlayer) {
            t.points += Math.floor(Math.random() * 31) - 15;
            if (t.points < 0) t.points = 0;
        }
    });

    triggerRandomEvent();
    generateNewMarketPool();
    rollNextEnemy(); 
    updateUI();
    renderRatingTable();
}

function resetToNextSeason() {
    state.seasonNumber++;
    state.tournamentStage = "Груповий етап";
    state.tournamentMatchesPlayed = 0;
    state.tournamentWins = 0;
}

// 11. СИСТЕМА ВИПАДКОВИХ ПОДІЙ
function triggerRandomEvent() {
    const events = [
        {
            text: "📉 Один із твоїх гравців порушив режим та просидів у соцмережах до 5 ранку. Його форма критично падає!",
            action: () => { state.players[Math.floor(Math.random() * 5)].form = -3; }
        },
        {
            text: "💰 Відеоролик на YouTube з хайлайтами твоєї команди залетів у тренди! Спонсори виділили бонус +$1200.",
            action: () => { state.money += 1200; }
        },
        {
            text: "🤝 Команда провела вечір у ресторані, обговорюючи помилки. Зіграність зросла на +10%!",
            action: () => { state.chemistry = Math.min(100, state.chemistry + 10); }
        },
        {
            text: "📈 Гравці зловили неймовірний кураж на тренуваннях! Форма всієї команди покращилась.",
            action: () => { state.players.forEach(p => p.form = 3); }
        }
    ];

    let luckyStrike = Math.random() < 0.45;
    if (luckyStrike) {
        let ev = events[Math.floor(Math.random() * events.length)];
        setTimeout(() => {
            alert(`⚡ ПОДІЯ ДНЯ:\n\n${ev.text}`);
            ev.action();
            updateUI();
        }, 600);
    }
}

window.switchTab = function(tabName) {
    document.getElementById('tab-hub').classList.remove('active');
    document.getElementById('tab-transfers').classList.remove('active');
    document.getElementById('tab-rating').classList.remove('active');
    
    document.getElementById('hub-tab').style.display = 'none';
    document.getElementById('transfers-tab').style.display = 'none';
    document.getElementById('rating-tab').style.display = 'none';

    if (tabName === 'hub') {
        document.getElementById('tab-hub').classList.add('active');
        document.getElementById('hub-tab').style.display = 'block';
    } else if (tabName === 'transfers') {
        document.getElementById('tab-transfers').classList.add('active');
        document.getElementById('transfers-tab').style.display = 'block';
        renderTransferMarket();
    } else if (tabName === 'rating') {
        document.getElementById('tab-rating').classList.add('active');
        document.getElementById('rating-tab').style.display = 'grid';
        renderRatingTable();
    }
};

window.onload = function() {
    // 1. Завантажуємо збереження, якщо воно є
    loadGame(); 

    // 2. Логіка вибору команди
    // Якщо гравець ще не обрав команду (ім'я порожнє), показуємо екран вибору
    if (state.userTeamFullName === "") {
        if (typeof createTeamSelectionScreen === 'function') {
            createTeamSelectionScreen();
        }
    } else {
        // Якщо команда вже є, приховуємо меню (якщо воно раптом було) 
        // і показуємо основний інтерфейс гри
        document.getElementById('game-interface').style.display = 'block';
    }

    // 3. Оновлюємо інтерфейс
    if (typeof updateUI === 'function') {
        updateUI();
    }
};
// === CODEX MANAGER EXPANSION PATCH ===
const SAVE_KEY_V2 = 'cs2_manager_save_v2';
const OLD_SAVE_KEY = 'cs2_manager_save';
const SAVE_SCHEMA_VERSION = 3;
const STAGES = {
    regular: 'Регулярний сезон',
    quarter: 'Чвертьфінал',
    semi: 'Півфінал',
    final: 'Фінал'
};

function cloneMapMastery() {
    return { "Anubis": 0, "Ancient": 0, "Dust 2": 0, "Mirage": 0, "Inferno": 0, "Overpass": 0, "Nuke": 0 };
}

function createDefaultState() {
    return {
        userTeamFullName: "",
        userTeamTag: "",
        region: "🇺🇦 Україна",
        money: 3000,
        bootcampLevel: 1,
        fans: 600,
        chemistry: 75,
        players: [],
        currentEnemy: { name: "-", skill: 70 },
        chosenTactic: "balanced",
        selectedPlayerToReplace: null,
        tournamentStage: STAGES.regular,
        tournamentMatchesPlayed: 0,
        tournamentWins: 0,
        tournamentLosses: 0,
        seasonNumber: 1,
        seasonHistory: [],
        lastMVP: null,
        finances: { sponsors: 300, salaries: 0, baseCosts: 120, lastBalance: 0 },
        mapMastery: cloneMapMastery()
    };
}

function getPlayerSalary(player) {
    const roleBonus = player.role === 'IGL' ? 80 : player.role === 'AWP' ? 120 : 50;
    return Math.max(180, Math.round(player.skill * 7 + roleBonus));
}

function getTransferPrice(player, multiplier = 1) {
    const form = player.form || 0;
    const roleTax = player.role === 'AWP' ? 1.18 : player.role === 'IGL' ? 1.1 : 1;
    return Math.max(800, Math.round((Math.pow(player.skill - 45, 2) * 7 + player.skill * 24 + form * 75) * roleTax * multiplier));
}

function createPlayerProfile(name, index, extra = {}) {
    const skill = extra.skill ?? getPlayerBaseSkill(name);
    const role = extra.role || detectPlayerRole(name, index);
    return {
        id: extra.id || `p${index + 1}`,
        name,
        role,
        skill,
        form: extra.form ?? getRandomForm(),
        salary: extra.salary || getPlayerSalary({ role, skill }),
        stats: {
            kills: extra.stats?.kills || 0,
            deaths: extra.stats?.deaths || 0,
            mvps: extra.stats?.mvps || 0,
            matches: extra.stats?.matches || 0,
            rating: extra.stats?.rating || 1.0
        }
    };
}

function ensureStateSchema() {
    const base = createDefaultState();
    state = { ...base, ...state };
    state.mapMastery = { ...cloneMapMastery(), ...(state.mapMastery || {}) };
    state.finances = { ...base.finances, ...(state.finances || {}) };
    state.tournamentStage = Object.values(STAGES).includes(state.tournamentStage) ? state.tournamentStage : STAGES.regular;
    state.tournamentLosses = state.tournamentLosses || 0;
    state.seasonHistory = Array.isArray(state.seasonHistory) ? state.seasonHistory : [];
    state.players = (state.players || []).map((p, index) => createPlayerProfile(p.name, index, p));
    state.finances.salaries = state.players.reduce((sum, p) => sum + getPlayerSalary(p), 0);
    ensureAllTeamsInRating();
}

function initializeRatingsForTeam(teamName) {
    teamsRating = Object.keys(ALL_TEAMS_DATA).map(tName => {
        const players = ALL_TEAMS_DATA[tName].map((name, index) => createPlayerProfile(name, index, { form: 0 }));
        const avgSkill = players.reduce((sum, p) => sum + p.skill, 0) / players.length;
        return {
            name: tName,
            points: Math.floor(avgSkill * 9.5) + Math.floor(Math.random() * 50),
            isPlayer: tName === teamName,
            players
        };
    });
    syncPlayerTeamInRating();
    savePositions();
}

function createWorldTeamEntry(teamName) {
    const players = ALL_TEAMS_DATA[teamName].map((name, index) => createPlayerProfile(name, index, { form: 0 }));
    const avgSkill = players.reduce((sum, player) => sum + player.skill, 0) / Math.max(1, players.length);
    return {
        name: teamName,
        points: Math.floor(avgSkill * 9.5) + Math.floor(Math.random() * 50),
        isPlayer: teamName === state.userTeamFullName,
        players
    };
}

function ensureAllTeamsInRating() {
    if (!Array.isArray(teamsRating) || !teamsRating.length) return;
    Object.keys(ALL_TEAMS_DATA).forEach(teamName => {
        if (!teamsRating.some(team => team.name === teamName)) {
            teamsRating.push(createWorldTeamEntry(teamName));
        }
    });
    syncPlayerTeamInRating();
    savePositions();
}

function syncPlayerTeamInRating() {
    const team = teamsRating.find(t => t.isPlayer);
    if (team) {
        const recentResults = Array.isArray(team.recentResults) ? team.recentResults : [];
        const matchWins = team.matchWins || 0;
        const matchesPlayed = team.matchesPlayed || 0;
        team.players = state.players;
        team.recentResults = recentResults.slice(-5);
        team.matchWins = matchWins;
        team.matchesPlayed = matchesPlayed;
        team.chemistry = state.chemistry || team.chemistry || 70;
    }
}

function restoreRatingsIfNeeded() {
    if (!Array.isArray(teamsRating) || teamsRating.length === 0) {
        initializeRatingsForTeam(state.userTeamFullName || Object.keys(ALL_TEAMS_DATA)[0]);
    }
    syncPlayerTeamInRating();
}

function migrateSaveData(payloadVersion = 0) {
    state.saveVersion = Number(state.saveVersion || payloadVersion || 0);
    if (state.saveVersion < 3) {
        state.uiNotifications = Array.isArray(state.uiNotifications) ? state.uiNotifications.slice(-60) : [];
        state.calendar = Array.isArray(state.calendar) ? state.calendar.slice(0, 180) : [];
        if (state.majorCircuit) {
            const circuit = state.majorCircuit;
            const activeEvent = circuit.events?.[circuit.activeEventId];
            if (activeEvent?.completed) circuit.activeEventId = null;
            if (circuit.eliminationRun) {
                const runEvent = circuit.events?.[circuit.eliminationRun.eventId];
                if (!runEvent || runEvent.completed) circuit.eliminationRun = null;
            }
            Object.values(circuit.events || {}).forEach(event => {
                if (!event) return;
                if (event.stage === 'swiss') {
                    const rows = new Map((event.standings || []).map(row => [row.name, row]));
                    const pendingValid = Array.isArray(event.pendingPairings) && event.pendingPairings.every(pair => {
                        const rowA = rows.get(pair?.[0]);
                        const rowB = rows.get(pair?.[1]);
                        if (!rowA || rowA.swissStatus !== 'active') return false;
                        if (!pair?.[1]) return true;
                        if (!rowB || rowB.swissStatus !== 'active') return false;
                        return rowA.wins === rowB.wins && rowA.losses === rowB.losses;
                    });
                    if (!pendingValid) event.pendingPairings = null;
                }
            });
        }
        state.saveVersion = SAVE_SCHEMA_VERSION;
    }
}

function autoSave(reason = 'autosave') {
    ensureStateSchema();
    migrateSaveData(SAVE_SCHEMA_VERSION);
    syncPlayerTeamInRating();
    saveGame(reason);
}

saveGame = function(reason = 'manual') {
    const payload = {
        version: SAVE_SCHEMA_VERSION,
        savedAt: new Date().toISOString(),
        reason,
        state,
        teamsRating,
        teamsPreviousPositions,
        marketPool
    };
    localStorage.setItem(SAVE_KEY_V2, JSON.stringify(payload));
    localStorage.setItem(OLD_SAVE_KEY, JSON.stringify(state));
};

loadGame = function() {
    const rawV2 = localStorage.getItem(SAVE_KEY_V2);
    const rawOld = localStorage.getItem(OLD_SAVE_KEY);
    try {
        if (rawV2) {
            const payload = JSON.parse(rawV2);
            state = payload.state || state;
            teamsRating = payload.teamsRating || [];
            teamsPreviousPositions = payload.teamsPreviousPositions || {};
            marketPool = payload.marketPool || [];
            migrateSaveData(payload.version || 0);
        } else if (rawOld) {
            state = JSON.parse(rawOld);
            migrateSaveData(1);
        }
    } catch (error) {
        console.warn('Не вдалося завантажити сейв, стартуємо заново.', error);
        state = createDefaultState();
    }
    ensureStateSchema();
    migrateSaveData(SAVE_SCHEMA_VERSION);
    if (state.userTeamFullName) restoreRatingsIfNeeded();
};

window.newGame = function() {
    if (!confirm('Почати нову гру? Поточне збереження буде видалено.')) return;
    localStorage.removeItem(SAVE_KEY_V2);
    localStorage.removeItem(OLD_SAVE_KEY);
    state = createDefaultState();
    teamsRating = [];
    teamsPreviousPositions = {};
    marketPool = [];
    location.reload();
};

window.changeTactic = function(tactic) {
    state.chosenTactic = tactic;
    state.tacticEffectiveness = tactic === 'rush' ? 1.08 : tactic === 'defense' ? 1.03 : 1;
    autoSave('tactic');
};

const originalUpdateUI = updateUI;
updateUI = function() {
    ensureStateSchema();
    restoreRatingsIfNeeded();
    originalUpdateUI();
    renderManagerPanels();
};

function renderManagerPanels() {
    const sideColumn = document.querySelector('.main-layout > div:nth-child(2)');
    if (!sideColumn) return;

    let actions = document.getElementById('club-actions-panel');
    if (!actions) {
        actions = document.createElement('div');
        actions.id = 'club-actions-panel';
        actions.className = 'panel codex-panel';
        sideColumn.prepend(actions);
    }
    actions.innerHTML = `
        <h3>Керування</h3>
        <button onclick="newGame()" class="danger-btn">Нова гра</button>
        <div class="autosave-note">Автозбереження активне</div>
    `;

    let finance = document.getElementById('club-finance-panel');
    if (!finance) {
        finance = document.createElement('div');
        finance.id = 'club-finance-panel';
        finance.className = 'panel codex-panel';
        sideColumn.appendChild(finance);
    }
    const salaries = state.players.reduce((sum, p) => sum + getPlayerSalary(p), 0);
    const sponsors = Math.floor(250 + state.fans * 0.55 + state.chemistry * 3);
    const baseCosts = 120 + state.bootcampLevel * 95;
    state.finances = { sponsors, salaries, baseCosts, lastBalance: sponsors - salaries - baseCosts };
    finance.innerHTML = `
        <h3>Економіка клубу</h3>
        <div class="stat-line"><span>Зарплати:</span><span>-$${salaries}</span></div>
        <div class="stat-line"><span>Спонсори:</span><span class="highlight">+$${sponsors}</span></div>
        <div class="stat-line"><span>База:</span><span>-$${baseCosts}</span></div>
        <div class="stat-line"><span>Баланс за матч:</span><span class="highlight">${state.finances.lastBalance >= 0 ? '+$' + state.finances.lastBalance : '-$' + Math.abs(state.finances.lastBalance)}</span></div>
    `;

    let stats = document.getElementById('player-stats-panel');
    if (!stats) {
        stats = document.createElement('div');
        stats.id = 'player-stats-panel';
        stats.className = 'panel codex-panel';
        const roster = document.getElementById('roster-list-container');
        if (roster) roster.parentNode.appendChild(stats);
    }
    if (stats) {
        stats.innerHTML = `
            <h3>Статистика гравців</h3>
            <div class="stats-grid stats-head"><span>Гравець</span><span>K/D</span><span>Rating</span><span>MVP</span></div>
            ${state.players.map(p => {
                const deaths = Math.max(1, p.stats.deaths);
                const kd = (p.stats.kills / deaths).toFixed(2);
                return `<div class="stats-grid"><span>${p.name}</span><span>${kd}</span><span>${Number(p.stats.rating || 1).toFixed(2)}</span><span>${p.stats.mvps || 0}</span></div>`;
            }).join('')}
            <div class="autosave-note">Останній MVP: ${state.lastMVP || '-'}</div>
        `;
    }
}

window.startGameWithTeam = function(teamName) {
    const select = document.getElementById('startup-select-screen');
    if (select) select.remove();
    document.getElementById('game-interface').style.display = 'block';

    state = createDefaultState();
    state.userTeamFullName = teamName;
    state.userTeamTag = teamName.replace(/[^A-Z0-9]/g, '').substring(0, 4) || 'TEAM';
    state.players = ALL_TEAMS_DATA[teamName].map((name, index) => createPlayerProfile(name, index));
    document.getElementById('ui-team-fullname').innerText = state.userTeamFullName.toUpperCase();

    initializeRatingsForTeam(teamName);
    injectMapMasteryUI();
    generateNewMarketPool();
    rollNextEnemy();
    updateUI();
    logSystem(`🚀 Ви стали тренером <b>${state.userTeamFullName}</b>. Сезон ${state.seasonNumber} розпочато.`);
    autoSave('new-team');
};

const originalTrainTeam = window.trainTeam;
window.trainTeam = function() {
    const cost = 350 + state.bootcampLevel * 120;
    if (state.money < cost) {
        logSystem(`❌ Тренування коштує $${cost}. Бюджету не вистачає.`);
        return;
    }
    state.money -= cost;
    state.players.forEach(p => {
        const gain = Math.random() < 0.65 ? 1 : 0;
        p.skill = Math.min(100, p.skill + gain);
        p.form = Math.min(5, (p.form || 0) + (Math.random() < 0.55 ? 1 : 0));
        p.salary = getPlayerSalary(p);
    });
    state.chemistry = Math.min(100, state.chemistry + 3 + state.bootcampLevel);
    logSystem(`🏋️ Тренування завершено: -$${cost}, форма та зіграність зросли.`);
    updateUI();
    autoSave('training');
};

const originalUpgradeBootcamp = window.upgradeBootcamp;
window.upgradeBootcamp = function() {
    const cost = 800 + (state.bootcampLevel - 1) * 500;
    if (state.money < cost) {
        logSystem('❌ Недостатньо бюджету для апгрейду бази.');
        return;
    }
    state.money -= cost;
    state.bootcampLevel++;
    logSystem(`🚀 Базу покращено до рівня ${state.bootcampLevel}. Витрати на утримання теж зросли.`);
    updateUI();
    autoSave('bootcamp');
};

function generateNewMarketPool() {
    const taken = new Set(state.players.map(p => p.name));
    const allCandidates = [];
    teamsRating.forEach(team => {
        if (team.isPlayer) return;
        team.players.forEach((p, index) => {
            if (!taken.has(p.name)) allCandidates.push({ ...p, sourceTeam: team.name, sourceIndex: index, contract: 'buyout' });
        });
    });
    ['Perfecto', 'Kyojin', 'smooya', 'headtr1ck', 'honda', 'Kensi', 'BOROS', 'jkaem'].forEach((name, index) => {
        if (!taken.has(name)) allCandidates.push({ ...createPlayerProfile(name, index, { form: 0 }), sourceTeam: 'Free Agent', sourceIndex: -1, contract: 'free' });
    });

    const avgTeamSkill = state.players.length ? state.players.reduce((sum, p) => sum + p.skill, 0) / state.players.length : 70;
    marketPool = allCandidates
        .map(player => {
            const affordability = Math.abs(player.skill - avgTeamSkill);
            const marketHeat = 1 + Math.max(0, state.seasonNumber - 1) * 0.04 + Math.random() * 0.22;
            return {
                ...player,
                form: player.form || 0,
                price: player.contract === 'free' ? getTransferPrice(player, 0.35) : getTransferPrice(player, marketHeat),
                interest: Math.min(100, Math.max(20, Math.round(100 - affordability * 3 + Math.random() * 18)))
            };
        })
        .sort((a, b) => (b.interest + b.skill) - (a.interest + a.skill));
    const buyoutTargets = marketPool.filter(p => p.contract !== 'free').slice(0, 4);
    const freeTargets = marketPool.filter(p => p.contract === 'free').slice(0, 2);
    marketPool = [...buyoutTargets, ...freeTargets];
    autoSave('market-refresh');
}

function renderTransferMarket() {
    const listContainer = document.getElementById('transfer-list');
    if(!listContainer) return;
    listContainer.innerHTML = '';
    if (!marketPool.length) generateNewMarketPool();

    marketPool.forEach((player, mIndex) => {
        const card = document.createElement('div');
        card.className = 'panel transfer-card';
        card.style.margin = '0';
        card.innerHTML = `
            <div class="transfer-title">${player.name}</div>
            <div class="transfer-meta">${player.role} | Skill <b>${player.skill}</b> | Форма ${player.form || 0}</div>
            <div class="transfer-meta">${player.sourceTeam || 'Free Agent'} | Інтерес ${player.interest}%</div>
            <div class="transfer-meta">Зарплата: $${getPlayerSalary(player)} / матч</div>
            <button onclick="buyMarketPlayer(${mIndex})" style="margin-top:10px; background:#2563eb; color:#fff;">Купити ($${player.price})</button>
        `;
        listContainer.appendChild(card);
    });
}

window.buyMarketPlayer = function(marketIndex) {
    const candidate = marketPool[marketIndex];
    if (!candidate) return;
    if (state.selectedPlayerToReplace === null) {
        alert('Спочатку оберіть гравця у своєму ростері.');
        return;
    }
    if (state.money < candidate.price) {
        logSystem('❌ Недостатньо коштів для трансферу.');
        return;
    }

    state.money -= candidate.price;
    const replacedPlayer = state.players[state.selectedPlayerToReplace];
    const incoming = createPlayerProfile(candidate.name, state.selectedPlayerToReplace, candidate);
    incoming.id = replacedPlayer.id;
    state.players[state.selectedPlayerToReplace] = incoming;
    state.chemistry = Math.max(25, state.chemistry - Math.max(8, Math.round(30 - candidate.interest / 5)));

    const sourceTeam = teamsRating.find(t => t.name === candidate.sourceTeam);
    if (sourceTeam && candidate.sourceIndex >= 0) {
        sourceTeam.players[candidate.sourceIndex] = createPlayerProfile(replacedPlayer.name, candidate.sourceIndex, replacedPlayer);
    }

    marketPool.splice(marketIndex, 1);
    state.selectedPlayerToReplace = null;
    logSystem(`🔄 Трансфер: <b>${candidate.name}</b> приєднався до клубу замість <b>${replacedPlayer.name}</b>.`);
    syncPlayerTeamInRating();
    updateUI();
    renderTransferMarket();
    autoSave('transfer');
};

function pickWeightedPlayer() {
    const total = state.players.reduce((sum, p) => sum + Math.max(10, p.skill + (p.form || 0)), 0);
    let roll = Math.random() * total;
    for (const player of state.players) {
        roll -= Math.max(10, player.skill + (player.form || 0));
        if (roll <= 0) return player;
    }
    return state.players[0];
}

function calculateMVP(playersOnMap) {
    if (!playersOnMap || playersOnMap.length === 0) return null;
    const best = playersOnMap.reduce((prev, curr) => Number(curr.rating) > Number(prev.rating) ? curr : prev);
    const target = state.players.find(p => p.name === best.name);
    if (target) {
        target.skill = Math.min(100, target.skill + 1);
        target.form = Math.min(5, (target.form || 0) + 2);
        target.stats.mvps = (target.stats.mvps || 0) + 1;
        target.salary = getPlayerSalary(target);
        state.lastMVP = target.name;
        state.chemistry = Math.min(100, state.chemistry + 2);
        logSystem(`🏆 MVP карти: <b>${target.name}</b>. Скіл +1, форма +2.`);
    }
    return best;
}

function startSingleMapSimulation(mapName, onMapEnd) {
    document.getElementById('match-screen').style.display = 'block';
    let pRoundScore = 0, eRoundScore = 0, currentRound = 1, playerLossStreak = 0, playerRoundMoney = 800;
    let inOvertime = false, pOtScore = 0, eOtScore = 0;
    const mapStats = state.players.map(p => ({ name: p.name, kills: 0, deaths: 0, rating: 1.0 }));

    const ticker = document.getElementById('live-ticker');
    const scoreEl = document.getElementById('live-score');
    ticker.innerHTML = `<span style="color:#f59e0b; font-weight:bold;">--- СТАРТ КАРТИ: ${mapName.toUpperCase()} ---</span>`;

    const matchInterval = setInterval(() => {
        let teamPower = getTeamSkill(mapName);
        let ecoPenalty = 0;
        if (state.chosenTactic === 'rush') teamPower += Math.random() < 0.5 ? 4 : -2;
        else if (state.chosenTactic === 'defense') teamPower += 1.5;
        if (currentRound !== 1 && currentRound !== 13 && !inOvertime && playerRoundMoney < 3000) ecoPenalty = 14;

        const totalPower = Math.max(1, teamPower - ecoPenalty + state.currentEnemy.skill);
        const winChance = Math.min(0.82, Math.max(0.18, (teamPower - ecoPenalty) / totalPower));
        const roundWinner = Math.random() < winChance ? 'player' : 'enemy';
        let logText = '';

        if (roundWinner === 'player') {
            pRoundScore++; if (inOvertime) pOtScore++; playerLossStreak = 0;
            playerRoundMoney = Math.min(playerRoundMoney + 3250, 16000);
            const hero = pickWeightedPlayer();
            const row = mapStats.find(s => s.name === hero.name);
            const kills = 1 + Math.floor(Math.random() * 3);
            row.kills += kills;
            mapStats.forEach(s => { if (Math.random() < 0.35) s.deaths += 1; });
            const phrase = Math.random() < 0.5 ? ctPhrases[Math.floor(Math.random() * ctPhrases.length)] : tPhrases[Math.floor(Math.random() * tPhrases.length)];
            logText = `<span style="color:#38bdf8;">[${state.userTeamTag}] Раунд ${currentRound}:</span> 🔥 <b>${hero.name}</b> ${phrase}`;
        } else {
            eRoundScore++; if (inOvertime) eOtScore++; playerLossStreak = Math.min(playerLossStreak + 1, 5);
            playerRoundMoney = Math.min(playerRoundMoney + 1400 + playerLossStreak * 500, 16000);
            mapStats.forEach(s => { if (Math.random() < 0.62) s.deaths += 1; if (Math.random() < 0.18) s.kills += 1; });
            logText = `<span style="color:#f87171;">[${state.currentEnemy.name.substring(0,4).toUpperCase()}] Раунд ${currentRound}:</span> програно раунд.`;
        }

        ticker.innerHTML = `${logText}<br>${ticker.innerHTML}`;
        scoreEl.innerText = `${pRoundScore} : ${eRoundScore}`;
        currentRound++;

        let isMapOver = false;
        if (!inOvertime) {
            if (pRoundScore === 13 || eRoundScore === 13) isMapOver = true;
            else if (pRoundScore === 12 && eRoundScore === 12) { inOvertime = true; pOtScore = 0; eOtScore = 0; }
        } else if (pOtScore === 4 || eOtScore === 4) isMapOver = true;
        else if (pOtScore === 3 && eOtScore === 3) { pOtScore = 0; eOtScore = 0; }

        if (isMapOver) {
            clearInterval(matchInterval);
            mapStats.forEach(s => {
                const player = state.players.find(p => p.name === s.name);
                const kd = s.kills / Math.max(1, s.deaths);
                s.rating = Number(Math.max(0.55, Math.min(1.85, 0.72 + kd * 0.42 + (pRoundScore > eRoundScore ? 0.08 : -0.04))).toFixed(2));
                if (player) {
                    player.stats.kills += s.kills;
                    player.stats.deaths += s.deaths;
                    player.stats.matches += 1;
                    player.stats.rating = Number((((player.stats.rating || 1) * Math.max(0, player.stats.matches - 1) + Number(s.rating)) / player.stats.matches).toFixed(2));
                }
            });
            calculateMVP(mapStats);
            autoSave('map-finished');
            setTimeout(() => onMapEnd(pRoundScore > eRoundScore ? 'player' : 'enemy'), 1000);
        }
    }, 400);
}

function processMatchExpenses() {
    const salaries = state.players.reduce((sum, p) => sum + getPlayerSalary(p), 0);
    const baseCosts = 120 + state.bootcampLevel * 95;
    const totalExpenses = salaries + baseCosts;
    state.money -= totalExpenses;
    state.finances.salaries = salaries;
    state.finances.baseCosts = baseCosts;
    logSystem(`💸 Витрати клубу: зарплати -$${salaries}, база -$${baseCosts}.`);
    return totalExpenses;
}

function updatePlayerFormsAfterSeries(isPlayerWin) {
    state.players.forEach(p => {
        const kd = p.stats.kills / Math.max(1, p.stats.deaths);
        const delta = (isPlayerWin ? 1 : -1) + (kd > 1.15 ? 1 : kd < 0.8 ? -1 : 0);
        p.form = Math.max(-5, Math.min(5, (p.form || 0) + delta));
    });
}

function finishBo3Series(isPlayerWin) {
    document.getElementById('game-interface').style.display = 'block';
    document.getElementById('match-screen').style.display = 'none';
    switchTab('hub');

    const playerTeamInRating = teamsRating.find(t => t.isPlayer);
    const stageMultiplier = state.tournamentStage === STAGES.final ? 4 : state.tournamentStage === STAGES.semi ? 2.5 : state.tournamentStage === STAGES.quarter ? 1.7 : 1;
    const sponsorBonus = Math.floor(250 + state.fans * 0.55 + state.chemistry * 3);
    const prize = isPlayerWin ? Math.floor(1800 * stageMultiplier) : Math.floor(450 * stageMultiplier);
    const fanChange = isPlayerWin ? Math.floor((90 + Math.random() * 80) * stageMultiplier) : -Math.floor(25 + Math.random() * 35);
    const pointsChange = Math.floor((isPlayerWin ? 18 : -12) * stageMultiplier + Math.random() * 10);

    state.money += prize + sponsorBonus;
    state.fans = Math.max(100, state.fans + fanChange);
    state.chemistry = Math.max(20, Math.min(100, state.chemistry + (isPlayerWin ? 4 : -5)));
    if (playerTeamInRating) playerTeamInRating.points = Math.max(0, playerTeamInRating.points + pointsChange);

    processMatchExpenses();
    updatePlayerFormsAfterSeries(isPlayerWin);

    if (state.tournamentStage === STAGES.regular) {
        state.tournamentMatchesPlayed++;
        if (isPlayerWin) state.tournamentWins++; else state.tournamentLosses++;
        logSystem(`${isPlayerWin ? '🏆 Перемога' : '❌ Поразка'} у сезонному матчі. Приз $${prize}, спонсори $${sponsorBonus}, фанати ${fanChange >= 0 ? '+' : ''}${fanChange}.`);
        if (state.tournamentMatchesPlayed >= 5) {
            if (state.tournamentWins >= 3) {
                state.tournamentStage = STAGES.quarter;
                logSystem('🎖️ Регулярний сезон пройдено. Команда вийшла у плей-оф: чвертьфінал.');
            } else {
                logSystem('💔 Регулярний сезон завершено без виходу в плей-оф.');
                resetToNextSeason(false);
            }
        }
    } else if (isPlayerWin && state.tournamentStage === STAGES.quarter) {
        state.tournamentStage = STAGES.semi;
        logSystem('🔥 Перемога у чвертьфіналі. Далі півфінал.');
    } else if (isPlayerWin && state.tournamentStage === STAGES.semi) {
        state.tournamentStage = STAGES.final;
        logSystem('🏆 Команда вийшла у фінал сезону.');
    } else if (isPlayerWin && state.tournamentStage === STAGES.final) {
        state.money += 5000;
        logSystem(`👑 Чемпіони сезону ${state.seasonNumber}! Бонус титулу +$5000.`);
        resetToNextSeason(true);
    } else {
        logSystem('💔 Виліт із плей-оф. Починається новий сезон.');
        resetToNextSeason(false);
    }

    teamsRating.forEach(t => {
        if (!t.isPlayer) t.points = Math.max(0, t.points + Math.floor(Math.random() * 31) - 12);
    });

    triggerRandomEvent();
    generateNewMarketPool();
    rollNextEnemy();
    updateUI();
    renderRatingTable();
    autoSave('match-finished');
}

function resetToNextSeason(wonTitle = false) {
    state.seasonHistory.unshift({
        season: state.seasonNumber,
        wins: state.tournamentWins,
        losses: state.tournamentLosses,
        result: wonTitle ? 'Чемпіонство' : state.tournamentStage
    });
    state.seasonHistory = state.seasonHistory.slice(0, 5);
    state.seasonNumber++;
    state.tournamentStage = STAGES.regular;
    state.tournamentMatchesPlayed = 0;
    state.tournamentWins = 0;
    state.tournamentLosses = 0;
    state.chemistry = Math.max(45, state.chemistry - 8);
    state.players.forEach(p => { p.form = Math.max(-2, Math.min(2, p.form)); });
    autoSave('new-season');
}

const originalHandleVetoAction = handleVetoAction;
handleVetoAction = function(mapName) {
    originalHandleVetoAction(mapName);
    autoSave('veto-action');
};

const originalEnemyVetoAction = enemyVetoAction;
enemyVetoAction = function(actionType) {
    originalEnemyVetoAction(actionType);
    autoSave('enemy-veto');
};

const originalStartVetoPhase = window.startVetoPhase;
window.startVetoPhase = function() {
    const tacticsSelect = document.getElementById('ui-tactics');
    if (tacticsSelect) state.chosenTactic = tacticsSelect.value;
    autoSave('match-start');
    originalStartVetoPhase();
};

const originalLogSystem = logSystem;
logSystem = function(msg) {
    originalLogSystem(msg);
};

window.onload = function() {
    loadGame();
    if (state.userTeamFullName === '') {
        document.getElementById('game-interface').style.display = 'none';
        createTeamSelectionScreen();
    } else {
        document.getElementById('game-interface').style.display = 'block';
        document.getElementById('ui-team-fullname').innerText = state.userTeamFullName.toUpperCase();
        injectMapMasteryUI();
        if (!marketPool.length) generateNewMarketPool();
        rollNextEnemy();
    }
    updateUI();
    autoSave('load');
};
// === CODEX ECONOMY TIERS AND GLOBAL STATS PATCH ===
const TOURNAMENT_TIERS = {
    tier1: {
        label: 'Tier 1',
        name: 'Major / Elite Championship',
        requiredRank: 8,
        regularPrizeWin: 4200,
        regularPrizeLoss: 1300,
        sponsorBase: 1450,
        titleBonus: 14000,
        stageMultipliers: { regular: 1, quarter: 1.7, semi: 2.4, final: 3.4 },
        opponentMinRank: 1,
        opponentMaxRank: 12,
        pointsWin: 34,
        pointsLoss: -16,
        fanWin: 180,
        fanLoss: -45
    },
    tier2: {
        label: 'Tier 2',
        name: 'Challenger League',
        requiredRank: 18,
        regularPrizeWin: 2600,
        regularPrizeLoss: 850,
        sponsorBase: 900,
        titleBonus: 8000,
        stageMultipliers: { regular: 1, quarter: 1.55, semi: 2.1, final: 2.9 },
        opponentMinRank: 7,
        opponentMaxRank: 22,
        pointsWin: 24,
        pointsLoss: -11,
        fanWin: 120,
        fanLoss: -32
    },
    tier3: {
        label: 'Tier 3',
        name: 'Regional Cup',
        requiredRank: 99,
        regularPrizeWin: 1700,
        regularPrizeLoss: 650,
        sponsorBase: 520,
        titleBonus: 4200,
        stageMultipliers: { regular: 1, quarter: 1.4, semi: 1.85, final: 2.35 },
        opponentMinRank: 15,
        opponentMaxRank: 99,
        pointsWin: 16,
        pointsLoss: -8,
        fanWin: 80,
        fanLoss: -22
    }
};

function getCurrentTierKey() {
    return state.currentTournamentTier || 'tier3';
}

function getCurrentTier() {
    return TOURNAMENT_TIERS[getCurrentTierKey()] || TOURNAMENT_TIERS.tier3;
}

function getStageKey() {
    if (state.tournamentStage === STAGES.final) return 'final';
    if (state.tournamentStage === STAGES.semi) return 'semi';
    if (state.tournamentStage === STAGES.quarter) return 'quarter';
    return 'regular';
}

function getPlayerRankPosition() {
    restoreRatingsIfNeeded();
    teamsRating.sort((a, b) => b.points - a.points);
    const index = teamsRating.findIndex(t => t.isPlayer);
    return index >= 0 ? index + 1 : teamsRating.length;
}

function chooseTournamentTier() {
    const rank = getPlayerRankPosition();
    if (rank <= TOURNAMENT_TIERS.tier1.requiredRank) return 'tier1';
    if (rank <= TOURNAMENT_TIERS.tier2.requiredRank) return 'tier2';
    return 'tier3';
}

function ensurePlayerStats(player) {
    const skill = player.skill || getPlayerBaseSkill(player.name);
    const baseRating = Math.max(0.72, Math.min(1.35, 0.72 + (skill - 55) / 100));
    const matches = player.stats?.matches || Math.floor(8 + Math.random() * 24);
    const deaths = player.stats?.deaths || Math.max(1, Math.round(matches * (13 + Math.random() * 5)));
    const kdTarget = Math.max(0.72, Math.min(1.38, 0.72 + (skill - 55) / 80 + Math.random() * 0.16));
    const kills = player.stats?.kills || Math.round(deaths * kdTarget);
    player.stats = {
        kills,
        deaths,
        mvps: player.stats?.mvps || Math.max(0, Math.floor((skill - 58) / 12 + Math.random() * 3)),
        matches,
        rating: Number(((player.stats?.matches && player.stats?.rating) ? player.stats.rating : baseRating + (kdTarget - 1) * 0.22 + Math.random() * 0.12).toFixed(2))
    };
    player.salary = getPlayerSalary(player);
    return player;
}

function seedAllTeamStats() {
    teamsRating.forEach(team => {
        team.players = (team.players || []).map((player, index) => ensurePlayerStats(createPlayerProfile(player.name, index, player)));
    });
    syncPlayerTeamInRating();
}

getPlayerSalary = function(player) {
    const roleBonus = player.role === 'IGL' ? 70 : player.role === 'AWP' ? 95 : 45;
    const starTax = Math.max(0, player.skill - 82) * 10;
    return Math.max(220, Math.round(player.skill * 4.6 + roleBonus + starTax));
};

getTransferPrice = function(player, multiplier = 1) {
    const form = player.form || 0;
    const roleTax = player.role === 'AWP' ? 1.16 : player.role === 'IGL' ? 1.08 : 1;
    const starTax = Math.max(0, player.skill - 82) * 260;
    return Math.max(650, Math.round((Math.pow(player.skill - 48, 2) * 5.2 + player.skill * 18 + form * 65 + starTax) * roleTax * multiplier));
};

const ensureStateSchemaBeforeTiers = ensureStateSchema;
ensureStateSchema = function() {
    ensureStateSchemaBeforeTiers();
    state.currentTournamentTier = state.currentTournamentTier || chooseTournamentTier();
    state.completedTournaments = Array.isArray(state.completedTournaments) ? state.completedTournaments : [];
    state.finances = {
        sponsorBase: getCurrentTier().sponsorBase,
        ...state.finances,
        salaries: state.players.reduce((sum, p) => sum + getPlayerSalary(p), 0)
    };
    if (Array.isArray(teamsRating) && teamsRating.length) seedAllTeamStats();
};

const initializeRatingsForTeamBeforeGlobalStats = initializeRatingsForTeam;
initializeRatingsForTeam = function(teamName) {
    initializeRatingsForTeamBeforeGlobalStats(teamName);
    state.currentTournamentTier = chooseTournamentTier();
    seedAllTeamStats();
};

function calculateSponsors() {
    const tier = getCurrentTier();
    const rank = getPlayerRankPosition();
    const rankBonus = Math.max(0, 26 - rank) * 22;
    return Math.floor(tier.sponsorBase + state.fans * 0.34 + state.chemistry * 4 + rankBonus);
}

function calculateBaseCosts() {
    return 140 + state.bootcampLevel * 135;
}

function getEconomySnapshot() {
    const salaries = state.players.reduce((sum, p) => sum + getPlayerSalary(p), 0);
    const sponsors = calculateSponsors();
    const baseCosts = calculateBaseCosts();
    return { sponsors, salaries, baseCosts, lastBalance: sponsors - salaries - baseCosts };
}

const renderManagerPanelsBeforeTiers = renderManagerPanels;
renderManagerPanels = function() {
    renderManagerPanelsBeforeTiers();
    const sideColumn = document.querySelector('.main-layout > div:nth-child(2)');
    if (!sideColumn) return;

    const economy = getEconomySnapshot();
    state.finances = { ...state.finances, ...economy, sponsorBase: getCurrentTier().sponsorBase };
    const finance = document.getElementById('club-finance-panel');
    if (finance) {
        finance.innerHTML = `
            <h3>Економіка клубу</h3>
            <div class="stat-line"><span>Турнір:</span><span class="highlight">${getCurrentTier().label}</span></div>
            <div class="stat-line"><span>Зарплати:</span><span>-$${economy.salaries}</span></div>
            <div class="stat-line"><span>Спонсори:</span><span class="highlight">+$${economy.sponsors}</span></div>
            <div class="stat-line"><span>База:</span><span>-$${economy.baseCosts}</span></div>
            <div class="stat-line"><span>Баланс без призу:</span><span class="highlight">${economy.lastBalance >= 0 ? '+$' + economy.lastBalance : '-$' + Math.abs(economy.lastBalance)}</span></div>
        `;
    }

    let tierPanel = document.getElementById('tournament-tier-panel');
    if (!tierPanel) {
        tierPanel = document.createElement('div');
        tierPanel.id = 'tournament-tier-panel';
        tierPanel.className = 'panel codex-panel';
        sideColumn.appendChild(tierPanel);
    }
    const rank = getPlayerRankPosition();
    const tier = getCurrentTier();
    const nextTier = chooseTournamentTier();
    tierPanel.innerHTML = `
        <h3>Турнір сезону</h3>
        <div class="tier-badge ${getCurrentTierKey()}">${tier.label}</div>
        <div class="autosave-note">${tier.name}</div>
        <div class="stat-line"><span>Ранг клубу:</span><span>#${rank}</span></div>
        <div class="stat-line"><span>Наступний сезон:</span><span>${TOURNAMENT_TIERS[nextTier].label}</span></div>
        <div class="autosave-note">Tier 1: топ-8, Tier 2: топ-18, Tier 3: решта рейтингу.</div>
    `;
};

rollNextEnemy = function() {
    restoreRatingsIfNeeded();
    const tier = getCurrentTier();
    const ranked = teamsRating
        .filter(t => !t.isPlayer)
        .sort((a, b) => b.points - a.points)
        .map((team, index) => ({ ...team, rank: index + 1 }));
    let pool = ranked.filter(t => t.rank >= tier.opponentMinRank && t.rank <= tier.opponentMaxRank);
    if (!pool.length) pool = ranked;
    const randomEnemy = pool[Math.floor(Math.random() * pool.length)];
    state.currentEnemy.name = randomEnemy.name;
    state.currentEnemy.skill = randomEnemy.players.reduce((sum, p) => sum + p.skill + (p.form || 0), 0) / randomEnemy.players.length;
    const enemyEl = document.getElementById('ui-enemy-name');
    if (enemyEl) enemyEl.innerText = `${state.currentEnemy.name} (${tier.label})`;
};

processMatchExpenses = function() {
    const economy = getEconomySnapshot();
    state.money -= economy.salaries + economy.baseCosts;
    state.finances = { ...state.finances, ...economy };
    logSystem(`💸 Витрати клубу: зарплати -$${economy.salaries}, база -$${economy.baseCosts}.`);
    return economy.salaries + economy.baseCosts;
};

function updateOtherTeamStatsAfterRound(team, didWin) {
    if (!team || !team.players) return;
    team.players.forEach(player => {
        ensurePlayerStats(player);
        const deaths = Math.round(10 + Math.random() * 9 + (didWin ? -1 : 2));
        const kdBase = 0.78 + (player.skill - 60) / 95 + (didWin ? 0.18 : -0.08);
        const kills = Math.max(2, Math.round(deaths * Math.max(0.55, kdBase + Math.random() * 0.28)));
        const mapRating = Math.max(0.55, Math.min(1.85, 0.72 + (kills / Math.max(1, deaths)) * 0.42 + (didWin ? 0.08 : -0.04)));
        player.stats.kills += kills;
        player.stats.deaths += deaths;
        player.stats.matches += 1;
        player.stats.rating = Number((((player.stats.rating || 1) * Math.max(0, player.stats.matches - 1) + mapRating) / player.stats.matches).toFixed(2));
    });
    const best = team.players.reduce((prev, curr) => (curr.stats.rating > prev.stats.rating ? curr : prev), team.players[0]);
    if (best && didWin && Math.random() < 0.45) best.stats.mvps += 1;
}

function simulateWorldMatches(isPlayerWin) {
    const playerOpponent = teamsRating.find(t => t.name === state.currentEnemy.name.replace(/ \(Tier [123]\)$/,''));
    updateOtherTeamStatsAfterRound(playerOpponent, !isPlayerWin);
    teamsRating.forEach(team => {
        if (team.isPlayer || team === playerOpponent) return;
        const didWin = Math.random() < 0.5 + (team.points - 700) / 4000;
        updateOtherTeamStatsAfterRound(team, didWin);
        team.points = Math.max(0, team.points + (didWin ? Math.floor(4 + Math.random() * 13) : -Math.floor(3 + Math.random() * 9)));
    });
}

finishBo3Series = function(isPlayerWin) {
    document.getElementById('game-interface').style.display = 'block';
    document.getElementById('match-screen').style.display = 'none';
    switchTab('hub');

    const playerTeamInRating = teamsRating.find(t => t.isPlayer);
    const tier = getCurrentTier();
    const stageKey = getStageKey();
    const stageMultiplier = tier.stageMultipliers[stageKey] || 1;
    const sponsorBonus = calculateSponsors();
    const prize = Math.floor((isPlayerWin ? tier.regularPrizeWin : tier.regularPrizeLoss) * stageMultiplier);
    const fanChange = isPlayerWin
        ? Math.floor((tier.fanWin + Math.random() * tier.fanWin * 0.65) * stageMultiplier)
        : -Math.floor(tier.fanLoss + Math.random() * tier.fanLoss * 0.7);
    const pointsChange = Math.floor((isPlayerWin ? tier.pointsWin : tier.pointsLoss) * stageMultiplier + Math.random() * 8);

    state.money += prize + sponsorBonus;
    state.fans = Math.max(100, state.fans + fanChange);
    state.chemistry = Math.max(20, Math.min(100, state.chemistry + (isPlayerWin ? 4 : -5)));
    if (playerTeamInRating) playerTeamInRating.points = Math.max(0, playerTeamInRating.points + pointsChange);

    processMatchExpenses();
    updatePlayerFormsAfterSeries(isPlayerWin);
    simulateWorldMatches(isPlayerWin);

    if (state.tournamentStage === STAGES.regular) {
        state.tournamentMatchesPlayed++;
        if (isPlayerWin) state.tournamentWins++; else state.tournamentLosses++;
        logSystem(`${isPlayerWin ? '🏆 Перемога' : '❌ Поразка'} у ${tier.label}. Приз $${prize}, спонсори $${sponsorBonus}, фанати ${fanChange >= 0 ? '+' : ''}${fanChange}.`);
        if (state.tournamentMatchesPlayed >= 5) {
            if (state.tournamentWins >= 3) {
                state.tournamentStage = STAGES.quarter;
                logSystem(`🎖️ ${tier.label}: вихід у плей-оф, чвертьфінал.`);
            } else {
                logSystem(`💔 ${tier.label}: сезон завершено без плей-оф.`);
                resetToNextSeason(false);
            }
        }
    } else if (isPlayerWin && state.tournamentStage === STAGES.quarter) {
        state.tournamentStage = STAGES.semi;
        logSystem(`🔥 ${tier.label}: перемога у чвертьфіналі. Далі півфінал.`);
    } else if (isPlayerWin && state.tournamentStage === STAGES.semi) {
        state.tournamentStage = STAGES.final;
        logSystem(`🏆 ${tier.label}: команда вийшла у фінал.`);
    } else if (isPlayerWin && state.tournamentStage === STAGES.final) {
        state.money += tier.titleBonus;
        logSystem(`👑 Чемпіони ${tier.label} сезону ${state.seasonNumber}! Бонус титулу +$${tier.titleBonus}.`);
        resetToNextSeason(true);
    } else {
        logSystem(`💔 Виліт із плей-оф ${tier.label}. Починається новий сезон.`);
        resetToNextSeason(false);
    }

    generateNewMarketPool();
    rollNextEnemy();
    updateUI();
    renderRatingTable();
    autoSave('tier-match-finished');
};

resetToNextSeason = function(wonTitle = false) {
    state.completedTournaments.unshift({
        season: state.seasonNumber,
        tier: getCurrentTier().label,
        wins: state.tournamentWins,
        losses: state.tournamentLosses,
        result: wonTitle ? 'Чемпіонство' : state.tournamentStage
    });
    state.completedTournaments = state.completedTournaments.slice(0, 6);
    state.seasonHistory = state.completedTournaments;
    state.seasonNumber++;
    state.tournamentStage = STAGES.regular;
    state.tournamentMatchesPlayed = 0;
    state.tournamentWins = 0;
    state.tournamentLosses = 0;
    state.currentTournamentTier = chooseTournamentTier();
    state.chemistry = Math.max(48, state.chemistry - 6);
    state.players.forEach(p => { p.form = Math.max(-2, Math.min(2, p.form)); p.salary = getPlayerSalary(p); });
    autoSave('tier-new-season');
};

const scoutTeamBeforeGlobalStats = scoutTeam;
scoutTeam = function(teamName) {
    const placeholder = document.getElementById('scouting-placeholder');
    const content = document.getElementById('scouting-content');
    const title = document.getElementById('scout-team-name');
    const list = document.getElementById('scout-players-list');
    if(!placeholder || !content || !list) return;

    placeholder.style.display = 'none';
    content.style.display = 'block';
    const targetTeam = teamsRating.find(t => t.name === teamName);
    if (!targetTeam) return;
    targetTeam.players.forEach(ensurePlayerStats);
    title.innerText = `Ростер команди: ${targetTeam.name}`;
    list.innerHTML = '';

    targetTeam.players.forEach((player, pIndex) => {
        const calculatedPrice = getTransferPrice(player, targetTeam.isPlayer ? 0 : 1.15);
        const deaths = Math.max(1, player.stats.deaths);
        const kd = (player.stats.kills / deaths).toFixed(2);
        const div = document.createElement('div');
        div.className = 'player-card scout-stat-card';
        div.innerHTML = `
            <div class="scout-line"><b>${player.name}</b><span class="highlight">${player.role} | Skill ${player.skill}</span></div>
            <div class="scout-stats">
                <span>K/D ${kd}</span><span>Rating ${Number(player.stats.rating || 1).toFixed(2)}</span><span>MVP ${player.stats.mvps || 0}</span><span>Матчі ${player.stats.matches || 0}</span>
            </div>
            ${targetTeam.isPlayer ? '<div class="transfer-meta">Це твій гравець.</div>' : `<button onclick="buyScoutedPlayer('${teamName.replace(/'/g, "\\'")}', ${pIndex}, ${calculatedPrice})" style="background:#2563eb;color:#fff;">Викупити ($${calculatedPrice})</button>`}
        `;
        list.appendChild(div);
    });
};

window.buyScoutedPlayer = function(teamName, pIndex, calculatedPrice) {
    const targetTeam = teamsRating.find(t => t.name === teamName);
    if (!targetTeam || !targetTeam.players[pIndex]) return;
    if (state.selectedPlayerToReplace === null) {
        alert('Спочатку оберіть свого гравця для заміни.');
        return;
    }
    if (state.money < calculatedPrice) {
        alert('Недостатньо грошей для трансферу.');
        return;
    }
    const player = targetTeam.players[pIndex];
    const kicked = state.players[state.selectedPlayerToReplace];
    state.money -= calculatedPrice;
    state.players[state.selectedPlayerToReplace] = createPlayerProfile(player.name, state.selectedPlayerToReplace, { ...player, id: kicked.id });
    targetTeam.players[pIndex] = createPlayerProfile(kicked.name, pIndex, kicked);
    state.selectedPlayerToReplace = null;
    state.chemistry = Math.max(25, state.chemistry - 18);
    logSystem(`🔎 Викуп зі скаутингу: <b>${player.name}</b> перейшов із ${teamName}.`);
    syncPlayerTeamInRating();
    updateUI();
    scoutTeam(teamName);
    autoSave('scouted-transfer');
};

const renderRatingTableBeforeTierLabels = renderRatingTable;
renderRatingTable = function() {
    renderRatingTableBeforeTierLabels();
    const rows = document.querySelectorAll('#rating-table-container .stat-line');
    teamsRating.sort((a, b) => b.points - a.points);
    rows.forEach((row, index) => {
        const tier = index < 8 ? 'T1' : index < 18 ? 'T2' : 'T3';
        const badge = document.createElement('span');
        badge.className = `mini-tier ${tier.toLowerCase()}`;
        badge.textContent = tier;
        const nameWrap = row.querySelector('div:first-child');
        if (nameWrap && !nameWrap.querySelector('.mini-tier')) nameWrap.appendChild(badge);
    });
};
// === CODEX REALISTIC CS2 TOURNAMENT PATCH ===
const REALISM_TIER_CONFIG = {
    tier1: { label: 'Tier 1', name: 'Elite Masters', size: 8, promotion: 0, relegation: 2, color: '#f59e0b' },
    tier2: { label: 'Tier 2', name: 'Challenger Series', size: 10, promotion: 2, relegation: 3, color: '#38bdf8' },
    tier3: { label: 'Tier 3', name: 'Regional League', size: 11, promotion: 3, relegation: 0, color: '#10b981' }
};

function clampPlayerSkill(player) {
    player.skill = Math.max(45, Math.min(100, Math.round(player.skill || getPlayerBaseSkill(player.name))));
    return player;
}

function getAveragePlayerRating(player) {
    return Number(player.stats?.rating || 1).toFixed(2);
}

function getPlayerKd(player) {
    return ((player.stats?.kills || 0) / Math.max(1, player.stats?.deaths || 0)).toFixed(2);
}

function ensureTrainingState() {
    state.matchesSinceTraining = state.matchesSinceTraining || 0;
    state.trainingReminderDismissedAt = state.trainingReminderDismissedAt || 0;
    state.players.forEach(clampPlayerSkill);
    teamsRating.forEach(team => team.players.forEach(clampPlayerSkill));
}

const ensureStateSchemaBeforeRealism = ensureStateSchema;
ensureStateSchema = function() {
    ensureStateSchemaBeforeRealism();
    ensureTrainingState();
    state.tournamentTables = state.tournamentTables || buildTournamentTables();
};

function buildTournamentTables() {
    restoreRatingsIfNeeded();
    const sorted = [...teamsRating].sort((a, b) => b.points - a.points);
    return {
        tier1: sorted.slice(0, 8).map(createTournamentRow),
        tier2: sorted.slice(8, 18).map(createTournamentRow),
        tier3: sorted.slice(18).map(createTournamentRow)
    };
}

function createTournamentRow(team) {
    return {
        name: team.name,
        points: team.points,
        wins: 0,
        losses: 0,
        roundDiff: 0,
        isPlayer: !!team.isPlayer
    };
}

function refreshTournamentTablesFromRatings() {
    state.tournamentTables = buildTournamentTables();
}

function getTeamTierKey(teamName) {
    const tables = state.tournamentTables || buildTournamentTables();
    for (const tierKey of Object.keys(tables)) {
        if (tables[tierKey].some(row => row.name === teamName)) return tierKey;
    }
    return chooseTournamentTier();
}

function updateTournamentRow(teamName, didWin, roundDiff = 0) {
    state.tournamentTables = state.tournamentTables || buildTournamentTables();
    const tierKey = getTeamTierKey(teamName);
    const row = state.tournamentTables[tierKey].find(r => r.name === teamName);
    if (!row) return;
    if (didWin) row.wins += 1; else row.losses += 1;
    row.roundDiff += roundDiff;
    row.points += didWin ? 3 : 0;
}

function simulateTournamentRoundForAllTiers(playerOpponentName, isPlayerWin) {
    state.tournamentTables = state.tournamentTables || buildTournamentTables();
    updateTournamentRow(state.userTeamFullName, isPlayerWin, isPlayerWin ? 5 : -5);
    updateTournamentRow(playerOpponentName, !isPlayerWin, isPlayerWin ? -5 : 5);

    Object.keys(state.tournamentTables).forEach(tierKey => {
        const rows = state.tournamentTables[tierKey];
        const candidates = rows.filter(row => row.name !== state.userTeamFullName && row.name !== playerOpponentName);
        for (let i = 0; i < candidates.length - 1; i += 2) {
            const a = teamsRating.find(t => t.name === candidates[i].name);
            const b = teamsRating.find(t => t.name === candidates[i + 1].name);
            if (!a || !b) continue;
            const aPower = a.players.reduce((sum, p) => sum + p.skill + (p.form || 0), 0) / a.players.length + a.points / 90;
            const bPower = b.players.reduce((sum, p) => sum + p.skill + (p.form || 0), 0) / b.players.length + b.points / 90;
            const aWin = Math.random() < aPower / Math.max(1, aPower + bPower);
            updateTournamentRow(a.name, aWin, aWin ? 4 : -4);
            updateTournamentRow(b.name, !aWin, aWin ? -4 : 4);
            updateOtherTeamStatsAfterRound(a, aWin);
            updateOtherTeamStatsAfterRound(b, !aWin);
        }
        rows.sort((a, b) => (b.wins - a.wins) || (b.roundDiff - a.roundDiff) || (b.points - a.points));
    });
}

function applyPromotionRelegation() {
    state.tournamentTables = state.tournamentTables || buildTournamentTables();
    const tier1 = [...state.tournamentTables.tier1].sort((a, b) => (b.wins - a.wins) || (b.roundDiff - a.roundDiff) || (b.points - a.points));
    const tier2 = [...state.tournamentTables.tier2].sort((a, b) => (b.wins - a.wins) || (b.roundDiff - a.roundDiff) || (b.points - a.points));
    const tier3 = [...state.tournamentTables.tier3].sort((a, b) => (b.wins - a.wins) || (b.roundDiff - a.roundDiff) || (b.points - a.points));

    const relegatedFromT1 = tier1.slice(-REALISM_TIER_CONFIG.tier1.relegation);
    const promotedFromT2 = tier2.slice(0, REALISM_TIER_CONFIG.tier2.promotion);
    const relegatedFromT2 = tier2.slice(-REALISM_TIER_CONFIG.tier2.relegation);
    const promotedFromT3 = tier3.slice(0, REALISM_TIER_CONFIG.tier3.promotion);

    const nextT1 = tier1.filter(r => !relegatedFromT1.some(x => x.name === r.name)).concat(promotedFromT2).slice(0, 8);
    const nextT2 = tier2
        .filter(r => !promotedFromT2.some(x => x.name === r.name) && !relegatedFromT2.some(x => x.name === r.name))
        .concat(relegatedFromT1, promotedFromT3)
        .slice(0, 10);
    const nextT3 = tier3.filter(r => !promotedFromT3.some(x => x.name === r.name)).concat(relegatedFromT2);

    state.tournamentTables = {
        tier1: nextT1.map(resetTournamentRow),
        tier2: nextT2.map(resetTournamentRow),
        tier3: nextT3.map(resetTournamentRow)
    };
    state.currentTournamentTier = getTeamTierKey(state.userTeamFullName);
}

function resetTournamentRow(row) {
    const team = teamsRating.find(t => t.name === row.name);
    return createTournamentRow(team || row);
}

const trainTeamBeforeRealism = window.trainTeam;
window.trainTeam = function() {
    trainTeamBeforeRealism();
    state.matchesSinceTraining = 0;
    state.players.forEach(p => {
        p.skill = Math.min(100, p.skill);
        p.form = Math.min(5, (p.form || 0) + 1);
    });
    logSystem('✅ Тренувальний цикл закрито. Ризик падіння форми зменшено.');
    autoSave('realistic-training');
};

function applyTrainingDecayAfterMatch() {
    state.matchesSinceTraining = (state.matchesSinceTraining || 0) + 1;
    if (state.matchesSinceTraining >= 2) {
        state.players.forEach(player => {
            player.form = Math.max(-5, (player.form || 0) - 1);
        });
        logSystem(`⚠️ Нагадування: команда не тренувалась ${state.matchesSinceTraining} матчі. Форма почала просідати.`);
    }
    if (state.matchesSinceTraining >= 4) {
        state.players.forEach(player => {
            if (Math.random() < 0.35) player.skill = Math.max(45, player.skill - 1);
        });
        logSystem('📉 Без тренувань частина гравців втратила скіл. Стеля розвитку лишається 100.');
    }
}

function addMapStatsToSeries(mapStats) {
    seriesState.seriesPlayerStats = seriesState.seriesPlayerStats || {};
    mapStats.forEach(row => {
        if (!seriesState.seriesPlayerStats[row.name]) {
            seriesState.seriesPlayerStats[row.name] = { name: row.name, kills: 0, deaths: 0, ratingSum: 0, maps: 0 };
        }
        const target = seriesState.seriesPlayerStats[row.name];
        target.kills += row.kills;
        target.deaths += row.deaths;
        target.ratingSum += Number(row.rating || 1);
        target.maps += 1;
    });
}

function applySeriesStatsAndMVP(isPlayerWin) {
    const stats = Object.values(seriesState.seriesPlayerStats || {});
    if (!stats.length) return;
    let best = null;
    stats.forEach(row => {
        const player = state.players.find(p => p.name === row.name);
        if (!player) return;
        const kd = row.kills / Math.max(1, row.deaths);
        const seriesRating = Math.max(0.55, Math.min(1.9, (row.ratingSum / Math.max(1, row.maps)) + (isPlayerWin ? 0.04 : -0.03) + kd * 0.08));
        player.stats.kills += row.kills;
        player.stats.deaths += row.deaths;
        player.stats.matches += 1;
        player.stats.rating = Number((((player.stats.rating || 1) * Math.max(0, player.stats.matches - 1) + seriesRating) / player.stats.matches).toFixed(2));
        if (typeof window.addPlayerLevelProgress === 'function') window.addPlayerLevelProgress(player, isPlayerWin ? 5 : -5);
        const mvpScore = seriesRating * 100 + row.kills - row.deaths * 0.25;
        if (!best || mvpScore > best.mvpScore) best = { player, mvpScore, seriesRating };
    });

    if (best) {
        best.player.stats.mvps += 1;
        best.player.skill = Math.min(100, best.player.skill + 1);
        best.player.form = Math.min(5, (best.player.form || 0) + 2);
        state.lastMVP = best.player.name;
        logSystem(`🏆 MVP матчу: <b>${best.player.name}</b> (${best.seriesRating.toFixed(2)} rating). Розвиток +1, максимум 100.`);
    }
}

startBo3Series = function() {
    seriesState.playerScore = 0;
    seriesState.enemyScore = 0;
    seriesState.currentMapIndex = 0;
    seriesState.seriesPlayerStats = {};
    document.getElementById('live-score').innerText = '0 : 0';
    document.getElementById('live-series-score').innerText = 'Серія: 0 - 0';
    if (document.getElementById('live-player-name')) document.getElementById('live-player-name').innerText = state.userTeamTag;
    if (document.getElementById('live-enemy-name')) document.getElementById('live-enemy-name').innerText = state.currentEnemy.name.substring(0, 4).toUpperCase();
    const tacticNames = { balanced: 'Стандарт', rush: 'Агресія', defense: 'Захист' };
    document.getElementById('live-tactic-display').innerText = `Тактика: ${tacticNames[state.chosenTactic]}`;
    savePositions();
    openTournamentWindow(false);
    playNextBo3Map();
};

startSingleMapSimulation = function(mapName, onMapEnd) {
    document.getElementById('match-screen').style.display = 'block';
    let pRoundScore = 0, eRoundScore = 0, currentRound = 1, playerLossStreak = 0, playerRoundMoney = 800;
    let inOvertime = false, pOtScore = 0, eOtScore = 0;
    const mapStats = state.players.map(p => ({ name: p.name, kills: 0, deaths: 0, rating: 1.0 }));
    const ticker = document.getElementById('live-ticker');
    const scoreEl = document.getElementById('live-score');
    ticker.innerHTML = `<span style="color:#f59e0b; font-weight:bold;">--- ${mapName.toUpperCase()} | MVP буде після всієї гри ---</span>`;

    const matchInterval = setInterval(() => {
        let teamPower = getTeamSkill(mapName);
        let ecoPenalty = 0;
        if (state.chosenTactic === 'rush') teamPower += Math.random() < 0.5 ? 4 : -2;
        else if (state.chosenTactic === 'defense') teamPower += 1.5;
        if (currentRound !== 1 && currentRound !== 13 && !inOvertime && playerRoundMoney < 3000) ecoPenalty = 14;
        const totalPower = Math.max(1, teamPower - ecoPenalty + state.currentEnemy.skill);
        const winChance = Math.min(0.82, Math.max(0.18, (teamPower - ecoPenalty) / totalPower));
        const roundWinner = Math.random() < winChance ? 'player' : 'enemy';
        let logText = '';
        if (roundWinner === 'player') {
            pRoundScore++; if (inOvertime) pOtScore++; playerLossStreak = 0;
            playerRoundMoney = Math.min(playerRoundMoney + 3250, 16000);
            const hero = pickWeightedPlayer();
            const row = mapStats.find(s => s.name === hero.name);
            const kills = 1 + Math.floor(Math.random() * 3);
            row.kills += kills;
            mapStats.forEach(s => { if (Math.random() < 0.34) s.deaths += 1; });
            const phrase = Math.random() < 0.5 ? ctPhrases[Math.floor(Math.random() * ctPhrases.length)] : tPhrases[Math.floor(Math.random() * tPhrases.length)];
            logText = `<span style="color:#38bdf8;">[${state.userTeamTag}] Раунд ${currentRound}:</span> <b>${hero.name}</b> ${phrase}`;
        } else {
            eRoundScore++; if (inOvertime) eOtScore++; playerLossStreak = Math.min(playerLossStreak + 1, 5);
            playerRoundMoney = Math.min(playerRoundMoney + 1400 + playerLossStreak * 500, 16000);
            mapStats.forEach(s => { if (Math.random() < 0.62) s.deaths += 1; if (Math.random() < 0.18) s.kills += 1; });
            logText = `<span style="color:#f87171;">[${state.currentEnemy.name.substring(0,4).toUpperCase()}] Раунд ${currentRound}:</span> суперник забирає раунд.`;
        }
        ticker.innerHTML = `${logText}<br>${ticker.innerHTML}`;
        scoreEl.innerText = `${pRoundScore} : ${eRoundScore}`;
        currentRound++;

        let isMapOver = false;
        if (!inOvertime) {
            if (pRoundScore === 13 || eRoundScore === 13) isMapOver = true;
            else if (pRoundScore === 12 && eRoundScore === 12) { inOvertime = true; pOtScore = 0; eOtScore = 0; }
        } else if (pOtScore === 4 || eOtScore === 4) isMapOver = true;
        else if (pOtScore === 3 && eOtScore === 3) { pOtScore = 0; eOtScore = 0; }

        if (isMapOver) {
            clearInterval(matchInterval);
            mapStats.forEach(s => {
                const kd = s.kills / Math.max(1, s.deaths);
                s.rating = Number(Math.max(0.55, Math.min(1.85, 0.72 + kd * 0.42 + (pRoundScore > eRoundScore ? 0.08 : -0.04))).toFixed(2));
            });
            addMapStatsToSeries(mapStats);
            autoSave('map-finished-no-mvp');
            setTimeout(() => onMapEnd(pRoundScore > eRoundScore ? 'player' : 'enemy'), 1000);
        }
    }, 360);
};

const finishBo3SeriesBeforeRealism = finishBo3Series;
finishBo3Series = function(isPlayerWin) {
    const opponentName = state.currentEnemy.name.replace(/ \(Tier [123]\)$/,'');
    applySeriesStatsAndMVP(isPlayerWin);
    applyTrainingDecayAfterMatch();
    simulateTournamentRoundForAllTiers(opponentName, isPlayerWin);
    finishBo3SeriesBeforeRealism(isPlayerWin);
    openTournamentWindow(false);
    renderTournamentWindow();
    autoSave('realistic-match-finished');
};

const resetToNextSeasonBeforeRealism = resetToNextSeason;
resetToNextSeason = function(wonTitle = false) {
    applyPromotionRelegation();
    resetToNextSeasonBeforeRealism(wonTitle);
    state.currentTournamentTier = getTeamTierKey(state.userTeamFullName);
    logSystem(`🔁 Ротація ліг завершена. Ваш новий рівень: ${REALISM_TIER_CONFIG[state.currentTournamentTier].label}.`);
    autoSave('promotion-relegation');
};

const renderManagerPanelsBeforeRealism = renderManagerPanels;
renderManagerPanels = function() {
    renderManagerPanelsBeforeRealism();
    ensureTrainingState();
    const tierPanel = document.getElementById('tournament-tier-panel');
    if (tierPanel && !tierPanel.querySelector('.open-tournament-btn')) {
        tierPanel.insertAdjacentHTML('beforeend', '<button class="open-tournament-btn" onclick="openTournamentWindow(true)">Відкрити турнір сезону</button>');
    }
    let training = document.getElementById('training-reminder-panel');
    const sideColumn = document.querySelector('.main-layout > div:nth-child(2)');
    if (!training && sideColumn) {
        training = document.createElement('div');
        training.id = 'training-reminder-panel';
        training.className = 'panel codex-panel training-panel';
        sideColumn.appendChild(training);
    }
    if (training) {
        const danger = state.matchesSinceTraining >= 4;
        training.innerHTML = `
            <h3>Тренувальний стан</h3>
            <div class="stat-line"><span>Без тренувань:</span><span class="highlight">${state.matchesSinceTraining} матч.</span></div>
            <div class="training-meter"><span style="width:${Math.min(100, state.matchesSinceTraining * 25)}%"></span></div>
            <div class="autosave-note">${danger ? 'Терміново проведіть тренування: скіл уже може падати.' : 'Після 2 матчів без тренувань падає форма, після 4 - скіл.'}</div>
        `;
    }

    const stats = document.getElementById('player-stats-panel');
    if (stats) {
        stats.innerHTML = `
            <h3>Середня статистика за всі матчі</h3>
            <div class="stats-grid stats-head"><span>Гравець</span><span>K/D</span><span>Avg</span><span>MVP</span></div>
            ${state.players.map(p => `<div class="stats-grid"><span>${p.name}</span><span>${getPlayerKd(p)}</span><span>${getAveragePlayerRating(p)}</span><span>${p.stats.mvps || 0}</span></div>`).join('')}
            <div class="autosave-note">Матчів без тренування: ${state.matchesSinceTraining}. MVP рахується один раз за BO3.</div>
        `;
    }
};

function ensureTournamentWindow() {
    let modal = document.getElementById('tournament-modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'tournament-modal';
    modal.innerHTML = `
        <div class="tournament-window">
            <div class="tournament-window-head">
                <div><b>Симуляція турнірів CS2</b><span id="tournament-window-subtitle"></span></div>
                <button onclick="closeTournamentWindow()">Закрити</button>
            </div>
            <div id="tournament-window-body" class="tournament-window-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

window.openTournamentWindow = function(show = true) {
    const modal = ensureTournamentWindow();
    modal.style.display = show ? 'flex' : 'none';
    renderTournamentWindow();
};

window.closeTournamentWindow = function() {
    const modal = document.getElementById('tournament-modal');
    if (modal) modal.style.display = 'none';
};

function renderTournamentWindow() {
    const modal = ensureTournamentWindow();
    const body = document.getElementById('tournament-window-body');
    const subtitle = document.getElementById('tournament-window-subtitle');
    if (!body || !subtitle) return;
    state.tournamentTables = state.tournamentTables || buildTournamentTables();
    subtitle.textContent = `Сезон ${state.seasonNumber} | ${STAGES ? state.tournamentStage : ''}`;
    body.innerHTML = Object.keys(REALISM_TIER_CONFIG).map(tierKey => {
        const cfg = REALISM_TIER_CONFIG[tierKey];
        const rows = [...(state.tournamentTables[tierKey] || [])].sort((a, b) => (b.wins - a.wins) || (b.roundDiff - a.roundDiff) || (b.points - a.points));
        return `
            <section class="tier-table ${tierKey}">
                <h3>${cfg.label} <small>${cfg.name}</small></h3>
                <div class="tier-table-head"><span>#</span><span>Команда</span><span>W-L</span><span>RD</span></div>
                ${rows.map((row, index) => {
                    const zone = tierKey === 'tier1' && index >= rows.length - cfg.relegation ? 'relegation' :
                        tierKey === 'tier2' && index < cfg.promotion ? 'promotion' :
                        tierKey === 'tier2' && index >= rows.length - cfg.relegation ? 'relegation' :
                        tierKey === 'tier3' && index < cfg.promotion ? 'promotion' : '';
                    return `<div class="tier-row ${row.isPlayer ? 'player-row' : ''} ${zone}"><span>${index + 1}</span><span>${row.name}</span><span>${row.wins}-${row.losses}</span><span>${row.roundDiff >= 0 ? '+' : ''}${row.roundDiff}</span></div>`;
                }).join('')}
                <p>${cfg.promotion ? `Топ-${cfg.promotion} підвищується. ` : ''}${cfg.relegation ? `Низ ${cfg.relegation} понижується.` : 'Без пониження.'}</p>
            </section>
        `;
    }).join('');
}

const windowOnloadBeforeRealism = window.onload;
window.onload = function() {
    windowOnloadBeforeRealism();
    ensureTrainingState();
    state.tournamentTables = state.tournamentTables || buildTournamentTables();
    renderManagerPanels();
    ensureTournamentWindow();
    closeTournamentWindow();
    autoSave('realism-load');
};

// === CODEX COMPETITIVE DEPTH PATCH ===
const COMPETITIVE_CALENDAR_LIMIT = 80;

function clampMapSkill(value) {
    return Math.max(0, Math.min(30, Math.round(value || 0)));
}

function ensureMapStatsObject(source = {}) {
    const result = {};
    officialMaps.forEach(map => {
        const oldValue = typeof source[map] === 'number' ? source[map] : 0;
        const row = typeof source[map] === 'object' ? source[map] : {};
        result[map] = {
            played: Math.max(0, row.played || 0),
            wins: Math.max(0, row.wins || 0),
            skill: clampMapSkill(row.skill ?? oldValue)
        };
    });
    return result;
}

function getMapWinrate(row) {
    return row && row.played ? Math.round((row.wins / row.played) * 100) : 0;
}

function ensureCompetitiveState() {
    state.calendar = Array.isArray(state.calendar) ? state.calendar : [];
    state.matchWeek = state.matchWeek || 1;
    state.mapMastery = ensureMapStatsObject(state.mapMastery || {});
    teamsRating.forEach(team => ensureTeamCompetitiveProfile(team));
    normalizeTournamentTables();
}

function ensureTeamCompetitiveProfile(team) {
    if (!team) return team;
    team.players = (team.players || []).map((player, index) => ensurePlayerStats(createPlayerProfile(player.name, index, player)));
    team.streak = Number.isFinite(team.streak) ? team.streak : 0;
    team.matchesPlayed = team.matchesPlayed || 0;
    team.matchWins = team.matchWins || 0;
    team.mapStats = ensureMapStatsObject(team.mapStats || {});
    if (!team.mapFocus || !officialMaps.includes(team.mapFocus)) {
        team.mapFocus = officialMaps[Math.floor(Math.random() * officialMaps.length)];
    }
    return team;
}

function getTeamByName(teamName) {
    return teamsRating.find(team => team.name === teamName || team.name === String(teamName || '').replace(/ \(Tier [123]\)$/,''));
}

function normalizeTournamentTables() {
    if (!state.tournamentTables) return;
    Object.keys(state.tournamentTables).forEach(tierKey => {
        state.tournamentTables[tierKey] = (state.tournamentTables[tierKey] || []).map(row => {
            const team = getTeamByName(row.name);
            const matchPoints = row.tournamentPoints ?? (row.points > 60 ? (row.wins || 0) * 3 : row.points || 0);
            return {
                name: row.name,
                ratingPoints: team ? team.points : (row.ratingPoints || row.points || 0),
                points: Math.max(0, matchPoints),
                tournamentPoints: Math.max(0, matchPoints),
                wins: row.wins || 0,
                losses: row.losses || 0,
                roundDiff: row.mapDiff ?? row.roundDiff ?? 0,
                mapDiff: row.mapDiff ?? row.roundDiff ?? 0,
                isPlayer: !!(row.isPlayer || (team && team.isPlayer))
            };
        });
    });
}

createTournamentRow = function(team) {
    return {
        name: team.name,
        ratingPoints: team.points || 0,
        points: 0,
        tournamentPoints: 0,
        wins: 0,
        losses: 0,
        roundDiff: 0,
        mapDiff: 0,
        isPlayer: !!team.isPlayer
    };
};

function compareTournamentRows(a, b) {
    return (b.points - a.points) || (b.wins - a.wins) || ((b.mapDiff ?? b.roundDiff) - (a.mapDiff ?? a.roundDiff)) || ((b.ratingPoints || 0) - (a.ratingPoints || 0));
}

updateTournamentRow = function(teamName, didWin, mapDiff = 0) {
    ensureCompetitiveState();
    const tierKey = getTeamTierKey(teamName);
    const row = state.tournamentTables[tierKey]?.find(r => r.name === teamName);
    if (!row) return;
    const diff = Math.max(-2, Math.min(2, Math.round(mapDiff || (didWin ? 1 : -1))));
    if (didWin) row.wins += 1; else row.losses += 1;
    row.mapDiff = (row.mapDiff || 0) + diff;
    row.roundDiff = row.mapDiff;
    row.points = (row.points || 0) + (didWin ? 3 : 0);
    row.tournamentPoints = row.points;
    const team = getTeamByName(teamName);
    if (team) row.ratingPoints = team.points;
};

function pickTeamTournamentMap(team) {
    ensureTeamCompetitiveProfile(team);
    const focus = team.mapFocus;
    if (Math.random() < 0.42 && focus) return focus;
    const weighted = officialMaps
        .map(map => ({ map, score: (team.mapStats[map]?.skill || 0) + Math.random() * 12 }))
        .sort((a, b) => b.score - a.score);
    return weighted[0]?.map || officialMaps[Math.floor(Math.random() * officialMaps.length)];
}

function updateTeamMapDevelopment(team, mapName, didWin) {
    ensureTeamCompetitiveProfile(team);
    const row = team.mapStats[mapName] || { played: 0, wins: 0, skill: 0 };
    row.played += 1;
    if (didWin) row.wins += 1;
    row.skill = clampMapSkill(row.skill + (didWin ? 2 : -2));
    team.mapStats[mapName] = row;
    if (didWin && Math.random() < 0.24) team.mapFocus = mapName;
}

function updatePlayerMapDevelopment(mapName, didWin) {
    state.mapMastery = ensureMapStatsObject(state.mapMastery || {});
    const row = state.mapMastery[mapName] || { played: 0, wins: 0, skill: 0 };
    row.played += 1;
    if (didWin) row.wins += 1;
    row.skill = clampMapSkill(row.skill + 1 + (didWin ? 2 : -2));
    state.mapMastery[mapName] = row;
    logSystem(`🗺️ ${mapName}: ${didWin ? 'перемога' : 'поразка'}, бонус карти тепер +${row.skill}/30, WR ${getMapWinrate(row)}%.`);
}

const getTeamSkillBeforeCompetitiveDepth = getTeamSkill;
getTeamSkill = function(mapName = '') {
    state.mapMastery = ensureMapStatsObject(state.mapMastery || {});
    const base = state.players.reduce((sum, p) => sum + (Math.min(100, p.skill) + (p.form || 0)), 0) / 5;
    const chemBonus = (state.chemistry - 70) / 5;
    const mapBonus = mapName ? clampMapSkill(state.mapMastery[mapName]?.skill || 0) : 0;
    return base + chemBonus + mapBonus;
};

const updateMapMasteryDisplayBeforeCompetitiveDepth = updateMapMasteryDisplay;
updateMapMasteryDisplay = function() {
    const zone = document.getElementById('map-buttons-zone');
    if (!zone) return;
    state.mapMastery = ensureMapStatsObject(state.mapMastery || {});
    zone.innerHTML = '';
    officialMaps.forEach(map => {
        const row = state.mapMastery[map];
        const btn = document.createElement('button');
        btn.className = 'map-mastery-card';
        btn.innerHTML = `<b>${map}</b><span>+${row.skill}/30 скіл</span><small>WR ${getMapWinrate(row)}% • ${row.played} мап</small><small>Аналітика +2 ($150)</small>`;
        btn.onclick = () => {
            if (state.money < 150) {
                alert('Недостатньо грошей для аналітики тактик!');
                return;
            }
            state.money -= 150;
            row.skill = clampMapSkill(row.skill + 2);
            logSystem(`🗺️ Аналітика ${map}: бонус підготовки +${row.skill}/30.`);
            updateUI();
            autoSave('map-training');
        };
        zone.appendChild(btn);
    });
};

// Final world-section bindings must remain after all legacy patches.
renderRatingTable = function() {
    const container = document.getElementById('rating-table-container');
    if (!container) return;
    ensureClubRestructureState();
    container.innerHTML = [...teamsRating].sort((a, b) => b.points - a.points).map((team, index) => {
        const current = index + 1;
        const previous = state.worldPreviousRanks?.[team.name] || current;
        const trend = current < previous ? 'up' : current > previous ? 'down' : 'same';
        const arrow = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '•';
        return `
            <div class="world-rating-row ${team.isPlayer ? 'player-world-row' : ''}" onclick="scoutTeam('${team.name.replace(/'/g, "\\'")}')">
                <span class="world-rank">#${current}</span>
                <span class="world-trend ${trend}">${arrow}</span>
                <div><b>${escapeLiveText(team.name)}</b><small class="rating-form">${renderFormDots(team)}</small></div>
                <strong>${Math.round(team.points)} pts</strong>
            </div>
        `;
    }).join('');
};

scoutTeam = function(teamName) {
    const placeholder = document.getElementById('scouting-placeholder');
    const content = document.getElementById('scouting-content');
    const title = document.getElementById('scout-team-name');
    const list = document.getElementById('scout-players-list');
    const team = getTeamByName(teamName);
    if (!placeholder || !content || !title || !list || !team) return;
    ensureTeamCompetitiveProfile(team);
    ensureWeakMapForTeam(team);
    placeholder.style.display = 'none';
    content.style.display = 'block';
    title.textContent = team.name;
    list.innerHTML = `
        <div class="world-team-summary">
            <span>Форма <b class="rating-form large">${renderFormDots(team)}</b></span>
            <span>Зіграність <b>${team.chemistry || 70}%</b></span>
            <span>Пермабан <b class="negative">${escapeLiveText(team.weakMap)}</b></span>
        </div>
        <div class="world-player-ratings">
            ${team.players.map(player => `<div><span><b>${escapeLiveText(player.name)}</b><small>${escapeLiveText(player.role)}</small></span><span class="world-player-value"><strong>Rating ${Math.min(100, player.skill)}</strong><small>Ціна $${getTransferPrice(player, 1.15)}</small></span></div>`).join('')}
        </div>
        <button class="world-details-btn" onclick="toggleWorldTeamDetails('${encodeURIComponent(team.name)}')">Детальніше</button>
        <div id="world-team-details" class="world-team-details"></div>
    `;
};

renderCalendarPanel = function() {
    const slot = document.getElementById('world-calendar-slot') || document.querySelector('.legacy-panel-dock');
    if (!slot) return;
    let panel = document.getElementById('match-calendar-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'match-calendar-panel';
        panel.className = 'panel codex-panel';
        slot.appendChild(panel);
    }
    const groups = [];
    (state.calendar || []).forEach(match => {
        const key = `${match.season}-${match.week}`;
        let group = groups.find(item => item.key === key);
        if (!group) {
            group = { key, season: match.season, week: match.week, matches: [] };
            groups.push(group);
        }
        group.matches.push(match);
    });
    panel.innerHTML = `
        <div class="calendar-panel-head"><div><h3>Календар матчів</h3><small>Результати всіх Tier за турами</small></div><span>Сезон ${state.seasonNumber}</span></div>
        <div class="world-round-list">
            ${groups.slice(0, 10).map(group => {
                const playerMatch = group.matches.find(match => match.isPlayer);
                return `
                    <button onclick="openCalendarRound(${group.season}, ${group.week})">
                        <span><b>Тур ${group.week}</b><small>${group.matches.length} матчів</small></span>
                        <span class="world-round-result">${playerMatch ? `${escapeLiveText(playerMatch.teamA)} <strong>${playerMatch.score}</strong> ${escapeLiveText(playerMatch.teamB)}` : 'Повні результати'}</span>
                    </button>
                `;
            }).join('') || '<div class="autosave-note">Календар заповниться після першого матчу.</div>'}
        </div>
    `;
};

function populateTransferTeamFilter() {
    const select = document.getElementById('transfer-search-team');
    if (!select || select.dataset.ready) return;
    select.dataset.ready = 'true';
    [...teamsRating].sort((a, b) => a.name.localeCompare(b.name)).forEach(team => {
        if (team.isPlayer) return;
        const option = document.createElement('option');
        option.value = team.name;
        option.textContent = team.name;
        select.appendChild(option);
    });
}

function getTransferDatabase() {
    return teamsRating.flatMap(team => (team.players || []).map((player, index) => ({
        team,
        player: ensurePlayerStats(player),
        playerIndex: index,
        price: getTransferPrice(player, 1.15)
    }))).filter(item => !item.team.isPlayer);
}

window.applyTransferSearch = function() {
    populateTransferTeamFilter();
    const name = (document.getElementById('transfer-search-name')?.value || '').trim().toLowerCase();
    const teamName = document.getElementById('transfer-search-team')?.value || '';
    const role = document.getElementById('transfer-search-role')?.value || '';
    const minRating = Number(document.getElementById('transfer-search-rating')?.value || 0);
    const maxPrice = Number(document.getElementById('transfer-search-price')?.value || 0);
    const results = getTransferDatabase()
        .filter(item => !name || item.player.name.toLowerCase().includes(name))
        .filter(item => !teamName || item.team.name === teamName)
        .filter(item => !role || item.player.role === role)
        .filter(item => item.player.skill >= minRating)
        .filter(item => !maxPrice || item.price <= maxPrice)
        .sort((a, b) => b.player.skill - a.player.skill || a.price - b.price);
    const summary = document.getElementById('transfer-search-summary');
    const container = document.getElementById('transfer-search-results');
    if (summary) summary.textContent = `Знайдено: ${results.length} гравців`;
    if (!container) return;
    container.innerHTML = results.slice(0, 80).map(item => {
        const stats = item.player.stats;
        const kd = (stats.kills / Math.max(1, stats.deaths)).toFixed(2);
        return `
            <article class="transfer-search-card">
                <div class="transfer-search-title"><b>${escapeLiveText(item.player.name)}</b><span>Rating ${item.player.skill}</span></div>
                <div class="transfer-search-tags"><span>${escapeLiveText(item.team.name)}</span><span>${escapeLiveText(item.player.role)}</span><span>Форма ${item.player.form >= 0 ? '+' : ''}${item.player.form || 0}</span></div>
                <div class="transfer-search-stats"><span>K/D ${kd}</span><span>Матчі ${stats.matches || 0}</span><span>MVP ${stats.mvps || 0}</span></div>
                <div class="transfer-search-footer"><strong>$${item.price}</strong><button onclick="openTransferWorldProfile('${encodeURIComponent(item.team.name)}')">Профіль команди</button></div>
            </article>
        `;
    }).join('') || '<div class="empty-search-state">За цими умовами гравців не знайдено.</div>';
}

window.openTransferWorldProfile = function(encodedTeamName) {
    switchTab('rating');
    scoutTeam(decodeURIComponent(encodedTeamName));
};

generateNewMarketPool = function() {
    marketPool = [];
};

renderTransferMarket = function() {
    populateTransferTeamFilter();
    applyTransferSearch();
};

function captureWorldRankSnapshot() {
    state.worldPreviousRanks = {};
    [...teamsRating].sort((a, b) => b.points - a.points).forEach((team, index) => {
        state.worldPreviousRanks[team.name] = index + 1;
    });
}

renderRatingTable = function() {
    const container = document.getElementById('rating-table-container');
    if (!container) return;
    ensureClubRestructureState();
    const sorted = [...teamsRating].sort((a, b) => b.points - a.points);
    container.innerHTML = sorted.map((team, index) => {
        const current = index + 1;
        const previous = state.worldPreviousRanks?.[team.name] || current;
        const trend = current < previous ? 'up' : current > previous ? 'down' : 'same';
        const arrow = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '•';
        return `
            <div class="world-rating-row ${team.isPlayer ? 'player-world-row' : ''}" onclick="scoutTeam('${escapeLiveText(team.name).replace(/'/g, "\\'")}')">
                <span class="world-rank">#${current}</span>
                <span class="world-trend ${trend}">${arrow}</span>
                <div><b>${escapeLiveText(team.name)}</b><small class="rating-form">${renderFormDots(team)}</small></div>
                <strong>${Math.round(team.points)} pts</strong>
            </div>
        `;
    }).join('');
};

scoutTeam = function(teamName) {
    const placeholder = document.getElementById('scouting-placeholder');
    const content = document.getElementById('scouting-content');
    const title = document.getElementById('scout-team-name');
    const list = document.getElementById('scout-players-list');
    const team = getTeamByName(teamName);
    if (!placeholder || !content || !title || !list || !team) return;
    ensureTeamCompetitiveProfile(team);
    ensureWeakMapForTeam(team);
    placeholder.style.display = 'none';
    content.style.display = 'block';
    title.textContent = team.name;
    list.innerHTML = `
        <div class="world-team-summary">
            <span>Форма <b class="rating-form large">${renderFormDots(team)}</b></span>
            <span>Зіграність <b>${team.chemistry || 70}%</b></span>
            <span>Пермабан <b class="negative">${escapeLiveText(team.weakMap)}</b></span>
        </div>
        <div class="world-player-ratings">
            ${team.players.map(player => `<div><span><b>${escapeLiveText(player.name)}</b><small>${escapeLiveText(player.role)}</small></span><span class="world-player-value"><strong>Rating ${Math.min(100, player.skill)}</strong><small>Ціна $${getTransferPrice(player, 1.15)}</small></span></div>`).join('')}
        </div>
        <button class="world-details-btn" onclick="toggleWorldTeamDetails('${encodeURIComponent(team.name)}')">Детальніше</button>
        <div id="world-team-details" class="world-team-details"></div>
    `;
};

window.toggleWorldTeamDetails = function(encodedTeamName) {
    const team = getTeamByName(decodeURIComponent(encodedTeamName));
    const details = document.getElementById('world-team-details');
    if (!team || !details) return;
    if (details.dataset.open === 'true') {
        details.dataset.open = 'false';
        details.innerHTML = '';
        return;
    }
    details.dataset.open = 'true';
    details.innerHTML = `
        <h4>Повна статистика гравців</h4>
        ${team.players.map(player => `
            <div class="world-detail-player"><b>${escapeLiveText(player.name)}</b><span>Матчі ${player.stats.matches || 0}</span><span>K/D ${getPlayerKd(player)}</span><span>Rating ${getAveragePlayerRating(player)}</span><span>MVP ${player.stats.mvps || 0}</span></div>
        `).join('')}
        <h4>Карти команди</h4>
        <div class="world-detail-maps">${officialMaps.map(map => {
            const row = team.mapStats[map];
            return `<div class="${map === team.weakMap ? 'weak' : ''}"><b>${escapeLiveText(map)}</b><span>${row.skill >= 0 ? '+' : ''}${row.skill}/30</span><small>WR ${getMapWinrate(row)}% • ${row.played} мап</small></div>`;
        }).join('')}</div>
    `;
};

renderCalendarPanel = function() {
    const slot = document.getElementById('world-calendar-slot') || document.querySelector('.legacy-panel-dock');
    if (!slot) return;
    let panel = document.getElementById('match-calendar-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'match-calendar-panel';
        panel.className = 'panel codex-panel';
        slot.appendChild(panel);
    }
    const groups = [];
    (state.calendar || []).forEach(match => {
        const key = `${match.season}-${match.week}`;
        let group = groups.find(item => item.key === key);
        if (!group) {
            group = { key, season: match.season, week: match.week, matches: [] };
            groups.push(group);
        }
        group.matches.push(match);
    });
    panel.innerHTML = `
        <div class="calendar-panel-head"><div><h3>Календар матчів</h3><small>Результати всіх Tier за турами</small></div><span>Сезон ${state.seasonNumber}</span></div>
        <div class="world-round-list">
            ${groups.slice(0, 10).map(group => {
                const playerMatch = group.matches.find(match => match.isPlayer);
                return `
                    <button onclick="openCalendarRound(${group.season}, ${group.week})">
                        <span><b>Тур ${group.week}</b><small>${group.matches.length} матчів</small></span>
                        <span class="world-round-result">${playerMatch ? `${escapeLiveText(playerMatch.teamA)} <strong>${playerMatch.score}</strong> ${escapeLiveText(playerMatch.teamB)}` : 'Повні результати'}</span>
                    </button>
                `;
            }).join('') || '<div class="autosave-note">Календар заповниться після першого матчу.</div>'}
        </div>
    `;
};

var fiveSectionRenderRatingTable = renderRatingTable;
var fiveSectionScoutTeam = scoutTeam;
var fiveSectionRenderCalendarPanel = renderCalendarPanel;

function publishWorldPerformanceNews() {
    const candidates = teamsRating.filter(team => !team.isPlayer).flatMap(team => team.players.map(player => ({ team, player })));
    candidates.sort((a, b) => Number(b.player.stats?.rating || 0) - Number(a.player.stats?.rating || 0));
    const best = candidates[0];
    if (best) logSystem(`🌍 Найкращий Rating туру: <b>${best.player.name}</b> (${best.team.name}) — ${Number(best.player.stats.rating || 1).toFixed(2)}.`);
}

const finishBo3SeriesBeforeWorldTrends = finishBo3Series;
finishBo3Series = function(isPlayerWin) {
    captureWorldRankSnapshot();
    finishBo3SeriesBeforeWorldTrends(isPlayerWin);
    publishWorldPerformanceNews();
    renderRatingTable();
    autoSave('world-ranking-trends');
};

const renderManagerPanelsBeforeFiveSections = renderManagerPanels;
renderManagerPanels = function() {
    renderManagerPanelsBeforeFiveSections();
    ensureClubRestructureState();
    organizeFiveSectionPanels();
    rewriteClubPanels();
    renderTrainingPrograms();
};

const updateUIBeforeFiveSections = updateUI;
updateUI = function() {
    updateUIBeforeFiveSections();
    renderSimpleRoster();
    organizeFiveSectionPanels();
    rewriteClubPanels();
    renderTrainingPrograms();
};

getActiveCareerSection = function() {
    for (const section of ['hub', 'club', 'transfers', 'rating', 'training']) {
        if (document.getElementById(`tab-${section}`)?.classList.contains('active')) return section;
    }
    return 'hub';
};

updateCareerNavigation = function(section = getActiveCareerSection()) {
    document.body.classList.toggle('game-ready', !!state.userTeamFullName);
    document.body.dataset.careerSection = section;
    const copy = CLUB_SECTION_COPY[section] || CLUB_SECTION_COPY.hub;
    const title = document.getElementById('section-title');
    const description = document.getElementById('section-description');
    if (title) title.textContent = copy.title;
    if (description) description.textContent = copy.description;
    ['hub', 'club', 'transfers', 'rating', 'training'].forEach(name => {
        const tab = document.getElementById(`tab-${name}`);
        if (tab) tab.setAttribute('aria-pressed', name === section ? 'true' : 'false');
    });
};

window.switchTab = function(tabName) {
    const sections = ['hub', 'club', 'transfers', 'rating', 'training'];
    sections.forEach(name => {
        document.getElementById(`tab-${name}`)?.classList.toggle('active', name === tabName);
        const panel = document.getElementById(`${name}-tab`);
        if (panel) panel.style.display = 'none';
    });
    const activePanel = document.getElementById(`${tabName}-tab`);
    if (activePanel) activePanel.style.display = tabName === 'rating' ? 'grid' : 'block';
    if (tabName === 'transfers') renderTransferMarket();
    if (tabName === 'rating') {
        renderRatingTable();
        renderCalendarPanel();
        renderTournamentWindow();
    }
    if (tabName === 'training') {
        renderTrainingPrograms();
        updateMapMasteryDisplay();
    }
    updateCareerNavigation(tabName);
};

const windowOnloadBeforeFiveSections = window.onload;
window.onload = function() {
    windowOnloadBeforeFiveSections();
    ensureClubRestructureState();
    organizeFiveSectionPanels();
    rewriteClubPanels();
    renderSimpleRoster();
    renderTrainingPrograms();
    populateTransferTeamFilter();
    updateCareerNavigation('hub');
};

const startSingleMapBeforeCompetitiveDepth = startSingleMapSimulation;
startSingleMapSimulation = function(mapName, onMapEnd) {
    startSingleMapBeforeCompetitiveDepth(mapName, (winner) => {
        const didWin = winner === 'player';
        seriesState.mapResults = Array.isArray(seriesState.mapResults) ? seriesState.mapResults : [];
        seriesState.mapResults.push({ map: mapName, winner, playerScore: seriesState.playerScore, enemyScore: seriesState.enemyScore });
        updatePlayerMapDevelopment(mapName, didWin);
        onMapEnd(winner);
    });
};

const startBo3BeforeCompetitiveDepth = startBo3Series;
startBo3Series = function() {
    seriesState.mapResults = [];
    startBo3BeforeCompetitiveDepth();
};

const updateOtherTeamStatsBeforeCompetitiveDepth = updateOtherTeamStatsAfterRound;
updateOtherTeamStatsAfterRound = function(team, didWin, mapName = null) {
    if (!team) return;
    ensureTeamCompetitiveProfile(team);
    updateOtherTeamStatsBeforeCompetitiveDepth(team, didWin);
    team.matchesPlayed += 1;
    if (didWin) team.matchWins += 1;
    team.streak = didWin ? Math.max(1, (team.streak || 0) + 1) : Math.min(-1, (team.streak || 0) - 1);
    team.players.forEach(player => {
        if (didWin) {
            player.form = Math.min(5, (player.form || 0) + (Math.random() < 0.55 ? 1 : 0));
            if (Math.random() < 0.18) player.skill = Math.min(100, player.skill + 1);
        } else {
            player.form = Math.max(-5, (player.form || 0) - (Math.random() < 0.55 ? 1 : 0));
            if (Math.random() < 0.16) player.skill = Math.max(45, player.skill - 1);
        }
    });
    const playedMap = mapName || pickTeamTournamentMap(team);
    updateTeamMapDevelopment(team, playedMap, didWin);
};

function addCalendarResult({ tierKey, teamA, teamB, scoreA, scoreB, maps = [], isPlayer = false }) {
    state.calendar = Array.isArray(state.calendar) ? state.calendar : [];
    const didAWin = scoreA > scoreB;
    state.calendar.unshift({
        id: Date.now() + Math.floor(Math.random() * 9999),
        season: state.seasonNumber,
        week: state.matchWeek || 1,
        tier: REALISM_TIER_CONFIG[tierKey]?.label || 'Tier',
        stage: state.tournamentStage || STAGES.regular,
        teamA,
        teamB,
        score: `${scoreA}-${scoreB}`,
        winner: didAWin ? teamA : teamB,
        mapDiff: scoreA - scoreB,
        maps,
        isPlayer
    });
    state.calendar = state.calendar.slice(0, COMPETITIVE_CALENDAR_LIMIT);
}

function simulateBo3Score(aWin) {
    if (aWin) return Math.random() < 0.55 ? [2, 0] : [2, 1];
    return Math.random() < 0.55 ? [0, 2] : [1, 2];
}

simulateTournamentRoundForAllTiers = function(playerOpponentName, isPlayerWin) {
    ensureCompetitiveState();
    const playerMapsWon = Math.max(0, Math.min(2, Number.isFinite(seriesState.playerScore) ? seriesState.playerScore : (isPlayerWin ? 2 : 1)));
    const enemyMapsWon = Math.max(0, Math.min(2, Number.isFinite(seriesState.enemyScore) ? seriesState.enemyScore : (isPlayerWin ? 1 : 2)));
    updateTournamentRow(state.userTeamFullName, isPlayerWin, playerMapsWon - enemyMapsWon);
    updateTournamentRow(playerOpponentName, !isPlayerWin, enemyMapsWon - playerMapsWon);
    addCalendarResult({
        tierKey: getTeamTierKey(state.userTeamFullName),
        teamA: state.userTeamFullName,
        teamB: playerOpponentName,
        scoreA: playerMapsWon,
        scoreB: enemyMapsWon,
        maps: (seriesState.mapResults || []).map(r => r.map),
        isPlayer: true
    });

    Object.keys(state.tournamentTables).forEach(tierKey => {
        const rows = state.tournamentTables[tierKey];
        const candidates = rows.filter(row => row.name !== state.userTeamFullName && row.name !== playerOpponentName);
        for (let i = 0; i < candidates.length - 1; i += 2) {
            const a = getTeamByName(candidates[i].name);
            const b = getTeamByName(candidates[i + 1].name);
            if (!a || !b) continue;
            const mapA = pickTeamTournamentMap(a);
            const mapB = pickTeamTournamentMap(b);
            const aPower = a.players.reduce((sum, p) => sum + p.skill + (p.form || 0), 0) / a.players.length + (a.mapStats[mapA]?.skill || 0) + a.points / 95;
            const bPower = b.players.reduce((sum, p) => sum + p.skill + (p.form || 0), 0) / b.players.length + (b.mapStats[mapB]?.skill || 0) + b.points / 95;
            const aWin = Math.random() < aPower / Math.max(1, aPower + bPower);
            const [scoreA, scoreB] = simulateBo3Score(aWin);
            updateTournamentRow(a.name, aWin, scoreA - scoreB);
            updateTournamentRow(b.name, !aWin, scoreB - scoreA);
            updateOtherTeamStatsAfterRound(a, aWin, mapA);
            updateOtherTeamStatsAfterRound(b, !aWin, mapB);
            addCalendarResult({ tierKey, teamA: a.name, teamB: b.name, scoreA, scoreB, maps: [mapA, mapB] });
        }
        rows.sort(compareTournamentRows);
    });
    state.matchWeek = (state.matchWeek || 1) + 1;
};

rollNextEnemy = function() {
    ensureCompetitiveState();
    const tierKey = getCurrentTierKey();
    const rows = state.tournamentTables?.[tierKey] || [];
    let pool = rows.map(row => getTeamByName(row.name)).filter(team => team && !team.isPlayer);
    if (!pool.length) pool = teamsRating.filter(t => !t.isPlayer);
    const randomEnemy = pool[Math.floor(Math.random() * pool.length)];
    state.currentEnemy.name = randomEnemy.name;
    state.currentEnemy.skill = randomEnemy.players.reduce((sum, p) => sum + p.skill + (p.form || 0), 0) / randomEnemy.players.length;
    const enemyEl = document.getElementById('ui-enemy-name');
    if (enemyEl) enemyEl.innerText = `${state.currentEnemy.name} (${REALISM_TIER_CONFIG[tierKey]?.label || getCurrentTier().label})`;
};

function renderCalendarPanel() {
    const sideColumn = document.querySelector('.main-layout > div:nth-child(2)');
    if (!sideColumn) return;
    let panel = document.getElementById('match-calendar-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'match-calendar-panel';
        panel.className = 'panel codex-panel calendar-panel';
        sideColumn.appendChild(panel);
    }
    const matches = (state.calendar || []).slice(0, 12);
    panel.innerHTML = `
        <h3>Календар матчів</h3>
        <div class="calendar-list">
            ${matches.length ? matches.map(match => `
                <div class="calendar-item ${match.isPlayer ? 'player-calendar-item' : ''}">
                    <div><b>${match.teamA}</b> ${match.score} <b>${match.teamB}</b></div>
                    <small>${match.tier} • ${match.stage} • тиждень ${match.week} • Δ мап ${match.mapDiff >= 0 ? '+' : ''}${match.mapDiff}</small>
                    <small>Карти: ${(match.maps || []).join(', ') || 'BO3'}</small>
                </div>
            `).join('') : '<div class="autosave-note">Матчі зʼявляться після першого туру сезону.</div>'}
        </div>
    `;
}

const renderTournamentWindowBeforeCompetitiveDepth = renderTournamentWindow;
renderTournamentWindow = function() {
    const modal = ensureTournamentWindow();
    const body = document.getElementById('tournament-window-body');
    const subtitle = document.getElementById('tournament-window-subtitle');
    if (!body || !subtitle) return;
    ensureCompetitiveState();
    subtitle.textContent = `Сезон ${state.seasonNumber} | ${state.tournamentStage} | RD = різниця виграних мап`;
    body.innerHTML = Object.keys(REALISM_TIER_CONFIG).map(tierKey => {
        const cfg = REALISM_TIER_CONFIG[tierKey];
        const rows = [...(state.tournamentTables[tierKey] || [])].sort(compareTournamentRows);
        return `
            <section class="tier-table ${tierKey}">
                <h3>${cfg.label} <small>${cfg.name}</small></h3>
                <div class="tier-table-head tier-table-head-wide"><span>#</span><span>Команда</span><span>PTS</span><span>W-L</span><span>RD</span></div>
                ${rows.map((row, index) => {
                    const zone = tierKey === 'tier1' && index >= rows.length - cfg.relegation ? 'relegation' :
                        tierKey === 'tier2' && index < cfg.promotion ? 'promotion' :
                        tierKey === 'tier2' && index >= rows.length - cfg.relegation ? 'relegation' :
                        tierKey === 'tier3' && index < cfg.promotion ? 'promotion' : '';
                    return `<div class="tier-row tier-row-wide ${row.isPlayer ? 'player-row' : ''} ${zone}"><span>${index + 1}</span><span>${row.name}</span><span>${row.points || 0}</span><span>${row.wins}-${row.losses}</span><span>${(row.mapDiff ?? row.roundDiff) >= 0 ? '+' : ''}${row.mapDiff ?? row.roundDiff}</span></div>`;
                }).join('')}
                <p>${cfg.promotion ? `Топ-${cfg.promotion} підвищується після сезону. ` : ''}${cfg.relegation ? `Низ ${cfg.relegation} понижується після сезону.` : 'Без пониження.'}</p>
            </section>
        `;
    }).join('');
};

function getTopTeamMaps(team, limit = 3) {
    ensureTeamCompetitiveProfile(team);
    return officialMaps
        .map(map => ({ map, ...team.mapStats[map] }))
        .sort((a, b) => (b.skill - a.skill) || (getMapWinrate(b) - getMapWinrate(a)))
        .slice(0, limit);
}

function renderTeamMapBadges(team) {
    return getTopTeamMaps(team).map(row => `<span class="map-badge">${row.map}: +${row.skill}/30, WR ${getMapWinrate(row)}%</span>`).join('');
}

renderRatingTable = function() {
    const container = document.getElementById('rating-table-container');
    if (!container) return;
    ensureCompetitiveState();
    container.innerHTML = '';
    teamsRating.sort((a, b) => b.points - a.points);
    teamsRating.forEach((team, index) => {
        ensureTeamCompetitiveProfile(team);
        const currentPos = index + 1;
        const prevPos = teamsPreviousPositions[team.name] || currentPos;
        const arrow = currentPos < prevPos ? '▲' : currentPos > prevPos ? '▼' : '•';
        const arrowColor = currentPos < prevPos ? '#10b981' : currentPos > prevPos ? '#ef4444' : '#64748b';
        const tierKey = getTeamTierKey(team.name);
        const streakText = team.streak > 0 ? `W${team.streak}` : team.streak < 0 ? `L${Math.abs(team.streak)}` : '0';
        const row = document.createElement('div');
        row.className = `stat-line rating-team-row ${team.isPlayer ? 'player-rating-row' : ''}`;
        row.onclick = () => scoutTeam(team.name);
        row.innerHTML = `
            <div>
                <span class="rating-rank">#${currentPos}</span>
                <span style="color:${arrowColor};font-weight:800;margin-right:8px;">${arrow}</span>
                <b>${team.name}</b>
                <span class="mini-tier ${tierKey.replace('ier','')}">${REALISM_TIER_CONFIG[tierKey]?.label || 'Tier'}</span>
                <div class="rating-team-meta">Серія: ${streakText} • Фокус: ${team.mapFocus} • ${renderTeamMapBadges(team)}</div>
            </div>
            <div class="highlight">${team.points} <span>pts</span></div>
        `;
        container.appendChild(row);
    });
};

scoutTeam = function(teamName) {
    const placeholder = document.getElementById('scouting-placeholder');
    const content = document.getElementById('scouting-content');
    const title = document.getElementById('scout-team-name');
    const list = document.getElementById('scout-players-list');
    if (!placeholder || !content || !list) return;
    const targetTeam = getTeamByName(teamName);
    if (!targetTeam) return;
    ensureTeamCompetitiveProfile(targetTeam);
    placeholder.style.display = 'none';
    content.style.display = 'block';
    const winrate = targetTeam.matchesPlayed ? Math.round((targetTeam.matchWins / targetTeam.matchesPlayed) * 100) : 0;
    title.innerText = `Профіль команди: ${targetTeam.name}`;
    list.innerHTML = `
        <div class="team-profile-card">
            <div class="scout-line"><b>Серія</b><span class="highlight">${targetTeam.streak > 0 ? 'W' + targetTeam.streak : targetTeam.streak < 0 ? 'L' + Math.abs(targetTeam.streak) : '0'}</span></div>
            <div class="scout-line"><b>Матчевий winrate</b><span>${winrate}% (${targetTeam.matchWins || 0}/${targetTeam.matchesPlayed || 0})</span></div>
            <div class="scout-line"><b>Тренує карту</b><span class="highlight">${targetTeam.mapFocus}</span></div>
            <div class="team-map-grid">${officialMaps.map(map => {
                const row = targetTeam.mapStats[map];
                return `<span>${map}<small>+${row.skill}/30 • WR ${getMapWinrate(row)}%</small></span>`;
            }).join('')}</div>
        </div>
    `;
    targetTeam.players.forEach((player, pIndex) => {
        const calculatedPrice = getTransferPrice(player, targetTeam.isPlayer ? 0 : 1.15);
        const deaths = Math.max(1, player.stats.deaths);
        const kd = (player.stats.kills / deaths).toFixed(2);
        const div = document.createElement('div');
        div.className = 'player-card scout-stat-card';
        div.innerHTML = `
            <div class="scout-line"><b>${player.name}</b><span class="highlight">${player.role} | Skill ${player.skill} | Form ${player.form || 0}</span></div>
            <div class="scout-stats">
                <span>Kills ${player.stats.kills}</span><span>Deaths ${player.stats.deaths}</span><span>K/D ${kd}</span><span>Rating ${Number(player.stats.rating || 1).toFixed(2)}</span><span>MVP ${player.stats.mvps || 0}</span><span>Матчі ${player.stats.matches || 0}</span>
            </div>
            ${targetTeam.isPlayer ? '<div class="transfer-meta">Це твій гравець.</div>' : `<button onclick="buyScoutedPlayer('${teamName.replace(/'/g, "\\'")}', ${pIndex}, ${calculatedPrice})" style="background:#2563eb;color:#fff;">Викупити ($${calculatedPrice})</button>`}
        `;
        list.appendChild(div);
    });
};

const renderManagerPanelsBeforeCompetitiveDepth = renderManagerPanels;
renderManagerPanels = function() {
    renderManagerPanelsBeforeCompetitiveDepth();
    ensureCompetitiveState();
    const stats = document.getElementById('player-stats-panel');
    if (stats) {
        stats.innerHTML = `
            <h3>Середня статистика за всі матчі</h3>
            <div class="stats-grid detailed-stats stats-head"><span>Гравець</span><span>K</span><span>D</span><span>K/D</span><span>Rating</span><span>MVP</span><span>Матчі</span><span>Форма</span></div>
            ${state.players.map(p => `<div class="stats-grid detailed-stats"><span>${p.name}</span><span>${p.stats.kills || 0}</span><span>${p.stats.deaths || 0}</span><span>${getPlayerKd(p)}</span><span>${getAveragePlayerRating(p)}</span><span>${p.stats.mvps || 0}</span><span>${p.stats.matches || 0}</span><span>${p.form || 0}</span></div>`).join('')}
            <div class="autosave-note">Рейтинг, K/D і MVP накопичуються по всіх BO3. MVP один на матч.</div>
        `;
    }
    renderCalendarPanel();
};

const resetToNextSeasonBeforeCompetitiveDepth = resetToNextSeason;
resetToNextSeason = function(wonTitle = false) {
    const tierKey = getCurrentTierKey();
    if (wonTitle) {
        const team = teamsRating.find(t => t.isPlayer);
        const titlePoints = tierKey === 'tier1' ? 90 : tierKey === 'tier2' ? 58 : 34;
        if (team) team.points += titlePoints;
        logSystem(`🏅 Титул ${REALISM_TIER_CONFIG[tierKey]?.label}: +${titlePoints} очок до світового рейтингу.`);
    }
    resetToNextSeasonBeforeCompetitiveDepth(wonTitle);
    state.matchWeek = 1;
    ensureCompetitiveState();
};

const ensureStateSchemaBeforeCompetitiveDepth = ensureStateSchema;
ensureStateSchema = function() {
    ensureStateSchemaBeforeCompetitiveDepth();
    ensureCompetitiveState();
};

const windowOnloadBeforeCompetitiveDepth = window.onload;
window.onload = function() {
    windowOnloadBeforeCompetitiveDepth();
    ensureCompetitiveState();
    renderManagerPanels();
    renderRatingTable();
    autoSave('competitive-depth-load');
};

// === CODEX MATCH DETAILS AND FORM PATCH ===
function normalizeRecentResults(team) {
    team.recentResults = Array.isArray(team.recentResults) ? team.recentResults.slice(-5) : [];
    return team.recentResults;
}

function addRecentResult(team, didWin) {
    if (!team) return;
    normalizeRecentResults(team);
    team.recentResults.push(didWin ? 'W' : 'L');
    team.recentResults = team.recentResults.slice(-5);
}

function renderFormDots(team) {
    const results = normalizeRecentResults(team);
    const padded = Array(Math.max(0, 5 - results.length)).fill('N').concat(results);
    return padded.map(result => `<span class="form-dot ${result === 'W' ? 'win' : result === 'L' ? 'loss' : 'empty'}" title="${result === 'W' ? 'Перемога' : result === 'L' ? 'Поразка' : 'Немає матчу'}"></span>`).join('');
}

function ensureDetailedCompetitionState() {
    ensureCompetitiveState();
    teamsRating.forEach(team => {
        ensureTeamCompetitiveProfile(team);
        normalizeRecentResults(team);
        team.chemistry = Math.max(45, Math.min(100, team.chemistry || Math.round(62 + Math.random() * 25)));
    });
    if (state.tournamentPointsVersion !== 2) {
        Object.values(state.tournamentTables || {}).forEach(rows => {
            rows.forEach(row => {
                row.points = (row.wins || 0) * 2;
                row.tournamentPoints = row.points;
            });
        });
        state.tournamentPointsVersion = 2;
    }
}

function getAverageTeamPlayerRating(team) {
    if (!team?.players?.length) return 1;
    return team.players.reduce((sum, player) => sum + Number(player.stats?.rating || 1), 0) / team.players.length;
}

function getOpponentMapPower(team, mapName) {
    ensureTeamCompetitiveProfile(team);
    const averageSkill = team.players.reduce((sum, player) => sum + Math.min(100, player.skill) + (player.form || 0), 0) / team.players.length;
    const ratingBonus = (getAverageTeamPlayerRating(team) - 1) * 14;
    const chemistryBonus = ((team.chemistry || 70) - 70) / 5;
    const mapBonus = (team.mapStats?.[mapName]?.skill || 0);
    return averageSkill + ratingBonus + chemistryBonus + mapBonus;
}

getTeamSkill = function(mapName = '') {
    state.mapMastery = ensureMapStatsObject(state.mapMastery || {});
    const base = state.players.reduce((sum, player) => sum + Math.min(100, player.skill) + (player.form || 0), 0) / state.players.length;
    const ratingBonus = (state.players.reduce((sum, player) => sum + Number(player.stats?.rating || 1), 0) / state.players.length - 1) * 14;
    const chemistryBonus = (state.chemistry - 70) / 5;
    const mapBonus = mapName ? clampMapSkill(state.mapMastery[mapName]?.skill || 0) : 0;
    return base + ratingBonus + chemistryBonus + mapBonus;
};

updateMapMasteryDisplay = function() {
    const zone = document.getElementById('map-buttons-zone');
    if (!zone) return;
    state.mapMastery = ensureMapStatsObject(state.mapMastery || {});
    zone.innerHTML = '';
    officialMaps.forEach(map => {
        const row = state.mapMastery[map];
        const btn = document.createElement('button');
        btn.className = 'map-mastery-card';
        btn.innerHTML = `<b>${map}</b><span>+${row.skill}/30 скіл</span><small>WR ${getMapWinrate(row)}% • ${row.played} мап</small><small>Аналітика +1 ($500)</small>`;
        btn.onclick = () => {
            if (state.money < 500) {
                alert('Для аналітики карти потрібно $500.');
                return;
            }
            state.money -= 500;
            const updatedRow = { ...row, skill: clampMapSkill(row.skill + 1) };
            state.mapMastery[map] = updatedRow;
            logSystem(`📋 Аналітика ${map}: +1 до скілу карти. Поточний бонус +${updatedRow.skill}/30.`);
            updateUI();
            autoSave('map-analysis-500');
        };
        zone.appendChild(btn);
    });
};

function parseVisibleMapScore() {
    const text = document.getElementById('live-score')?.innerText || '0 : 0';
    const parts = text.split(':').map(value => Number(value.trim()));
    return {
        playerRounds: Number.isFinite(parts[0]) ? parts[0] : 0,
        enemyRounds: Number.isFinite(parts[1]) ? parts[1] : 0
    };
}

const startSingleMapBeforeMatchDetails = startSingleMapSimulation;
startSingleMapSimulation = function(mapName, onMapEnd) {
    const enemyTeam = getTeamByName(state.currentEnemy.name);
    if (enemyTeam) state.currentEnemy.skill = getOpponentMapPower(enemyTeam, mapName);
    const playerName = document.getElementById('live-player-name');
    const enemyName = document.getElementById('live-enemy-name');
    if (playerName) playerName.textContent = state.userTeamFullName || state.userTeamTag || 'Ваша команда';
    if (enemyName) enemyName.textContent = enemyTeam?.name || state.currentEnemy.name || 'Суперник';
    startSingleMapBeforeMatchDetails(mapName, winner => {
        const score = parseVisibleMapScore();
        seriesState.mapResults = Array.isArray(seriesState.mapResults) ? seriesState.mapResults : [];
        const last = seriesState.mapResults[seriesState.mapResults.length - 1];
        if (last && last.map === mapName) {
            last.playerRounds = score.playerRounds;
            last.enemyRounds = score.enemyRounds;
            last.roundScore = `${score.playerRounds}-${score.enemyRounds}`;
        } else {
            seriesState.mapResults.push({
                map: mapName,
                winner,
                playerRounds: score.playerRounds,
                enemyRounds: score.enemyRounds,
                roundScore: `${score.playerRounds}-${score.enemyRounds}`
            });
        }
        onMapEnd(winner);
    });
};

updateTournamentRow = function(teamName, didWin, mapDiff = 0) {
    ensureDetailedCompetitionState();
    const tierKey = getTeamTierKey(teamName);
    const row = state.tournamentTables[tierKey]?.find(item => item.name === teamName);
    if (!row) return;
    const realMapDiff = Math.max(-2, Math.min(2, Math.round(mapDiff || (didWin ? 1 : -1))));
    if (didWin) row.wins += 1; else row.losses += 1;
    row.mapDiff = (row.mapDiff || 0) + realMapDiff;
    row.roundDiff = row.mapDiff;
    row.points = (row.points || 0) + (didWin ? 2 : 0);
    row.tournamentPoints = row.points;
    const team = getTeamByName(teamName);
    if (team) row.ratingPoints = team.points;
};

function createRoundScore(didAWin) {
    const loserRounds = 5 + Math.floor(Math.random() * 7);
    return didAWin ? [13, loserRounds] : [loserRounds, 13];
}

function calculateMapWinChance(teamA, teamB, mapName) {
    const powerA = getOpponentMapPower(teamA, mapName);
    const powerB = getOpponentMapPower(teamB, mapName);
    return typeof window.calculatePowerWinChance === 'function'
        ? window.calculatePowerWinChance(powerA, powerB, 22, 0.12, 0.88)
        : Math.max(0.2, Math.min(0.8, powerA / Math.max(1, powerA + powerB)));
}

function simulateDetailedBo3(teamA, teamB) {
    let scoreA = 0;
    let scoreB = 0;
    const usedMaps = new Set();
    const details = [];
    while (scoreA < 2 && scoreB < 2) {
        const candidates = officialMaps.filter(map => !usedMaps.has(map));
        const preferredA = pickTeamTournamentMap(teamA);
        const preferredB = pickTeamTournamentMap(teamB);
        let mapName = Math.random() < 0.5 ? preferredA : preferredB;
        if (usedMaps.has(mapName)) mapName = candidates[Math.floor(Math.random() * candidates.length)];
        usedMaps.add(mapName);
        const aWon = Math.random() < calculateMapWinChance(teamA, teamB, mapName);
        if (aWon) scoreA += 1; else scoreB += 1;
        const [roundsA, roundsB] = createRoundScore(aWon);
        details.push({ map: mapName, teamARounds: roundsA, teamBRounds: roundsB, winner: aWon ? teamA.name : teamB.name });
    }
    return { scoreA, scoreB, details };
}

function updateOpponentAfterSeries(team, didWin, mapDetails, isTeamA) {
    if (!team) return;
    ensureTeamCompetitiveProfile(team);
    updateOtherTeamStatsBeforeCompetitiveDepth(team, didWin);
    team.matchesPlayed += 1;
    if (didWin) team.matchWins += 1;
    team.streak = didWin ? Math.max(1, (team.streak || 0) + 1) : Math.min(-1, (team.streak || 0) - 1);
    team.chemistry = Math.max(45, Math.min(100, (team.chemistry || 70) + (didWin ? 2 : -2)));
    addRecentResult(team, didWin);
    team.players.forEach(player => {
        player.form = Math.max(-5, Math.min(5, (player.form || 0) + (didWin ? (Math.random() < 0.6 ? 1 : 0) : (Math.random() < 0.6 ? -1 : 0))));
        if (Math.random() < 0.16) player.skill = Math.max(45, Math.min(100, player.skill + (didWin ? 1 : -1)));
        if (typeof window.addPlayerLevelProgress === 'function') {
            const wonMaps = (mapDetails || []).filter(detail => detail.winner === team.name).length;
            const lostMaps = Math.max(0, (mapDetails || []).length - wonMaps);
            window.addPlayerLevelProgress(player, (didWin ? 5 : -5) + (wonMaps - lostMaps) * 3);
        }
    });
    (mapDetails || []).forEach(detail => {
        const mapWon = detail.winner === team.name;
        updateTeamMapDevelopment(team, detail.map, mapWon);
    });
}

function toPlayerCalendarMapDetails() {
    return (seriesState.mapResults || []).map(result => ({
        map: result.map,
        teamARounds: result.playerRounds || 0,
        teamBRounds: result.enemyRounds || 0,
        winner: result.winner === 'player' ? state.userTeamFullName : state.currentEnemy.name.replace(/ \(Tier [123]\)$/,'')
    }));
}

simulateTournamentRoundForAllTiers = function(playerOpponentName, isPlayerWin) {
    ensureDetailedCompetitionState();
    const playerTeam = getTeamByName(state.userTeamFullName);
    const opponentTeam = getTeamByName(playerOpponentName);
    const playerMapsWon = Math.max(0, Math.min(2, Number.isFinite(seriesState.playerScore) ? seriesState.playerScore : (isPlayerWin ? 2 : 1)));
    const enemyMapsWon = Math.max(0, Math.min(2, Number.isFinite(seriesState.enemyScore) ? seriesState.enemyScore : (isPlayerWin ? 1 : 2)));
    const playerMapDetails = toPlayerCalendarMapDetails();
    updateTournamentRow(state.userTeamFullName, isPlayerWin, playerMapsWon - enemyMapsWon);
    updateTournamentRow(playerOpponentName, !isPlayerWin, enemyMapsWon - playerMapsWon);
    if (playerTeam) {
        playerTeam.matchesPlayed = (playerTeam.matchesPlayed || 0) + 1;
        if (isPlayerWin) playerTeam.matchWins = (playerTeam.matchWins || 0) + 1;
        playerTeam.streak = isPlayerWin ? Math.max(1, (playerTeam.streak || 0) + 1) : Math.min(-1, (playerTeam.streak || 0) - 1);
        playerTeam.chemistry = state.chemistry;
    }
    addRecentResult(playerTeam, isPlayerWin);
    updateOpponentAfterSeries(opponentTeam, !isPlayerWin, playerMapDetails, false);
    addCalendarResult({
        tierKey: getTeamTierKey(state.userTeamFullName),
        teamA: state.userTeamFullName,
        teamB: playerOpponentName,
        scoreA: playerMapsWon,
        scoreB: enemyMapsWon,
        maps: playerMapDetails,
        isPlayer: true
    });

    Object.keys(state.tournamentTables).forEach(tierKey => {
        const rows = state.tournamentTables[tierKey];
        const candidates = rows.filter(row => row.name !== state.userTeamFullName && row.name !== playerOpponentName);
        for (let index = 0; index < candidates.length - 1; index += 2) {
            const teamA = getTeamByName(candidates[index].name);
            const teamB = getTeamByName(candidates[index + 1].name);
            if (!teamA || !teamB) continue;
            const result = simulateDetailedBo3(teamA, teamB);
            const aWon = result.scoreA > result.scoreB;
            updateTournamentRow(teamA.name, aWon, result.scoreA - result.scoreB);
            updateTournamentRow(teamB.name, !aWon, result.scoreB - result.scoreA);
            updateOpponentAfterSeries(teamA, aWon, result.details, true);
            updateOpponentAfterSeries(teamB, !aWon, result.details, false);
            addCalendarResult({
                tierKey,
                teamA: teamA.name,
                teamB: teamB.name,
                scoreA: result.scoreA,
                scoreB: result.scoreB,
                maps: result.details
            });
        }
        rows.sort(compareTournamentRows);
    });
    state.matchWeek = (state.matchWeek || 1) + 1;
};

simulateWorldMatches = function() {
    teamsRating.forEach(team => {
        if (team.isPlayer) return;
        const lastResult = normalizeRecentResults(team).slice(-1)[0];
        if (lastResult === 'W') team.points += 4 + Math.floor(Math.random() * 8);
        if (lastResult === 'L') team.points = Math.max(0, team.points - (3 + Math.floor(Math.random() * 6)));
    });
};

addCalendarResult = function({ tierKey, teamA, teamB, scoreA, scoreB, maps = [], isPlayer = false }) {
    state.calendar = Array.isArray(state.calendar) ? state.calendar : [];
    state.calendar.unshift({
        id: Date.now() + Math.floor(Math.random() * 9999),
        season: state.seasonNumber,
        week: state.matchWeek || 1,
        tier: REALISM_TIER_CONFIG[tierKey]?.label || 'Tier',
        stage: state.tournamentStage || STAGES.regular,
        teamA,
        teamB,
        score: `${scoreA}-${scoreB}`,
        scoreA,
        scoreB,
        winner: scoreA > scoreB ? teamA : teamB,
        mapDiff: scoreA - scoreB,
        maps,
        isPlayer
    });
    state.calendar = state.calendar.slice(0, COMPETITIVE_CALENDAR_LIMIT);
};

function formatMapDetails(match) {
    const maps = Array.isArray(match.maps) ? match.maps : [];
    if (!maps.length) return 'Деталі мап недоступні';
    if (typeof maps[0] === 'string') return maps.join(', ');
    return maps.map(detail => `${detail.map} ${detail.teamARounds}-${detail.teamBRounds}`).join(', ');
}

function ensureRoundWindow() {
    let modal = document.getElementById('round-modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'round-modal';
    modal.innerHTML = `
        <div class="round-window">
            <div class="tournament-window-head">
                <div><b id="round-window-title">Матчі туру</b><span id="round-window-subtitle"></span></div>
                <button onclick="closeCalendarRound()">Закрити</button>
            </div>
            <div id="round-window-body" class="round-window-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

window.closeCalendarRound = function() {
    const modal = document.getElementById('round-modal');
    if (modal) modal.style.display = 'none';
};

window.openCalendarRound = function(season, week) {
    const modal = ensureRoundWindow();
    const matches = (state.calendar || []).filter(match => match.season === season && match.week === week);
    document.getElementById('round-window-title').textContent = `Сезон ${season} • Тур ${week}`;
    document.getElementById('round-window-subtitle').textContent = `${matches.length} матчів у Tier 1/2/3`;
    document.getElementById('round-window-body').innerHTML = matches.map(match => `
        <article class="round-match-card ${match.isPlayer ? 'player-round-card' : ''}">
            <div class="round-match-head"><span>${match.tier}</span><span>${match.stage}</span></div>
            <div class="round-match-score"><b>${teamLogoHtml(match.teamA)}${match.teamA}</b><strong>${match.score}</strong><b>${teamLogoHtml(match.teamB)}${match.teamB}</b></div>
            <div class="round-map-results">(${formatMapDetails(match)})</div>
        </article>
    `).join('');
    modal.style.display = 'flex';
};

renderCalendarPanel = function() {
    const sideColumn = document.querySelector('.main-layout > div:nth-child(2)');
    if (!sideColumn) return;
    let panel = document.getElementById('match-calendar-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'match-calendar-panel';
        panel.className = 'panel codex-panel calendar-panel';
        sideColumn.appendChild(panel);
    }
    const groups = [];
    (state.calendar || []).forEach(match => {
        const key = `${match.season}-${match.week}`;
        let group = groups.find(item => item.key === key);
        if (!group) {
            group = { key, season: match.season, week: match.week, matches: [] };
            groups.push(group);
        }
        group.matches.push(match);
    });
    panel.innerHTML = `
        <h3>Календар матчів</h3>
        <div class="calendar-list">
            ${groups.length ? groups.slice(0, 8).map(group => {
                const playerMatch = group.matches.find(match => match.isPlayer);
                return `
                    <button class="calendar-round-button" onclick="openCalendarRound(${group.season}, ${group.week})">
                        <span><b>Сезон ${group.season} • Тур ${group.week}</b><small>${group.matches.length} матчів</small></span>
                        <span class="round-preview">${playerMatch ? `${playerMatch.teamA} ${playerMatch.score} ${playerMatch.teamB}` : 'Відкрити результати'}</span>
                    </button>
                `;
            }).join('') : '<div class="autosave-note">Тури зʼявляться після першого BO3.</div>'}
        </div>
    `;
};

renderRatingTable = function() {
    const container = document.getElementById('rating-table-container');
    if (!container) return;
    ensureDetailedCompetitionState();
    container.innerHTML = '';
    teamsRating.sort((a, b) => b.points - a.points);
    teamsRating.forEach((team, index) => {
        const row = document.createElement('div');
        row.className = `stat-line rating-team-row simple-rating-row ${team.isPlayer ? 'player-rating-row' : ''}`;
        row.onclick = () => scoutTeam(team.name);
        row.innerHTML = `
            <div class="simple-rating-team"><span class="rating-rank">#${index + 1}</span>${teamLogoHtml(team.name)}<b>${team.name}</b></div>
            <div class="rating-form">${renderFormDots(team)}</div>
            <div class="highlight">${team.points} <span>pts</span></div>
        `;
        container.appendChild(row);
    });
};

scoutTeam = function(teamName) {
    const placeholder = document.getElementById('scouting-placeholder');
    const content = document.getElementById('scouting-content');
    const title = document.getElementById('scout-team-name');
    const list = document.getElementById('scout-players-list');
    if (!placeholder || !content || !list) return;
    const targetTeam = getTeamByName(teamName);
    if (!targetTeam) return;
    ensureDetailedCompetitionState();
    placeholder.style.display = 'none';
    content.style.display = 'block';
    const winrate = targetTeam.matchesPlayed ? Math.round((targetTeam.matchWins / targetTeam.matchesPlayed) * 100) : 0;
    title.innerHTML = `${teamLogoHtml(targetTeam.name, 'team-logo team-logo-lg')}<span>Профіль команди: ${escapeLiveText(targetTeam.name)}</span>`;
    list.innerHTML = `
        <div class="team-profile-card">
            <div class="profile-form-line"><b>Останні 5 матчів</b><span class="rating-form large">${renderFormDots(targetTeam)}</span></div>
            <div class="scout-line"><b>Серія</b><span class="highlight">${targetTeam.streak > 0 ? 'W' + targetTeam.streak : targetTeam.streak < 0 ? 'L' + Math.abs(targetTeam.streak) : '0'}</span></div>
            <div class="scout-line"><b>Winrate матчів</b><span>${winrate}% (${targetTeam.matchWins || 0}/${targetTeam.matchesPlayed || 0})</span></div>
            <div class="scout-line"><b>Зіграність</b><span>${targetTeam.chemistry || 70}%</span></div>
            <div class="scout-line"><b>Тренує карту</b><span class="highlight">${targetTeam.mapFocus}</span></div>
            <div class="team-map-grid">${officialMaps.map(map => {
                const mapRow = targetTeam.mapStats[map];
                return `<span>${map}<small>+${mapRow.skill}/30 • WR ${getMapWinrate(mapRow)}% • ${mapRow.played} мап</small></span>`;
            }).join('')}</div>
        </div>
    `;
    targetTeam.players.forEach((player, playerIndex) => {
        const calculatedPrice = getTransferPrice(player, targetTeam.isPlayer ? 0 : 1.15);
        const kd = (player.stats.kills / Math.max(1, player.stats.deaths)).toFixed(2);
        const card = document.createElement('div');
        card.className = 'player-card scout-stat-card';
        card.innerHTML = `
            <div class="scout-line"><b>${player.name}</b><span class="highlight">${player.role} | Skill ${player.skill} | Form ${player.form || 0}</span></div>
            <div class="scout-stats"><span>K ${player.stats.kills}</span><span>D ${player.stats.deaths}</span><span>K/D ${kd}</span><span>Rating ${Number(player.stats.rating || 1).toFixed(2)}</span><span>MVP ${player.stats.mvps || 0}</span><span>Матчі ${player.stats.matches || 0}</span></div>
            ${targetTeam.isPlayer ? '<div class="transfer-meta">Це твій гравець.</div>' : `<button onclick="buyScoutedPlayer('${teamName.replace(/'/g, "\\'")}', ${playerIndex}, ${calculatedPrice})" style="background:#2563eb;color:#fff;">Викупити ($${calculatedPrice})</button>`}
        `;
        list.appendChild(card);
    });
};

renderTournamentWindow = function() {
    const modal = ensureTournamentWindow();
    const body = document.getElementById('tournament-window-body');
    const subtitle = document.getElementById('tournament-window-subtitle');
    if (!body || !subtitle) return;
    ensureDetailedCompetitionState();
    subtitle.textContent = `Сезон ${state.seasonNumber} | ${state.tournamentStage} | 2 PTS за перемогу | RD = реальна різниця мап`;
    body.innerHTML = Object.keys(REALISM_TIER_CONFIG).map(tierKey => {
        const config = REALISM_TIER_CONFIG[tierKey];
        const rows = [...(state.tournamentTables[tierKey] || [])].sort(compareTournamentRows);
        return `
            <section class="tier-table ${tierKey}">
                <h3>${config.label} <small>${config.name}</small></h3>
                <div class="tier-table-head tier-table-head-wide"><span>#</span><span>Команда</span><span>PTS</span><span>W-L</span><span>RD</span></div>
                ${rows.map((row, index) => {
                    const zone = tierKey === 'tier1' && index >= rows.length - config.relegation ? 'relegation' :
                        tierKey === 'tier2' && index < config.promotion ? 'promotion' :
                        tierKey === 'tier2' && index >= rows.length - config.relegation ? 'relegation' :
                        tierKey === 'tier3' && index < config.promotion ? 'promotion' : '';
                    return `<div class="tier-row tier-row-wide ${row.isPlayer ? 'player-row' : ''} ${zone}"><span>${index + 1}</span><span>${row.name}</span><span>${row.points || 0}</span><span>${row.wins}-${row.losses}</span><span>${row.mapDiff >= 0 ? '+' : ''}${row.mapDiff || 0}</span></div>`;
                }).join('')}
                <p>${config.promotion ? `Топ-${config.promotion} підвищується після сезону. ` : ''}${config.relegation ? `Низ ${config.relegation} понижується після сезону.` : 'Без пониження.'}</p>
            </section>
        `;
    }).join('');
};

const renderManagerPanelsBeforeMatchDetails = renderManagerPanels;
renderManagerPanels = function() {
    renderManagerPanelsBeforeMatchDetails();
    ensureDetailedCompetitionState();
    renderCalendarPanel();
};

// === CODEX TRANSFER NEGOTIATIONS ===
let activeTransferNegotiation = null;

function ensureTransferNegotiationState() {
    if (!state.transferNegotiations || typeof state.transferNegotiations !== 'object') {
        state.transferNegotiations = {};
    }
}

function getTransferTeamRank(teamName) {
    return [...teamsRating].sort((a, b) => b.points - a.points).findIndex(team => team.name === teamName) + 1;
}

function getTransferTierStrength(teamName) {
    return { tier1: 3, tier2: 2, tier3: 1 }[getTeamTierKey(teamName)] || 1;
}

function calculateTransferAcceptance(team, player, marketPrice, offer) {
    ensureTransferNegotiationState();
    const sourceRank = getTransferTeamRank(team.name);
    const userRank = getTransferTeamRank(state.userTeamFullName);
    const sourceTier = getTransferTierStrength(team.name);
    const userTier = getTransferTierStrength(state.userTeamFullName);
    const offerRatio = offer / Math.max(1, marketPrice);
    const attempts = state.transferNegotiations[`${team.name}::${player.name}`] || 0;
    const rankEffect = Math.max(-24, Math.min(24, (sourceRank - userRank) * 1.6));
    const tierEffect = (userTier - sourceTier) * 18;
    const offerEffect = Math.max(0, Math.min(45, (offerRatio - 1) * 90));
    const starEffect = -Math.max(0, player.skill - 84) * 1.25;
    const patienceEffect = -attempts * 6;
    const chance = Math.round(Math.max(5, Math.min(95, 44 + rankEffect + tierEffect + offerEffect + starEffect + patienceEffect)));
    return { chance, sourceRank, userRank, sourceTier, userTier, offerEffect: Math.round(offerEffect), attempts };
}

function ensureTransferNegotiationModal() {
    let modal = document.getElementById('transfer-negotiation-modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'transfer-negotiation-modal';
    modal.innerHTML = `
        <div class="transfer-negotiation-window" role="dialog" aria-modal="true" aria-labelledby="transfer-negotiation-title">
            <div class="transfer-negotiation-head">
                <div><small>ТРАНСФЕРНІ ПЕРЕГОВОРИ</small><h2 id="transfer-negotiation-title">Новий гравець</h2></div>
                <button class="transfer-close-button" onclick="closeTransferNegotiation()" title="Закрити" aria-label="Закрити">×</button>
            </div>
            <div id="transfer-negotiation-body"></div>
        </div>`;
    modal.addEventListener('click', event => {
        if (event.target === modal) closeTransferNegotiation();
    });
    document.body.appendChild(modal);
    return modal;
}

window.openTransferNegotiation = function(encodedTeamName, playerIndex) {
    const teamName = decodeURIComponent(encodedTeamName);
    const team = teamsRating.find(item => item.name === teamName);
    const player = team?.players?.[playerIndex];
    if (!team || team.isPlayer || !player) return;
    ensurePlayerStats(player);
    const marketPrice = getTransferPrice(player, 1.15);
    activeTransferNegotiation = { teamName, playerIndex, marketPrice };
    const modal = ensureTransferNegotiationModal();
    modal.style.display = 'flex';
    renderTransferNegotiation();
};

window.closeTransferNegotiation = function() {
    const modal = document.getElementById('transfer-negotiation-modal');
    if (modal) modal.style.display = 'none';
    activeTransferNegotiation = null;
};

function renderTransferNegotiation() {
    if (!activeTransferNegotiation) return;
    const team = teamsRating.find(item => item.name === activeTransferNegotiation.teamName);
    const player = team?.players?.[activeTransferNegotiation.playerIndex];
    const body = document.getElementById('transfer-negotiation-body');
    if (!team || !player || !body) return;
    const marketPrice = activeTransferNegotiation.marketPrice;
    const maxOffer = Math.max(marketPrice, Math.min(state.money, Math.ceil(marketPrice * 2)));
    const initialOffer = Math.min(maxOffer, Math.max(marketPrice, activeTransferNegotiation.offer || marketPrice));
    activeTransferNegotiation.offer = initialOffer;
    body.innerHTML = `
        <div class="transfer-candidate-line">
            <div><b>${escapeLiveText(player.name)}</b><span>${escapeLiveText(player.role)} · Rating ${player.skill} · Форма ${player.form >= 0 ? '+' : ''}${player.form || 0}</span></div>
            <div><small>Клуб</small><strong>${escapeLiveText(team.name)}</strong></div>
        </div>
        <div class="transfer-negotiation-grid">
            <label>Кого замінити
                <select id="transfer-replace-player">${state.players.map((item, index) => `<option value="${index}">${escapeLiveText(item.name)} · ${escapeLiveText(item.role)} · ${item.skill}</option>`).join('')}</select>
            </label>
            <label>Ваша пропозиція
                <div class="transfer-offer-input"><span>$</span><input id="transfer-offer" type="number" min="${marketPrice}" max="${maxOffer}" step="100" value="${initialOffer}"></div>
            </label>
        </div>
        <input id="transfer-offer-slider" class="transfer-offer-slider" type="range" min="${marketPrice}" max="${maxOffer}" step="100" value="${initialOffer}">
        <div id="transfer-chance-panel"></div>
        <div id="transfer-negotiation-result" class="transfer-negotiation-result" aria-live="polite"></div>
        <div class="transfer-negotiation-actions">
            <span>Бюджет клубу: <b>$${state.money}</b></span>
            <button id="submit-transfer-offer" onclick="submitTransferOffer()">Зробити пропозицію</button>
        </div>`;
    const offerInput = document.getElementById('transfer-offer');
    const offerSlider = document.getElementById('transfer-offer-slider');
    const syncOffer = source => {
        const value = Math.max(marketPrice, Math.min(maxOffer, Number(source.value) || marketPrice));
        offerInput.value = value;
        offerSlider.value = value;
        activeTransferNegotiation.offer = value;
        updateTransferChancePanel();
    };
    offerInput.addEventListener('input', () => syncOffer(offerInput));
    offerSlider.addEventListener('input', () => syncOffer(offerSlider));
    updateTransferChancePanel();
}

function updateTransferChancePanel() {
    if (!activeTransferNegotiation) return;
    const team = teamsRating.find(item => item.name === activeTransferNegotiation.teamName);
    const player = team?.players?.[activeTransferNegotiation.playerIndex];
    const panel = document.getElementById('transfer-chance-panel');
    if (!team || !player || !panel) return;
    const details = calculateTransferAcceptance(team, player, activeTransferNegotiation.marketPrice, activeTransferNegotiation.offer);
    const tone = details.chance >= 70 ? 'high' : details.chance >= 40 ? 'medium' : 'low';
    panel.className = `transfer-chance-panel ${tone}`;
    panel.innerHTML = `
        <div class="transfer-chance-main"><span>Ймовірність згоди</span><strong>${details.chance}%</strong></div>
        <div class="transfer-chance-bar"><i style="width:${details.chance}%"></i></div>
        <div class="transfer-factors">
            <span>Ваш рейтинг: #${details.userRank}</span><span>Клуб гравця: #${details.sourceRank}</span>
            <span>Різниця Tier: ${details.userTier - details.sourceTier >= 0 ? '+' : ''}${details.userTier - details.sourceTier}</span>
            <span>Бонус пропозиції: +${details.offerEffect}%</span>${details.attempts ? `<span>Попередні відмови: ${details.attempts}</span>` : ''}
        </div>`;
}

window.submitTransferOffer = function() {
    if (!activeTransferNegotiation) return;
    const team = teamsRating.find(item => item.name === activeTransferNegotiation.teamName);
    const player = team?.players?.[activeTransferNegotiation.playerIndex];
    const replaceIndex = Number(document.getElementById('transfer-replace-player')?.value);
    const offer = Number(document.getElementById('transfer-offer')?.value || 0);
    const result = document.getElementById('transfer-negotiation-result');
    if (!team || !player || !state.players[replaceIndex]) return;
    if (offer < activeTransferNegotiation.marketPrice || offer > state.money) {
        if (result) result.textContent = 'Перевірте суму: вона не може бути нижчою за ціну або більшою за бюджет.';
        return;
    }
    const details = calculateTransferAcceptance(team, player, activeTransferNegotiation.marketPrice, offer);
    const key = `${team.name}::${player.name}`;
    ensureTransferNegotiationState();
    if (Math.random() * 100 >= details.chance) {
        state.transferNegotiations[key] = (state.transferNegotiations[key] || 0) + 1;
        if (result) result.innerHTML = `<b>${escapeLiveText(player.name)}</b> відмовився. Підвищте суму або поверніться пізніше.`;
        logSystem(`<b>${escapeLiveText(player.name)}</b> відхилив пропозицію ${escapeLiveText(state.userTeamTag || state.userTeamFullName)}.`);
        autoSave('transfer-offer-rejected');
        updateTransferChancePanel();
        return;
    }
    const incoming = { ...player };
    const outgoing = { ...state.players[replaceIndex] };
    state.money -= offer;
    state.players[replaceIndex] = createPlayerProfile(incoming.name, replaceIndex, { ...incoming, id: outgoing.id });
    team.players[activeTransferNegotiation.playerIndex] = createPlayerProfile(outgoing.name, activeTransferNegotiation.playerIndex, outgoing);
    state.chemistry = Math.max(25, state.chemistry - 12);
    delete state.transferNegotiations[key];
    logSystem(`Трансфер завершено: <b>${escapeLiveText(incoming.name)}</b> перейшов із ${escapeLiveText(team.name)} за $${offer}.`);
    syncPlayerTeamInRating();
    autoSave('transfer-completed');
    closeTransferNegotiation();
    updateUI();
    applyTransferSearch();
};

window.buyScoutedPlayer = function(teamName, playerIndex) {
    openTransferNegotiation(encodeURIComponent(teamName), playerIndex);
};

const applyTransferSearchBeforeNegotiations = window.applyTransferSearch;
window.applyTransferSearch = function() {
    applyTransferSearchBeforeNegotiations();
    document.querySelectorAll('#transfer-search-results .transfer-search-card').forEach((card, index) => {
        const visibleItems = getTransferDatabase()
            .filter(item => !(document.getElementById('transfer-search-name')?.value || '').trim() || item.player.name.toLowerCase().includes(document.getElementById('transfer-search-name').value.trim().toLowerCase()))
            .filter(item => !document.getElementById('transfer-search-team')?.value || item.team.name === document.getElementById('transfer-search-team').value)
            .filter(item => !document.getElementById('transfer-search-role')?.value || item.player.role === document.getElementById('transfer-search-role').value)
            .filter(item => item.player.skill >= Number(document.getElementById('transfer-search-rating')?.value || 0))
            .filter(item => !Number(document.getElementById('transfer-search-price')?.value || 0) || item.price <= Number(document.getElementById('transfer-search-price').value))
            .sort((a, b) => b.player.skill - a.player.skill || a.price - b.price);
        const item = visibleItems[index];
        const footer = card.querySelector('.transfer-search-footer');
        if (item && footer) footer.innerHTML = `<strong>$${item.price}</strong><div><button onclick="openTransferWorldProfile('${encodeURIComponent(item.team.name)}')">Профіль</button><button class="transfer-negotiate-button" onclick="openTransferNegotiation('${encodeURIComponent(item.team.name)}', ${item.playerIndex})">Переговори</button></div>`;
    });
};

const ensureStateSchemaBeforeMatchDetails = ensureStateSchema;
ensureStateSchema = function() {
    ensureStateSchemaBeforeMatchDetails();
    ensureDetailedCompetitionState();
};

const windowOnloadBeforeMatchDetails = window.onload;
window.onload = function() {
    windowOnloadBeforeMatchDetails();
    ensureDetailedCompetitionState();
    ensureRoundWindow();
    closeCalendarRound();
    renderManagerPanels();
    renderRatingTable();
    autoSave('match-details-load');
};

// === CODEX ROSTER DATABASE 2026-06-19 ===
const ROSTER_DATABASE_VERSION = '2026-06-19-v1';
const SECONDARY_PLAYER_ROLES = {
    "Jame": "AWP",
    "saffee": "AWP"
};

function applyRosterDatabaseUpdate() {
    if (state.rosterDatabaseVersion === ROSTER_DATABASE_VERSION) return false;
    const selectedTeam = state.userTeamFullName;

    if (selectedTeam && ALL_TEAMS_DATA[selectedTeam]) {
        initializeRatingsForTeam(selectedTeam);
        state.players = ALL_TEAMS_DATA[selectedTeam].map((name, index) => {
            const player = createPlayerProfile(name, index);
            player.secondaryRole = SECONDARY_PLAYER_ROLES[name] || null;
            return player;
        });
        teamsRating.forEach(team => {
            team.players.forEach(player => {
                player.secondaryRole = SECONDARY_PLAYER_ROLES[player.name] || null;
            });
        });
        syncPlayerTeamInRating();
        state.currentTournamentTier = chooseTournamentTier();
        state.tournamentTables = buildTournamentTables();
        state.calendar = [];
        state.matchWeek = 1;
        logSystem('✅ Базу команд і рейтингів оновлено до складів 19.06.2026.');
    } else if (selectedTeam) {
        state = createDefaultState();
        teamsRating = [];
        marketPool = [];
        document.getElementById('game-interface').style.display = 'none';
        createTeamSelectionScreen();
    }

    state.rosterDatabaseVersion = ROSTER_DATABASE_VERSION;
    autoSave('roster-database-update');
    return true;
}

const windowOnloadBeforeRosterDatabase = window.onload;
window.onload = function() {
    windowOnloadBeforeRosterDatabase();
    if (applyRosterDatabaseUpdate()) {
        ensureDetailedCompetitionState();
        renderManagerPanels();
        renderRatingTable();
        updateUI();
        autoSave('roster-database-ready');
    }
};

// === CODEX CAREER MODE NAVIGATION ===
const CAREER_SECTION_COPY = {
    hub: {
        title: 'ГОЛОВНА',
        description: 'Керуйте командою, готуйте склад і виходьте на наступний матч.'
    },
    transfers: {
        title: 'ТРАНСФЕРИ',
        description: 'Порівнюйте гравців, плануйте заміни та підсилюйте ростер.'
    },
    rating: {
        title: 'СВІТОВИЙ РЕЙТИНГ',
        description: 'Стежте за формою клубів, складами та статистикою суперників.'
    }
};

function getActiveCareerSection() {
    if (document.getElementById('tab-transfers')?.classList.contains('active')) return 'transfers';
    if (document.getElementById('tab-rating')?.classList.contains('active')) return 'rating';
    return 'hub';
}

function updateCareerNavigation(section = getActiveCareerSection()) {
    const isReady = !!state.userTeamFullName;
    document.body.classList.toggle('game-ready', isReady);
    document.body.dataset.careerSection = section;
    const copy = CAREER_SECTION_COPY[section] || CAREER_SECTION_COPY.hub;
    const title = document.getElementById('section-title');
    const description = document.getElementById('section-description');
    if (title) title.textContent = copy.title;
    if (description) description.textContent = copy.description;
    ['hub', 'transfers', 'rating'].forEach(name => {
        const tab = document.getElementById(`tab-${name}`);
        if (tab) tab.setAttribute('aria-pressed', name === section ? 'true' : 'false');
    });
}

const switchTabBeforeCareerNavigation = window.switchTab;
window.switchTab = function(tabName) {
    switchTabBeforeCareerNavigation(tabName);
    updateCareerNavigation(tabName);
};

const updateUIBeforeCareerNavigation = updateUI;
updateUI = function() {
    updateUIBeforeCareerNavigation();
    updateCareerNavigation();
};

function bindCareerNavigationKeyboard() {
    document.querySelectorAll('.tabs-nav .tab-btn').forEach(tab => {
        if (tab.dataset.keyboardReady) return;
        tab.dataset.keyboardReady = 'true';
        tab.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                tab.click();
            }
        });
    });
}

const windowOnloadBeforeCareerNavigation = window.onload;
window.onload = function() {
    windowOnloadBeforeCareerNavigation();
    bindCareerNavigationKeyboard();
    updateCareerNavigation();
};

// === CODEX LIVE BO3 STATISTICS ===
function escapeLiveText(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function createLivePlayerStats(players) {
    return players.map(player => ({
        name: player.name,
        role: player.role || 'Rifler',
        skill: Math.min(100, player.skill || 70),
        form: player.form || 0,
        source: player,
        kills: 0,
        deaths: 0,
        damage: 0,
        kastRounds: 0,
        rounds: 0,
        rating: 1,
        swing: 0,
        roundKills: 0,
        diedThisRound: false,
        assistedThisRound: false
    }));
}

function recalculateLiveStat(stat) {
    if (!stat.rounds) {
        stat.rating = 1;
        stat.swing = 0;
        return;
    }
    const kpr = stat.kills / stat.rounds;
    const dpr = stat.deaths / stat.rounds;
    const adr = stat.damage / stat.rounds;
    const kast = stat.kastRounds / stat.rounds;
    const rawRating = 0.35 + kpr * 0.8 - dpr * 0.38 + adr * 0.0032 + kast * 0.24;
    const sampleWeight = 0.45 + Math.min(1, stat.rounds / 6) * 0.55;
    stat.rating = Math.max(0.35, Math.min(2, 1 + (rawRating - 1) * sampleWeight));
    stat.swing = Math.max(-4.5, Math.min(4.5, (stat.rating - 1) * 3.8 + (stat.form || 0) * 0.03));
}

function pickWeightedLivePlayer(stats) {
    const roleWeight = { AWP: 1.12, Entry: 1.08, Lurker: 1.03, Rifler: 1, IGL: 0.88 };
    const roleKpr = { AWP: 0.76, Entry: 0.75, Lurker: 0.72, Rifler: 0.69, IGL: 0.61 };
    const weights = stats.map(stat => {
        const level = Number(stat.source?.level || Math.max(1, Math.round((stat.skill - 55) / 3)));
        const expectedKills = Math.max(1, stat.rounds * (roleKpr[stat.role] || 0.69));
        const hotHandControl = stat.kills > expectedKills ? Math.max(0.32, expectedKills / Math.max(1, stat.kills)) : 1;
        return Math.max(1, (35 + (stat.skill - 55) * 1.6 + stat.form * 3 + level * 0.8) * (roleWeight[stat.role] || 1) * hotHandControl);
    });
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    let roll = Math.random() * total;
    for (let index = 0; index < stats.length; index++) {
        roll -= weights[index];
        if (roll <= 0) return stats[index];
    }
    return stats[stats.length - 1];
}

function shuffledLivePlayers(stats) {
    return [...stats].sort(() => Math.random() - 0.5);
}

function pickWeightedLiveVictim(stats) {
    const roleRisk = { Entry: 1.18, IGL: 1.05, Rifler: 1, Lurker: 0.9, AWP: 0.84 };
    const weights = stats.map(stat => Math.max(0.2, (roleRisk[stat.role] || 1) * (1.08 - (stat.skill - 70) * 0.004)));
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    let roll = Math.random() * total;
    for (let index = 0; index < stats.length; index++) {
        roll -= weights[index];
        if (roll <= 0) return stats[index];
    }
    return stats[stats.length - 1];
}

function grantLiveKills(killers, victims, count) {
    const victimPool = [...victims];
    for (let frag = 0; frag < Math.min(count, victims.length); frag++) {
        const victim = pickWeightedLiveVictim(victimPool);
        victimPool.splice(victimPool.indexOf(victim), 1);
        const killer = pickWeightedLivePlayer(killers);
        killer.kills += 1;
        killer.roundKills += 1;
        const killDamage = 72 + Math.floor(Math.random() * 29);
        killer.damage += killDamage;
        const assistPool = killers.filter(stat => stat !== killer);
        if (assistPool.length && killDamage < 100 && Math.random() < 0.55) {
            const assister = assistPool[Math.floor(Math.random() * assistPool.length)];
            assister.damage += 100 - killDamage;
            assister.assistedThisRound = true;
        } else killer.damage += 100 - killDamage;
        victim.deaths += 1;
        victim.diedThisRound = true;
    }
}

function grantLiveChipDamage(attackers, targets) {
    targets.filter(target => !target.diedThisRound).forEach(target => {
        if (Math.random() >= 0.6) return;
        const attacker = pickWeightedLivePlayer(attackers);
        attacker.damage += 15 + Math.floor(Math.random() * 46);
    });
}

function simulateLiveRoundStats(playerStats, enemyStats, playerWonRound) {
    [...playerStats, ...enemyStats].forEach(stat => {
        stat.roundKills = 0;
        stat.diedThisRound = false;
        stat.assistedThisRound = false;
    });

    const winners = playerWonRound ? playerStats : enemyStats;
    const losers = playerWonRound ? enemyStats : playerStats;
    const winnerRoll = Math.random();
    const loserRoll = Math.random();
    const winnerKills = winnerRoll < 0.4 ? 5 : winnerRoll < 0.85 ? 4 : 3;
    const loserKills = loserRoll < 0.18 ? 0 : loserRoll < 0.48 ? 1 : loserRoll < 0.76 ? 2 : loserRoll < 0.94 ? 3 : 4;
    grantLiveKills(winners, losers, winnerKills);
    grantLiveKills(losers, winners, loserKills);
    grantLiveChipDamage(winners, losers);
    grantLiveChipDamage(losers, winners);

    [...playerStats, ...enemyStats].forEach(stat => {
        stat.rounds += 1;
        const onWinningSide = winners.includes(stat);
        const traded = stat.diedThisRound && Math.random() < (onWinningSide ? 0.38 : 0.18);
        if (stat.roundKills > 0 || !stat.diedThisRound || stat.assistedThisRound || traded) stat.kastRounds += 1;
        recalculateLiveStat(stat);
    });
}

function getLiveTeamMark(teamName) {
    return String(teamName || 'TEAM').split(/\s+/).map(part => part[0]).join('').slice(0, 3).toUpperCase();
}

function getLiveRatingClass(rating) {
    if (rating >= 1.1) return 'good';
    if (rating < 0.9) return 'bad';
    return 'average';
}

function renderLiveTeamStats(teamName, stats, sideClass, score, scoreUnit = 'раундів') {
    const sorted = [...stats].sort((a, b) => b.rating - a.rating || b.kills - a.kills);
    return `
        <section class="live-team-table">
            <div class="live-team-header ${sideClass}">
                <div class="live-team-name"><span class="live-team-mark">${escapeLiveText(getLiveTeamMark(teamName))}</span><b>${escapeLiveText(teamName)}</b><small>${score} ${escapeLiveText(scoreUnit)}</small></div>
                <span class="live-stat-label">K-D</span>
                <span class="live-stat-label">Swing</span>
                <span class="live-stat-label">ADR</span>
                <span class="live-stat-label">KAST</span>
                <span class="live-stat-label">Rating</span>
            </div>
            ${sorted.map((stat, index) => {
                const adr = stat.rounds ? stat.damage / stat.rounds : 0;
                const kast = stat.rounds ? stat.kastRounds / stat.rounds * 100 : 0;
                const swingClass = stat.swing > 0.15 ? 'positive' : stat.swing < -0.15 ? 'negative' : '';
                const swingText = `${stat.swing >= 0 ? '+' : ''}${stat.swing.toFixed(2)}%`;
                return `
                    <div class="live-player-stat ${index === 0 ? 'is-leader' : ''}">
                        <div class="live-player-name"><span class="live-player-role">${escapeLiveText(stat.role === 'AWP' ? 'AWP' : stat.role === 'IGL' ? 'IGL' : 'RIF')}</span><b>${escapeLiveText(stat.name)}</b><small>${escapeLiveText(stat.role)}</small></div>
                        <span class="live-stat-value">${stat.kills}-${stat.deaths}</span>
                        <span class="live-stat-value live-swing ${swingClass}">${swingText}</span>
                        <span class="live-stat-value">${adr.toFixed(1)}</span>
                        <span class="live-stat-value">${kast.toFixed(1)}%</span>
                        <span class="live-stat-value live-rating ${getLiveRatingClass(stat.rating)}">${stat.rating.toFixed(2)}</span>
                    </div>
                `;
            }).join('')}
        </section>
    `;
}

function renderLiveStatsBoard(playerStats, enemyStats, playerScore, enemyScore, roundNumber) {
    const board = document.getElementById('live-stats-board');
    if (!board) return;
    const enemyTeam = getTeamByName(state.currentEnemy.name);
    const playerTeamName = state.userTeamFullName || state.userTeamTag || 'Ваша команда';
    const enemyTeamName = enemyTeam?.name || state.currentEnemy.name || 'Суперник';
    board.innerHTML = `
        ${renderLiveTeamStats(playerTeamName, playerStats, 'player-side', playerScore)}
        ${renderLiveTeamStats(enemyTeamName, enemyStats, 'enemy-side', enemyScore)}
        <div class="live-stats-caption"><span>Статистика оновлюється після кожного раунду</span><span>Раунд ${roundNumber} • поточна мапа</span></div>
    `;
}

startSingleMapSimulation = function(mapName, onMapEnd) {
    document.getElementById('match-screen').style.display = 'block';
    const enemyTeam = getTeamByName(state.currentEnemy.name);
    const enemyPlayers = enemyTeam?.players?.length
        ? enemyTeam.players
        : (ALL_TEAMS_DATA[state.currentEnemy.name] || ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'])
            .map((name, index) => createPlayerProfile(name, index));
    const playerLiveStats = createLivePlayerStats(state.players);
    const enemyLiveStats = createLivePlayerStats(enemyPlayers);

    let playerRoundScore = 0;
    let enemyRoundScore = 0;
    let currentRound = 1;
    let playerLossStreak = 0;
    let playerRoundMoney = 800;
    let inOvertime = false;
    let playerOvertimeScore = 0;
    let enemyOvertimeScore = 0;

    const ticker = document.getElementById('live-ticker');
    const scoreElement = document.getElementById('live-score');
    const playerName = document.getElementById('live-player-name');
    const enemyName = document.getElementById('live-enemy-name');
    if (playerName) playerName.textContent = state.userTeamFullName || state.userTeamTag || 'Ваша команда';
    if (enemyName) enemyName.textContent = enemyTeam?.name || state.currentEnemy.name || 'Суперник';
    ticker.innerHTML = `<span style="color:#c7f000;font-weight:bold;">--- ${escapeLiveText(mapName.toUpperCase())} • LIVE СТАТИСТИКА ---</span>`;
    renderLiveStatsBoard(playerLiveStats, enemyLiveStats, 0, 0, 1);

    const matchInterval = setInterval(() => {
        let playerPower = getTeamSkill(mapName);
        const enemyPower = enemyTeam ? getOpponentMapPower(enemyTeam, mapName) : state.currentEnemy.skill;
        let economyPenalty = 0;
        playerPower += getTacticPowerModifier(state.chosenTactic, mapName, currentRound, playerRoundMoney);
        if (currentRound !== 1 && currentRound !== 13 && !inOvertime && playerRoundMoney < 3000) economyPenalty = 14;
        if (state.chosenTactic === 'aggressive' && playerRoundMoney < 3000) economyPenalty += 3;

        const totalPower = Math.max(1, playerPower - economyPenalty + enemyPower);
        const winChance = Math.max(0.18, Math.min(0.82, (playerPower - economyPenalty) / totalPower));
        const playerWonRound = Math.random() < winChance;
        simulateLiveRoundStats(playerLiveStats, enemyLiveStats, playerWonRound);

        let logText = '';
        if (playerWonRound) {
            playerRoundScore += 1;
            if (inOvertime) playerOvertimeScore += 1;
            playerLossStreak = 0;
            playerRoundMoney = Math.min(playerRoundMoney + 3250, 16000);
            const hero = [...playerLiveStats].sort((a, b) => b.roundKills - a.roundKills || b.rating - a.rating)[0];
            const phrase = Math.random() < 0.5 ? ctPhrases[Math.floor(Math.random() * ctPhrases.length)] : tPhrases[Math.floor(Math.random() * tPhrases.length)];
            logText = `<span style="color:#c7f000;">[${escapeLiveText(state.userTeamTag)}] Раунд ${currentRound}:</span> <b>${escapeLiveText(hero.name)}</b> ${phrase}`;
        } else {
            enemyRoundScore += 1;
            if (inOvertime) enemyOvertimeScore += 1;
            playerLossStreak = Math.min(playerLossStreak + 1, 5);
            playerRoundMoney = Math.min(playerRoundMoney + 1400 + playerLossStreak * 500, 16000);
            const hero = [...enemyLiveStats].sort((a, b) => b.roundKills - a.roundKills || b.rating - a.rating)[0];
            logText = `<span style="color:#ff5b66;">[${escapeLiveText((enemyTeam?.name || state.currentEnemy.name).substring(0, 8).toUpperCase())}] Раунд ${currentRound}:</span> <b>${escapeLiveText(hero.name)}</b> приносить раунд супернику.`;
        }

        ticker.innerHTML = `${logText}<br>${ticker.innerHTML}`;
        scoreElement.innerText = `${playerRoundScore} : ${enemyRoundScore}`;
        renderLiveStatsBoard(playerLiveStats, enemyLiveStats, playerRoundScore, enemyRoundScore, currentRound);
        currentRound += 1;

        let mapFinished = false;
        if (!inOvertime) {
            if (playerRoundScore === 13 || enemyRoundScore === 13) mapFinished = true;
            else if (playerRoundScore === 12 && enemyRoundScore === 12) {
                inOvertime = true;
                playerOvertimeScore = 0;
                enemyOvertimeScore = 0;
            }
        } else if (playerOvertimeScore === 4 || enemyOvertimeScore === 4) {
            mapFinished = true;
        } else if (playerOvertimeScore === 3 && enemyOvertimeScore === 3) {
            playerOvertimeScore = 0;
            enemyOvertimeScore = 0;
        }

        if (mapFinished) {
            clearInterval(matchInterval);
            playerLiveStats.forEach(recalculateLiveStat);
            enemyLiveStats.forEach(recalculateLiveStat);
            renderLiveStatsBoard(playerLiveStats, enemyLiveStats, playerRoundScore, enemyRoundScore, currentRound - 1);
            addMapStatsToSeries(playerLiveStats.map(stat => ({
                name: stat.name,
                kills: stat.kills,
                deaths: stat.deaths,
                rating: Number(stat.rating.toFixed(2))
            })));

            const playerWonMap = playerRoundScore > enemyRoundScore;
            updatePlayerMapDevelopment(mapName, playerWonMap);
            seriesState.mapResults = Array.isArray(seriesState.mapResults) ? seriesState.mapResults : [];
            seriesState.mapResults.push({
                map: mapName,
                winner: playerWonMap ? 'player' : 'enemy',
                playerRounds: playerRoundScore,
                enemyRounds: enemyRoundScore,
                roundScore: `${playerRoundScore}-${enemyRoundScore}`
            });
            seriesState.mapDetailedStats = Array.isArray(seriesState.mapDetailedStats) ? seriesState.mapDetailedStats : [];
            seriesState.mapDetailedStats.push({
                map: mapName,
                playerRounds: playerRoundScore,
                enemyRounds: enemyRoundScore,
                winner: playerWonMap ? 'player' : 'enemy',
                playerStats: playerLiveStats.map(stat => serializeLiveStat(stat)),
                enemyStats: enemyLiveStats.map(stat => serializeLiveStat(stat))
            });
            autoSave('live-stat-map-finished');
            setTimeout(() => onMapEnd(playerWonMap ? 'player' : 'enemy'), 900);
        }
    }, 430);
};

// === CODEX BO3 REVIEW AND SMART VETO ===
function serializeLiveStat(stat) {
    return {
        name: stat.name,
        role: stat.role,
        skill: stat.skill,
        form: stat.form,
        kills: stat.kills,
        deaths: stat.deaths,
        damage: stat.damage,
        kastRounds: stat.kastRounds,
        rounds: stat.rounds,
        rating: stat.rating,
        swing: stat.swing
    };
}

function aggregateBo3Stats(maps, statsKey) {
    const aggregate = new Map();
    maps.forEach(map => {
        (map[statsKey] || []).forEach(stat => {
            if (!aggregate.has(stat.name)) {
                aggregate.set(stat.name, {
                    name: stat.name,
                    role: stat.role,
                    skill: stat.skill,
                    form: stat.form,
                    kills: 0,
                    deaths: 0,
                    damage: 0,
                    kastRounds: 0,
                    rounds: 0,
                    rating: 1,
                    swing: 0
                });
            }
            const target = aggregate.get(stat.name);
            target.kills += stat.kills || 0;
            target.deaths += stat.deaths || 0;
            target.damage += stat.damage || 0;
            target.kastRounds += stat.kastRounds || 0;
            target.rounds += stat.rounds || 0;
        });
    });
    const result = [...aggregate.values()];
    result.forEach(recalculateLiveStat);
    return result;
}

function renderPostMatchStats(report, selection) {
    if (selection === 'all') {
        return {
            title: 'Усі мапи',
            subtitle: `${report.maps.length} зіграно`,
            playerRounds: report.playerScore,
            enemyRounds: report.enemyScore,
            scoreUnit: 'мап',
            playerStats: aggregateBo3Stats(report.maps, 'playerStats'),
            enemyStats: aggregateBo3Stats(report.maps, 'enemyStats')
        };
    }
    const map = report.maps[Number(selection)] || report.maps[0];
    return {
        title: map.map,
        subtitle: `${map.playerRounds}-${map.enemyRounds}`,
        playerRounds: map.playerRounds,
        enemyRounds: map.enemyRounds,
        scoreUnit: 'раундів',
        playerStats: map.playerStats,
        enemyStats: map.enemyStats
    };
}

function renderPostMatchReport(report, selection = 'all') {
    const container = document.getElementById('post-match-report');
    if (!container || !report) return;
    const view = renderPostMatchStats(report, selection);
    const resultText = report.isPlayerWin ? 'ПЕРЕМОГА' : 'ПОРАЗКА';
    container.style.display = 'grid';
    container.innerHTML = `
        <div class="post-match-hero">
            <div class="post-match-team"><b>${escapeLiveText(report.playerTeam)}</b><small>${report.playerScore} виграних мап</small></div>
            <div class="post-match-final-score"><span>${resultText}</span><strong>${report.playerScore} : ${report.enemyScore}</strong></div>
            <div class="post-match-team"><b>${escapeLiveText(report.enemyTeam)}</b><small>${report.enemyScore} виграних мап</small></div>
        </div>
        <div class="post-match-map-tabs">
            <button class="post-match-map-tab ${selection === 'all' ? 'active' : ''}" onclick="showPostMatchMap('all')"><b>Усі мапи</b><small>${report.playerScore}-${report.enemyScore}</small></button>
            ${report.maps.map((map, index) => `
                <button class="post-match-map-tab ${String(index) === String(selection) ? 'active' : ''}" onclick="showPostMatchMap('${index}')"><b>${escapeLiveText(map.map)}</b><small>${map.playerRounds}-${map.enemyRounds}</small></button>
            `).join('')}
        </div>
        <div class="post-match-stats-wrap">
            <div class="live-stats-board">
                ${renderLiveTeamStats(report.playerTeam, view.playerStats, 'player-side', view.playerRounds, view.scoreUnit)}
                ${renderLiveTeamStats(report.enemyTeam, view.enemyStats, 'enemy-side', view.enemyRounds, view.scoreUnit)}
                <div class="live-stats-caption"><span>${escapeLiveText(view.title)} • ${escapeLiveText(view.subtitle)}</span><span>MVP BO3: ${escapeLiveText(state.lastMVP || '—')}</span></div>
            </div>
        </div>
        <div class="post-match-footer">
            <span>Матч завершено. Перегляньте статистику кожної мапи або загальний підсумок серії.</span>
            <button class="continue-match-btn" onclick="continueAfterMatch()">Далі до головного екрана</button>
        </div>
    `;
}

window.showPostMatchMap = function(selection) {
    if (!seriesState.completedReport) return;
    seriesState.completedReport.selectedMap = selection;
    renderPostMatchReport(seriesState.completedReport, selection);
};

window.continueAfterMatch = function() {
    document.body.classList.remove('post-match-mode');
    document.getElementById('match-screen').style.display = 'none';
    document.getElementById('post-match-report').style.display = 'none';
    document.getElementById('game-interface').style.display = 'block';
    switchTab('hub');
    updateUI();
    autoSave('post-match-continued');
};

const startBo3SeriesBeforeReview = startBo3Series;
startBo3Series = function() {
    seriesState.mapDetailedStats = [];
    seriesState.completedReport = null;
    document.body.classList.remove('post-match-mode');
    const report = document.getElementById('post-match-report');
    if (report) report.style.display = 'none';
    startBo3SeriesBeforeReview();
};

const finishBo3SeriesBeforeReview = finishBo3Series;
finishBo3Series = function(isPlayerWin) {
    const report = {
        isPlayerWin,
        playerTeam: state.userTeamFullName,
        enemyTeam: state.currentEnemy.name.replace(/ \(Tier [123]\)$/,''),
        playerScore: seriesState.playerScore,
        enemyScore: seriesState.enemyScore,
        maps: JSON.parse(JSON.stringify(seriesState.mapDetailedStats || [])),
        selectedMap: 'all'
    };

    finishBo3SeriesBeforeReview(isPlayerWin);
    seriesState.completedReport = report;
    document.getElementById('game-interface').style.display = 'none';
    document.getElementById('match-screen').style.display = 'block';
    document.body.classList.add('post-match-mode');
    document.getElementById('live-current-map').textContent = 'Матч завершено';
    document.getElementById('live-score').textContent = `${report.playerScore} : ${report.enemyScore}`;
    document.getElementById('live-series-score').textContent = 'Повна статистика BO3';
    renderPostMatchReport(report, 'all');
    autoSave('post-match-report-open');
};

function getVetoMapValue(team, mapName) {
    if (!team) return 0;
    ensureTeamCompetitiveProfile(team);
    const map = team.mapStats[mapName] || { skill: 0, played: 0, wins: 0 };
    return (map.skill || 0) + getMapWinrate(map) * 0.12 + Math.min(8, (map.played || 0) * 0.2);
}

renderVetoMaps = function() {
    const container = document.getElementById('veto-maps-container');
    if (!container) return;
    const enemyTeam = getTeamByName(state.currentEnemy.name);
    if (enemyTeam) ensureTeamCompetitiveProfile(enemyTeam);
    state.mapMastery = ensureMapStatsObject(state.mapMastery || {});
    const rankedMaps = [...officialMaps].sort((a, b) => getVetoMapValue(enemyTeam, b) - getVetoMapValue(enemyTeam, a));
    const bestMap = rankedMaps[0];
    const worstMap = rankedMaps[rankedMaps.length - 1];
    const isPlayerTurn = vetoState.step % 2 === 0;
    container.innerHTML = '';

    vetoState.availableMaps.forEach(mapName => {
        const enemyMap = enemyTeam?.mapStats?.[mapName] || { skill: 0, played: 0, wins: 0 };
        const playerMap = state.mapMastery[mapName] || { skill: 0, played: 0, wins: 0 };
        const button = document.createElement('button');
        button.className = `veto-map-card ${isPlayerTurn ? 'player-turn' : ''}`;
        button.style.margin = '0';
        button.innerHTML = `
            <div class="veto-map-badges">
                ${mapName === bestMap ? '<span class="veto-map-badge best">НАЙКРАЩА СУПЕРНИКА</span>' : ''}
                ${mapName === worstMap ? '<span class="veto-map-badge worst">НАЙГІРША СУПЕРНИКА</span>' : ''}
            </div>
            <b>${escapeLiveText(mapName)}</b>
            <div class="veto-map-meta">
                <span><em>Суперник</em><strong>+${enemyMap.skill || 0}/30 • WR ${getMapWinrate(enemyMap)}%</strong></span>
                <span><em>Зіграно</em><strong>${enemyMap.played || 0} мап</strong></span>
                <span><em>Ваша команда</em><strong>+${playerMap.skill || 0}/30 • WR ${getMapWinrate(playerMap)}%</strong></span>
            </div>
        `;
        if (isPlayerTurn) button.onclick = () => handleVetoAction(mapName);
        else button.disabled = true;
        container.appendChild(button);
    });
};

enemyVetoAction = function(actionType) {
    const enemyTeam = getTeamByName(state.currentEnemy.name);
    const sorted = [...vetoState.availableMaps].sort((a, b) => getVetoMapValue(enemyTeam, b) - getVetoMapValue(enemyTeam, a));
    const chosenMap = actionType === 'pick' ? sorted[0] : sorted[sorted.length - 1];
    vetoState.availableMaps = vetoState.availableMaps.filter(map => map !== chosenMap);
    if (actionType === 'ban') {
        document.getElementById('veto-log').innerHTML = `• ❌ ${escapeLiveText(state.currentEnemy.name)} забанив: <b>${escapeLiveText(chosenMap)}</b><br>${document.getElementById('veto-log').innerHTML}`;
    } else {
        vetoState.chosenMaps.push(chosenMap);
        document.getElementById('veto-log').innerHTML = `• ⭐ ${escapeLiveText(state.currentEnemy.name)} обрав свою сильну карту: <b>${escapeLiveText(chosenMap)}</b><br>${document.getElementById('veto-log').innerHTML}`;
    }
    vetoState.step += 1;
    processVetoStep();
};

// === CODEX FIVE-SECTION CLUB RESTRUCTURE ===
const CLUB_SECTION_COPY = {
    hub: { title: 'ГОЛОВНА', description: 'Наступний матч, поточний склад і новини організації.' },
    club: { title: 'КЛУБ', description: 'Фінанси, стан клубу та середня статистика гравців.' },
    transfers: { title: 'ТРАНСФЕРИ', description: 'Глобальний пошук гравців за командою, роллю, рейтингом і ціною.' },
    rating: { title: 'СВІТ', description: 'HLTV-рейтинг, турнір сезону, календар і профілі суперників.' },
    training: { title: 'ТРЕНУВАННЯ', description: 'Програми розвитку гравців, відновлення та підготовка карт.' }
};

const TRAINING_PROGRAMS = {
    general: { name: 'Загальне тренування', cost: 650, fatigue: 14, description: 'Невеликий розвиток усього складу та +3 зіграності.' },
    aim: { name: 'Індивідуальний aim', cost: 800, fatigue: 20, description: 'Шанс +1 скіл для ріфлерів, форма атакувальних ролей.' },
    tactics: { name: 'Тактична сесія', cost: 550, fatigue: 10, description: '+6 зіграності та стабільніша форма IGL.' },
    awp: { name: 'AWP-підготовка', cost: 700, fatigue: 16, description: 'Розвиток снайпера і бонус його форми.' },
    recovery: { name: 'Відновлення', cost: 300, fatigue: -35, description: 'Знижує втому та повертає форму без росту скілу.' }
};

function hashTeamName(name) {
    return [...String(name || '')].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function ensureWeakMapForTeam(team) {
    if (!team) return null;
    ensureTeamCompetitiveProfile(team);
    if (!officialMaps.includes(team.weakMap)) team.weakMap = officialMaps[hashTeamName(team.name) % officialMaps.length];
    team.mapStats[team.weakMap] = {
        ...(team.mapStats[team.weakMap] || { played: 0, wins: 0 }),
        skill: -10
    };
    return team.weakMap;
}

function ensureClubRestructureState() {
    state.trainingFatigue = Math.max(0, Math.min(100, state.trainingFatigue || 0));
    state.trainingHistory = Array.isArray(state.trainingHistory) ? state.trainingHistory : [];
    const playerTeam = teamsRating.find(team => team.isPlayer);
    teamsRating.forEach(ensureWeakMapForTeam);
    if (!officialMaps.includes(state.weakMap)) {
        state.weakMap = playerTeam?.weakMap || officialMaps[hashTeamName(state.userTeamFullName) % officialMaps.length];
    }
    state.mapMastery = ensureMapStatsObject(state.mapMastery || {});
    if (state.weakMap) {
        state.mapMastery[state.weakMap] = {
            ...(state.mapMastery[state.weakMap] || { played: 0, wins: 0 }),
            skill: -10
        };
        if (playerTeam) playerTeam.weakMap = state.weakMap;
    }
}

const ensureStateSchemaBeforeClubRestructure = ensureStateSchema;
ensureStateSchema = function() {
    ensureStateSchemaBeforeClubRestructure();
    ensureClubRestructureState();
};

calculateBaseCosts = function() {
    return 0;
};

processMatchExpenses = function() {
    const salaries = state.players.reduce((sum, player) => sum + getPlayerSalary(player), 0);
    state.money -= salaries;
    state.finances = { ...state.finances, salaries, baseCosts: 0 };
    logSystem(`💸 Зарплати за матч: -$${salaries}.`);
    return salaries;
};

window.upgradeBootcamp = function() {
    return false;
};

function getConnectedRosterPower(players, chemistry, mapRow, isWeakMap = false, fatigue = 0) {
    const roster = players || [];
    const effectiveSkill = typeof window.getEffectiveRosterSkill === 'function'
        ? window.getEffectiveRosterSkill(roster)
        : roster.reduce((sum, player) => sum + Math.min(100, player.skill), 0) / Math.max(1, roster.length);
    const averageForm = roster.reduce((sum, player) => sum + Number(player.form || 0), 0) / Math.max(1, roster.length);
    const averageRating = roster.reduce((sum, player) => sum + Number(player.stats?.rating || 1), 0) / Math.max(1, roster.length);
    const averageLevel = roster.reduce((sum, player) => sum + Number(player.level || Math.max(1, Math.round((player.skill - 55) / 3))), 0) / Math.max(1, roster.length);
    const mapSkill = isWeakMap ? -10 : Number(mapRow?.skill || 0);
    const mapWinrate = Number(mapRow?.played || 0) ? Number(mapRow.wins || 0) / Math.max(1, Number(mapRow.played)) * 100 : 50;
    const mapExperience = Math.min(1, Number(mapRow?.played || 0) / 10);
    return effectiveSkill
        + averageForm * 0.7
        + (averageRating - 1) * 16
        + (averageLevel - 8) * 0.28
        + (Number(chemistry || 70) - 70) * 0.12
        + mapSkill * 0.28
        + (mapWinrate - 50) * 0.04 * mapExperience
        - Math.max(0, (Number(fatigue || 0) - 55) * 0.12);
}

window.getUserCompetitivePower = function(mapName = '') {
    ensureClubRestructureState();
    return getConnectedRosterPower(
        state.players,
        state.chemistry,
        state.mapMastery?.[mapName],
        mapName === state.weakMap,
        state.trainingFatigue
    );
};

window.getCompetitiveTeamPower = function(team, mapName = '') {
    if (!team) return 70;
    ensureTeamCompetitiveProfile(team);
    ensureWeakMapForTeam(team);
    return getConnectedRosterPower(team.players, team.chemistry, team.mapStats?.[mapName], mapName === team.weakMap, 0);
};

window.calculatePowerWinChance = function(powerA, powerB, spread = 22, minimum = 0.12, maximum = 0.88) {
    const chance = 1 / (1 + Math.pow(10, (Number(powerB) - Number(powerA)) / Math.max(1, spread)));
    return Math.max(minimum, Math.min(maximum, chance));
};

getTeamSkill = function(mapName = '') {
    return window.getUserCompetitivePower(mapName);
};

getOpponentMapPower = function(team, mapName) {
    return window.getCompetitiveTeamPower(team, mapName);
};

pickTeamTournamentMap = function(team) {
    ensureTeamCompetitiveProfile(team);
    const weakMap = ensureWeakMapForTeam(team);
    const candidates = officialMaps.filter(map => map !== weakMap);
    if (team.mapFocus && team.mapFocus !== weakMap && Math.random() < 0.42) return team.mapFocus;
    return candidates
        .map(map => ({ map, score: Number(team.mapStats[map]?.skill || 0) + getMapWinrate(team.mapStats[map]) * 0.08 + Math.random() * 8 }))
        .sort((a, b) => b.score - a.score)[0].map;
};

updateTeamMapDevelopment = function(team, mapName, didWin) {
    ensureTeamCompetitiveProfile(team);
    const weakMap = ensureWeakMapForTeam(team);
    if (mapName === weakMap) {
        team.mapStats[mapName].skill = -10;
        return;
    }
    const row = team.mapStats[mapName] || { played: 0, wins: 0, skill: 0 };
    row.played += 1;
    if (didWin) row.wins += 1;
    row.skill = clampMapSkill(row.skill + 1 + (didWin ? 2 : -2));
    team.mapStats[mapName] = row;
    if (didWin && Math.random() < 0.24) team.mapFocus = mapName;
};

updatePlayerMapDevelopment = function(mapName, didWin) {
    ensureClubRestructureState();
    if (mapName === state.weakMap) {
        state.mapMastery[mapName].skill = -10;
        return;
    }
    const row = state.mapMastery[mapName] || { played: 0, wins: 0, skill: 0 };
    row.played += 1;
    if (didWin) row.wins += 1;
    row.skill = clampMapSkill(row.skill + 1 + (didWin ? 2 : -2));
    state.mapMastery[mapName] = row;
    logSystem(`🗺️ ${mapName}: ${didWin ? 'перемога' : 'поразка'}, скіл карти ${row.skill}/30, WR ${getMapWinrate(row)}%.`);
};

function getTacticPowerModifier(tactic, mapName, roundNumber, money) {
    const mapSkill = mapName === state.weakMap ? -10 : Number(state.mapMastery?.[mapName]?.skill || 0);
    const chemistry = state.chemistry || 70;
    const byRole = role => state.players.filter(player => player.role === role);
    if (tactic === 'aggressive') return Math.random() < 0.62 ? 5.5 : -3.5;
    if (tactic === 'control') return 1.5 + chemistry / 45 + Math.max(0, mapSkill) / 12;
    if (tactic === 'defensive') return 2.8 + (roundNumber > 12 ? 0.8 : 0);
    if (tactic === 'awp') {
        const awpers = byRole('AWP');
        return awpers.length ? Math.max(-1, (awpers.reduce((sum, player) => sum + player.skill, 0) / awpers.length - 72) / 5) : -4;
    }
    if (tactic === 'entry') {
        const entries = byRole('Entry');
        const roleBonus = entries.length ? (entries.reduce((sum, player) => sum + player.skill, 0) / entries.length - 70) / 6 : -2;
        return roleBonus + (Math.random() < 0.55 ? 3 : -2);
    }
    return money < 2500 ? 0.5 : 0;
}

function getTacticLabel(tactic) {
    return {
        balanced: 'Баланс',
        aggressive: 'Високий темп',
        control: 'Контроль карти',
        defensive: 'Глибокий захист',
        awp: 'Гра навколо AWP',
        entry: 'Швидкі виходи'
    }[tactic] || 'Баланс';
}

const startBo3SeriesBeforeDeepTactics = startBo3Series;
startBo3Series = function() {
    startBo3SeriesBeforeDeepTactics();
    const display = document.getElementById('live-tactic-display');
    if (display) display.textContent = `Тактика: ${getTacticLabel(state.chosenTactic)}`;
};

function renderSimpleRoster() {
    const container = document.getElementById('roster-list-container');
    if (!container) return;
    container.innerHTML = state.players.map(player => {
        const form = player.form || 0;
        const formText = form >= 3 ? 'Відмінна' : form > 0 ? 'Добра' : form === 0 ? 'Нейтральна' : form > -3 ? 'Слабка' : 'Критична';
        return `
            <div class="simple-roster-row">
                <div><b>${escapeLiveText(player.name)}</b><small>${escapeLiveText(player.role)}</small></div>
                <span class="roster-form ${form > 0 ? 'positive' : form < 0 ? 'negative' : ''}">${formText} (${form >= 0 ? '+' : ''}${form})</span>
                <strong>Rating ${Math.min(100, player.skill)}</strong>
            </div>
        `;
    }).join('');
}

function organizeFiveSectionPanels() {
    const move = (id, slotId) => {
        const panel = document.getElementById(id);
        const slot = document.getElementById(slotId);
        if (panel && slot && panel.parentNode !== slot) slot.appendChild(panel);
    };
    move('club-finance-panel', 'club-finance-slot');
    move('player-stats-panel', 'club-player-stats-slot');
    move('club-actions-panel', 'club-actions-slot');
    move('tournament-tier-panel', 'world-tournament-slot');
    move('match-calendar-panel', 'world-calendar-slot');
    move('training-reminder-panel', 'training-reminder-slot');
    move('map-mastery-panel', 'map-training-slot');
}

function rewriteClubPanels() {
    const finance = document.getElementById('club-finance-panel');
    if (finance) {
        const salaries = state.players.reduce((sum, player) => sum + getPlayerSalary(player), 0);
        const sponsors = calculateSponsors();
        finance.innerHTML = `
            <h3>Економіка клубу</h3>
            <div class="stat-line"><span>Турнір:</span><span class="highlight">${getCurrentTier().label}</span></div>
            <div class="stat-line"><span>Зарплати за матч:</span><span>-$${salaries}</span></div>
            <div class="stat-line"><span>Спонсорські:</span><span class="highlight">+$${sponsors}</span></div>
            <div class="stat-line"><span>Прогноз без призових:</span><span class="highlight">${sponsors - salaries >= 0 ? '+$' + (sponsors - salaries) : '-$' + Math.abs(sponsors - salaries)}</span></div>
        `;
    }
    const stats = document.getElementById('player-stats-panel');
    if (stats) {
        stats.innerHTML = `
            <h3>Середня статистика за всі матчі</h3>
            <div class="club-player-stats-row head"><span>Гравець</span><span>Матчі</span><span>K/D</span><span>Rating</span><span>MVP</span></div>
            ${state.players.map(player => `
                <div class="club-player-stats-row"><b>${escapeLiveText(player.name)}</b><span>${player.stats.matches || 0}</span><span>${getPlayerKd(player)}</span><span>${getAveragePlayerRating(player)}</span><span>${player.stats.mvps || 0}</span></div>
            `).join('')}
        `;
    }
    const actions = document.getElementById('club-actions-panel');
    if (actions) {
        actions.innerHTML = '<h3>Керування карʼєрою</h3><button onclick="newGame()" class="danger-btn">Нова гра</button><div class="autosave-note">Автозбереження активне після кожної важливої дії.</div>';
    }
}

function renderTrainingPrograms() {
    const container = document.getElementById('training-program-grid');
    if (!container) return;
    container.innerHTML = Object.entries(TRAINING_PROGRAMS).map(([key, program]) => `
        <article class="training-program-card">
            <div><b>${program.name}</b><small>${program.description}</small></div>
            <div class="training-program-meta"><span>$${program.cost}</span><span>Втома ${program.fatigue >= 0 ? '+' : ''}${program.fatigue}</span></div>
            <button onclick="runTrainingProgram('${key}')">Провести</button>
        </article>
    `).join('') + `
        <div class="training-fatigue-card"><span>Накопичена втома</span><b>${state.trainingFatigue}/100</b><div><i style="width:${state.trainingFatigue}%"></i></div></div>
    `;
}

window.runTrainingProgram = function(type) {
    const program = TRAINING_PROGRAMS[type];
    if (!program || state.money < program.cost) {
        alert('Недостатньо бюджету для цього тренування.');
        return;
    }
    state.money -= program.cost;
    state.trainingFatigue = Math.max(0, Math.min(100, state.trainingFatigue + program.fatigue));
    if (type === 'general') {
        state.players.forEach(player => {
            player.form = Math.min(5, (player.form || 0) + 1);
            if (Math.random() < 0.18) player.skill = Math.min(100, player.skill + 1);
        });
        state.chemistry = Math.min(100, state.chemistry + 3);
    } else if (type === 'aim') {
        state.players.forEach(player => {
            if (player.role !== 'IGL' && Math.random() < 0.38) player.skill = Math.min(100, player.skill + 1);
            if (player.role === 'Entry' || player.role === 'Rifler') player.form = Math.min(5, (player.form || 0) + 1);
        });
    } else if (type === 'tactics') {
        state.chemistry = Math.min(100, state.chemistry + 6);
        state.players.filter(player => player.role === 'IGL').forEach(player => player.form = Math.min(5, (player.form || 0) + 2));
    } else if (type === 'awp') {
        const awpers = state.players.filter(player => player.role === 'AWP');
        awpers.forEach(player => {
            player.form = Math.min(5, (player.form || 0) + 2);
            if (Math.random() < 0.45) player.skill = Math.min(100, player.skill + 1);
        });
        if (!awpers.length) state.chemistry = Math.max(20, state.chemistry - 2);
    } else if (type === 'recovery') {
        state.players.forEach(player => player.form = Math.min(5, (player.form || 0) + 2));
    }
    state.matchesSinceTraining = 0;
    state.trainingHistory.unshift({ type, season: state.seasonNumber, cost: program.cost });
    state.trainingHistory = state.trainingHistory.slice(0, 12);
    logSystem(`🏋️ ${program.name} завершено. Втома: ${state.trainingFatigue}/100.`);
    updateUI();
    autoSave(`deep-training-${type}`);
};

window.trainTeam = function() {
    runTrainingProgram('general');
};

updateMapMasteryDisplay = function() {
    const zone = document.getElementById('map-buttons-zone');
    if (!zone) return;
    ensureClubRestructureState();
    zone.innerHTML = '';
    officialMaps.forEach(map => {
        const row = state.mapMastery[map];
        const isWeak = map === state.weakMap;
        const button = document.createElement('button');
        button.className = `map-mastery-card ${isWeak ? 'weak-map-card' : ''}`;
        button.disabled = isWeak;
        button.innerHTML = `
            <b>${escapeLiveText(map)}</b>
            <span>${row.skill >= 0 ? '+' : ''}${row.skill}/30 скіл</span>
            <small>WR ${getMapWinrate(row)}% • ${row.played} мап</small>
            <small>${isWeak ? 'ПЕРМАБАН • не грається і не тренується' : 'Аналітика +1 ($500)'}</small>
        `;
        if (!isWeak) {
            button.onclick = () => {
                if (state.money < 500) return alert('Для аналітики карти потрібно $500.');
                state.money -= 500;
                state.mapMastery[map] = { ...row, skill: clampMapSkill(row.skill + 1) };
                updateUI();
                autoSave('map-analysis');
            };
        }
        zone.appendChild(button);
    });
};

renderRatingTable = fiveSectionRenderRatingTable;
scoutTeam = fiveSectionScoutTeam;
renderCalendarPanel = fiveSectionRenderCalendarPanel;

window.startVetoPhase = function() {
    ensureClubRestructureState();
    if (state.majorCircuit?.eliminationRun) {
        logSystem('Турнір ще дограється іншими командами. Спочатку натисніть симуляцію наступного туру.');
        if (typeof openTournamentWindow === 'function') openTournamentWindow(true);
        return;
    }
    if (state.players.length < 5) {
        alert('Для матчу потрібен повний склад із 5 гравців. Підпишіть вільного агента або проведіть трансфер.');
        switchTab('transfers');
        return;
    }
    const tacticsSelect = document.getElementById('ui-tactics');
    if (tacticsSelect) state.chosenTactic = tacticsSelect.value;
    document.getElementById('game-interface').style.display = 'none';
    document.getElementById('veto-screen').style.display = 'block';
    vetoState.availableMaps = [...officialMaps];
    vetoState.step = 0;
    vetoState.chosenMaps = [];
    document.getElementById('veto-log').innerHTML = `• Слабка карта вашої команди: <b>${escapeLiveText(state.weakMap)}</b> (-10), але вона доступна для Pick/Ban.<br>=== Початок Pick/Ban ===`;
    renderVetoMaps();
    processVetoStep();
    autoSave('veto-started-all-maps');
};

// === CODEX FREE AGENTS, SALES AND PLAYER EXCHANGES ===
const DEFAULT_FREE_AGENTS = [
    ['xfl0ud', 77, 'Rifler'], ['nitr0', 73, 'IGL'], ['Grim', 77, 'AWP'], ['br0', 77, 'Rifler'],
    ['JW', 75, 'AWP'], ['JT', 76, 'Lurker'], ['sdy', 77, 'Rifler'],
    ['try', 78, 'AWP'], ['Kvem', 76, 'Rifler'], ['headtr1ck', 74, 'IGL'], ['dexter', 72, 'IGL'],
    ['Liazz', 77, 'Entry'], ['aliStair', 78, 'AWP'], ['sinnopsyy', 75, 'Rifler'], ['fame', 77, 'Entry'],
    ['fEAR', 75, 'IGL'], ['jambo', 79, 'AWP'], ['jackasmo', 78, 'Entry'], ['Br4tkO', 74, 'Lurker'],
    ['innocent', 71, 'Lurker'], ['Keoz', 72, 'Lurker'], ['kreaz', 73, 'Rifler'], ['acoR', 74, 'AWP'],
    ['Ax1Le', 73, 'Rifler'], ['nafany', 73, 'IGL'], ['mir', 72, 'Entry'], ['Qikert', 69, 'Lurker'],
    ['chelo', 71, 'Entry'], ['cadiaN', 72, 'IGL'], ['bodyy', 69, 'Rifler'], ['stanislaw', 69, 'IGL'],
    ['Plopski', 73, 'Rifler'], ['rigoN', 70, 'Entry'], ['DemQQ', 71, 'IGL'], ['jottAAA', 75, 'Lurker'],
    ['regali', 74, 'AWP'], ['Lekr0', 70, 'IGL'], ['nawwk', 73, 'AWP'], ['junior', 70, 'AWP'],
    ['s1mple', 77, 'AWP'], ['electroNic', 72, 'IGL'], ['Senzu', 83, 'Rifler'], ['hades', 74, 'Rifler'],
    ['ScreaM', 70, 'Rifler']
];

const RESERVED_NEW_TEAM_PLAYERS = new Set(['jks', 'Vexite', 'nettik', 'story', 'INS', 'beastik', 'MoDo', 'stressarN', 'kisserek', 'SHOCK']);

function ensureFreeAgentState() {
    if (!Array.isArray(state.freeAgents)) {
        state.freeAgents = DEFAULT_FREE_AGENTS.map((row, index) => createPlayerProfile(row[0], index, {
            skill: row[1], role: row[2], form: 0, id: `fa-${index + 1}`
        }));
    }
    state.freeAgents = state.freeAgents
        .filter(player => !RESERVED_NEW_TEAM_PLAYERS.has(player.name))
        .map((player, index) => createPlayerProfile(player.name, index, player));
}

function getPlayerSaleValue(player) {
    return Math.max(0, Math.floor(getTransferPrice(player, 1) * 0.75));
}

function ensureTransferHubControls() {
    const searchPanel = document.querySelector('#transfers-tab .transfer-search-panel');
    const grid = searchPanel?.querySelector('.transfer-search-grid');
    if (!searchPanel || !grid) return;
    if (!document.getElementById('transfer-free-agents-only')) {
        const toggle = document.createElement('label');
        toggle.className = 'free-agent-toggle';
        toggle.innerHTML = '<input id="transfer-free-agents-only" type="checkbox"><span>Вільні агенти</span>';
        toggle.querySelector('input').addEventListener('change', applyTransferSearch);
        grid.insertBefore(toggle, grid.querySelector('button'));
    }
    let roster = document.getElementById('transfer-own-roster');
    if (!roster) {
        roster = document.createElement('section');
        roster.id = 'transfer-own-roster';
        roster.className = 'transfer-own-roster';
        searchPanel.insertBefore(roster, document.getElementById('transfer-search-summary'));
    }
    renderTransferOwnRoster();
}

function renderTransferOwnRoster() {
    const container = document.getElementById('transfer-own-roster');
    if (!container) return;
    container.innerHTML = `
        <div class="transfer-own-head"><div><h3>Ваш склад</h3><small>Продаж: 75% ринкової вартості</small></div><b>${state.players.length}/5</b></div>
        <div class="transfer-own-list">${state.players.map((player, index) => `
            <div class="transfer-own-player">
                <span><b>${escapeLiveText(player.name)}</b><small>${escapeLiveText(player.role)} · Rating ${player.skill}</small></span>
                <strong>$${getPlayerSaleValue(player)}</strong>
                <button onclick="openPlayerSale(${index})">Продати</button>
            </div>`).join('') || '<div class="empty-search-state">У складі немає гравців.</div>'}
        </div>`;
}

function getUnifiedTransferDatabase() {
    ensureFreeAgentState();
    const freeOnly = !!document.getElementById('transfer-free-agents-only')?.checked;
    if (freeOnly) {
        return state.freeAgents.map((player, index) => ({
            team: null, player: ensurePlayerStats(player), playerIndex: index, price: 0, isFreeAgent: true
        }));
    }
    return teamsRating.flatMap(team => (team.players || []).map((player, index) => ({
        team, player: ensurePlayerStats(player), playerIndex: index,
        price: getTransferPrice(player, 1.15), isFreeAgent: false
    }))).filter(item => !item.team.isPlayer);
}

window.applyTransferSearch = function() {
    ensureFreeAgentState();
    ensureTransferHubControls();
    populateTransferTeamFilter();
    const freeOnly = !!document.getElementById('transfer-free-agents-only')?.checked;
    const teamSelect = document.getElementById('transfer-search-team');
    const priceInput = document.getElementById('transfer-search-price');
    if (teamSelect) teamSelect.disabled = freeOnly;
    if (priceInput) priceInput.disabled = freeOnly;
    const name = (document.getElementById('transfer-search-name')?.value || '').trim().toLowerCase();
    const teamName = document.getElementById('transfer-search-team')?.value || '';
    const role = document.getElementById('transfer-search-role')?.value || '';
    const minRating = Number(document.getElementById('transfer-search-rating')?.value || 0);
    const maxPrice = Number(document.getElementById('transfer-search-price')?.value || 0);
    const results = getUnifiedTransferDatabase()
        .filter(item => !name || item.player.name.toLowerCase().includes(name))
        .filter(item => item.isFreeAgent || !teamName || item.team.name === teamName)
        .filter(item => !role || item.player.role === role)
        .filter(item => item.player.skill >= minRating)
        .filter(item => item.isFreeAgent || !maxPrice || item.price <= maxPrice)
        .sort((a, b) => b.player.skill - a.player.skill || a.price - b.price);
    const summary = document.getElementById('transfer-search-summary');
    const container = document.getElementById('transfer-search-results');
    if (summary) summary.textContent = freeOnly ? `Вільних агентів: ${results.length}` : `Знайдено: ${results.length} гравців`;
    if (!container) return;
    container.innerHTML = results.slice(0, 80).map(item => {
        const stats = item.player.stats;
        const kd = (stats.kills / Math.max(1, stats.deaths)).toFixed(2);
        const source = item.isFreeAgent ? 'Вільний агент' : item.team.name;
        const action = item.isFreeAgent
            ? `<button class="transfer-negotiate-button" onclick="signFreeAgent(${item.playerIndex})">Підписати</button>`
            : `<div><button onclick="openTransferWorldProfile('${encodeURIComponent(item.team.name)}')">Профіль</button><button class="transfer-negotiate-button" onclick="openTransferNegotiation('${encodeURIComponent(item.team.name)}', ${item.playerIndex})">Купити</button></div>`;
        return `<article class="transfer-search-card ${item.isFreeAgent ? 'free-agent-card' : ''}">
            <div class="transfer-search-title"><b>${escapeLiveText(item.player.name)}</b><span>Rating ${item.player.skill}</span></div>
            <div class="transfer-search-tags"><span>${escapeLiveText(source)}</span><span>${escapeLiveText(item.player.role)}</span><span>Форма ${item.player.form >= 0 ? '+' : ''}${item.player.form || 0}</span></div>
            <div class="transfer-search-stats"><span>K/D ${kd}</span><span>Матчі ${stats.matches || 0}</span><span>Зарплата $${getPlayerSalary(item.player)}</span></div>
            <div class="transfer-search-footer"><strong>${item.isFreeAgent ? '$0' : '$' + item.price}</strong>${action}</div>
        </article>`;
    }).join('') || '<div class="empty-search-state">За цими умовами гравців не знайдено.</div>';
};

window.openPlayerSale = function(playerIndex) {
    const player = state.players[playerIndex];
    if (!player) return;
    if (state.players.length <= 4) {
        alert('Спочатку закрийте вільне місце в складі. Одночасно можна продавати лише одного гравця.');
        return;
    }
    activeTransferNegotiation = null;
    const modal = ensureTransferNegotiationModal();
    modal.style.display = 'flex';
    document.getElementById('transfer-negotiation-title').textContent = `Продаж ${player.name}`;
    document.getElementById('transfer-negotiation-body').innerHTML = `
        <div class="transfer-sale-summary"><span><b>${escapeLiveText(player.name)}</b><small>${escapeLiveText(player.role)} · Rating ${player.skill}</small></span><strong>+$${getPlayerSaleValue(player)}</strong></div>
        <p class="transfer-sale-note">Після продажу гравець стане вільним агентом. Для наступного матчу потрібно знову зібрати склад із 5 гравців.</p>
        <div class="transfer-negotiation-actions"><button class="secondary-transfer-button" onclick="closeTransferNegotiation()">Скасувати</button><button onclick="confirmPlayerSale(${playerIndex})">Підтвердити продаж</button></div>`;
};

window.confirmPlayerSale = function(playerIndex) {
    ensureFreeAgentState();
    const player = state.players[playerIndex];
    if (!player || state.players.length <= 4) return;
    const value = getPlayerSaleValue(player);
    state.money += value;
    state.freeAgents.push(createPlayerProfile(player.name, state.freeAgents.length, { ...player, id: `fa-${Date.now()}` }));
    state.players.splice(playerIndex, 1);
    state.finances.salaries = state.players.reduce((sum, item) => sum + getPlayerSalary(item), 0);
    state.chemistry = Math.max(20, state.chemistry - 8);
    logSystem(`<b>${escapeLiveText(player.name)}</b> проданий за $${value} і став вільним агентом.`);
    syncPlayerTeamInRating();
    autoSave('player-sold-to-free-agents');
    closeTransferNegotiation();
    updateUI();
    applyTransferSearch();
};

window.signFreeAgent = function(playerIndex) {
    ensureFreeAgentState();
    if (state.players.length >= 5) {
        alert('У складі вже 5 гравців. Спочатку продайте одного гравця.');
        return;
    }
    const player = state.freeAgents[playerIndex];
    if (!player) return;
    state.players.push(createPlayerProfile(player.name, state.players.length, { ...player, id: `p${state.players.length + 1}` }));
    state.freeAgents.splice(playerIndex, 1);
    state.finances.salaries = state.players.reduce((sum, item) => sum + getPlayerSalary(item), 0);
    state.chemistry = Math.max(25, state.chemistry - 5);
    logSystem(`Підписано вільного агента <b>${escapeLiveText(player.name)}</b>. Трансфер $0, зарплата $${getPlayerSalary(player)} за матч.`);
    syncPlayerTeamInRating();
    autoSave('free-agent-signed');
    updateUI();
    applyTransferSearch();
};

function getExchangeTerms(team, player, outgoing, cashOffer) {
    const candidatePrice = getTransferPrice(player, 1.15);
    const outgoingCredit = getPlayerSaleValue(outgoing);
    const minimumCash = Math.max(0, candidatePrice - outgoingCredit);
    const packageValue = outgoingCredit + Math.max(minimumCash, cashOffer || 0);
    const acceptance = calculateTransferAcceptance(team, player, candidatePrice, packageValue);
    return { candidatePrice, outgoingCredit, minimumCash, packageValue, acceptance };
}

window.openTransferNegotiation = function(encodedTeamName, playerIndex) {
    if (state.players.length < 5) {
        alert('Спочатку заповніть вільне місце в складі через вільних агентів.');
        return;
    }
    const teamName = decodeURIComponent(encodedTeamName);
    const team = teamsRating.find(item => item.name === teamName);
    const player = team?.players?.[playerIndex];
    if (!team || team.isPlayer || !player) return;
    activeTransferNegotiation = { teamName, playerIndex, marketPrice: getTransferPrice(player, 1.15), offer: 0 };
    const modal = ensureTransferNegotiationModal();
    modal.style.display = 'flex';
    document.getElementById('transfer-negotiation-title').textContent = `Обмін на ${player.name}`;
    renderTransferNegotiation();
};

renderTransferNegotiation = function() {
    if (!activeTransferNegotiation) return;
    const team = teamsRating.find(item => item.name === activeTransferNegotiation.teamName);
    const player = team?.players?.[activeTransferNegotiation.playerIndex];
    const body = document.getElementById('transfer-negotiation-body');
    if (!team || !player || !body) return;
    body.innerHTML = `
        <div class="transfer-candidate-line"><div><b>${escapeLiveText(player.name)}</b><span>${escapeLiveText(player.role)} · Rating ${player.skill}</span></div><div><small>Ціна клубу</small><strong>$${getTransferPrice(player, 1.15)}</strong></div></div>
        <div class="transfer-negotiation-grid"><label>Гравець на обмін<select id="transfer-replace-player">${state.players.map((item, index) => `<option value="${index}">${escapeLiveText(item.name)} · ${item.skill} · залік $${getPlayerSaleValue(item)}</option>`).join('')}</select></label><label>Грошова доплата<div class="transfer-offer-input"><span>$</span><input id="transfer-offer" type="number" step="100"></div></label></div>
        <input id="transfer-offer-slider" class="transfer-offer-slider" type="range" step="100">
        <div id="transfer-exchange-breakdown"></div><div id="transfer-chance-panel"></div>
        <div id="transfer-negotiation-result" class="transfer-negotiation-result" aria-live="polite"></div>
        <div class="transfer-negotiation-actions"><span>Бюджет: <b>$${state.money}</b></span><button onclick="submitTransferOffer()">Запропонувати обмін</button></div>`;
    const select = document.getElementById('transfer-replace-player');
    const input = document.getElementById('transfer-offer');
    const slider = document.getElementById('transfer-offer-slider');
    const refresh = (keepOffer = false) => {
        const outgoing = state.players[Number(select.value)];
        const terms = getExchangeTerms(team, player, outgoing, 0);
        const maxCash = Math.max(terms.minimumCash, Math.min(state.money, terms.minimumCash + terms.candidatePrice));
        const cash = keepOffer ? Math.max(terms.minimumCash, Math.min(maxCash, Number(input.value) || 0)) : terms.minimumCash;
        input.min = slider.min = terms.minimumCash;
        input.max = slider.max = maxCash;
        input.value = slider.value = cash;
        activeTransferNegotiation.offer = cash;
        updateExchangeChancePanel();
    };
    select.addEventListener('change', () => refresh(false));
    input.addEventListener('input', () => { slider.value = input.value; activeTransferNegotiation.offer = Number(input.value); updateExchangeChancePanel(); });
    slider.addEventListener('input', () => { input.value = slider.value; activeTransferNegotiation.offer = Number(slider.value); updateExchangeChancePanel(); });
    refresh(false);
};

function updateExchangeChancePanel() {
    if (!activeTransferNegotiation) return;
    const team = teamsRating.find(item => item.name === activeTransferNegotiation.teamName);
    const player = team?.players?.[activeTransferNegotiation.playerIndex];
    const outgoing = state.players[Number(document.getElementById('transfer-replace-player')?.value)];
    const panel = document.getElementById('transfer-chance-panel');
    const breakdown = document.getElementById('transfer-exchange-breakdown');
    if (!team || !player || !outgoing || !panel || !breakdown) return;
    const terms = getExchangeTerms(team, player, outgoing, activeTransferNegotiation.offer);
    const details = terms.acceptance;
    const tone = details.chance >= 70 ? 'high' : details.chance >= 40 ? 'medium' : 'low';
    breakdown.className = 'transfer-exchange-breakdown';
    breakdown.innerHTML = `<span>Ціна кандидата <b>$${terms.candidatePrice}</b></span><span>Ваш гравець -25% <b>-$${terms.outgoingCredit}</b></span><span>Мін. доплата <b>$${terms.minimumCash}</b></span>`;
    panel.className = `transfer-chance-panel ${tone}`;
    panel.innerHTML = `<div class="transfer-chance-main"><span>Ймовірність згоди</span><strong>${details.chance}%</strong></div><div class="transfer-chance-bar"><i style="width:${details.chance}%"></i></div><div class="transfer-factors"><span>Ваш рейтинг: #${details.userRank}</span><span>Клуб гравця: #${details.sourceRank}</span><span>Пакет обміну: $${terms.packageValue}</span><span>Бонус пропозиції: +${details.offerEffect}%</span>${details.attempts ? `<span>Попередні відмови: ${details.attempts}</span>` : ''}</div>`;
}

window.submitTransferOffer = function() {
    if (!activeTransferNegotiation) return;
    const team = teamsRating.find(item => item.name === activeTransferNegotiation.teamName);
    const player = team?.players?.[activeTransferNegotiation.playerIndex];
    const replaceIndex = Number(document.getElementById('transfer-replace-player')?.value);
    const outgoing = state.players[replaceIndex];
    const cash = Number(document.getElementById('transfer-offer')?.value || 0);
    const result = document.getElementById('transfer-negotiation-result');
    if (!team || !player || !outgoing) return;
    const terms = getExchangeTerms(team, player, outgoing, cash);
    if (cash < terms.minimumCash || cash > state.money) {
        if (result) result.textContent = 'Доплата нижча за мінімальну або перевищує бюджет клубу.';
        return;
    }
    const key = `${team.name}::${player.name}`;
    ensureTransferNegotiationState();
    if (Math.random() * 100 >= terms.acceptance.chance) {
        state.transferNegotiations[key] = (state.transferNegotiations[key] || 0) + 1;
        if (result) result.innerHTML = `<b>${escapeLiveText(player.name)}</b> відмовився від переходу. Збільште доплату.`;
        autoSave('player-exchange-rejected');
        updateExchangeChancePanel();
        return;
    }
    const incoming = { ...player };
    const outgoingCopy = { ...outgoing };
    state.money -= cash;
    state.players[replaceIndex] = createPlayerProfile(incoming.name, replaceIndex, { ...incoming, id: outgoingCopy.id });
    team.players[activeTransferNegotiation.playerIndex] = createPlayerProfile(outgoingCopy.name, activeTransferNegotiation.playerIndex, outgoingCopy);
    state.chemistry = Math.max(25, state.chemistry - 12);
    delete state.transferNegotiations[key];
    logSystem(`Обмін завершено: <b>${escapeLiveText(incoming.name)}</b> замість ${escapeLiveText(outgoingCopy.name)}, доплата $${cash}.`);
    syncPlayerTeamInRating();
    autoSave('player-exchange-completed');
    closeTransferNegotiation();
    updateUI();
    applyTransferSearch();
};

const renderTransferMarketWithFreeAgents = renderTransferMarket;
renderTransferMarket = function() {
    ensureFreeAgentState();
    ensureTransferHubControls();
    applyTransferSearch();
};
