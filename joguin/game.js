const mage = {
  healthPoints: 130,
  intelligence: 45,
  mana: 125,
  damage: undefined,
};

const warrior = {
  healthPoints: 200,
  strength: 30,
  weaponDmg: 2,
  damage: undefined,
};

const dragon = {
  healthPoints: 450,
  strength: 50,
  damage: undefined,
};
  
const battleMembers = { mage, warrior, dragon };

const dragonDamage = (strength) => 25 + Math.ceil(Math.random() * (strength - 15));

const warriorDamage = (strength, weaponDmg) => strength + Math.ceil(Math.random() * (strength*weaponDmg - strength));

const mageDamage = (intelligence, mana) => {
  let mage = {};
  const damageDelt = intelligence + Math.ceil(Math.random() * intelligence);

  mage.damage = damageDelt;
  if (mana < 15) {
    mage.damage = 0;
    console.log(`Não possui mana suficiente`);
  } else {
    mage.mana = mana - 15;
  }
  return mage;
}

const gameActions = {
  // Crie as HOFs neste objeto.
  warriorTurn: (warriorDmg) => {
    warrior.damage = warriorDmg;
    dragon.healthPoints -= warriorDmg;
    console.log(`The warrior swings his axe and hit the dragon, dealing ${warriorDmg} damage to dragon's HP!`);
  }, 
  mageTurn: (mageDmg) => {
    mage.damage = mageDmg.damage;
    mage.mana = mageDmg.mana;
    dragon.healthPoints -= mageDmg.damage;
    console.log(`The mage casts a fire ball, hiting the dragon right in his face, dealing ${mageDmg.damage} damage to dragon's HP!`);
  },
  dragonTurn: (dragonDmg) => {
    dragon.damage = dragonDmg;
    warrior.healthPoints -= dragonDmg;
    mage.healthPoints -= dragonDmg;
    console.log(`The dragon throws a fire breath, dealing ${dragonDmg} damage to the warrior and the mage!`);
  },
  endTurn: (member) => {
    switch (member) {
      case 'warrior':
        if (warrior.healthPoints > 0) gameActions.warriorTurn(warriorDamage(warrior.strength, warrior.weaponDmg));
        break;
      case 'mage':
        if (mage.healthPoints > 0) gameActions.mageTurn(mageDamage(mage.intelligence, mage.mana));
        break;
      case 'dragon':
        if (dragon.healthPoints > 0) gameActions.dragonTurn(dragonDamage(dragon.strength)); 
        break;  
    }
    return battleMembers;
  },
};

const getButton = document.getElementById('battle-btn');
const getMageButton = document.getElementById('mage-btn');
const getWarriorButton = document.getElementById('warrior-btn');

getWarriorButton.addEventListener('click', () => {

  const axeThrow = document.createElement('img');
  axeThrow.src = './images/axeThrow.png';
  axeThrow.style.width = 75 + 'px';
  axeThrow.style.position = 'absolute';
  axeThrow.style.top = 35 + '%';
  document.body.appendChild(axeThrow);

  var x = 150;
  var y = 200;
  var fatorY = 10;
  var interval = setInterval(function() {
    x += 10;
    y -= fatorY;
    fatorY -= 0.18;
    axeThrow.style.left = x + 'px';
    axeThrow.style.top = y + 'px';

    if (x > (window.innerWidth) * 0.7) {
      clearInterval(interval)
      axeThrow.remove();
    }
  }, 10)

  setTimeout(() => {
    
    gameActions.endTurn('warrior'); //dividir para cada battlemember
  
    const getDragonHP = document.getElementById('dragon-hp');
    const getDragonTextHP = document.getElementsByTagName('span')[3];
  
    if (dragon.healthPoints < 0) {
      dragon.healthPoints = 0;
      alert('The heroes won the battle!');
      getWarriorButton.disabled = true;
    };
  
    getDragonHP.style.width = `${(dragon.healthPoints / 450) * 100}%`;
    getDragonTextHP.innerText = `${dragon.healthPoints}`;

  }, 1200);

  getWarriorButton.disabled = true;
  getButton.disabled = false;
})

getMageButton.addEventListener('click', () => {

  const fireball = document.createElement('img');
  fireball.src = './images/fireball.png';
  fireball.style.width = 50 + 'px';
  fireball.style.position = 'absolute';
  fireball.style.top = 35 + '%';
  document.body.appendChild(fireball);

  var x = 250;
  var interval = setInterval(function() {
    x += 10;
    fireball.style.left = x + 'px';
    if (x > (window.innerWidth) * 0.75) {
      clearInterval(interval)
      fireball.remove();
    }
  }, 10)

  setTimeout(() => {
    
    gameActions.endTurn('mage');
  
    const getMageMP = document.getElementById('mage-mana');
    const getMageTextMP = document.getElementsByTagName('span')[2];
  
    const getDragonHP = document.getElementById('dragon-hp');
    const getDragonTextHP = document.getElementsByTagName('span')[3];
  
    if (dragon.healthPoints <= 0) {
      dragon.healthPoints = 0;
      alert('The heroes won the battle!');
      getMageButton.disabled = true;
    };
    
    getMageMP.style.width = `${(mage.mana / 125) * 100}%`;
    getMageTextMP.innerText = `${mage.mana}`;
  
    getDragonHP.style.width = `${(dragon.healthPoints / 450) * 100}%`;
    getDragonTextHP.innerText = `${dragon.healthPoints}`;
  }, 1200);

  getMageButton.disabled = true;
  getButton.disabled = false;
});

getButton.addEventListener('click', () => {

  const fireball = document.createElement('img');
    fireball.src = './images/fireball.png';
    fireball.style.width = 200 + 'px';
    fireball.style.position = 'absolute';
    fireball.style.top = 10 + '%';
    fireball.style.transform = 'scaleX(-1)';
    document.body.appendChild(fireball);

    var x = 250;
    var y = 100;
    var interval = setInterval(function() {
      x += 10;
      y += 1;
      fireball.style.right = x + 'px';
      fireball.style.top = y + 'px';
      if (x > (window.innerWidth) * 0.8) {
        clearInterval(interval);
        fireball.remove();
      }
  }, 10)

  setTimeout(() => {
    gameActions.endTurn('dragon');

    if (warrior.healthPoints < 0) {
      warrior.healthPoints = 0;
      console.log('The warrior died!');
      getWarriorButton.disabled = true;
    };
    if (mage.healthPoints < 0) {
      mage.healthPoints = 0
      console.log('The mage died!')
      getMageButton.disabled = true;
    };

    if (warrior.healthPoints === 0 && mage.healthPoints === 0) {
      alert('The Dragon won the battle!')
      getButton.disabled = true;
    };

    const getWarriorHP = document.getElementById('warrior-hp');
    const getWarriorTextHP = document.getElementsByTagName('span')[0];

    const getMageHP = document.getElementById('mage-hp');
    const getMageTextHP = document.getElementsByTagName('span')[1];


    getWarriorHP.style.width = `${(warrior.healthPoints / 200) * 100}%`;
    getWarriorTextHP.innerText = `${warrior.healthPoints}`;

    getMageHP.style.width = `${(mage.healthPoints / 130) * 100}%`;
    getMageTextHP.innerText = `${mage.healthPoints}`;

    console.table(battleMembers);

  }, 1500);

  getButton.disabled = true;
  getMageButton.disabled = false;
  getWarriorButton.disabled = false;

})
