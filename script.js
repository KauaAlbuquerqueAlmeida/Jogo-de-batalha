const maxHP = 100000000000000000000000000000000000000000000000000000000000000000000000000000000000;
let playerHP = maxHP;
let opponentHP = maxHP;
let playerTurn = true;
let playerShield = false;
let opponentShield = false;
let playerDodge = false;
let opponentDodge = false;
let luffyBuffed = false;
let demonBoostActive = false;
let kaijun8Active = false;
let trueformActive = false;
let nightmareActive = false;
let demonBoostslickActive = false;
let evolvedActive = false;
let superchargedevolvedActive = false;
let thermonuclearActive = false;
let thermonuclearevolvedActive = false;
let thermonuclearmothraevolvedActive = false;
let serioActive = false;
let saitamaBuff = 0;
let carregadoActive = false;
let rageadamActive = false;
let burningActive = false;
let supersonicActive = false;
let simohayhaActive = false;
let darksonicActive = false;
let armaduradivinaseiyaActive = false;
let acheronultimateActive = false;
let feixiaoultimateActive = false;
let rappaultimateActive = false;
let godzillaearthcarregadoActive = false;
let supersaiyajinumActive = false;
let supersaiyajindoisActive = false;
let supersaiyajintresActive = false;
let supersaiyajinquatroActive = false;
let supersaiyajingodActive = false;
let supersaiyajinblueActive = false;
let instintosuperiorincompletoActive = false;
let instintosuperiorcompletoActive = false;

let playerPokemon, opponentPokemon;

// Dados dos Pokémon
const pokemons = {
    godzillainhell: {
        name: 'Godzilla in Hell',
        type: ['Demon', 'Fire'],
        maxHP: 666666,
        moves: [
            { name: 'Atomic Breath', type: 'Dragon', power: 100000 },
            { name: 'Shield of God', type: 'Normal', power: 0 },
            { name: demonBoostActive ? 'Godzilla\'s Final Blast' : 'Demon Boost', type: 'Dragon' },
            { name: 'Atomic Spiral Breath of God', type: 'Cosmic', power: 150000 }
        ]
    },
    saitama: {
        name: 'Saitama',
        type: ['Fighting', 'Normal'],
        maxHP: 150000,
        moves: [
            { name: serioActive ? 'Super Serious Punch' : 'Serious Punch', type: 'Fighting', power: 20000 },
            { name: 'Consecutive Normal Punches', type: 'Normal', power: 1500 },
            { name: 'Dodge', type: 'Normal', power: 0 },
            { name: 'One Punch', type: 'Fighting', power: 3000 }
        ]
    },
    jacktheripper: {
        name: 'Jack the Ripper',
        type: ['Dark', 'Normal'],
        maxHP: 120,
        moves: [
            { name: 'Ripper\'s Blade', type: 'Dark', power: 120 },
            { name: 'Stealth Attack', type: 'Normal', power: 100 },
            { name: 'Shadow Step', type: 'Dark', power: 80 },
            { name: 'Bloodlust', type: 'Dark', power: 150 }
        ]
    },
    apollo: {
        name: 'Apollo',
        type: ['Fire', 'Psychic'],
        maxHP: 250,
        moves: [
            { name: 'Corona Ignis', type: 'Fire', power: 160 },
            { name: 'Orbe Harmônico', type: 'Psychic', power: 130 },
            { name: 'Helios Cataclysm', type: 'Normal', power: 0 }, // Heal move
            { name: 'Juízo Solar', type: 'Fire', power: 300 }
        ]
    },
    godzillaminusone: {
        name: 'Godzilla Minus One',
        type: ['Nuclear', 'Water'],
        maxHP: 450,
        moves: [
            { name: 'Atomic Breath', type: 'Dragon', power: 2000 },
            { name: 'Tail of God', type: 'Normal', power: 100 },
            { name: 'Regen', type: 'Dragon', power: 0 },
            { name: 'Earthquake', type: 'Ground', power: 200 }
        ]
    },
    luffy: {
        name: 'Luffy',
        type: 'Fighting',
        maxHP: 200,
        moves: [
            { name: 'gomu gomu no pistol', type: 'Fighting', power: 70 },
            { name: 'gigant pistol', type: 'Fighting', power: 150 },
            { name: 'hack', type: 'Normal', power: 0 }, // Heal move
            { name: 'segunda marcha', type: 'Normal', power: 0 } // buff
        ]
    },
    kaijun8: {
        name: 'Kaiju Nº 8',
        type: ['Dragon', 'Normal'],
        maxHP: 500,
        moves: [
            { name: 'Sound Burst Punch', type: 'Dragon', power: 200 },
            { name: 'Shockwave Emission', type: 'Electric', power: 150 },
            { name: 'Regeneração Ultra-Rápida', type: 'Dragon', power: 0 },
            { name: kaijun8Active ? 'Hyper Destructive Punch' : 'Kaiju Liberation Mode', type: 'Dragon', power: kaijun8Active ? 1000 : 0 }
        ]
    },
    godzillaultima: {
        name: 'Godzilla Ultima',
        type: 'Nuclear',
        maxHP: 1500,
        moves: [
            { name: 'Atomic Breath', type: 'Dragon', power: 500 },
            { name: 'Regen', type: 'Normal', power: 0 },
            { name: trueformActive ? 'Gravitational Control' : 'Transformation', type: 'Dragon', power: trueformActive ? 1000 : 0 },
            { name: 'Earthquake', type: 'Ground', power: 200 }
        ]
    },
    voidghidorah: {
        name: 'Void Ghidorah',
        type: ['Void', 'Space'],
        maxHP: 26000,
        moves: [
            { name: 'Void Breath', type: 'Void', power: 3500 },
            { name: 'Gravity Crush', type: 'Psychic', power: 2000 },
            { name: 'Dimensional Portal Manipulation', type: 'Psychic', power: 0 }, // Dodge move
            { name: 'Cosmic Storm', type: 'Void', power: 4000 }
        ]
    },
    supergodzilla: {
        name: 'Super Godzilla',
        type: ['Nuclear', 'Space'],
        maxHP: 9000,
        moves: [
            { name: 'Super Atomic Breath', type: 'Dragon', power: 6000 },
            { name: 'Super Tail', type: 'Dragon', power: 3000 }, // Shield move
            { name: 'Super Punch', type: 'Ground', power: 500 },
            { name: 'Super Nova Blast', type: 'Fire', power: 7000 }
        ]
    },
    catnap: {
        name: 'Catnap',
        type: 'Paranormal',
        maxHP: 100,
        moves: [
            { name: nightmareActive ? 'Chunch' : 'Gás Vermelho', type: 'Normal', power: nightmareActive ? 200 : 0 },
            { name: 'Jumpscare', type: 'Normal', power: 50 },
            { name: 'Sharp Claws Swipe', type: 'Normal', power: 30 },
            { name: 'Aggressive Charge', type: 'Normal', power: 100 }
        ]
    },
    shingodzilla: {
        name: 'Shin Godzilla',
        type: ['Dragon', 'Nuclear'],
        maxHP: 500,
        moves: [
            { name: 'Atomic Breath', type: 'Dragon', power: 600 },
            { name: 'Tail Swipe', type: 'Normal', power: 200 },
            { name: 'Regen', type: 'Normal', power: 0 }, // Heal move
            { name: 'Fire Atomic Breath', type: 'Fire', power: 400 }
        ]
    },
    godzillainhellslick: {
        name: 'Godzilla in Hell (Slick)',
        type: ['Dragon', 'Nuclear'],
        maxHP: 20000,
        moves: [
            { name: 'Atomic Breath', type: 'Dragon', power: 2500 },
            { name: 'Shield of God', type: 'Normal', power: 0 },
            { name: demonBoostslickActive ? 'Godzilla\'s Final Blast Cannon' : 'Demon Boost Slick', type: 'Dragon' },
            { name: 'Atomic Breath With God Power', type: 'Cosmic', power: 4000 }
        ]
    },
    dekudark: {
        name: 'Deku Dark',
        type: ['Fighting', 'Dark'],
        maxHP: 300,
        moves: [
            { name: 'Black Smash Omega', type: 'Fighting', power: 1000 },
            { name: 'Void Whiplash', type: 'Dark', power: 150 },
            { name: 'Dodge', type: 'Normal', power: 0 }, // Dodge move
            { name: 'Full Dark Detroit Smash', type: 'Fighting', power: 5000 }
        ]
    },
    godzillamonsterverse: {
        name: 'Godzilla Monsterverse',
        type: ['Nuclear', 'Water'],
        maxHP: 4000,
        moves: [
            { name: 'Atomic Breath', type: 'Dragon', power: 2000 },
            { name: 'Tail Swipe', type: 'Normal', power: 500 },
            { name: evolvedActive ? 'Supercharg' : 'Evolve', type: 'Dragon', power: evolvedActive ? 1000 : 0 },
            { name: thermonuclearActive ? 'Explosão Thermonuclear' : 'Thermo', type: 'Dragon', power: evolvedActive ? 1000 : 0 },
        ]
    },
    simohayha: {
        name: 'Simo Hayha',
        type: ['Fighting', 'Normal'],
        maxHP: 500,
        moves: [
            { name: 'Snowball Barrage', type: 'Ice', power: 200 },
            { name: 'Silent Shot', type: 'Normal', power: 300 },
            { name: 'Dodge', type: 'Normal', power: 0 }, // Dodge move
            { name: carregadoActive ? 'White Death Shoot' : 'Carregar', type: 'Steel', power: carregadoActive ? 2000 : 0 }
        ]
    },
    mechagodzillamonsterverse: {
        name: 'Mecha Godzilla (Monsterverse)',
        type: ['Steel', 'Electric'],
        maxHP: 6000,
        moves: [
            { name: 'Proton Scream', type: 'Electric', power: 3000 },
            { name: 'Missiles and bombs', type: 'Steel', power: 800 },
            { name: 'Tail Mortal', type: 'Steel', power: 600 }, // Shield move
            { name: 'Eletric Punch', type: 'Eletric', power: 1500 }
        ]
    },
    adao: {
        name: 'Adão',
        type: ['Fighting', 'Normal'],
        maxHP: 1000,
        moves: [
            { name: 'Adão Punch', type: 'Fighting', power: 500 },
            { name: 'Adão Kick', type: 'Fighting', power: 400 },
            { name: 'Eyes of god', type: 'Normal', power: 0 },
            { name: rageadamActive ? 'Adão Rage' : 'Rage', type: 'Fighting', power: rageadamActive ? 1000 : 0 }
        ]
    },
    godzillaheisei: {
        name: 'Godzilla (Heisei)',
        type: ['Nuclear', 'Dragon'],
        maxHP: 12000,
        moves: [
            { name: 'Atomic Breath', type: 'Dragon', power: 5000 },
            { name: 'Claws', type: 'Normal', power: 1000 },
            { name: burningActive ? 'Blast Burn' : 'Burning', type: 'Fire', power: burningActive ? 2000 : 0 },
            { name: 'Atomic Explosion', type: 'Dragon', power: 5000 },
        ]
    },
    sonic: {
        name: 'Sonic',
        type: ['Electric', 'Normal'],
        maxHP: 300,
        moves: [
            { name: 'Spin Dash', type: 'Normal', power: 400 },
            { name: 'Electric Surge', type: 'Electric', power: 300 },
            { name: supersonicActive ? 'Super Sonic Punch' : 'Transformar', type: 'Normal', power: supersonicActive ? 500 : 500 },
            { name: 'Super Sonic Boom', type: 'Electric', power: 1000 }
        ]
    },
    jasonvoorhees: {
        name: 'Jason Voorhees',
        type: ['Dark', 'Normal'],
        maxHP: 800,
        moves: [
            { name: 'Machete Slash', type: 'Dark', power: 300 },
            { name: 'Hockey Mask Shield', type: 'Normal', power: 0 }, // Shield move
            { name: 'Teleport', type: 'Dark', power: 0 }, // Dodge move
            { name: 'Killer Stab', type: 'Dark', power: 500 }
        ]
    },
    garou: {
        name: 'Garou',
        type: ['Fighting', 'Dark'],
        maxHP: 700,
        moves: [
            { name: 'Monster Strike', type: 'Fighting', power: 400 },
            { name: 'Dark Fist', type: 'Dark', power: 300 },
            { name: 'Dodge', type: 'Normal', power: 0 }, // Dodge move
            { name: 'Garou\'s Rage', type: 'Fighting', power: 600 }
        ]
    },
    seiya: {
        name: 'Seiya',
        type: ['Fighting', 'Mythic'],
        maxHP: 1000,
        moves: [
            { name: 'Meteoro de Pégaso', type: 'Fighting', power: 500 },
            { name: 'Cadeia de Pégaso', type: 'Mythic', power: 5000 }, // Shield move
            { name: armaduradivinaseiyaActive ? 'Meteoro de Pégaso Divino Absoluto' : 'Armadura Divina', type: 'Mythic', power: armaduradivinaseiyaActive ? 1000 : 0 },
            { name: 'Pugna de Pégaso', type: 'Mythic', power: 2000 }
        ]
    },
    acheron: {
        name: 'Acheron',
        type: ['Demon', 'Plasma'],
        maxHP: 8000,
        moves: [
            { name: 'Wiltcross Trilateral', type: 'Dark', power: 700 },
            { name: 'Octobolt Flash', type: 'Plasma', power: 400 },
            { name: 'Sonhos Cortados Choram em Vermelho', type: 'Plasma', power: 800 }, // Dodge move
            { name: acheronultimateActive ? 'No topo da folha de chuva está a unidade' : 'Carregar Pericia Suprema', type: 'Void', power: acheronultimateActive ? 1000 : 0 },
        ]
    },
    feixiao: {
        name: 'Feixiao',
        type: ['Fighting', 'Wind'],
        maxHP: 7000,
        moves: [
            { name: 'Boltsunder', type: 'Fighting', power: 800 },
            { name: 'Machado de Guerra', type: 'Wind', power: 1100 },
            { name: feixiaoultimateActive ? 'Boltsunder Blitz' : 'Feixiao Charge', type: 'Wind', power: feixiaoultimateActive ? 2000 : 0 }, // Ultimate move
            { name: 'Nascido da Tempestade', type: 'Wind', power: 700 } // Shield move
        ]
    },
    rappa: {
        name: 'Rappa',
        type: ['Dream', 'Light'],
        maxHP: 6500,
        moves: [
            { name: 'Ninjutsu: Supere os tombos', type: 'Dream', power: 500 },
            { name: 'Ningu: Lâmina de Pétala de Maldição Demoníaca', type: 'Dream', power: 400 },
            { name: 'Ninja Dash: Aos trancos e barrancos', type: 'Light', power: 800 }, // Shield move
            { name: rappaultimateActive ? 'Ninja Strike: Enraizado Resoluto' : 'Nindo Supremo: Aishiteru', type: 'Fream', power: rappaultimateActive ? 2000 : 0 }, // Ultimate move
        ]
    },
    godzillaearth: {
        name: 'Godzilla Earth',
        type: ['Nuclear', 'Earth'],
        maxHP: 30000,
        moves: [
            { name: 'Atomic Breath of Earth', type: 'Dragon', power: 8000 },
            { name: 'Terra Rumble', type: 'Earth', power: 4000 },
            { name: godzillaearthcarregadoActive ? 'Regen' : 'Carregar', type: 'Nuclear', power: godzillaearthcarregadoActive ? 0 : 0 }, // Ultimate move
            { name: 'Planetary Destruction', type: 'Nuclear', power: 10000 }
        ]
    },
    goku: {
        name: 'Goku',
        type: ['Fighting', 'Dragon'],
        maxHP: 5000,
        moves: [
            { name: 'Kamehameha', type: 'Dragon', power: 3000 },
            { name: 'Dodge', type: 'Normal', power: 0 }, // Dodge move
            { name: supersaiyajinumActive ? 'Transformar' : 'Transformar', type: 'Fighting', power: supersaiyajinumActive ? 0 : 0 }, // Buff move
            { name: 'Ataques Saiyajins', type: 'Dragon', power: 2500 }
        ]
    },
    inkdemon: {
        name: 'Ink Demon',
        type: ['Demon', 'ink'],
        maxHP: 4000,
        moves: [
            { name: 'Ink Splash', type: 'Dark', power: 2000 },
            { name: 'Tentacle Grab', type: 'Dark', power: 1000 },
            { name: 'Digital Distortion', type: 'Digital', power: 0 }, // Dodge move
            { name: 'Corrupted Strike', type: 'Digital', power: 3000 }
        ]
    }
    // Adicione mais personagens aqui de acordo com a regra colocada acima e deixe o mais balanceado possível

};

// Tabela de efetividade simplificada
const typeChart = {
    // Tipos base tradicionais (ajustados)
    Fire: { Grass: 2, Ice: 2, Bug: 2, Steel: 2, Water: 0.5, Fire: 0.5, Dragon: 0.5 },
    Water: { Fire: 2, Ground: 2, Rock: 2, Water: 0.5, Grass: 0.5 },
    Grass: { Water: 2, Ground: 2, Rock: 2, Fire: 0.5, Grass: 0.5, Flying: 0.5 },
    Electric: { Water: 2, Flying: 2, Electric: 0.5, Ground: 0 },
    Flying: { Grass: 2, Bug: 2, Fighting: 2, Electric: 0.5, Rock: 0.5 },
    Psychic: { Fighting: 2, Poison: 2, Dark: 0, Psychic: 0.5 },
    Dark: { Psychic: 2, Ghost: 2, Fighting: 0.5, Fairy: 0.5 },
    Steel: { Ice: 2, Rock: 2, Fairy: 2, Fire: 0.5, Electric: 0.5 },
    Ice: { Grass: 2, Flying: 2, Ground: 2, Dragon: 2, Fire: 0.5, Steel: 0.5 },
    Fighting: { Normal: 2, Rock: 2, Steel: 2, Ice: 2, Dark: 2, Fairy: 0.5 },
    Ghost: { Psychic: 2, Ghost: 2, Normal: 0, Dark: 0.5 },
    Fairy: { Fighting: 2, Dark: 2, Dragon: 2, Steel: 0.5 },
    Ground: { Electric: 2, Fire: 2, Poison: 2, Rock: 2, Grass: 0.5 },
    Poison: { Grass: 2, Fairy: 2, Ground: 0.5, Steel: 0 },
    Rock: { Fire: 2, Ice: 2, Flying: 2, Bug: 2, Ground: 0.5 },
    Bug: { Grass: 2, Psychic: 2, Dark: 2, Fire: 0.5, Flying: 0.5 },
    Dragon: { Dragon: 2, Steel: 0.5, Fairy: 0 },
    Normal: { Ghost: 0 },

    // Tipos especiais e originais
    Angel: { Demon: 2, Dark: 2, God: 0.5, Ghost: 2, Chaos: 0.5 },
    God: { All: 1, Void: 0.5, God: 0.5, Quantum: 0.5 },
    Quantum: { God: 2, Steel: 2, Psychic: 2, Digital: 2, Normal: 0.5, Time: 2 },
    Time: { Psychic: 2, Ghost: 2, Quantum: 0.5, Space: 0.5 },
    Space: { Psychic: 2, Flying: 2, Ground: 2, Time: 2, Void: 0.5 },
    Void: { All: 0.5, Light: 2, Angel: 2 },
    Plasma: { Water: 2, Steel: 2, Flying: 2, Ground: 0.5, Electric: 0.5 },
    Virus: { Digital: 2, Psychic: 2, Fairy: 2, Steel: 2, Holy: 0.5 },
    Crystal: { Dragon: 2, Dark: 1.5, Fire: 0.5, Fighting: 0.5 },
    Wind: { Grass: 2, Bug: 2, Flying: 0.5, Rock: 0.5 },
    Digital: { Psychic: 2, Electric: 2, Bug: 2, Water: 0.5, Ground: 0.5 },
    Nuclear: { Steel: 2, Water: 0.5, Grass: 0.5, Ground: 2, Fairy: 2 },
    Holy: { Demon: 2, Dark: 2, Ghost: 2, Poison: 0.5 },
    Chaos: { Fairy: 2, Psychic: 2, Order: 0.5, Angel: 0.5 },
    Light: { Dark: 2, Ghost: 2, Shadow: 2, Void: 0.5 },
    Shadow: { Light: 0.5, Psychic: 2, Ghost: 2 },
    Mech: { Steel: 2, Rock: 2, Bug: 2, Electric: 2, Water: 0.5 },
    Mythic: { All: 1, Dragon: 2, Fairy: 2, Dark: 2 },
    Sound: { Psychic: 2, Water: 2, Ghost: 1.5, Rock: 0.5 },
    Dream: { Psychic: 2, Fairy: 2, Ghost: 0.5, Sound: 2 },
    Paranormal: { Psychic: 2, Ghost: 2, Dark: 0.5, Normal: 0, Fairy: 0.5, Dream: 2, Paranormal: 0.5 },
    Demon: { Angel: 0.5, Holy: 0.5, Dark: 2, Psychic: 2, Ghost: 2, Fairy: 2, Dragon: 1, Dream: 2, Light: 0.5, Void: 1.5, Demon: 0.5 },
    ink: { Digital: 2, Psychic: 2, Normal: 0.5, Fairy: 0.5 },
};


// Iniciar batalha
function startBattle() {
    const player1 = document.getElementById('player1-select').value;
    const player2 = document.getElementById('player2-select').value;

    localStorage.setItem('player', player1);
    localStorage.setItem('opponent', player2);

    window.location.href = 'battle.html';
}

// Carregar batalha
window.onload = function () {
    if (window.location.pathname.includes('battle.html')) {
        const playerName = localStorage.getItem('player');
        const opponentName = localStorage.getItem('opponent');

        playerPokemon = pokemons[playerName];
        opponentPokemon = pokemons[opponentName];

        // Define os HPs atuais a partir do maxHP de cada Pokémon
        playerHP = playerPokemon.maxHP;
        opponentHP = opponentPokemon.maxHP;

        document.getElementById('player-name').textContent = playerPokemon.name;
        document.getElementById('opponent-name').textContent = opponentPokemon.name;

        document.getElementById('player-img').src = `${playerName}.png`;
        document.getElementById('opponent-img').src = `${opponentName}.png`;

        loadMoves();
        updateHP();
    }

    if (playerPokemon.name === 'Void Ghidorah' || opponentPokemon.name === 'Void Ghidorah') {
        document.querySelector('.battle-container').style.backgroundColor = '#000000'; // fundo preto
        document.body.style.transition = 'background-color 1s ease'; // animação suave
        if (playerPokemon.name === 'Void Ghidorah') {
            document.getElementById('player-img').classList.add('voidghidorah');
        }
        if (opponentPokemon.name === 'Void Ghidorah') {
            document.getElementById('opponent-img').classList.add('voidghidorah');
        }
    }

    if (playerPokemon.name === 'Godzilla Monsterverse' || opponentPokemon.name === 'Godzilla Monsterverse') {
        if (attacker === playerPokemon) {
            attackerImg.style.width = '300px'; // ou qualquer valor que você quiser
            attackerImg.style.height = 'auto'; // mantém a proporção
        } else if (attacker === opponentPokemon) {
            attackerImg.style.width = '300px';
            attackerImg.style.height = 'auto';
        }
    }

};

// Carregar os botões de golpes
function loadMoves() {
    const fightMenu = document.getElementById('fight-menu');
    fightMenu.innerHTML = '';

    const moves = playerTurn ? playerPokemon.moves : opponentPokemon.moves;

    moves.forEach((move, index) => {
        const btn = document.createElement('button');
        btn.innerText = move.name;
        btn.onclick = () => attack(move);
        fightMenu.appendChild(btn);
    });
}

// Atualizar HP
function updateHP() {
    document.getElementById('player-hp').style.width = (playerHP / playerPokemon.maxHP * 100) + '%';
    document.getElementById('opponent-hp').style.width = (opponentHP / opponentPokemon.maxHP * 100) + '%';
}

// Abrir menu de luta
function openFight() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('fight-menu').classList.remove('hidden');
    loadMoves();
}

// Fugir
function run() {
    alert('Você fugiu da batalha!');
    window.location.href = 'select.html';
}

// Cálculo de dano com tipagem
function getTypeEffectiveness(attackType, defenderType) {
    const effectiveness = typeChart[attackType] && typeChart[attackType][defenderType];
    return effectiveness ? effectiveness : 1;
}

// Log para console (ou futuramente interface)
function logMessage(msg) {
    console.log(msg);
}

updateHP();
checkFaint();

if (playerHP > 0 && opponentHP > 0) {
    playerTurn = !playerTurn;

    setTimeout(() => {
        document.getElementById('fight-menu').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('hidden');
        loadMoves(); // Atualiza o menu com o turno correto
    }, 500);
}

function calcularDanoComCritico(basePower) {
    const critChance = 0.1; // 10% de chance
    const isCrit = Math.random() < critChance;
    const finalPower = isCrit ? Math.floor(basePower * 3) : basePower;

    if (isCrit) {
        alert('Acerto Crítico!');
    }

    return finalPower;
}

function attack(move) {
    const attacker = playerTurn ? playerPokemon : opponentPokemon;
    const defender = playerTurn ? opponentPokemon : playerPokemon;

    let attackerHP = playerTurn ? playerHP : opponentHP;
    let defenderHP = playerTurn ? opponentHP : playerHP;
    let attackerShield = playerTurn ? playerShield : opponentShield;
    let defenderShield = playerTurn ? opponentShield : playerShield;
    let attackerDodge = playerTurn ? playerDodge : opponentDodge;
    let defenderDodge = playerTurn ? opponentDodge : playerDodge;
    const attackerImg = playerTurn ? document.getElementById('player-img') : document.getElementById('opponent-img');

    let movePower = calcularDanoComCritico(move.power);
    const simoIsDefender = defender.name === 'Simo Hayha';
    if (carregadoActive && simoIsDefender) {
        const chance = Math.random(); // número entre 0 e 1
        if (chance > 0.3) { // 70% de chance de errar
            alert(`${attacker.name} errou o ataque! Simo Hayha está camuflado!`);
            endTurn();
            return;
        }
    }

    const seiyaIsDefender = defender.name === 'Seiya';
    if (armaduradivinaseiyaActive && seiyaIsDefender) {
        const chance = Math.random(); // número entre 0 e 1
        if (chance > 0.2) { // 70% de chance de errar
            alert(`${attacker.name} errou o ataque! Seiya está esquivou facilmente!`);
            endTurn();
            return;
        }
    }

    const saitamaIsDefender = defender.name === 'Saitama';
    if (serioActive && saitamaIsDefender) {
        const chance = Math.random(); // número entre 0 e 1
        if (chance > 0.3) { // 70% de chance de errar
            alert(`${attacker.name} errou o ataque! Saitama Desviou!`);
            endTurn();
            return;
        }
    }

    const gokuIsDefender = defender.name === 'Goku';
if (gokuIsDefender) {
    const chance = Math.random(); // número entre 0 e 1
    if (instintosuperiorcompletoActive && chance > 0.1) { 
        // 90% de chance de errar (só acerta se chance <= 0.1)
        alert(`${attacker.name} errou o ataque! Goku desviou com Instinto Superior Completo!`);
        endTurn();
        return;
    } else if (instintosuperiorincompletoActive && chance > 0.3) {
        // 70% de chance de errar (só acerta se chance <= 0.3)
        alert(`${attacker.name} errou o ataque! Goku desviou com Instinto Superior Incompleto!`);
        endTurn();
        return;
    }
}

    const sonicIsDefender = defender.name === 'Sonic';
    if (supersonicActive && sonicIsDefender) {
        const chance = Math.random(); // número entre 0 e 1
        if (chance > 0.3) { // 70% de chance de errar
            alert(`${attacker.name} errou o ataque! Sonic Desviou!`);
            endTurn();
            return;
        }
    }

    const adaoIsDefender = defender.name === 'Adão';
    if (rageadamActive && adaoIsDefender) {
        const chance = Math.random(); // número entre 0 e 1
        if (chance > 0.3) { // 70% de chance de errar
            alert(`${attacker.name} errou o ataque! Adão viu o seu golpe e Desviou!`);
            endTurn();
            return;
        }
    }

    const kaijun8IsDefender = defender.name === 'Kaiju Nº 8';
    if (kaijun8Active && kaijun8IsDefender) {
        const chance = Math.random(); // número entre 0 e 1
        if (chance > 0.5) { // 70% de chance de errar
            alert(`${attacker.name} errou o ataque! Kaiju Nº 8 Desviou!`);
            endTurn();
            return;
        }
    }


    // -------------------------------
    // Modos Especiais
    // -------------------------------
    // Demon Boost - Godzilla in Hell
    if (attacker.name === 'Godzilla in Hell' && move.name === 'Demon Boost') {
        demonBoostActive = true;
        attackerImg.src = 'Godzillainhelldemonboost.png';
        alert('Godzilla in Hell é cercado por morcegos demonios que o devora sobrando seus ossos e eles se aglomeram em torno dos ossos de Godzilla, ele controla eles');
        attacker.moves.forEach(m => {
            if (m.name === 'Demon Boost') {
                m.name = 'Godzilla\'s Final Blast';
                m.power = 333333;
            }
        });
        endTurn();
        return;
    }

    if (attacker.name === 'Godzilla in Hell' && demonBoostActive && move.name === 'Godzilla\'s Final Blast') {
        alert('Godzilla\'s Final Blast!!!');
        movePower = 333333;
        demonBoostActive = false;
        attacker.moves.forEach(m => {
            if (m.name === 'Godzilla\'s Final Blast') {
                m.name = 'Demon Boost';
                m.power = 0;
            }
        });
        attackerImg.src = 'godzillainhell.png';
    }

    //Simo Hayha - Carregar

    if (attacker.name === 'Simo Hayha' && move.name === 'Carregar') {
        carregadoActive = true;
        attackerImg.src = 'simohayhacarregado.png';
        attacker.moves.forEach(m => {
            if (m.name === 'Carregar') {
                m.name = 'White Death Shoot';
                m.power = 2000;
            }
        });
        endTurn();
        return;
    }

    if (attacker.name === 'Simo Hayha' && carregadoActive && move.name === 'White Death Shoot') {
        alert('White Death Shoot!!!');
        movePower = 2000;
        carregadoActive = false;
        attacker.moves.forEach(m => {
            if (m.name === 'White Death Shoot') {
                m.name = 'Carregar';
                m.power = 0;
            }

            aplicarAutoDanoSimo();
        });
        attackerImg.src = 'simohayha.png';
    }

    if (attacker.name === 'Adão' && move.name === 'Rage') {
        rageadamActive = true;
        attackerImg.src = 'adaopreparado.png';
        attacker.moves.forEach(m => {
            if (m.name === 'Rage') {
                m.name = 'Adão Rage';
                m.power = 1000;
            }
        });
        endTurn();
        return;
    }

    if (attacker.name === 'Adão' && rageadamActive && move.name === 'Adão Rage') {
        alert('Adão Rage!!!');
        movePower = 1000;
        rageadamActive = false;
        attacker.moves.forEach(m => {
            if (m.name === 'Adão Rage') {
                m.name = 'Rage';
                m.power = 0;
            }
        });
        attackerImg.src = 'adao.png';
    }

    if (attacker.name === 'Goku' && move.name === 'Transformar') {
        supersaiyajinumActive = true;
        attackerImg.src = 'gokussj1.png';

        alert('Goku ficou enfurecido e se transformou no lendario super saiyajin!');

        if (move.name === 'Transformar' && playerPokemon.name === 'Goku') {
            supersaiyajinumActive = true;
            playerPokemon.maxHP = 8000;
            playerHP = 8000;
        }
        if (move.name === 'Transformar' && opponentPokemon.name === 'Goku') {
            supersaiyajinumActive = true;
            opponentPokemon.maxHP = 8000;
            opponentHP = 8000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 8000;
        attacker.currentHP = 8000;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Kamehameha') {
                m.name = 'Super Kamehameha';
                m.type = 'Dragon';
                m.power = 6000;
            }
            if (m.name === 'Dodge') {
                m.name = 'Dodge';
                m.type = 'Dragon';
                m.power = 0;
            }
            if (m.name === 'Transformar') {
                m.name = 'Transformar SSJ2';
                m.power = 0;
            }
            if (m.name === 'Ataques Saiyajins') {
                m.name = 'Super Ataques Saiyajins';
                m.type = 'Dragon';
                m.power = 5000;
            }
        });

        endTurn();
        return;
    }

    if (attacker.name === 'Goku' && move.name === 'Transformar SSJ2') {
        supersaiyajindoisActive = true;
        attackerImg.src = 'gokussj2.png';

        alert('Goku ficou enfurecido e se transformou no lendario super saiyajin 2!');

        if (move.name === 'Transformar SSJ2' && playerPokemon.name === 'Goku') {
            supersaiyajindoisActive = true;
            playerPokemon.maxHP = 16000;
            playerHP = 16000;
        }
        if (move.name === 'Transformar SSJ2' && opponentPokemon.name === 'Goku') {
            supersaiyajindoisActive = true;
            opponentPokemon.maxHP = 16000;
            opponentHP = 16000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 16000;
        attacker.currentHP = 16000;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Super Kamehameha') {
                m.name = 'Super Kamehameha 2';
                m.type = 'Dragon';
                m.power = 12000;
            }
            if (m.name === 'Dodge') {
                m.name = 'Dodge';
                m.type = 'Dragon';
                m.power = 0;
            }
            if (m.name === 'Transformar SSJ2') {
                m.name = 'Transformar SSJ3';
                m.power = 0;
            }
            if (m.name === 'Super Ataques Saiyajins') {
                m.name = 'Super Ataques Saiyajins 2';
                m.type = 'Dragon';
                m.power = 10000;
            }
        });

        endTurn();
        return;
    }

    if (attacker.name === 'Goku' && move.name === 'Transformar SSJ3') {
        supersaiyajintresActive = true;
        attackerImg.src = 'gokussj3.png';

        alert('Goku ficou enfurecido e se transformou no lendario super saiyajin 3!');

        if (move.name === 'Transformar SSJ3' && playerPokemon.name === 'Goku') {
            supersaiyajintresActive = true;
            playerPokemon.maxHP = 32000;
            playerHP = 32000;
        }
        if (move.name === 'Transformar SSJ3' && opponentPokemon.name === 'Goku') {
            supersaiyajintresActive = true;
            opponentPokemon.maxHP = 32000;
            opponentHP = 32000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 32000;
        attacker.currentHP = 32000;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Super Kamehameha 2') {
                m.name = 'Super Kamehameha 3';
                m.type = 'Dragon';
                m.power = 24000;
            }
            if (m.name === 'Dodge') {
                m.name = 'Dodge';
                m.type = 'Dragon';
                m.power = 0;
            }
            if (m.name === 'Transformar SSJ3') {
                m.name = 'Transformar SSJ4';
                m.power = 0;
            }
            if (m.name === 'Super Ataques Saiyajins 2') {
                m.name = 'Super Ataques Saiyajins 3';
                m.type = 'Dragon';
                m.power = 20000;
            }
        });

        endTurn();
        return;
    }

    if (attacker.name === 'Goku' && move.name === 'Transformar SSJ4') {
        supersaiyajinquatroActive = true;
        attackerImg.src = 'gokussj4.png';

        alert('Goku ficou enfurecido e se transformou no lendario super saiyajin 4!');

        if (move.name === 'Transformar SSJ4' && playerPokemon.name === 'Goku') {
            supersaiyajinquatroActive = true;
            playerPokemon.maxHP = 64000;
            playerHP = 64000;
        }
        if (move.name === 'Transformar SSJ4' && opponentPokemon.name === 'Goku') {
            supersaiyajinquatroActive = true;
            opponentPokemon.maxHP = 64000;
            opponentHP = 64000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 64000;
        attacker.currentHP = 64000;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Super Kamehameha 3') {
                m.name = 'Super Kamehameha 4';
                m.type = 'Dragon';
                m.power = 48000;
            }
            if (m.name === 'Dodge') {
                m.name = 'Dodge';
                m.type = 'Dragon';
                m.power = 0;
            }
            if (m.name === 'Transformar SSJ4') {
                m.name = 'Transformar SSJ GOD';
                m.power = 0;
            }
            if (m.name === 'Super Ataques Saiyajins 3') {
                m.name = 'Super Ataques Saiyajins 4';
                m.type = 'Dragon';
                m.power = 40000;
            }
        });

        endTurn();
        return;
    }

    if (attacker.name === 'Goku' && move.name === 'Transformar SSJ GOD') {
        supersaiyajingodActive = true;
        attackerImg.src = 'gokussjgod.png';

        alert('Goku ficou enfurecido e se transformou no lendario super saiyajin god!');

        if (move.name === 'Transformar SSJ GOD' && playerPokemon.name === 'Goku') {
            supersaiyajingodActive = true;
            playerPokemon.maxHP = 128000;
            playerHP = 128000;
        }
        if (move.name === 'Transformar SSJ GOD' && opponentPokemon.name === 'Goku') {
            supersaiyajingodActive = true;
            opponentPokemon.maxHP = 128000;
            opponentHP = 128000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 128000;
        attacker.currentHP = 128000;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Super Kamehameha 4') {
                m.name = 'Super Kamehameha GOD';
                m.type = 'Dragon';
                m.power = 96000;
            }
            if (m.name === 'Dodge') {
                m.name = 'Dodge';
                m.type = 'Dragon';
                m.power = 0;
            }
            if (m.name === 'Transformar SSJ GOD') {
                m.name = 'Transformar SSJ Blue';
                m.power = 0;
            }
            if (m.name === 'Super Ataques Saiyajins 4') {
                m.name = 'Super Ataques Saiyajins GOD';
                m.type = 'Dragon';
                m.power = 80000;
            }
        });

        endTurn();
        return;
    }

    if (attacker.name === 'Goku' && move.name === 'Transformar SSJ Blue') {
        supersaiyajinblueActive = true;
        attackerImg.src = 'gokussjblue.png';

        alert('Goku ficou enfurecido e se transformou no lendario super saiyajin Blue!');

        if (move.name === 'Transformar SSJ Blue' && playerPokemon.name === 'Goku') {
            supersaiyajinblueActive = true;
            playerPokemon.maxHP = 256000;
            playerHP = 256000;
        }
        if (move.name === 'Transformar SSJ Blue' && opponentPokemon.name === 'Goku') {
            supersaiyajinblueActive = true;
            opponentPokemon.maxHP = 256000;
            opponentHP = 256000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 256000;
        attacker.currentHP = 256000;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Super Kamehameha GOD') {
                m.name = 'Super Kamehameha Blue';
                m.type = 'Dragon';
                m.power = 192000;
            }
            if (m.name === 'Dodge') {
                m.name = 'Dodge';
                m.type = 'Dragon';
                m.power = 0;
            }
            if (m.name === 'Transformar SSJ Blue') {
                m.name = 'Instinto Superior Incompleto';
                m.power = 0;
            }
            if (m.name === 'Super Ataques Saiyajins GOD') {
                m.name = 'Super Ataques Saiyajins Blue';
                m.type = 'Dragon';
                m.power = 160000;
            }
        });

        endTurn();
        return;
    }

    if (attacker.name === 'Goku' && move.name === 'Instinto Superior Incompleto') {
        instintosuperiorincompletoActive = true;
        attackerImg.src = 'gokuinstintosuperiorincompleto.png';

        alert('Goku ficou enfurecido e ativou o instinto superior!');

        if (move.name === 'Instinto Superior Incompleto' && playerPokemon.name === 'Goku') {
            instintosuperiorincompletoActive = true;
            playerPokemon.maxHP = 512000;
            playerHP = 512000;
        }
        if (move.name === 'Instinto Superior Incompleto' && opponentPokemon.name === 'Goku') {
            instintosuperiorincompletoActive = true;
            opponentPokemon.maxHP = 512000;
            opponentHP = 512000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 516000;
        attacker.currentHP = 516000;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Super Kamehameha Blue') {
                m.name = 'Super Kamehameha ISIC';
                m.type = 'Dragon';
                m.power = 384000;
            }
            if (m.name === 'Dodge') {
                m.name = 'Dodge';
                m.type = 'Dragon';
                m.power = 0;
            }
            if (m.name === 'Instinto Superior Incompleto') {
                m.name = 'Instinto Superior Completo';
                m.power = 0;
            }
            if (m.name === 'Super Ataques Saiyajins Blue') {
                m.name = 'Super Ataques Saiyajins ISIC';
                m.type = 'Dragon';
                m.power = 320000;
            }
        });

        endTurn();
        return;
    }

    if (attacker.name === 'Goku' && move.name === 'Instinto Superior Completo') {
        instintosuperiorcompletoActive = true;
        attackerImg.src = 'gokuinstintosuperiorcompleto.png';

        alert('Goku ficou enfurecido e completou o instinto superior!');

        if (move.name === 'Instinto Superior Incompleto' && playerPokemon.name === 'Goku') {
            instintosuperiorcompletoActive = true;
            playerPokemon.maxHP = 1024000;
            playerHP = 1024000;
        }
        if (move.name === 'Instinto Superior Incompleto' && opponentPokemon.name === 'Goku') {
            instintosuperiorcompletoActive = true;
            opponentPokemon.maxHP = 1024000;
            opponentHP = 1024000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 1024000;
        attacker.currentHP = 1024000;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Super Kamehameha ISIC') {
                m.name = 'Super Kamehameha ISC';
                m.type = 'Dragon';
                m.power = '768000';
            }
            if (m.name === 'Dodge') {
                m.name = 'Genki Dama';
                m.type = 'Dragon';
                m.power = '1000000';
            }
            if (m.name === 'Instinto Superior Completo') {
                m.name = 'Rajadas de Ki';
                m.power = '500000';
            }
            if (m.name === 'Super Ataques Saiyajins ISIC') {
                m.name = 'Super Ataques Saiyajins ISC';
                m.type = 'Dragon';
                m.power = '640000';
            }
        });

        endTurn();
        return;
    }


    // Demon Boost Slick - Godzilla in Hell Slick
    if (attacker.name === 'Godzilla in Hell (Slick)' && move.name === 'Demon Boost Slick') {
        demonBoostslickActive = true;
        attackerImg.src = 'Godzillainhelldemonboostslick.png';
        alert('Godzilla in Hell é cercado por morcegos demonios que o devora sobrando seus ossos e eles se aglomeram em torno dos ossos de Godzilla, ele controla eles');
        attacker.moves.forEach(m => {
            if (m.name === 'Demon Boost Slick') {
                m.name = 'Godzilla\'s Final Blast Cannon';
                m.power = 15000;
            }
        });
        endTurn();
        return;
    }

    if (attacker.name === 'Godzilla in Hell (Slick)' && demonBoostslickActive && move.name === 'Godzilla\'s Final Blast Cannon') {
        alert('Godzilla\'s Final Blast Cannon!!!');
        movePower = 15000;
        demonBoostslickActive = false;
        attacker.moves.forEach(m => {
            if (m.name === 'Godzilla\'s Final Blast Cannon') {
                m.name = 'Demon Boost Slick';
                m.power = 0;
            }
        });
        attackerImg.src = 'godzillainhellslick.png';
    }

    // Kaiju Nº 8 - Kaiju Liberation Mode
    if (attacker.name === 'Kaiju Nº 8' && move.name === 'Kaiju Liberation Mode') {
        kaijun8Active = true;
        attackerImg.src = 'kaijun8ataque.png';
        alert('Kaiju Nº 8 entrou no modo Kaiju Liberation Mode! Seu próximo ataque será o Hyper Destructive Punch!');
        attacker.moves.forEach(m => {
            if (m.name === 'Kaiju Liberation Mode') {
                m.name = 'Hyper Destructive Punch';
                m.power = 1000;
            }
        });
        endTurn();
        return;
    }

    //Acheron Ultimate - No topo da folha de chuva está a unidade
    if (attacker.name === 'Acheron' && move.name === 'Carregar Pericia Suprema') {
        acheronultimateActive = true;
        attackerImg.src = 'acheronultimate.png'; // Sprite da ultimate
        alert('Acheron começa a carregar sua Perícia Suprema, a escuridão consome a arena!');

        // Muda o fundo
        document.querySelector('.battle-container').style.backgroundImage = "url('acheronbackgroundultimate.png')";
        document.querySelector('.battle-container').style.backgroundSize = "cover";
        document.querySelector('.battle-container').style.backgroundPosition = "center";

        // Troca o movimento para a ultimate ofensiva
        attacker.moves.forEach(m => {
            if (m.name === 'Carregar Pericia Suprema') {
                m.name = 'No topo da folha de chuva está a unidade';
                m.type = 'Void';
                m.power = 6000;
            }
        });

        endTurn();
        return;
    }

    // --- Executar Ultimate Acheron ---
    if (attacker.name === 'Acheron' && acheronultimateActive && move.name === 'No topo da folha de chuva está a unidade') {
        alert('Acheron liberou sua Perícia Suprema: No topo da folha de chuva está a unidade!');

        // Define movePower para aplicar dano
        movePower = 6000;

        // Desativa a ultimate
        acheronultimateActive = false;

        // Cria vídeo full screen
        let video = document.createElement('video');
        video.src = 'acheronultimatevideo.mp4';
        video.autoplay = true;
        video.controls = false;
        video.muted = true;
        video.playsInline = true;
        video.style.position = 'fixed';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.zIndex = '9999';
        document.body.appendChild(video);

        // Quando o vídeo termina, restaura sprite e movimentos
        video.addEventListener('ended', () => {
            video.remove();

            // Restaura fundo original
            document.querySelector('.battle-container').style.backgroundImage = "url('defaultbattlebg.png')";

            // Volta sprite base
            attackerImg.src = 'acheron.png';

            // Volta movimentos originais
            attacker.moves = [
                { name: 'Wiltcross Trilateral', type: 'Dark', power: 700 },
                { name: 'Octobolt Flash', type: 'Dark', power: 400 },
                { name: 'Sonhos Cortados Choram em Vermelho', type: 'Normal', power: 0 },
                { name: 'Carregar Pericia Suprema', type: 'Void', power: 0 }
            ];
        });
    }

    //Acheron Ultimate - No topo da folha de chuva está a unidade
    if (attacker.name === 'Godzilla Earth' && move.name === 'Carregar') {
        godzillaearthcarregadoActive = true;
        attackerImg.src = 'godzillaearthpronto.png'; // Sprite da ultimate
        alert('Godzilla Earth desperta e está pronto!');

        // Troca o movimento para a ultimate ofensiva
        attacker.moves.forEach(m => {
            if (m.name === 'Carregar') {
                m.name = 'Nuclear';
                m.power = 0;
            }
        });

        endTurn();
        return;
    }

    // --- Executar Ultimate Acheron ---
    if (attacker.name === 'Godzilla Earth' && godzillaearthcarregadoActive && move.name === 'Atomic Breath of Earth') {
        alert('Godzilla Earth carregou e lança sua baforada atomica!');

        // Define movePower para aplicar dano
        movePower = 8000;

        // Cria vídeo full screen
        let video = document.createElement('video');
        video.src = 'godzillaearthatomicbreath.mp4';
        video.autoplay = true;
        video.controls = false;
        video.muted = true;
        video.playsInline = true;
        video.style.position = 'fixed';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.zIndex = '9999';
        document.body.appendChild(video);

        // Quando o vídeo termina, restaura sprite e movimentos
        video.addEventListener('ended', () => {
            video.remove();

            attacker.moves = [
                { name: 'Atomic Breath of Earth', type: 'Dragon', power: 8000 },
                { name: 'Terra Rumble', type: 'Earth', power: 4000 },
                { name: 'Regen', type: 'Nuclear', power: 0 },
                { name: 'Planetary Destruction', type: 'Nuclear', power: 10000 }
            ];
        });
    }

    if (attacker.name === 'Godzilla Earth' && godzillaearthcarregadoActive && move.name === 'Terra Rumble') {
        alert('Godzilla Earth ruge!');

        // Define movePower para aplicar dano
        movePower = 8000;

        // Cria vídeo full screen
        let video = document.createElement('video');
        video.src = 'godzillaearthroar.mp4';
        video.autoplay = true;
        video.controls = false;
        video.muted = true;
        video.playsInline = true;
        video.style.position = 'fixed';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.zIndex = '9999';
        document.body.appendChild(video);

        // Quando o vídeo termina, restaura sprite e movimentos
        video.addEventListener('ended', () => {
            video.remove();

            attacker.moves = [
                { name: 'Atomic Breath of Earth', type: 'Dragon', power: 8000 },
                { name: 'Terra Rumble', type: 'Earth', power: 4000 },
                { name: 'Regen', type: 'Nuclear', power: 0 },
                { name: 'Planetary Destruction', type: 'Nuclear', power: 10000 }
            ];
        });
    }

    if (attacker.name === 'Godzilla Earth' && godzillaearthcarregadoActive && move.name === 'Planetary Destruction') {
        alert('Godzilla Earth carrega e lança um corte planetario!');

        // Define movePower para aplicar dano
        movePower = 8000;

        // Cria vídeo full screen
        let video = document.createElement('video');
        video.src = 'godzillaearthcorte.mp4';
        video.autoplay = true;
        video.controls = false;
        video.muted = true;
        video.playsInline = true;
        video.style.position = 'fixed';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.zIndex = '9999';
        document.body.appendChild(video);

        // Quando o vídeo termina, restaura sprite e movimentos
        video.addEventListener('ended', () => {
            video.remove();

            attacker.moves = [
                { name: 'Atomic Breath of Earth', type: 'Dragon', power: 8000 },
                { name: 'Terra Rumble', type: 'Earth', power: 4000 },
                { name: 'Regen', type: 'Nuclear', power: 0 },
                { name: 'Planetary Destruction', type: 'Nuclear', power: 10000 }
            ];
        });
    }

    // --- Ativar Feixiao Charge ---
    if (attacker.name === 'Feixiao' && move.name === 'Feixiao Charge') {
        feixiaoultimateActive = true;
        attackerImg.src = 'feixiaoultimate.png'; // Sprite ultimate
        alert('Feixiao começa a carregar sua Ultimate, o vento se agita na arena!');

        // Toca vídeo de preparação
        let prepVideo = document.createElement('video');
        prepVideo.src = 'feixiaopreparando.mp4';
        prepVideo.autoplay = true;
        prepVideo.controls = false;
        prepVideo.muted = true;
        prepVideo.playsInline = true;
        prepVideo.style.position = 'fixed';
        prepVideo.style.top = '0';
        prepVideo.style.left = '0';
        prepVideo.style.width = '100%';
        prepVideo.style.height = '100%';
        prepVideo.style.objectFit = 'cover';
        prepVideo.style.zIndex = '9999';
        document.body.appendChild(prepVideo);

        prepVideo.addEventListener('ended', () => {
            prepVideo.remove();

            // Troca o movimento para a ultimate ofensiva
            attacker.moves.forEach(m => {
                if (m.name === 'Feixiao Charge') {
                    m.name = 'Boltsunder Blitz';
                    m.type = 'Wind';
                    m.power = 5000;
                }
            });

            alert('Feixiao está pronta para lançar Boltsunder Blitz!');
            endTurn();
        });

        return;
    }

    // --- Executar Ultimate Feixiao ---
    if (attacker.name === 'Feixiao' && feixiaoultimateActive && move.name === 'Boltsunder Blitz') {
        alert('Feixiao lançou sua Ultimate: Boltsunder Blitz!');

        // Define movePower para aplicar dano corretamente
        movePower = 5000;

        // Desativa a ultimate
        feixiaoultimateActive = false;

        // Cria vídeo full screen da ultimate
        let video = document.createElement('video');
        video.src = 'feixiaoultimatevideo.mp4';
        video.autoplay = true;
        video.controls = false;
        video.muted = true;
        video.playsInline = true;
        video.style.position = 'fixed';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.zIndex = '9999';
        document.body.appendChild(video);

        video.addEventListener('ended', () => {
            video.remove();

            // Restaura fundo original
            document.querySelector('.battle-container').style.backgroundImage = "url('defaultbattlebg.png')";

            // Volta sprite base
            attackerImg.src = 'feixiao.png';

            // Volta movimentos originais
            attacker.moves = [
                { name: 'Boltsunder', type: 'Fighting', power: 800 },
                { name: 'Machado de Guerra', type: 'Wind', power: 1100 },
                { name: 'Feixiao Charge', type: 'Wind', power: 0 },
                { name: 'Nascido da Tempestade', type: 'Wind', power: 700 }
            ];
        });
    }


    // --- Ativar Nindo Supremo: Aishiteru ---
    if (attacker.name === 'Rappa' && move.name === 'Nindo Supremo: Aishiteru') {
        rappaultimateActive = true;
        attackerImg.src = 'Rappapreparada.png'; // Sprite ultimate
        alert('Rappa começa a carregar seu Nindo Supremo, a luz e o sonho se entrelaçam!');

        // Toca vídeo de preparação
        let prepVideo = document.createElement('video');
        prepVideo.src = 'rappapreparando.mp4';
        prepVideo.autoplay = true;
        prepVideo.controls = false;
        prepVideo.muted = true;
        prepVideo.playsInline = true;
        prepVideo.style.position = 'fixed';
        prepVideo.style.top = '0';
        prepVideo.style.left = '0';
        prepVideo.style.width = '100%';
        prepVideo.style.height = '100%';
        prepVideo.style.objectFit = 'cover';
        prepVideo.style.zIndex = '9999';
        document.body.appendChild(prepVideo);

        prepVideo.addEventListener('ended', () => {
            prepVideo.remove();

            // Troca o movimento para a ultimate ofensiva
            attacker.moves.forEach(m => {
                if (m.name === 'Nindo Supremo: Aishiteru') {
                    m.name = 'Ninja Strike: Enraizado Resoluto';
                    m.type = 'Fream';
                    m.power = 4500;
                }
            });

            alert('Rappa está pronto para lançar Ninja Strike: Enraizado Resoluto!');
            endTurn();
        });

        return;
    }

    // --- Executar Ultimate Rappa ---
    if (attacker.name === 'Rappa' && rappaultimateActive && move.name === 'Ninja Strike: Enraizado Resoluto') {
        alert('Rappa lançou sua Ultimate: Ninja Strike: Enraizado Resoluto!');

        // Define movePower para aplicar dano corretamente
        movePower = 4500;

        // Desativa a ultimate
        rappaultimateActive = false;

        // Cria vídeo full screen da ultimate
        let video = document.createElement('video');
        video.src = 'rappaultimatevideo.mp4';
        video.autoplay = true;
        video.controls = false;
        video.muted = true;
        video.playsInline = true;
        video.style.position = 'fixed';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.zIndex = '9999';
        document.body.appendChild(video);

        video.addEventListener('ended', () => {
            video.remove();

            // Restaura fundo original
            document.querySelector('.battle-container').style.backgroundImage = "url('defaultbattlebg.png')";

            // Volta sprite base
            attackerImg.src = 'rappa.png';

            // Volta movimentos originais
            attacker.moves = [
                { name: 'Ninjutsu: Supere os tombos', type: 'Dream', power: 500 },
                { name: 'Ningu: Lâmina de Pétala de Maldição Demoníaca', type: 'Dream', power: 400 },
                { name: 'Ninja Dash: Aos trancos e barrancos', type: 'Light', power: 800 },
                { name: 'Nindo Supremo: Aishiteru', type: 'Fream', power: 0 }
            ];

            endTurn();
        });
    }


    if (attacker.name === 'Kaiju Nº 8' && kaijun8Active && move.name === 'Hyper Destructive Punch') {
        alert('Hyper Destructive Punch!!!');
        movePower = 1000;
        kaijun8Active = false;
        attacker.moves.forEach(m => {
            if (m.name === 'Hyper Destructive Punch') {
                m.name = 'Kaiju Liberation Mode';
                m.power = 0;
            }
        });
        attackerImg.src = 'kaijun8.png';
    }

    // Godzilla Ultima - True Form
    if (attacker.name === 'Godzilla Ultima' && move.name === 'Transformation') {
        trueformActive = true;
        attackerImg.src = 'godzillaultimatrueform.png'; // Imagem da True Form

        // Verifica se é o jogador ou oponente para aplicar o flip correto
        if (attacker === playerPokemon) {
            attackerImg.style.transform = 'scaleX(-1)'; // Normal
        } else if (attacker === opponentPokemon) {
            attackerImg.style.transform = 'scaleX(1)'; // Espelhado
        }

        // Muda o fundo da div battle-container para vermelho escuro
        document.querySelector('.battle-container').style.backgroundColor = '#8B0000'; // vermelho escuro

        alert('Godzilla Ultima criou uma camada dura envolta dele e despertou soltando arquétipo em toda a arena e agora ele está em sua forma verdadeira!');

        if (move.name === 'Transformation' && playerPokemon.name === 'Godzilla Ultima') {
            trueformActive = true;
            playerPokemon.maxHP = 18000;
            playerHP = 18000;
        }
        if (move.name === 'Transformation' && opponentPokemon.name === 'Godzilla Ultima') {
            trueformActive = true;
            opponentPokemon.maxHP = 18000;
            opponentHP = 18000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 18000;
        attacker.currentHP = 18000;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Atomic Breath') {
                m.name = 'Lunar Destruction Atomic Breath';
                m.type = 'Dragon';
                m.power = 6000;
            }
            if (m.name === 'Regen') {
                m.name = 'Solar Energy Absorption & Blast';
                m.type = 'Fire';
                m.power = 4000;
            }
            if (m.name === 'Transformation') {
                m.name = 'Gravitational Control';
                m.type = 'Psychic';
                m.power = 1000;
            }
            if (m.name === 'Earthquake') {
                m.name = 'Regen';
                m.type = 'Psychic';
                m.power = 0;
            }
        });

        endTurn();
        return;
    }


    if (attacker.name === 'Seiya' && move.name === 'Armadura Divina') {
        armaduradivinaseiyaActive = true;
        attackerImg.src = 'Seiyaarmaduradivina.png'; // Imagem da True Form


        alert('Seiya juntou tanto cosmo que sua armadura divina se formou!');

        if (move.name === 'Armadura Divina' && playerPokemon.name === 'Seiya') {
            armaduradivinaseiyaActive = true;
            playerPokemon.maxHP = 59000;
            playerHP = 59000;
        }
        if (move.name === 'Armadura Divina' && opponentPokemon.name === 'Seiya') {
            armaduradivinaseiyaActive = true;
            opponentPokemon.maxHP = 59000;
            opponentHP = 59000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 100000;
        attacker.currentHP = 100000;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Meteoro de Pégaso') {
                m.name = 'Meteoro de Pégaso Divino';
                m.type = 'Fighting';
                m.power = 15000;
            }
            if (m.name === 'Cadeia de Pégaso') {
                m.name = 'Relâmpago de Pégaso Divino';
                m.type = 'Mythic';
                m.power = 25000; // Shield move
            }
            if (m.name === 'Armadura Divina') {
                m.name = 'Meteoro de Pégaso Divino Absoluto';
                m.type = 'Mythic';
                m.power = 45000;
            }
            if (m.name === 'Pugna de Pégaso') {
                m.name = 'Pugna de Pégaso Sagrado';
                m.type = 'Mythic';
                m.power = 20000;
            }
        });

        endTurn();
        return;
    }

    // Godzilla (Heisei) - Burning Mode


    if (attacker.name === 'Godzilla (Heisei)' && move.name === 'Burning') {
        burningActive = true;
        attackerImg.src = 'burninggodzillaheisei.png'; // Imagem da True Form

        // Verifica se é o jogador ou oponente para aplicar o flip correto
        if (attacker === playerPokemon) {
            attackerImg.style.transform = 'scaleX(-1)'; // Normal
        } else if (attacker === opponentPokemon) {
            attackerImg.style.transform = 'scaleX(1)'; // Espelhado
        }

        // Muda o fundo da div battle-container para vermelho escuro
        document.querySelector('.battle-container').style.backgroundColor = '#ab6714ff'; // vermelho escuro

        alert('Godzilla (Heisei) chegou a 1199 Graus celcius!');

        if (move.name === 'Burning' && playerPokemon.name === 'Godzilla (Heisei)') {
            burningActive = true;
            playerPokemon.maxHP = 14000;
            playerHP = 14000;
        }
        if (move.name === 'Burning' && opponentPokemon.name === 'Godzilla (Heisei)') {
            burningActive = true;
            opponentPokemon.maxHP = 14000;
            opponentHP = 14000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 14000;
        attacker.currentHP = 14000;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Atomic Breath') {
                m.name = 'Spiral of Burning Atomic Breath';
                m.type = 'Fire';
                m.power = 6000;
            }
            if (m.name === 'Claws') {
                m.name = 'Burning Claws';
                m.type = 'Fire';
                m.power = 4000;
            }
            if (m.name === 'Burning') {
                m.name = 'Blast Burn';
                m.power = 1000;
            }
            if (m.name === 'Atomic Explosion') {
                m.name = 'Burning Atomic Explosion';
                m.type = 'Fire';
                m.power = 10000;
            }
        });

        endTurn();
        return;
    }

// Ativar modo sério
if (attacker.name === 'Saitama' && move.name === 'Serious Punch' && !serioActive) {
    serioActive = true;
    saitamaBuff = 0; // zera buff no começo
    attackerImg.src = 'saitamamodoserio.png';
    attacker.maxHP = 280000;
    attacker.currentHP = 280000;

    // Atualiza movimentos
    attacker.moves.forEach(m => {
        if (m.name === 'Serious Punch') {
            m.name = 'Super Serious Punch';
            m.power = 80000;
        }
        if (m.name === 'Consecutive Normal Punches') {
            m.name = 'Consecutive Serious Punches';
            m.type = 'Fighting';
            m.power = 160000;
        }
        if (m.name === 'Dodge') {
            m.name = 'Dodge';
            m.power = 0;
        }
        if (m.name === 'One Punch') {
            m.name = 'Serious One Punch';
            m.type = 'Fighting';
            m.power = 100000;
        }
    });

    alert('Saitama percebeu que tem que levar isso mais a sério!');
    endTurn();
    return;
}

// Buff por turno (só no atacante Saitama)
if (serioActive && attacker.name === 'Saitama') {
    saitamaBuff += 50000; // aumenta 50k de ataque a cada turno
    attacker.moves.forEach(m => {
        if (m.power > 0) {
            m.power += 50000;
        }
    });

    attacker.currentHP = Math.min(attacker.currentHP + 20000, attacker.maxHP); // cura 20k
    alert('Saitama está ficando ainda mais forte!');
}
    // Sonic - Transformar em Super ou Dark Sonic
    if (attacker.name === 'Sonic' && move.name === 'Transformar') {
        const chanceDark = Math.random(); // número entre 0 e 1

        if (chanceDark < 0.10) { // 10% de chance
            // Dark Sonic!
            darksonicActive = true;
            supersonicActive = false;
            attacker.name = 'Dark Sonic';
            attackerImg.src = 'darksonic.png';

            attacker.maxHP = 6800; // HP aumentado
            attacker.currentHP = 6800; // Ajustado para o max

            attacker.moves = [
                { name: 'Dark Spin Dash', type: 'Dark', power: 1800 },
                { name: 'Dark Sonic Orb', type: 'Dark', power: 2000 },
                { name: 'Flip Kick', type: 'Fighting', power: 2400 },
                { name: 'Dark Sonic Meteor', type: 'Dark', power: 3000 }
            ];
            alert('Algo deu errado... Sonic virou DARK SONIC!');

            if (playerTurn) {
                playerHP = attacker.currentHP;
                playerMaxHP = attacker.maxHP;
            } else {
                opponentHP = attacker.currentHP;
                opponentMaxHP = attacker.maxHP;
            }
        } else {
            // Super Sonic!
            supersonicActive = true;
            darksonicActive = false;
            attacker.name = 'Super Sonic';
            attackerImg.src = 'supersonic.png';

            attacker.maxHP = 7000; // HP aumentado
            attacker.currentHP = 7000; // Ajustado para o max

            attacker.moves = [
                { name: 'Spin Dash', type: 'Mythic', power: 2500 },
                { name: 'Light Speed Attack', type: 'Mythic', power: 2000 },
                { name: 'Super Spin Attack', type: 'Mythic', power: 5000 },
                { name: 'Golden Energy Constructs', type: 'Mythic', power: 3000 }
            ];
            alert('Sonic se transformou em SUPER SONIC!');

            if (playerTurn) {
                playerHP = attacker.currentHP;
                playerMaxHP = attacker.maxHP;
            } else {
                opponentHP = attacker.currentHP;
                opponentMaxHP = attacker.maxHP;
            }
        }

        endTurn();
        return;
    }

    if (attacker.name === 'Godzilla Monsterverse' && move.name === 'Evolve') {
        evolvedActive = true;
        attackerImg.src = 'godzillaevolved.png';

        if (attacker === playerPokemon) {
            attackerImg.style.width = '300px'; // ou qualquer valor que você quiser
            attackerImg.style.height = 'auto'; // mantém a proporção
        } else if (attacker === opponentPokemon) {
            attackerImg.style.width = '300px';
            attackerImg.style.height = 'auto';
        }

        alert('Godzilla ficou super carregado de radiação sofrendo uma evolução!');

        if (move.name === 'Evolve' && playerPokemon.name === 'Godzilla Monsterverse') {
            evolvedActive = true;
            playerPokemon.maxHP = 7000;
            playerHP = 7000;
        }
        if (move.name === 'Evolved' && opponentPokemon.name === 'Godzilla Monsterverse') {
            evolvedActive = true;
            opponentPokemon.maxHP = 7000;
            opponentHP = 7000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 7000;
        attacker.currentHP = 7000;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Atomic Breath') {
                m.name = 'Evolved Atomic Breath';
                m.type = 'Atomic';
                m.power = 3500;
            }
            if (m.name === 'Tail Swipe') {
                m.name = 'Evolved Tail Swipe';
                m.type = 'Dragon';
                m.power = 1000;
            }
            if (m.name === 'Evolve') {
                m.name = 'Supercharg';
                m.power = 0;
            }
            if (m.name === 'Thermo') {
                m.name = 'Arrancada do Rei';
                m.type = 'Dragon';
                m.power = 1000;
            }
        });

        endTurn();
        return;
    }

    if (attacker.name === 'Godzilla Monsterverse' && move.name === 'Thermo') {

        if (attacker === playerPokemon) {
            attackerImg.style.width = '250px'; // ou qualquer valor que você quiser
            attackerImg.style.height = 'auto'; // mantém a proporção
        } else if (attacker === opponentPokemon) {
            attackerImg.style.width = '250px';
            attackerImg.style.height = 'auto';
        }

        thermonuclearActive = true;
        attackerImg.src = 'godzillathermonuclear.png';
        alert('Godzilla depois de ser acertado por uma ogiva absorveu a radiação e agora ele está Thermonuclear!');
        attacker.moves.forEach(m => {
            if (m.name === 'Atomic Breath') {
                m.name = 'Thermo Atomic Breath';
                m.type = 'Atomic';
                m.power = 3500;
            }
            if (m.name === 'Tail Swipe') {
                m.name = 'Thermo Tail Swipe';
                m.type = 'Dragon';
                m.power = 1000;
            }
            if (m.name === 'Evolve') {
                m.name = 'Encandecente';
                m.power = 3000;
            }
            if (m.name === 'Thermo') {
                m.name = 'Explosão Thermonuclear';
                m.power = 8000;
            }
        });
        endTurn();
        return;
    }
    // Explosão Thermonuclear - Godzilla Monsterverse
    if (attacker.name === 'Godzilla Monsterverse' && thermonuclearActive && move.name === 'Explosão Thermonuclear') {
        alert('Godzilla soltou uma explosão Thermonuclear!!!');
        movePower = 8000;
        thermonuclearActive = false;
        attacker.moves.forEach(m => {
            if (m.name === 'Thermo Atomic Breath') {
                m.name = 'Atomic Breath';
                m.type = 'Atomic';
                m.power = 2500;
            }
            if (m.name === 'Thermo Tail Swipe') {
                m.name = 'Tail Swipe';
                m.type = 'Dragon';
                m.power = 1000;
            }
            if (m.name === 'Encandecente') {
                m.name = 'Evolve';
                m.power = 0;
            }
            if (m.name === 'Explosão Thermonuclear') {
                m.name = 'Thermo';
                m.power = 0;
            }
        });
        attackerImg.src = 'godzillamonsterverse.png';
    }

    // Thermonuclear Mothra Evolved Godzilla
    if (attacker.name === 'Godzilla Monsterverse' && move.name === 'Encandecente') {

        document.querySelector('.battle-container').style.backgroundColor = '#000000'; // vermelho escuro


        if (attacker === playerPokemon) {
            attackerImg.style.width = '250px'; // ou qualquer valor que você quiser
            attackerImg.style.height = 'auto'; // mantém a proporção
        } else if (attacker === opponentPokemon) {
            attackerImg.style.width = '250px';
            attackerImg.style.height = 'auto';
        }

        if (move.name === 'Encandecente' && playerPokemon.name === 'Godzilla Monsterverse') {
            trueformActive = true;
            playerPokemon.maxHP = 12000;
            playerHP = 12000;
        }
        if (move.name === 'Encandecente' && opponentPokemon.name === 'Godzilla Monsterverse') {
            trueformActive = true;
            opponentPokemon.maxHP = 12000;
            opponentHP = 12000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 12000;
        attacker.currentHP = 12000;

        thermonuclearmothraevolvedActive = true;
        attackerImg.src = 'thermonuclearmothragodzilla.png';
        alert('Godzilla fica ainda mais poderoso com a energia de Mothra!');
        attacker.moves.forEach(m => {
            if (m.name === 'Thermo Atomic Breath') {
                m.name = 'Thermo Spiral Atomic Breath';
                m.type = 'Atomic';
                m.power = 6000;
            }
            if (m.name === 'Thermo Tail Swipe') {
                m.name = 'Thermo Lazer Tail Swipe';
                m.type = 'Dragon';
                m.power = 3000;
            }
            if (m.name === 'Encandecente') {
                m.name = 'Inferno Aura';
                m.power = 5500;
            }
            if (m.name === 'Explosão Thermonuclear') {
                m.name = 'Luz do Trono Queimado';
                m.power = 12000;
            }
        });
        endTurn();
        return;
    }
    // Supercharged Evolved Godzilla
    if (attacker.name === 'Godzilla Monsterverse' && move.name === 'Supercharg') {
        superchargedevolvedActive = true;
        attackerImg.src = 'godzillaevolvedsupercharged.png';

        if (attacker === playerPokemon) {
            attackerImg.style.width = '300px'; // ou qualquer valor que você quiser
            attackerImg.style.height = 'auto'; // mantém a proporção
        } else if (attacker === opponentPokemon) {
            attackerImg.style.width = '300px';
            attackerImg.style.height = 'auto';
        }


        alert('Godzilla se carregou ainda mais com seu corpo super carregado!!!');

        if (move.name === 'Supercharg' && playerPokemon.name === 'Godzilla Monsterverse') {
            superchargedevolvedActive = true;
            playerPokemon.maxHP = 7000;
            playerHP = 7000;
        }
        if (move.name === 'Supercharg' && opponentPokemon.name === 'Godzilla Monsterverse') {
            superchargedevolvedActive = true;
            opponentPokemon.maxHP = 7000;
            opponentHP = 7000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 7000;
        attacker.currentHP = 7000;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Evolved Atomic Breath') {
                m.name = 'Supercharged Evolved Atomic Breath';
                m.type = 'Atomic';
                m.power = 4000;
            }
            if (m.name === 'Evolved Tail Swipe') {
                m.name = 'Supercharged Evolved Pulse';
                m.type = 'Dragon';
                m.power = 4000;
            }
            if (m.name === 'Supercharg') {
                m.name = 'SuperchargThermo';
                m.power = 0;
            }
            if (m.name === 'Arrancada do Rei') {
                m.name = 'Chuva super carregada do Rei';
                m.type = 'Dragon';
                m.power = 10000;
            }
        });

        endTurn();
        return;
    }
    //Supercharged Evolved Thermo Godzilla
    if (attacker.name === 'Godzilla Monsterverse' && move.name === 'SuperchargThermo') {
        thermonuclearevolvedActive = true;
        attackerImg.src = 'superchargedevolvedthermogodzilla.png';

        if (attacker === playerPokemon) {
            attackerImg.style.width = '300px'; // ou qualquer valor que você quiser
            attackerImg.style.height = 'auto'; // mantém a proporção
        } else if (attacker === opponentPokemon) {
            attackerImg.style.width = '300px';
            attackerImg.style.height = 'auto';
        }


        alert('Godzilla se carregou ainda mais com seu corpo super carregado!!!');

        if (move.name === 'SuperchargThermo' && playerPokemon.name === 'Godzilla Monsterverse') {
            thermonuclearevolvedActive = true;
            playerPokemon.maxHP = 10000;
            playerHP = 10000;
        }
        if (move.name === 'SuperchargThermo' && opponentPokemon.name === 'Godzilla Monsterverse') {
            thermonuclearevolvedActive = true;
            opponentPokemon.maxHP = 10000;
            opponentHP = 10000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 10000;
        attacker.currentHP = 10000;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Supercharged Evolved Atomic Breath') {
                m.name = 'Supercharged Evolved Thermo Atomic Breath';
                m.type = 'Atomic';
                m.power = 6000;
            }
            if (m.name === 'Supercharged Evolved Pulse') {
                m.name = 'Supercharged Thermo Evolved Pulse';
                m.type = 'Nuclear';
                m.power = 8000;
            }
            if (m.name === 'SuperchargThermo') {
                m.name = 'Dodge';
                m.power = 0;
            }
            if (m.name === 'Chuva super carregada do Rei') {
                m.name = 'Supernova do Rei';
                m.type = 'Atomic';
                m.power = 7000;
            }
        });

        endTurn();
        return;
    }

    if (attacker.name === 'Catnap' && move.name === 'Gás Vermelho') {
        trueformActive = true;
        attackerImg.src = 'nightmarecatnap.png'; // Imagem da True Form

        // Muda o fundo da div battle-container para vermelho escuro
        document.querySelector('.battle-container').style.backgroundColor = '#8B0000'; // vermelho escuro

        alert('Catnap soltou o seu gás vermelho da boca você entrou em um pesadelo e está vendo seus piores medos!');

        if (move.name === 'Gás Vermelho' && playerPokemon.name === 'Catnap') {
            trueformActive = true;
            playerPokemon.maxHP = 500;
            playerHP = 500;
        }
        if (move.name === 'Gás Vermelho' && opponentPokemon.name === 'Catnap') {
            trueformActive = true;
            opponentPokemon.maxHP = 500;
            opponentHP = 500;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 500;
        attacker.currentHP = 500;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Gás Vermelho') {
                m.name = 'Chunch';
                m.type = 'Dark';
                m.power = 200; // Gás Vermelho não causa dano, é um golpe de cura
            }
        });

        endTurn();
        return;
    }

    // -------------------------------
    // Golpes Especiais Defensivos/Cura
    // -------------------------------

    if (move.name === 'Shield of God') {
        if (playerTurn) playerShield = true; else opponentShield = true;
        logMessage(`${attacker.name} ativou Shield of God e ficará imune ao próximo golpe!`);
        endTurn();
        return;
    }

    if (move.name === 'Hockey Mask Shield') {
        if (playerTurn) playerShield = true; else opponentShield = true;
        logMessage(`${attacker.name} ativou Hockey Mask Shield e ficará imune ao próximo golpe!`);
        endTurn();
        return;
    }

    if (move.name === 'Eyes of God') {
        if (playerTurn) playerShield = true; else opponentShield = true;
        logMessage(`${attacker.name} ativou Shield of God e ficará imune ao próximo golpe!`);
        endTurn();
        return;
    }

    if (move.name === 'Dodge') {
        if (playerTurn) playerDodge = true; else opponentDodge = true;
        logMessage(`${attacker.name} preparou um Dodge e vai desviar do próximo golpe!`);
        endTurn();
        return;
    }

    if (move.name === 'Teleport') {
        if (playerTurn) playerDodge = true; else opponentDodge = true;
        logMessage(`${attacker.name} preparou um Teleport e vai desviar do próximo golpe!`);
        endTurn();
        return;
    }

    if (move.name === 'Dimensional Portal Manipulation') {
        if (playerTurn) playerDodge = true; else opponentDodge = true;
        logMessage(`${attacker.name} preparou um Portal e vai desviar do próximo golpe!`);
        endTurn();
        return;
    }

    if (move.name === 'Helios Cataclysm' || move.name === 'Regen' || move.name === 'Regeneração Ultra-Rápida') {
        const healPercent = move.name === 'Helios Cataclysm' ? 0.3 : 0.5;
        const healAmount = Math.floor(attacker.maxHP * healPercent);
        const oldHP = playerTurn ? playerHP : opponentHP;

        if (playerTurn) {
            playerHP = Math.min(playerPokemon.maxHP, playerHP + healAmount);
        } else {
            opponentHP = Math.min(opponentPokemon.maxHP, opponentHP + healAmount);
        }

        const healed = (playerTurn ? playerHP : opponentHP) - oldHP;
        logMessage(`${attacker.name} usou ${move.name} e curou ${healed} de HP!`);
        updateHP();
        endTurn();
        return;
    }

    if (move.name === 'segunda marcha') {
        if (attacker.name === 'Luffy') {
            luffyBuffed = true;
            logMessage(`${attacker.name} ativou a Segunda Marcha! Seus próximos ataques causarão o dobro de dano.`);
        } else {
            logMessage(`${attacker.name} tentou usar Segunda Marcha, mas não é Luffy!`);
        }
        endTurn();
        return;
    }

    // -------------------------------
    // Verificação de Shield ou Dodge
    // -------------------------------

    if (defenderShield) {
        if (playerTurn) opponentShield = false; else playerShield = false;
        logMessage(`${defender.name} bloqueou o ataque com Shield of God! Nenhum dano foi causado.`);
        endTurn();
        return;
    }

    if (defenderDodge) {
        if (playerTurn) opponentDodge = false; else playerDodge = false;
        logMessage(`${defender.name} desviou do ataque com Dodge! Nenhum dano foi causado.`);
        endTurn();
        return;
    }

    // -------------------------------
    // Cálculo de Dano
    // -------------------------------

    let damage = Math.floor((Math.random() * 5) + movePower);
    const effectiveness = getTypeEffectiveness(move.type, defender.type);
    damage = Math.floor(damage * effectiveness);

    // Segunda Marcha (Luffy)
    if (attacker.name === 'Luffy' && luffyBuffed && move.name !== 'segunda marcha') {
        damage *= 2;
        luffyBuffed = false;
        logMessage(`O golpe foi energizado pela Segunda Marcha! Dano dobrado!`);
    }

    // Aplicar dano
    if (playerTurn) {
        opponentHP = Math.max(0, opponentHP - damage);
    } else {
        playerHP = Math.max(0, playerHP - damage);
    }

    logMessage(`${attacker.name} usou ${move.name}! ${effectiveness > 1 ? 'É super efetivo!' : effectiveness < 1 ? 'Não é muito efetivo...' : ''} Causou ${damage} de dano.`);

    updateHP();

    // -------------------------------
    // Verificar Vitória
    // -------------------------------
    function checkFaint() {
        if (opponentHP <= 0) {
            setTimeout(() => {
                alert('O oponente desmaiou! Você venceu!');
                endBattle();
            }, 500);
        }
        if (playerHP <= 0) {
            setTimeout(() => {
                alert('Você desmaiou! Você perdeu!');
                endBattle();
            }, 500);
        }
    }

    // Encerrar batalha
    function endBattle() {
        window.location.href = 'select.html';
    }
    checkFaint();

    endTurn();
}

function aplicarAutoDanoSimo() {
    const maxHP = playerTurn ? playerPokemon.maxHP : opponentPokemon.maxHP;
    const selfDamage = Math.floor(maxHP * 0.025);

    if (playerTurn) {
        playerHP -= selfDamage;
        if (playerHP < 0) playerHP = 0;
    } else {
        opponentHP -= selfDamage;
        if (opponentHP < 0) opponentHP = 0;
    }

    // Atualiza as barras de vida, se houver função para isso
    if (typeof updateHPBars === 'function') updateHPBars();
}


function endTurn() {
    playerTurn = !playerTurn;
    document.getElementById('main-menu').classList.remove('hidden');
    document.getElementById('fight-menu').classList.add('hidden');

    if (!playerTurn) {
        setTimeout(enemyTurn, 1000);
    }
}

const playerImg = document.getElementById('player-img');
const opponentImg = document.getElementById('opponent-img');

if (playerPokemon.name === 'Void Ghidorah') {
    playerImg.style.width = '400px'; // aumente conforme desejar
    playerImg.style.height = 'auto';
}

if (opponentPokemon.name === 'Void Ghidorah') {
    opponentImg.style.width = '400px';
    opponentImg.style.height = 'auto';
}

if (playerPokemon.name === 'Shin Godzilla') {
    playerImg.style.width = '300px'; // aumente conforme desejar
    playerImg.style.height = 'auto';
}

if (opponentPokemon.name === 'Shin Godzilla') {
    opponentImg.style.width = '300px';
    opponentImg.style.height = 'auto';
}

