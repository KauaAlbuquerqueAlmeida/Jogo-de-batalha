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
let carregadoActive = false;

let playerPokemon, opponentPokemon;

// Dados dos Pokémon
const pokemons = {
    charizard: {
        name: 'Charizard',
        type: ['Fire', 'Flying'],
        maxHP: 120,
        moves: [
            { name: 'Flamethrower', type: 'Fire', power: 30 },
            { name: 'Dragon Claw', type: 'Dragon', power: 25 },
            { name: 'Air Slash', type: 'Flying', power: 20 },
            { name: 'Slash', type: 'Normal', power: 15 }
        ]
    },
    blastoise: {
        name: 'Blastoise',
        type: 'Water',
        maxHP: 130,
        moves: [
            { name: 'Hydro Pump', type: 'Water', power: 30 },
            { name: 'Ice Beam', type: 'Ice', power: 25 },
            { name: 'Bite', type: 'Dark', power: 20 },
            { name: 'Tackle', type: 'Normal', power: 15 }
        ]
    },
    venusaur: {
        name: 'Venusaur',
        type: 'Grass',
        maxHP: 140,
        moves: [
            { name: 'Solar Beam', type: 'Grass', power: 30 },
            { name: 'Sludge Bomb', type: 'Poison', power: 25 },
            { name: 'Earthquake', type: 'Ground', power: 20 },
            { name: 'Tackle', type: 'Normal', power: 15 }
        ]
    },
    pikachu: {
        name: 'Pikachu',
        type: 'Electric',
        maxHP: 90,
        moves: [
            { name: 'Thunderbolt', type: 'Electric', power: 30 },
            { name: 'Iron Tail', type: 'Steel', power: 25 },
            { name: 'Quick Attack', type: 'Normal', power: 20 },
            { name: 'Double Team', type: 'Normal', power: 15 }
        ]
    },

    godzillainhell: {
        name: 'Godzilla in Hell',
        type: ['Dragon', 'Fire'],
        maxHP: 66666,
        moves: [
            { name: 'Atomic Breath', type: 'Dragon', power: 10000 },
            { name: 'Shield of God', type: 'Normal', power: 0 },
            { name: demonBoostActive ? 'Godzilla\'s Final Blast' : 'Demon Boost', type: 'Dragon'},
            { name: 'Atomic Spiral Breath of God', type: 'Cosmic', power: 15000 }
        ]
    },
    saitama: {
        name: 'Saitama',
        type: ['Fighting', 'Normal'],
        maxHP: 15000,
        moves: [
            { name: serioActive ? 'Super Serious Punch' : 'Serious Punch', type: 'Fighting', power: 8000 },
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
    vaporzillainhell: {
        name: 'Vaporzilla in Hell',
        type: ['Demon', 'Fire'],
        maxHP: 16666,
        moves: [
            { name: 'Vapor Breath', type: 'Demon', power: 3000 },
            { name: 'Mega Infernal Punch', type: 'Demon', power: 3500 },
            { name: 'Shield of God', type: 'Normal', power: 0 }, // Shield move
            { name: 'Tsunami Strike in hell', type: 'Water', power: 4000 }
        ]
    },
    godzillainhellslick: {
        name: 'Godzilla in Hell (Slick)',
        type: ['Dragon', 'Nuclear'],
        maxHP: 20000,
        moves: [
            { name: 'Atomic Breath', type: 'Dragon', power: 2500 },
            { name: 'Shield of God', type: 'Normal', power: 0 },
            { name: demonBoostslickActive ? 'Godzilla\'s Final Blast Cannon' : 'Demon Boost Slick', type: 'Dragon'},
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
            { name: carregadoActive ? 'White Death Strike' : 'Carregar', type: 'Steel', power: carregadoActive ? 2000 : 0 }
        ]
    },
    // Adicione mais personagens aqui de acordo com a regra colocada acima e deixe o mais balanceado possível

};

// Tabela de efetividade simplificada
const typeChart = {
  // Tipos base tradicionais (ajustados)
  Fire:      { Grass: 2, Ice: 2, Bug: 2, Steel: 2, Water: 0.5, Fire: 0.5, Dragon: 0.5 },
  Water:     { Fire: 2, Ground: 2, Rock: 2, Water: 0.5, Grass: 0.5 },
  Grass:     { Water: 2, Ground: 2, Rock: 2, Fire: 0.5, Grass: 0.5, Flying: 0.5 },
  Electric:  { Water: 2, Flying: 2, Electric: 0.5, Ground: 0 },
  Flying:    { Grass: 2, Bug: 2, Fighting: 2, Electric: 0.5, Rock: 0.5 },
  Psychic:   { Fighting: 2, Poison: 2, Dark: 0, Psychic: 0.5 },
  Dark:      { Psychic: 2, Ghost: 2, Fighting: 0.5, Fairy: 0.5 },
  Steel:     { Ice: 2, Rock: 2, Fairy: 2, Fire: 0.5, Electric: 0.5 },
  Ice:       { Grass: 2, Flying: 2, Ground: 2, Dragon: 2, Fire: 0.5, Steel: 0.5 },
  Fighting:  { Normal: 2, Rock: 2, Steel: 2, Ice: 2, Dark: 2, Fairy: 0.5 },
  Ghost:     { Psychic: 2, Ghost: 2, Normal: 0, Dark: 0.5 },
  Fairy:     { Fighting: 2, Dark: 2, Dragon: 2, Steel: 0.5 },
  Ground:    { Electric: 2, Fire: 2, Poison: 2, Rock: 2, Grass: 0.5 },
  Poison:    { Grass: 2, Fairy: 2, Ground: 0.5, Steel: 0 },
  Rock:      { Fire: 2, Ice: 2, Flying: 2, Bug: 2, Ground: 0.5 },
  Bug:       { Grass: 2, Psychic: 2, Dark: 2, Fire: 0.5, Flying: 0.5 },
  Dragon:    { Dragon: 2, Steel: 0.5, Fairy: 0 },
  Normal:    { Ghost: 0 },
  
  // Tipos especiais e originais
  Angel:     { Demon: 2, Dark: 2, God: 0.5, Ghost: 2, Chaos: 0.5 },
  God:       { All: 1, Void: 0.5, God: 0.5, Quantum: 0.5 },
  Quantum:   { God: 2, Steel: 2, Psychic: 2, Digital: 2, Normal: 0.5, Time: 2 },
  Time:      { Psychic: 2, Ghost: 2, Quantum: 0.5, Space: 0.5 },
  Space:     { Psychic: 2, Flying: 2, Ground: 2, Time: 2, Void: 0.5 },
  Void:      { All: 0.5, Light: 2, Angel: 2 },
  Plasma:    { Water: 2, Steel: 2, Flying: 2, Ground: 0.5, Electric: 0.5 },
  Virus:     { Digital: 2, Psychic: 2, Fairy: 2, Steel: 2, Holy: 0.5 },
  Crystal:   { Dragon: 2, Dark: 1.5, Fire: 0.5, Fighting: 0.5 },
  Wind:      { Grass: 2, Bug: 2, Flying: 0.5, Rock: 0.5 },
  Digital:   { Psychic: 2, Electric: 2, Bug: 2, Water: 0.5, Ground: 0.5 },
  Nuclear:   { Steel: 2, Water: 0.5, Grass: 0.5, Ground: 2, Fairy: 2 },
  Holy:      { Demon: 2, Dark: 2, Ghost: 2, Poison: 0.5 },
  Chaos:     { Fairy: 2, Psychic: 2, Order: 0.5, Angel: 0.5 },
  Light:     { Dark: 2, Ghost: 2, Shadow: 2, Void: 0.5 },
  Shadow:    { Light: 0.5, Psychic: 2, Ghost: 2 },
  Mech:      { Steel: 2, Rock: 2, Bug: 2, Electric: 2, Water: 0.5 },
  Mythic:    { All: 1, Dragon: 2, Fairy: 2, Dark: 2 },
  Sound:     { Psychic: 2, Water: 2, Ghost: 1.5, Rock: 0.5 },
  Dream:     { Psychic: 2, Fairy: 2, Ghost: 0.5, Sound: 2 },
  Paranormal:{ Psychic: 2, Ghost: 2, Dark: 0.5, Normal: 0, Fairy: 0.5, Dream: 2, Paranormal: 0.5 },
  Demon:     { Angel: 0.5, Holy: 0.5, Dark: 2, Psychic: 2, Ghost: 2, Fairy: 2, Dragon: 1, Dream: 2, Light: 0.5, Void: 1.5, Demon: 0.5 }
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

    let movePower = move.power;

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
                m.power = 30000;
            }
        });
        endTurn();
        return;
    }

    if (attacker.name === 'Godzilla in Hell' && demonBoostActive && move.name === 'Godzilla\'s Final Blast') {
        alert('Godzilla\'s Final Blast!!!');
        movePower = 30000;
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
                m.name = 'White Death Strike';
                m.power = 2000;
            }
        });
        endTurn();
        return;
    }

    if (attacker.name === 'Godzilla in Hell' && carregadoActive && move.name === 'White Death Strike') {
        alert('White Death Strike!!!');
        movePower = 2000;
        carregadoActive = false;
        attacker.moves.forEach(m => {
            if (m.name === 'White Death Strike') {
                m.name = 'Carregar';
                m.power = 0;
            }
        });
        attackerImg.src = 'simohayha.png';
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
                m.power = 6000;
            }
            if (m.name === 'Regen') {
                m.name = 'Solar Energy Absorption & Blast';
                m.type = 'Fire';
                m.power = 4000;
            }
            if (m.name === 'Transformation') {
                m.name = 'Gravitational Control';
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

    if (attacker.name === 'Saitama' && move.name === 'Serious Punch') {
        serioActive = true;
        attackerImg.src = 'saitamamodoserio.png'; // Imagem Serious mode

        alert('Saitama percebeu que tem que levar isso mais a sério!');

        if (move.name === 'Serious Punch' && playerPokemon.name === 'Saitama') {
            serioActive = true;
            playerPokemon.maxHP = 18000;
            playerHP = 18000;
        }
        if (move.name === 'Serious Punch' && opponentPokemon.name === 'Saitama') {
           serioActive = true;
            opponentPokemon.maxHP = 18000;
            opponentHP = 18000;
        }

        // Aumenta a vida máxima e cura totalmente
        attacker.maxHP = 18000;
        attacker.currentHP = 18000;

        // Altera os movimentos
        attacker.moves.forEach(m => {
            if (m.name === 'Serious Punch') {
                m.name = 'Super Serious Punch';
                m.power = 8000;
            }
            if (m.name === 'Consecutive Normal Punches') {
                m.name = 'Consecutive Serious Punches';
                m.type = 'Fighting';
                m.power = 16000;
            }
            if (m.name === 'Dodge') {
                m.name = 'Dodge';
                m.power = 0;
            }
            if (m.name === 'One Punch') {
                m.name = 'Serious One Punch';
                m.type = 'Fighting';
                m.power = 10000;
            }
        });

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
                m.power = 2500;
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
                m.power = 2500;
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
                m.power = 3000;
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

    if (move.name === 'Dodge') {
        if (playerTurn) playerDodge = true; else opponentDodge = true;
        logMessage(`${attacker.name} preparou um Dodge e vai desviar do próximo golpe!`);
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

if (playerPokemon.name === 'Godzilla Monsterverse') {
    playerImg.style.width = '400px'; // aumente conforme desejar
    playerImg.style.height = 'auto';
}

if (opponentPokemon.name === 'Godzilla Monsterverse') {
    opponentImg.style.width = '400px';
    opponentImg.style.height = 'auto';
}
