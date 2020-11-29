import Pokemon from './module/Pokemon.js';
import {random, makeCounter, renderElem, visibleBlock} from './module/utils.js';
import {selectors} from './module/selectors.js'
import {pokemons} from './pokemons.js';



const counterCharacter = makeCounter(),
      counterEnemy = makeCounter(),
      {start, select, battle} = selectors,
      
      init = () => {
        visibleBlock(start);
        renderElem('pokemon_start', 'button', 'Start', {class: ['button', 'start']});
        document.querySelector('.start').addEventListener('click', () => {
            selectPokemon();
        })
      },

      selectPokemon = () => {
        visibleBlock(select);
        pokemons.forEach(elem => {
            renderElem('pokemon_select', 'div', null, {class: ['pokemon', `${elem.name}`]})
            renderElem(`${elem.name}`, 'img', null, {class: ['sprite', 'pokemon_select_img', `${elem.name}`], src: elem.img, id: elem.name, name: 'pokemon'});
            renderElem(`${elem.name}`, 'div', null, {class: ['details', `details_${elem.name}`]});
            renderElem(`details_${elem.name}`, 'h2', elem.name, {class: ['name']});
            renderElem(`details_${elem.name}`, 'div', null, {class: ['hp', `hp_${elem.name}`]});
            renderElem(`hp_${elem.name}`, 'div', null, {class: ['bar', `bar_${elem.name}`]});
            renderElem(`bar_${elem.name}`, 'div', null, {class: ['health', `health_${elem.name}`]});
            renderElem(`hp_${elem.name}`, 'span', `${elem.hp}`, {class: ['text', `text_${elem.name}`]})
        });
        document.querySelectorAll('.health').forEach(elem => elem.style.width = '100%');

        document.querySelectorAll('.pokemon_select_img').forEach(elem => elem.addEventListener('click', (event) => {
            if (event.target.name !== 'pokemon') {
                return null;
            }
            event.target.classList.add('selected');
            pokemons.filter(elem => elem.name !== event.target.id).forEach(elem => elem.change = false);
            pokemons.find(elem => elem.name === event.target.id).change = true;
            pokemonBatle(pokemons.find(elem => elem.change));
        }))
      },

      pokemonBatle = (person) => {
        visibleBlock(battle);
        const person2 = pokemons.filter(elem => !elem.change)[random(pokemons.filter(elem => !elem.change).length)],
              renderPokemon = (person, type) => {
                renderElem(`pokemon_wrapper`, 'div', null, {class: ['pokemon', `${type}`]});
                renderElem(`${type}`, 'span', 'Lv. 1', {class: ['lvl']});
                renderElem(`${type}`, 'img', null, {class: ['sprite'], src: person.img});
                renderElem(`${type}`, 'div', null, {class: ['details', `details_${type}`]});
                renderElem(`details_${type}`, 'h2', person.name, {class: ['name'], id: `name-${type}`});
                renderElem(`details_${type}`, 'div', null, {class: ['hp', `hp_${type}`]});
                renderElem(`hp_${type}`, 'div', null, {class: ['bar', `bar_${type}`]});
                renderElem(`bar_${type}`, 'div', null, {class: ['health', `health_${type}`], id: `progressbar-${type}`});
                renderElem(`hp_${type}`, 'span', `${person.hp}`, {class: ['text', `text_${type}`], id: `health-${type}`})
            },
            renderControl = (person, type) => {
                const {attacks} = person;
                attacks.forEach(elem => {
                    renderElem(`${type}-control`, 'button', `${elem.name} (${elem.maxCount})`, {class: ['button', 'damage'], name: `${elem.name}`});
                })
            };
        
        renderPokemon(person, 'character');
        renderElem('pokemon_wrapper', 'div', null, {class: ['log']});
        renderPokemon(person2, 'enemy',); 
        
        renderElem('control', 'div', null, {class: ['player-control']});
        renderControl(person, 'player');

        renderElem('control', 'div', null, {class: ['enemy-control']});
        renderControl(person2, 'enemy');

        const character = new Pokemon ({
            name: person.name,
            defaultHP: person.hp,
            damageHP: person.hp,
            selector: 'character',
            type: person.type,
            attacks: person.attacks,
        }),
        enemy = new Pokemon ({
            name: person2.name,
            defaultHP: person2.hp,
            damageHP: person2.hp,
            selector: 'enemy',
            type: person2.type,
            attacks: person.attacks,
        });

    document.querySelector('.control').addEventListener('click', (event) => {
        // const onClick = (person1, person2, cb) => {
        //     const {name, click} = person1;
        //     if (click === cb()) {
        //         Object.values(document.querySelectorAll('.button')).forEach(elem => elem.disabled = true);
        //         alert('End Game!')
        //     }
        //     else {
        //         person1.$btnDamage.innerText = person1.$btnDamage.innerText.split('/')[0] + '/' + (click - cb());
        //         person2.changeHP(random(60, 20), name);
        //     }
        // }
        // if (event.target === character.$btnDamage) {
        //     onClick(character, enemy, counterCharacter);
            
        // }
        // else 
        // if (event.target === enemy.$btnDamage) {
        //     onClick(enemy, character, counterEnemy);
            
        // }
       const onClick = (person1, person2, cb) => {
           
       }
        console.log(event.target);
        console.log(counterCharacter());
    })
      };


init ()

