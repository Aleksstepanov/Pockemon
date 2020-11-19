const $btn = document.getElementById('btn-kick');
const character = {
    name: 'Pickachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressBar: document.getElementById('progressbar-character'),
}

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressBar: document.getElementById('progressbar-enemy'),
}
const random = (num) => {
    return Math.ceil(Math.random() * num);
}
const 
    renderHPLife = (person) => {
        person.elHP.innerText = person.damageHP + '/' + person.defaultHP;
    },
    renderProgressBar = (person) => {
        person.elProgressBar.style.width = person.damageHP + '%';
    },
    renderHP = (person) => {
        renderHPLife(person);
        renderProgressBar(person);
    },
    changeHP = (count, person) => {
        const endGame = () => {
            person.damageHP = 0;
            alert(`Бедный ${person.name} проиграл!`);
            $btn.disabled = true;
        }
        person.damageHP < count ? endGame() : person.damageHP -= count;
        renderHP(person);
    },
    init = () => {
        console.log('Start game!');
        renderHP(character);
        renderHP(enemy);
    }

init();

$btn.addEventListener('click', () => {
    changeHP(random(20), character);
    changeHP(random(20), enemy);
})
