import Pokemon from './module/Pokemon.js';
import {random, makeCounter, renderElem, visibleBlock, removeElem} from './module/utils.js';
import {selectors} from './module/selectors.js';
import Game from './module/Game.js';
import {url} from './module/api.js';
import Data from './module/Data.js';


const counterCharacter1 = makeCounter(), 
      counterCharacter2 = makeCounter(),
      counterCharacter3 = makeCounter(),
      counterCharacter4 = makeCounter(),
      counterEnemy1 = makeCounter(),
      counterEnemy2 = makeCounter(),
      counterEnemy3 = makeCounter(),
      counterEnemy4 = makeCounter(),
      {start, select, battle} = selectors,
      
      init = () => {
        visibleBlock(start);
        removeElem(start);
        renderElem('pokemon_start', 'button', 'Start', {class: ['button', 'start']});
        document.querySelector('.start').addEventListener('click', () => {
           fetch(url).then(res => res.json()).then(res => selectPokemon(res));
            //pok();
            //selectPokemon();
        })
      },

      selectPokemon = (pokemons) => {
        visibleBlock(select);
        removeElem(select);
        pokemons.forEach(elem => {
            renderElem('pokemon_select', 'div', null, {class: ['pokemon', `${elem.name}`]})
            renderElem(`${elem.name}`, 'img', null, {class: ['sprite', 'pokemon_select_img', `${elem.name}`], src: elem.img, id: elem.id, name: 'pokemon'});
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
            pokemonBatle(event.target.id);
            
        }))
      },

      pokemonBatle = async (id) => {
        
        visibleBlock(battle);
        
        const renderControl = (person, type) => {
                const {attacks} = person;
                attacks.forEach((elem, index) => {
                    renderElem(`${type}-control`, 'button', `${elem.name} ${elem.maxCount}/${elem.maxCount}`, {class: ['button', 'damage', `button-${type}`, `${index}`], name: `${elem.name}`});
                })
            },
            getPlayer1 = new Data({
                url: url,
                query: `id=${id}`,
                typePlayer: 'character'
            }),
            getPlayer2 = new Data({
                url: url,
                query: `random=true`,
                typePlayer: 'enemy'
            });
            
            const player1 = await getPlayer1.getData();
            renderElem('pokemon_wrapper', 'div', null, {class: ['log']});
            const player2 = await getPlayer2.getData();
            renderElem('control', 'div', null, {class: ['player-control']});
            renderControl(player1, 'player');
            renderElem('control', 'div', null, {class: ['enemy-control']});
            renderControl(player2, 'enemy');
            

    document.querySelector('.control').addEventListener('click', (event) => {
        const onClick = (person1, person2, cb, elem) => {
        const {name, attacks} = person1;
        cb();
        const count = elem.innerText.split('/')[1] - 1;
        if (count < 0) {
            elem.disabled = true;
        }
        else {
            elem.innerText = elem.innerText.split('/')[0] + '/' + count;
            const atack = attacks.find(item => item.name === elem.name);
            person2.changeHP(random(atack.maxDamage, atack.minDamage), name);
        }
             
       };
            
       if (event.target.classList.contains('button-player')) {
           if (event.target.classList.contains('0')) {
            onClick(player1, player2, counterCharacter1, event.target);
           }
           if (event.target.classList.contains('1')) {
                onClick(player1, player2, counterCharacter2, event.target);
            }
            if (event.target.classList.contains('2')) {
                onClick(player1, player2, counterCharacter3, event.target);
            }
            if (event.target.classList.contains('3')) {
                onClick(player1, player2, counterCharacter4, event.target);
            }
       }

       if (event.target.classList.contains('button-enemy')) {
        if (event.target.classList.contains('0')) {
         onClick(player2, player1, counterEnemy1, event.target);
        }
        if (event.target.classList.contains('1')) {
             onClick(player2, player1, counterEnemy2, event.target);
         }
         if (event.target.classList.contains('2')) {
             onClick(player2, player1, counterEnemy3, event.target);
         }
         if (event.target.classList.contains('3')) {
             onClick(player2, player1, counterEnemy4, event.target);
         }
        }
        
    })
    
        }       

init ();

document.querySelector('.reset').addEventListener('click', () => {
    removeElem(document.querySelector('.pokemon__battle .pokemon_wrapper'));
    removeElem(document.querySelector('control'));
    removeElem(select);
    selectPokemon();
});
document.querySelector('.exit').addEventListener('click', () => init())
      