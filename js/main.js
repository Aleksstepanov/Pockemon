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
    const onClick = (person1, person2, cb) => {
        const {name, click} = person1;
        if (click === cb()) {
            Object.values(document.querySelectorAll('.button')).forEach(elem => elem.disabled = true);
            alert('End Game!')
        }
        else {
            person1.$btnDamage.innerText = person1.$btnDamage.innerText.split('/')[0] + '/' + (click - cb());
            person2.changeHP(random(60, 20), name);
        }
    }
    if (event.target === character.$btnDamage) {
        onClick(character, enemy, counterCharacter);
        
    }
    else 
    if (event.target === enemy.$btnDamage) {
        onClick(enemy, character, counterEnemy);
        
    }
})
