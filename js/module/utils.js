import {selectors} from './selectors.js';

export const random = (max, min = 0) => {
    const num = max - min;
    return Math.ceil(Math.random() * num) + min;
}

export function makeCounter() {
    let count = 1;
    return function() {
      return count++;
    };
}

export const generateLog = ({name, damageHP, defaultHP}, person, count) => {
    const logs = [
        `${name} вспомнил что-то важное, но неожиданно ${person}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${damageHP}/${defaultHP}]`,
        `${name} поперхнулся, и за это ${person} с испугу приложил прямой удар коленом в лоб врага.-${count}, [${damageHP}/$.defaultHP}]`,
        `${name} забылся, но в это время наглый ${person}, приняв волевое решение, неслышно подойдя сзади, ударил.-${count}, [${damageHP}/${defaultHP}]`,
        `${name} пришел в себя, но неожиданно ${person} случайно нанес мощнейший удар.-${count}, [${damageHP}/${defaultHP}]`,
        `${name} удивился, а ${person} пошатнувшись влепил подлый удар.-${count}, [${damageHP}/${defaultHP}]`,
        `${name} высморкался, но неожиданно ${person} провел дробящий удар.-${count}, [${damageHP}/${defaultHP}]`,
        `${name} пошатнулся, и внезапно наглый ${person} беспричинно ударил в ногу противника -${count}, [${damageHP}/${defaultHP}]`,
        `${name} расстроился, как вдруг, неожиданно ${person} случайно влепил стопой в живот соперника. -${count}, [${damageHP}/${defaultHP}]`,
        `${name} поперхнулся, но в это время ${person} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${count}, [${damageHP}/${defaultHP}]`,
        `${name} пытался что-то сказать, но вдруг, неожиданно ${person} со скуки, разбил бровь сопернику. -${count}, [${damageHP}/${defaultHP}]`
    ];
    return logs[random(logs.length) - 1]
}

export const renderElem = (elemParent, elemChild, innerElem = null, attributes = null, method = 'appendChild') => {
    const newElem = document.createElement(elemChild);
    const Parent = document.querySelector(`.${elemParent}`);
    
    if (innerElem) {
        newElem.innerText = innerElem;
    }

    if (attributes) {
        attributes.class ? attributes.class.forEach(elem => newElem.classList.add(elem))  : null;
        attributes.src ? newElem.setAttribute('src', attributes.src) : null;
        attributes.id ? newElem.setAttribute('id', attributes.id) : null;
        attributes.name ? newElem.setAttribute('name', attributes.name) : null;
        attributes.data ? newElem.setAttribute('data', attributes.data) : null;
    }
    if (method === 'appendChild') {
        Parent.appendChild(newElem);
    }
    if (method === 'prependChild') {
        Parent.prepend(newElem);
    }

}

export const visibleBlock = (elem) => {
    const {start, battle, select} = selectors;
    switch (elem) {
        case start :
            select.style.display = 'none';
            battle.style.display = 'none';
            start.style.display = 'flex';
            break;
        case battle : 
            select.style.display = 'none';
            battle.style.display = 'flex';
            start.style.display = 'none';
            break;
        case select : 
            select.style.display = 'flex';
            battle.style.display = 'none';
            start.style.display = 'none';
            break;
    }

}

export const removeElem = (elem) => {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}

// export const renderPokemon = (person, type) => {
//     renderElem(`pokemon_wrapper`, 'div', null, {class: ['pokemon', `${type}`]});
//     renderElem(`${type}`, 'span', 'Lv. 1', {class: ['lvl']});
//     renderElem(`${type}`, 'img', null, {class: ['sprite'], src: person.img});
//     renderElem(`${type}`, 'div', null, {class: ['details', `details_${type}`]});
//     renderElem(`details_${type}`, 'h2', person.name, {class: ['name'], id: `name-${type}`});
//     renderElem(`details_${type}`, 'div', null, {class: ['hp', `hp_${type}`]});
//     renderElem(`hp_${type}`, 'div', null, {class: ['bar', `bar_${type}`]});
//     renderElem(`bar_${type}`, 'div', null, {class: ['health', `health_${type}`], id: `progressbar-${type}`});
//     renderElem(`hp_${type}`, 'span', `${person.hp}`, {class: ['text', `text_${type}`], id: `health-${type}`})
// }
