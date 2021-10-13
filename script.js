let pokemonId = 1;
let pokemon;
const image = document.querySelector('#image');
const pokemonName = document.querySelector('#pokemon-name');
const pokemonDisplayId = document.querySelector('#pokemonId');

const fetchPokemons = (pokemonId) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(data => {
        pokemon = data.data;
        console.log(pokemon);
        image.src = pokemon.sprites.front_default
        pokemonDisplayId.textContent = pokemon.id;
        pokemonName.textContent = pokemon.name;
        const moves = pokemon.moves.slice(0,4);
        moves.map((move, i) => {
            document.querySelector(`#move${i + 1}`).textContent = move.move.name;
        })
        fetchEvolutions();
    })
    .catch(error => alert(error));
};

const fetchEvolutions = () => {
    axios.get(pokemon.species.url)
    .then(data => {
        axios.get(data.data.evolution_chain.url)
        .then(data => console.log(data.data.chain.evolves_to[0]));
    });
};

fetchPokemons(pokemonId);

document.querySelector('#next').addEventListener('click', () => {
    pokemonId = pokemon.id + 1;
    searchValue.value = '';
    fetchPokemons(pokemonId);
});

document.querySelector('#previous').addEventListener('click', () => {
    pokemon.id > 1 ? pokemonId = pokemon.id - 1 : alert('there is no 0 pokemon!');
    searchValue.value = '';
    fetchPokemons(pokemonId);
});

document.querySelector('#searchBtn').addEventListener('click', () => {
    let searchValue = document.querySelector('#searchValue').value;
    searchValue == '' ? searchValue = '1' : null;
    pokemonId = searchValue;
    fetchPokemons(pokemonId);
});

