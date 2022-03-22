const pokemonCard = document.querySelector('[data-poke-principal]');
const pokemonNombre = document.querySelector('[data-nombres-pokemon]');
const pokemonImg = document.querySelector('[data-imagen-pokemon]');
const pokemonId = document.querySelector('[data-id-pokemon]');
const pokemonTipos = document.querySelector('[data-tipos-pokemon]');
const pokemonStats = document.querySelector('[data-stats-pokemon]');
const pokemonMov = document.querySelector('[data-movimientos-pokemon]');

const tiposColor = {
    bug: '#1E4D26',
    dark: '#5B597E',
    dragon: '#5FD7E8',
    electric: '#FAFF6A',
    fairy: '#F71169',
    fighting: '#361A16',
    fire: '#F54A54',
    flying: '#9AB9D3',
    ghost: '#946997',
    grass: '#23D750',
    ground: '#724C1F',
    ice: '#D7F7FC',
    normal: '#C899A5',
    poison: '#622C8E',
    psychic: '#FF1890',
    rock: '#903F21',
    steel: '#3DC99A',
    water: '#83A9FE',
    default: '#f4f4f4'
};

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => pokemonNoExiste())
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const { stats, types, moves } = data;
    pokemonNombre.textContent = data.name;
    pokemonNombre.style.color = 'red';
    pokemonImg.setAttribute('src', sprite);
    pokemonId.textContent = `Pokemon Nº ${data.id}`
    fondoPokemon(types);
    nombrePokemonTipos(types);
    nombrePokemonStats(stats);
    nombrePokemonMov(moves);
}

const fondoPokemon = types => {
    const colorUno = tiposColor[types[0].type.name];
    const colorDos = types[1] ? tiposColor[types[1].type.name] : tiposColor.default;
    pokemonImg.style.background = `radial-gradient(${colorDos} 70%, ${colorUno} 20% )`;
    pokemonImg.style.backgroundSize = `5px 5px`;
}

const nombrePokemonTipos = types => {
    pokemonTipos.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = tiposColor[type.type.name];
        typeTextElement.textContent = type.type.name;
        const salto = document.createElement("br");
        const salto2 = document.createElement("br");
        pokemonTipos.appendChild(typeTextElement);
        pokemonTipos.appendChild(salto);
        pokemonTipos.appendChild(salto2);
    });
}

const nombrePokemonStats = stats => {
    pokemonStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        statElement.classList.add('stats');
        const statElementNombre = document.createElement("div");
        const statElementCantidad = document.createElement("div");
        statElementNombre.textContent = stat.stat.name;
        statElementCantidad.textContent = stat.base_stat;
        statElement.appendChild(statElementNombre);
        statElement.appendChild(statElementCantidad);
        pokemonStats.appendChild(statElement);
    });
}

const nombrePokemonMov = moves => {
    pokemonMov.innerHTML = '';
    const moveElement = document.createElement("div");
    const moveElementNombre = document.createElement("div");
    let random = Math.floor(Math.random() * moves.length);
    moveElementNombre.textContent = moves[random].move.name;
    moveElement.appendChild(moveElementNombre);
    pokemonMov.appendChild(moveElement);
}

const pokemonNoExiste = () => {
    alert("Pokemon no encontrado");
    pokemonNombre.innerHTML = ''
    pokemonImg.setAttribute('src', '');
    pokemonId.innerHTML = '';
    pokemonTipos.innerHTML = '';
    pokemonStats.innerHTML = '';
    pokemonMov.innerHTML = '';
}