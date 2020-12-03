import {random, generateLog} from './utils.js';
//import {generateLog} from './generateLog.js';

class Selectors{
    constructor(name) {
        this.$el = document.getElementById(`health-${name}`),
        this.$elProgressBar = document.getElementById(`progressbar-${name}`),
        this.$btnDamage = document.getElementById(`btn-kick-${name}`)
    }
}

export default class Pokemon extends Selectors {
    constructor(props) {
        super(props.selector),
        this.name = props.name,
        this.id = props.id,
        this.type = props.type,
        this.defaultHP = props.defaultHP,
        this.damageHP = props.damageHP,
        this.attacks = props.attacks,
        this.renderHP();
    }
    renderHPLife = () => {
        this.$el.innerText = this.damageHP + '/' + this.defaultHP;
    }
    renderProgressBar = () => {
        this.$elProgressBar.style.width = (this.damageHP/this.defaultHP * 100) + '%';
    }
    renderHP = () => {
        this.renderHPLife();
        this.renderProgressBar();
    }
    changeHP (count, person) {
        console.log(person);
        const endGame = () => {
            this.damageHP = 0;
            alert(`Бедный ${this.name} проиграл!`);
            Object.values(document.querySelectorAll('.button')).forEach(elem => elem.disabled = true);
        }
        this.damageHP < count ? endGame() : this.damageHP -= count;

        const pokemon = {
            name: this.name,
            defaultHP: this.defaultHP,
            damageHP: this.damageHP,
        }
        this.appendLog(generateLog(pokemon, person, count));
        
        this.renderHP(person);
    }
    appendLog (log) {
        const 
            $newLog = document.createElement('p'),
            $LOGS = document.querySelector('.log');
        $newLog.innerText = log;
        $LOGS.prepend($newLog);
    }
    damageClick = (person) => {
        this.changeHP(random(60, 10), person);
    }
    
}
