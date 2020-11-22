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
    changeHP (count, person) {
        const endGame = () => {
            this.damageHP = 0;
            alert(`Бедный ${this.name} проиграл!`);
            Object.values(document.querySelectorAll('.button')).forEach(elem => elem.disabled = true);
        }
        this.damageHP < count ? endGame() : this.damageHP -= count;

        this.appendLog(this.generateLog(person, count));
        
        this.renderHP(person);
    }
    appendLog (log) {
        const 
            $newLog = document.createElement('p'),
            $LOGS = document.querySelector('.log');
        $newLog.innerText = log;
        $LOGS.prepend($newLog);
    }
    random = (num) => Math.ceil(Math.random() * num);
    damageClick = (person) => {
        this.changeHP(this.random(20), person);
    }
    generateLog (person, count) {
        const logs = [
            `${this.name} вспомнил что-то важное, но неожиданно ${person}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} поперхнулся, и за это ${person} с испугу приложил прямой удар коленом в лоб врага.-${count}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} забылся, но в это время наглый ${person}, приняв волевое решение, неслышно подойдя сзади, ударил.-${count}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} пришел в себя, но неожиданно ${person} случайно нанес мощнейший удар.-${count}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} удивился, а ${person} пошатнувшись влепил подлый удар.-${count}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} высморкался, но неожиданно ${person} провел дробящий удар.-${count}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} пошатнулся, и внезапно наглый ${person} беспричинно ударил в ногу противника -${count}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} расстроился, как вдруг, неожиданно ${person} случайно влепил стопой в живот соперника. -${count}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} поперхнулся, но в это время ${person} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${count}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} пытался что-то сказать, но вдруг, неожиданно ${person} со скуки, разбил бровь сопернику. -${count}, [${this.damageHP}/${this.defaultHP}]`
        ];
        return logs[this.random(logs.length) - 1]
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
    const {name} = character.name;
    enemy.damageClick(name);
});
enemy.$btnDamage.addEventListener('click', () => {
    const {name} = enemy.name
    character.damageClick(name);
})

