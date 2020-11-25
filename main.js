class Pockemon {
    constructor(person) {
        this.name = person.name,
        this.defaultHP = person.defaultHP,
        this.damageHP = person.damageHP,
        this.elHP = person.elHP,
        this.elProgressBar = person.elProgressBar,
        this.$btnDamage = person.$btnDamage,
        this.click = person.click;
    }
    renderHPLife() {
        this.elHP.innerText = this.damageHP + '/' + this.defaultHP;
    }
    renderProgressBar() {
        this.elProgressBar.style.width = this.damageHP + '%';
    }
    renderHP() {
        this.renderHPLife();
        this.renderProgressBar();
    }
    changeHP (count) {
        const endGame = () => {
            this.damageHP = 0;
            alert(`Бедный ${this.name} проиграл!`);
            Object.values(document.querySelectorAll('.button')).forEach(elem => elem.disabled = true);
        }
        this.damageHP < count ? endGame() : this.damageHP -= count;
        this.renderHP();
    }
    random = (num) => Math.ceil(Math.random() * num);
    damageClick = () => {
        this.changeHP(this.random(20));
    }
}

const 
    character = new Pockemon ({
        name: 'Pickachu',
        defaultHP: 100,
        damageHP: 100,
        elHP: document.getElementById('health-character'),
        elProgressBar: document.getElementById('progressbar-character'),
        $btnDamage: document.getElementById('btn-kick-player'),
        click: 6,
    }),
    enemy = new Pockemon ({
        name: 'Charmander',
        defaultHP: 100,
        damageHP: 100,
        elHP: document.getElementById('health-enemy'),
        elProgressBar: document.getElementById('progressbar-enemy'),
        $btnDamage: document.getElementById('btn-kick-enemy'),
        click: 6,
    });


const init = () => {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
    character.$btnDamage.innerText = character.$btnDamage.innerText + ' /' + character.click; 
    enemy.$btnDamage.innerText = enemy.$btnDamage.innerText + ' /' + enemy.click;
}

function makeCounter() {
    let count = 0;
    return function() {
      return count++;
    };
  }
  
const counterCharacter = makeCounter(),
      counterEnemy = makeCounter();

init();
character.$btnDamage.addEventListener('click', () => {
<<<<<<< HEAD
    const {name} = character.name,
          {click} = character;
    if (click === counterCharacter) {
        Object.values(document.querySelectorAll('.button')).forEach(elem => elem.disabled = true);
        alert('End Game!')
    }
    else {
        character.$btnDamage.innerText = character.$btnDamage.innerText.split('/')[0] + '/' + (click - counterCharacter());
        enemy.damageClick(name);
    }
});
enemy.$btnDamage.addEventListener('click', () => {
    const {name} = enemy.name,
          {click} = enemy;
    if (click === counterCharacter) {
        Object.values(document.querySelectorAll('.button')).forEach(elem => elem.disabled = true);
        alert('End Game!')
    }
    else {
        enemy.$btnDamage.innerText = enemy.$btnDamage.innerText.split('/')[0] + '/'  + (click - counterEnemy());
        character.damageClick(name);
    }
     
})
=======
    enemy.damageClick();
});
enemy.$btnDamage.addEventListener('click', character.damageClick)
>>>>>>> main
