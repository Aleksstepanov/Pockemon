class Pockemon {
    constructor(person) {
        this.name = person.name,
        this.defaultHP = person.defaultHP,
        this.damageHP = person.damageHP,
        this.elHP = person.elHP,
        this.elProgressBar = person.elProgressBar,
        this.$btnDamage = person.$btnDamage;
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
        $btnDamage: document.getElementById('btn-kick-player')
    }),
    enemy = new Pockemon ({
        name: 'Charmander',
        defaultHP: 100,
        damageHP: 100,
        elHP: document.getElementById('health-enemy'),
        elProgressBar: document.getElementById('progressbar-enemy'),
        $btnDamage: document.getElementById('btn-kick-enemy')
    });


const init = () => {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
}


init();
character.$btnDamage.addEventListener('click', () => {
    enemy.damageClick();
});
<<<<<<< HEAD
enemy.$btnDamage.addEventListener('click', character.damageClick)
=======
enemy.$btnDamage.addEventListener('click', () => {
    const {name} = enemy.name
    character.damageClick(name);
})

>>>>>>> homework-3
