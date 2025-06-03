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

let playerPokemon, opponentPokemon;

// Dados dos Pokémon
const pokemons = {
    charizard: {
        name: 'Charizard',
        type: 'Fire',
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
        type: 'Dragon',
        maxHP: 100000,
        moves: [
            { name: 'Atomic Breath', type: 'Dragon', power: 500 },
            { name: 'Shield of God', type: 'Normal', power: 0 },
            { name: demonBoostActive ? 'Godzilla\'s Final Blast' : 'Demon Boost', type: 'Dragon', power: demonBoostActive ? 9999 : 0 },
            { name: 'Earthquake', type: 'Ground', power: 200 }
        ]
    },
    saitama: {
        name: 'Saitama',
        type: 'Fighting',
        maxHP: 9999,
        moves: [
            { name: 'Serious Punch', type: 'Fighting', power: 2000 },
            { name: 'Consecutive Normal Punches', type: 'Normal', power: 1500 },
            { name: 'Dodge', type: 'Normal', power: 0 },
            { name: 'One Punch', type: 'Fighting', power: 1000 }
        ]
    },
    jacktheripper: {
        name: 'Jack the Ripper',
        type: 'Dark',
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
        type: 'Fire',
        maxHP: 200,
        moves: [
            { name: 'Solar Prominence', type: 'Fire', power: 130 },
            { name: 'Harmonia Celestial', type: 'Psychic', power: 110 },
            { name: 'Helios Cataclysm', type: 'Normal', power: 0 }, // Heal move
            { name: 'Aurora Ultima', type: 'Fire', power: 250 }
        ]
    },
    godzillaminusone: {
        name: 'Godzilla Minus One',
        type: 'Dragon',
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
        type: 'Dragon',
        maxHP: 500,
        moves: [
            { name: 'Sound Burst Punch', type: 'Dragon', power: 200 },
            { name: 'Shockwave Emission', type: 'Electric', power: 150 },
            { name: 'Regeneração Ultra-Rápida', type: 'Dragon', power: 0 },
            { name: kaijun8Active ? 'Hyper Destructive Punch' : 'Kaiju Liberation Mode', type: 'Dragon', power: kaijun8Active ? 1000 : 0}
        ]
    }
    // Adicione mais personagens aqui de acordo com a regra colocada acima e deixe o mais balanceado possível
};

// Tabela de efetividade simplificada
const typeChart = {
    Fire: { Grass: 2, Water: 0.5, Fire: 0.5, Electric: 1, Ice: 2, Ground: 1, Flying: 1, Dragon: 0.5 },
    Water: { Fire: 2, Grass: 0.5, Water: 0.5, Electric: 1, Ground: 2, Ice: 1, Flying: 1, Dragon: 0.5 },
    Grass: { Water: 2, Fire: 0.5, Grass: 0.5, Electric: 1, Ground: 2, Flying: 0.5, Poison: 0.5 },
    Electric: { Water: 2, Grass: 0.5, Fire: 1, Electric: 0.5, Flying: 2, Ground: 0 },
    Flying: { Grass: 2, Electric: 0.5, Fighting: 2, Bug: 2, Rock: 0.5 },
    Poison: { Grass: 2, Fairy: 2, Ground: 0.5, Rock: 0.5, Poison: 0.5 },
    Ground: { Fire: 2, Electric: 2, Grass: 0.5, Flying: 0, Rock: 2, Poison: 2 },
    Dragon: { Dragon: 2 },
    Dark: { Psychic: 2, Ghost: 2, Fighting: 0.5, Dark: 0.5 },
    Steel: { Ice: 2, Rock: 2, Fairy: 2, Fire: 0.5, Water: 0.5, Electric: 0.5 },
    Normal: { Rock: 0.5, Ghost: 0, Steel: 0.5 }
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

// Atacar
function attack(move) {

    const attacker = playerTurn ? playerPokemon : opponentPokemon;
    const defender = playerTurn ? opponentPokemon : playerPokemon;

    const damage = Math.floor((Math.random() * 5) + move.power); // Power + variação 0-5
    const effectiveness = getTypeEffectiveness(move.type, defender.type);

    const finalDamage = Math.floor(damage * effectiveness);

    if (playerTurn) {
        opponentHP = Math.max(0, opponentHP - finalDamage);
        logMessage(`${attacker.name} usou ${move.name}! ${effectiveness > 1 ? 'É super efetivo!' : effectiveness < 1 ? 'Não é muito efetivo...' : ''} Causou ${finalDamage} de dano.`);
    } else {
        playerHP = Math.max(0, playerHP - finalDamage);
        logMessage(`${attacker.name} usou ${move.name}! ${effectiveness > 1 ? 'É super efetivo!' : effectiveness < 1 ? 'Não é muito efetivo...' : ''} Causou ${finalDamage} de dano.`);
    }

    updateHP();
    checkFaint();

    if (playerHP > 0 && opponentHP > 0) {
        playerTurn = !playerTurn;

        setTimeout(() => {
            document.getElementById('fight-menu').classList.add('hidden');
            document.getElementById('main-menu').classList.remove('hidden');
        }, 500);
    }
}

// Verificar se algum desmaiou
function checkFaint() {
    if (opponentHP <= 0) {
        setTimeout(() => {
            alert('O oponente desmaiou! Você venceu!');
            endBattle();
        }, 500);
    }
    if (playerHP <= 0) {
        setTimeout(() => {
            alert('Seu Pokémon desmaiou! Você perdeu!');
            endBattle();
        }, 500);
    }
}

// Encerrar batalha
function endBattle() {
    window.location.href = 'select.html';
}

// Log para console (ou futuramente interface)
function logMessage(msg) {
    console.log(msg);
}


function attack(move) {
    const attacker = playerTurn ? playerPokemon : opponentPokemon;
    const defender = playerTurn ? opponentPokemon : playerPokemon;

    // Referência para os HPs e status dos jogadores (facilita)
    let attackerHP = playerTurn ? playerHP : opponentHP;
    let defenderHP = playerTurn ? opponentHP : playerHP;
    let attackerShield = playerTurn ? playerShield : opponentShield;
    let defenderShield = playerTurn ? opponentShield : playerShield;
    let attackerDodge = playerTurn ? playerDodge : opponentDodge;
    let defenderDodge = playerTurn ? opponentDodge : playerDodge;

    // Tratar golpes especiais:
    if (move.name === 'Shield of God') {
        // Ativa o escudo no atacante para bloquear o próximo golpe
        if (playerTurn) playerShield = true; else opponentShield = true;
        logMessage(`${attacker.name} ativou Shield of God e ficará imune ao próximo golpe!`);
    }
    else if (move.name === 'Dodge') {
        // Ativa o desvio para evitar o próximo golpe
        if (playerTurn) playerDodge = true; else opponentDodge = true;
        logMessage(`${attacker.name} preparou um Dodge e vai desviar do próximo golpe!`);
    }
    else if (move.name === 'Helios Cataclysm') {
        // Cura o atacante, vamos curar 30% do maxHP
        const healAmount = Math.floor(attacker.maxHP * 0.3);
        if (playerTurn) {
            playerHP = Math.min(playerPokemon.maxHP, playerHP + healAmount);
            logMessage(`${attacker.name} usou Helios Cataclysm e curou ${healAmount} de HP!`);
        } else {
            opponentHP = Math.min(opponentPokemon.maxHP, opponentHP + healAmount);
            logMessage(`${attacker.name} usou Helios Cataclysm e curou ${healAmount} de HP!`);
        }
        updateHP();
    }
    else if (move.name === 'Regen') {
        // Cura o atacante, vamos curar 30% do maxHP
        const healAmount = Math.floor(attacker.maxHP * 0.5);
        if (playerTurn) {
            playerHP = Math.min(playerPokemon.maxHP, playerHP + healAmount);
            logMessage(`${attacker.name} usou Regen e curou ${healAmount} de HP!`);
        } else {
            opponentHP = Math.min(opponentPokemon.maxHP, opponentHP + healAmount);
            logMessage(`${attacker.name} usou Regen e curou ${healAmount} de HP!`);
        }
        updateHP();
    }
    else if (move.name === 'segunda marcha') {
        if (attacker.name === 'Luffy') {
            luffyBuffed = true;
            logMessage(`${attacker.name} ativou a Segunda Marcha! Seus próximos ataques causarão o dobro de dano.`);
        } else {
            logMessage(`${attacker.name} tentou usar Segunda Marcha, mas não é Luffy!`);
        }
    } else if (move.name === 'Regeneração Ultra-Rápida') {
        const healAmount = Math.floor(attacker.maxHP * 0.5); // Cura 50% do HP máximo

        if (healAmount > 0) {
            if (playerTurn) {
                const oldHP = playerHP;
                playerHP = Math.min(playerPokemon.maxHP, playerHP + healAmount);
                const healed = playerHP - oldHP;
                logMessage(`${attacker.name} usou Regeneração Ultra-Rápida e curou ${healed} de HP!`);
            } else {
                const oldHP = opponentHP;
                opponentHP = Math.min(opponentPokemon.maxHP, opponentHP + healAmount);
                const healed = opponentHP - oldHP;
                logMessage(`${attacker.name} usou Regeneração Ultra-Rápida e curou ${healed} de HP!`);
            }
        } else {
            logMessage(`${attacker.name} tentou se curar, mas não conseguiu!`);
        }

        updateHP();
    }
    else {
        // Caso normal: calcular dano e aplicar

        // Antes de causar dano, verificar se o defensor tem Shield ou Dodge ativo
        if ((playerTurn && opponentShield) || (!playerTurn && playerShield)) {
            // Escudo bloqueia o golpe, escudo é consumido
            if (playerTurn) {
                opponentShield = false;
                logMessage(`${defender.name} bloqueou o ataque com Shield of God! Nenhum dano foi causado.`);
            } else {
                playerShield = false;
                logMessage(`${defender.name} bloqueou o ataque com Shield of God! Nenhum dano foi causado.`);
            }
        }
        else if ((playerTurn && opponentDodge) || (!playerTurn && playerDodge)) {
            // Dodge evita o golpe, consumindo o status
            if (playerTurn) {
                opponentDodge = false;
                logMessage(`${defender.name} desviou do ataque com Dodge! Nenhum dano foi causado.`);
            } else {
                playerDodge = false;
                logMessage(`${defender.name} desviou do ataque com Dodge! Nenhum dano foi causado.`);
            }
        }
        else {
            // Calcula dano normalmente
            const damage = Math.floor((Math.random() * 5) + move.power); // Power + variação 0-5
            const effectiveness = getTypeEffectiveness(move.type, defender.type);

            const finalDamage = Math.floor(damage * effectiveness);

            if (playerTurn) {
                opponentHP = Math.max(0, opponentHP - finalDamage);
                logMessage(`${attacker.name} usou ${move.name}! ${effectiveness > 1 ? 'É super efetivo!' : effectiveness < 1 ? 'Não é muito efetivo...' : ''} Causou ${finalDamage} de dano.`);
            } else {
                playerHP = Math.max(0, playerHP - finalDamage);
                logMessage(`${attacker.name} usou ${move.name}! ${effectiveness > 1 ? 'É super efetivo!' : effectiveness < 1 ? 'Não é muito efetivo...' : ''} Causou ${finalDamage} de dano.`);
            }
        }
        let damage = Math.floor((Math.random() * 5) + move.power);
        let effectiveness = getTypeEffectiveness(move.type, defender.type);
        let finalDamage = Math.floor(damage * effectiveness);

        // Se for Luffy e ele usou Segunda Marcha, dobre o dano
        if (attacker.name === 'Luffy' && luffyBuffed && move.name !== 'segunda marcha') {
            finalDamage *= 2;
            luffyBuffed = false; // Consome o efeito
            logMessage(`O golpe foi energizado pela Segunda Marcha! Dano dobrado!`);
        }

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
}

function attack(move) {

    const attacker = playerTurn ? playerPokemon : opponentPokemon;
    const defender = playerTurn ? opponentPokemon : playerPokemon;
    const attackerHP = playerTurn ? playerHP : opponentHP;
    const defenderHP = playerTurn ? opponentHP : playerHP;
    const attackerImg = playerTurn ? document.getElementById('player-img') : document.getElementById('opponent-img');

    let movePower = move.power;

    // Demon Boost - Ativa o modo especial
    if (attacker.name === 'Godzilla in Hell' && move.name === 'Demon Boost') {
        demonBoostActive = true;

        // Troca a imagem para a forma Demon Boost
        attackerImg.src = 'Godzillainhelldemonboost.png';

        alert('Godzilla in Hell entrou no modo DEMON BOOST! Seu próximo ataque será o Godzilla\'s Final Blast!');

        // Substitui temporariamente o golpe Demon Boost pelo Godzilla's Final Blast
        attacker.moves.forEach(m => {
            if (m.name === 'Demon Boost') {
                m.name = 'Godzilla\'s Final Blast';
                m.power = 8000; // Poder devastador
            }
        });

        endTurn();
        return;
    }

    // Caso Demon Boost esteja ativo e o jogador use o ataque Godzilla's Final Blast
    if (attacker.name === 'Godzilla in Hell' && demonBoostActive && move.name === 'Godzilla\'s Final Blast') {
        alert('Godzilla\'s Final Blast!!!');

        // Aplica dano gigantesco
        movePower = 8000;
        demonBoostActive = false;

        // Volta o nome do golpe para Demon Boost após usar
        attacker.moves.forEach(m => {
            if (m.name === 'Godzilla\'s Final Blast') {
                m.name = 'Demon Boost';
                m.power = 0;
            }
        });

        // Volta para a imagem normal
        attackerImg.src = 'godzillainhell.png';
    }

    // Cálculo de dano padrão
    const effectiveness = typeChart[move.type] && typeChart[move.type][defender.type] || 1;
    const damage = movePower * effectiveness;

    if (playerTurn) {
        opponentHP = Math.max(0, opponentHP - damage);
    } else {
        playerHP = Math.max(0, playerHP - damage);
    }

    if (attacker.name === 'Kaiju Nº 8' && move.name === 'Kaiju Liberation Mode') {
        kaijun8Active = true;
    
        // Troca a imagem para a forma Kaiju Liberation Mode
        attackerImg.src = 'kaijun8ataque.png';
    
        alert('Kaiju Nº 8 entrou no modo Kaiju Liberation Mode! Seu próximo ataque será o Hyper Destructive Punch!');
    
        // Substitui temporariamente o golpe Kaiju Liberation Mode pelo Hyper Destructive Punch
        attacker.moves.forEach(m => {
            if (m.name === 'Kaiju Liberation Mode') {
                m.name = 'Hyper Destructive Punch';
                m.power = 1000; // Poder devastador
            }
        });
    
        endTurn();
        return;
    }
    
    // Caso Kaiju Liberation Mode esteja ativo e o jogador use o ataque Hyper Destructive Punch
    if (attacker.name === 'Kaiju Nº 8' && kaijun8Active && move.name === 'Hyper Destructive Punch') {
        alert('Hyper Destructive Punch!!!');
    
        // Aplica dano gigantesco
        movePower = 1000;
        kaijun8Active = false;
    
        // Volta o nome do golpe para Kaiju Liberation Mode após usar
        attacker.moves.forEach(m => {
            if (m.name === 'Hyper Destructive Punch') {
                m.name = 'Kaiju Liberation Mode';
                m.power = 0;
            }
        });
    
        // Volta para a imagem normal
        attackerImg.src = 'kaijun8.png';
    }

    updateHP();

    // Verifica se alguém perdeu
    if (opponentHP === 0 || playerHP === 0) {
        setTimeout(() => {
            alert(playerHP === 0 ? 'Você perdeu!' : 'Você venceu!');
            window.location.href = 'select.html';
        }, 500);
        return;
    }

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

