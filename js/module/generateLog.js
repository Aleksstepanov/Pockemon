import {random} from './random.js'
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