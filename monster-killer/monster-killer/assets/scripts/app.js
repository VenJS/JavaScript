const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');
const bonusLifeEl = document.getElementById('bonus-life');

const attackBtn = document.getElementById('attack-btn');
const strongAttackBtn = document.getElementById('strong-attack-btn');
const healBtn = document.getElementById('heal-btn');
const logBtn = document.getElementById('log-btn');

function adjustHealthBars(maxLife) {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
}

function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

function resetGame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}

function removeBonusLife() {
  bonusLifeEl.classList.add('hide-bonus-life');
}

function addBonusLife() {
  bonusLifeEl.classList.remove('hide-bonus-life');
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}


const ATTACK_VALUE = 10;
const MONSTER_DAMAGE = 15;
const STRONG_ATTACK_VALUE = 20;
const HEAL_VALUE = 8;
const lifeProgress = 100;

let currentMonsterHealth = lifeProgress;
let currentPlayerHealth = lifeProgress;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(lifeProgress);

function reset() {
  currentMonsterHealth = lifeProgress;
  currentPlayerHealth = lifeProgress;
  hasBonusLife = true;
  resetGame(lifeProgress);
  addBonusLife()
}



function winCondition() {
  const damageByMonster = dealPlayerDamage(MONSTER_DAMAGE);
  currentPlayerHealth -= damageByMonster;
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = lifeProgress;
    setPlayerHealth(lifeProgress);
    alert('You would be dead but the bonus life saved your ass!');
    console.log(currentPlayerHealth)

  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You win!');
  } else if (currentMonsterHealth > 0 && currentPlayerHealth <= 0) {
    alert('Loser');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('Draw');
  }


  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
    reset();
  }
}






function attackMonster() {
  const damage = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damage;
  winCondition();
}

function strongAttack() {
  const damage = dealMonsterDamage(STRONG_ATTACK_VALUE);
  currentMonsterHealth -= damage;
  winCondition();
}

function healing() {
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
}

function printLog() {

}

attackBtn.addEventListener('click', attackMonster);
strongAttackBtn.addEventListener('click', strongAttack);
healBtn.addEventListener('click', healing);
logBtn.addEventListener('click', printLog)

