import Pokemon from './module/Pokemon.js';
import {random, makeCounter, renderElem, visibleBlock, removeElem} from './module/utils.js';
import {selectors} from './module/selectors.js';
import Game from './module/Game.js';
import {url} from './module/api.js';


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
            //event.target.classList.add('selected');
            
            // pokemons.filter(elem => elem.name !== event.target.id).forEach(elem => elem.change = false);
            // pokemons.find(elem => elem.name === event.target.id).change = true;
            // pokemonBatle(pokemons.find(elem => elem.change));
        }))
      },

      pokemonBatle = (id) => {
        //removeElem(battle);
        visibleBlock(battle);
        const renderPokemon = (person, type) => {
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
                attacks.forEach((elem, index) => {
                    renderElem(`${type}-control`, 'button', `${elem.name} ${elem.maxCount}/${elem.maxCount}`, {class: ['button', 'damage', `button-${type}`, `${index}`], name: `${elem.name}`});
                })
            },
            getPlayer1 = async () => {
                const res = await fetch(`${url}?id=${id}`),
                      player1 = await res.json();
                renderPokemon(player1, 'character');
                const character = new Pokemon ({
                            name: player1.name,
                            defaultHP: player1.hp,
                            damageHP: player1.hp,
                            selector: 'character',
                            type: player1.type,
                            id: player1.id,
                            attacks: player1.attacks,
                });
                return character;
            },
            getPlayer2 = async () => {
                const res = await fetch(`${url}?random=true`),
                      player2 = await res.json();
                renderPokemon(player2, 'enemy',); 
                const enemy = new Pokemon ({
                            name: player2.name,
                            defaultHP: player2.hp,
                            damageHP: player2.hp,
                            selector: 'enemy',
                            type: player2.type,
                            id: player2.id,
                            attacks: player2.attacks,
                });
                return enemy;
            }
            
            getPlayer1().
                then(res => {
                    renderElem('pokemon_wrapper', 'div', null, {class: ['log']});
                    return res;
                }).
                then(res => {
                    return getPlayer2().then(result => {
                        const NewGame = new Game({
                            player1: res,
                            player2: result
                        });
                        return NewGame;
                    })
                }).
                then(res => {
                    renderElem('control', 'div', null, {class: ['player-control']});
                    renderControl(res.player1, 'player');
                    renderElem('control', 'div', null, {class: ['enemy-control']});
                    renderControl(res.player2, 'enemy');
                    return res;
                }).
                then(res => {
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
                          onClick(res.player1, res.player2, counterCharacter1, event.target);
                         }
                         if (event.target.classList.contains('1')) {
                              onClick(res.player1, res.player2, counterCharacter2, event.target);
                          }
                          if (event.target.classList.contains('2')) {
                              onClick(res.player1, res.player2, counterCharacter3, event.target);
                          }
                          if (event.target.classList.contains('3')) {
                              onClick(res.player1, res.player2, counterCharacter4, event.target);
                          }
                     }
                 
                     if (event.target.classList.contains('button-enemy')) {
                      if (event.target.classList.contains('0')) {
                       onClick(res.player2, res.player1, counterEnemy1, event.target);
                      }
                      if (event.target.classList.contains('1')) {
                           onClick(res.player2, res.player1, counterEnemy2, event.target);
                       }
                       if (event.target.classList.contains('2')) {
                           onClick(res.player2, res.player1, counterEnemy3, event.target);
                       }
                       if (event.target.classList.contains('3')) {
                           onClick(res.player2, res.player1, counterEnemy4, event.target);
                       }
                      }

                    })
                })
                
            
            
            

    //     renderPokemon(person, 'character');
    //     renderElem('pokemon_wrapper', 'div', null, {class: ['log']});
    //     renderPokemon(person2, 'enemy',); 
        
    //     renderElem('control', 'div', null, {class: ['player-control']});
    //     renderControl(person, 'player');

    //     renderElem('control', 'div', null, {class: ['enemy-control']});
    //     renderControl(person2, 'enemy');

    //     const character = new Pokemon ({
    //         name: person.name,
    //         defaultHP: person.hp,
    //         damageHP: person.hp,
    //         selector: 'character',
    //         type: person.type,
    //         attacks: person.attacks,
    //     }),
    //     enemy = new Pokemon ({
    //         name: person2.name,
    //         defaultHP: person2.hp,
    //         damageHP: person2.hp,
    //         selector: 'enemy',
    //         type: person2.type,
    //         attacks: person2.attacks,
    //     });

    // document.querySelector('.control').addEventListener('click', (event) => {
    //   const onClick = (person1, person2, cb, elem) => {
    //     const {name, attacks} = person1;
    //     cb();
    //     const count = elem.innerText.split('/')[1] - 1;
    //     if (count < 0) {
    //         elem.disabled = true;
    //     }
    //     else {
    //         elem.innerText = elem.innerText.split('/')[0] + '/' + count;
    //         const atack = attacks.find(item => item.name === elem.name);
    //         person2.changeHP(random(atack.maxDamage, atack.minDamage), name);
    //     }
             
    //    };
            
    //    if (event.target.classList.contains('button-player')) {
    //        if (event.target.classList.contains('0')) {
    //         onClick(character, enemy, counterCharacter1, event.target);
    //        }
    //        if (event.target.classList.contains('1')) {
    //             onClick(character, enemy, counterCharacter2, event.target);
    //         }
    //         if (event.target.classList.contains('2')) {
    //             onClick(character, enemy, counterCharacter3, event.target);
    //         }
    //         if (event.target.classList.contains('3')) {
    //             onClick(character, enemy, counterCharacter4, event.target);
    //         }
    //    }

    //    if (event.target.classList.contains('button-enemy')) {
    //     if (event.target.classList.contains('0')) {
    //      onClick(enemy, character, counterEnemy1, event.target);
    //     }
    //     if (event.target.classList.contains('1')) {
    //          onClick(enemy, character, counterEnemy2, event.target);
    //      }
    //      if (event.target.classList.contains('2')) {
    //          onClick(enemy, character, counterEnemy3, event.target);
    //      }
    //      if (event.target.classList.contains('3')) {
    //          onClick(enemy, character, counterEnemy4, event.target);
    //      }
    //     }
        
    // })
    
        }

init ();

document.querySelector('.reset').addEventListener('click', () => {
    removeElem(document.querySelector('.pokemon__battle .pokemon_wrapper'));
    removeElem(document.querySelector('control'));
    removeElem(select);
    selectPokemon();
});
document.querySelector('.exit').addEventListener('click', () => init())
      