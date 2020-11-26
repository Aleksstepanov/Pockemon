import Pokemon from './module/Pokemon.js';
import {random} from './module/random.js';

const 
    character = new Pokemon ({
        name: 'Pickachu',
        defaultHP: 500,
        damageHP: 500,
        selector: 'character',
        click: 6,
    }),
    enemy = new Pokemon ({
        name: 'Charmander',
        defaultHP: 400,
        damageHP: 400,
        selector: 'enemy',
        click: 8,
    });

function makeCounter() {
    let count = 0;
    return function() {
      return count++;
    };
  }
  
const counterCharacter = makeCounter(),
      counterEnemy = makeCounter();

document.querySelector('.control').addEventListener('click', (event) => {
    if (event.target === character.$btnDamage) {
        const {name, click} = character;
    
    if (click === counterCharacter()) {
        Object.values(document.querySelectorAll('.button')).forEach(elem => elem.disabled = true);
        alert('End Game!')
    }
    else {
        character.$btnDamage.innerText = character.$btnDamage.innerText.split('/')[0] + '/' + (click - counterCharacter());
        enemy.changeHP(random(60, 20), name);
    }
    }
    else 
    if (event.target === enemy.$btnDamage) {
        const {name, click} = enemy;
    
    if (click === counterEnemy()) {
            Object.values(document.querySelectorAll('.button')).forEach(elem => elem.disabled = true);
            alert('End Game!')
        }
        else {
            enemy.$btnDamage.innerText = enemy.$btnDamage.innerText.split('/')[0] + '/' + (click - counterEnemy());
            character.changeHP(random(60, 20), name);
        }
    }
})
