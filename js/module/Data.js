import Pokemon from './Pokemon.js';
import {renderPokemon} from './utils.js';

export default class Data {
    constructor(props) {
        this.url = props.url,
        this.query = props.query,
        this.typePlayer = props.typePlayer
    }
    getData = async () => {
        const res = this.query ? await fetch(`${this.url}?${this.query}`) : await fetch(`${this.url}`),
              data = await res.json();
        renderPokemon(data, this.typePlayer);
        return new Pokemon({
            name: data.name,
            defaultHP: data.hp,
            damageHP: data.hp,
            selector: `${this.typePlayer}`,
            type: data.type,
            id: data.id,
            attacks: data.attacks,
        })
    }
    getFire = async (idPlayer1, idPlayer2, idAttack) => {
        const res = await fetch(`https://reactmarathon-api.netlify.app/api/fight?player1id=${idPlayer1}&attackId=${idAttack}&player2id=${idPlayer2}`),
              kick = await res.json();
        console.log(kick);
        return kick;
    }
}