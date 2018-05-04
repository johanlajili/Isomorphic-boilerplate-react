import request from 'axios';

const getPokemon = {
  withAbility: (ability) => {
  	console.log('ability', ability);
    const baseUrl = 'http://pokeapi.co/api/v2/ability';
    return request.get(`${baseUrl}/${ability}`);
  },
};

export default getPokemon;
