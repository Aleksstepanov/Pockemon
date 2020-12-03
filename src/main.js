import {makeCounter, renderElem, visibleBlock, removeElem} from './module/utils.js';
import {selectors} from './module/selectors.js';
import Game from './module/Game.js';
import {url} from './module/api.js';
import Data from './module/Data.js';


const {start, select, battle} = selectors,
      
      init = () => {
        visibleBlock(start);
        removeElem(start);
        renderElem('pokemon_start', 'button', 'Start', {class: ['button', 'start']});
        document.querySelector('.start').addEventListener('click', () => {
           fetch(url).then(res => res.json()).then(res => selectPokemon(res));
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
                const {player1, player2} = person,
                      {attacks} = player1;
                attacks.forEach((elem, index) => {
                    const render = new Promise ((resolve) => {
                        renderElem(`${type}-control`, 'button', `${elem.name} ${elem.maxCount}/${elem.maxCount}`, {class: ['button', 'damage', `button-${type}`, `${index}`], name: `${elem.name}`, id: `${elem.name}`});
                        resolve();
                    });
                    render.then(() => {
                        const $btn = document.getElementById(elem.name),
                              counter = makeCounter(elem.maxCount);
                              
                        $btn.addEventListener('click', async () => {
                            const typeAttack = attacks.find((elem => elem.name === $btn.id));
                            
                            $btn.innerText = $btn.innerText.split('/')[0] + '/' + counter();
                            await getPlayer1.getFire(player1.id, player2.id, typeAttack.id)
                                 .then((res) => {
                                    const {kick} = res;
                                    player2.changeHP(kick.player1, player1.name);
                                    player1.changeHP(kick.player2, player2.name);
                                 });
                        });
                    })
                });

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
            
            
            await getPlayer1.getData().
            then(res => {
                renderElem('pokemon_wrapper', 'div', null, {class: ['log']});
                return res;
            }).
            then(res => {
                return getPlayer2.getData().then(enemy => {
                    return new Game ({
                        player1: res,
                        player2: enemy
                    })
                })
            }).then(res => {
                renderElem('control', 'div', null, {class: ['player-control']});
                renderControl(res, 'player');
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
      