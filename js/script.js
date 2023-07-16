const pokemonName = document.querySelector('.pokemonname');
const pokemonImg = document.querySelector('.pokemonimg');
const pokemonId = document.querySelector('.pokemonid');
const pokemonTypes =document.querySelector('.pokemontypes');
const pokemonStats = document.querySelector('.pokemonstats');


const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemon(response))
        .catch(err => renderNotFound())
}

const renderPokemon = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    pokemonName.textContent = data.name;
    pokemonImg.setAttribute('src', sprite);
    pokemonId.textContent = `Nº ${data.id}`;
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const renderPokemonStats = stats => {
    pokemonStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokemonStats.appendChild(statElement);
    });
}
const renderPokemonTypes = types => {
    pokemonTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = type.type.name;
        pokemonTypes.appendChild(typeTextElement);
    });
}


const renderNotFound = () => {
    pokemonName.textContent = 'Not found this pokemon';
    pokemonImg.setAttribute('src', 'poke-shadow.png');
    pokemonImg.style.background =  '#fff';
    pokemonTypes.innerHTML = '';
    pokemonStats.innerHTML = '';
    pokemonId.textContent = '';
}