let pokemonId = 1;
let pokemon;

const image = document.querySelector('#image');
const pokemonName = document.querySelector('#pokemon-name');
const pokemonDisplayId = document.querySelector('#pokemonId');

const fetchPokemons = (pokemonId) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(data => {
        pokemon = data.data;
        image.src = pokemon.sprites.front_default
        pokemonDisplayId.textContent = pokemon.id;
        pokemonName.textContent = pokemon.name;
        let moves = pokemon.moves.slice(0,4);
        for (let index = 0; index < 4; index++) {
            document.querySelector(`#move${index + 1}`).textContent = '';
        }
        moves.map((move, i) => {
            document.querySelector(`#move${i + 1}`).textContent = move.move.name;
        })
        fetchEvolutions();
    })
    .catch(error => alert(error));
};

const fetchEvolutions = () => {
    axios.get(pokemon.species.url)
    .then(speciesdata => {
        axios.get(speciesdata.data.evolution_chain.url)
        .then(data => {
            if(data.data.chain.evolves_to[0].evolves_to[0] !== undefined) { 
            const evolvesTo = data.data.chain.evolves_to[0].evolves_to[0].species.name;
                axios.get(`https://pokeapi.co/api/v2/pokemon/${evolvesTo}`)
                .then(data => {
                    const imgSrc =  document.querySelector('#evolutionImg');
                    imgSrc.src = data.data.sprites.front_default;

                    imgSrc.addEventListener('click', () => fetchPokemons(data.data.name))

                })
            };
            document.querySelector('#evolutionImg').src = '';
        });
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

document.querySelector('#searchValue').addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        let searchValue = document.querySelector('#searchValue').value;
        searchValue == '' ? searchValue = '1' : null;
        pokemonId = searchValue;
        fetchPokemons(pokemonId); 
    };
});


