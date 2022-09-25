const form = document.querySelector(".div-form");
const input = document.querySelector("#input-bar");
const cardContainter = document.querySelector(".div-card");

let pokemons = JSON.parse(localStorage.getItem('pokemons')) || [];

const saveLocalStorage = pokemonList => {
    localStorage.setItem('pokemons', JSON.stringify(pokemonList))
};

const searchPokemon = async e => {
    e.preventDefault();

    const searchedPokemon = input.value.trim();
    // consol.log(searchedPokemon);

    if (searchedPokemon === ''){
        alert('Por favor ingresar un Pokemon');
        return;
    }

    // console.log(searchedPokemon);

    const fetchedPokemon = await requestPokemon(searchedPokemon);

    // console.log(fetchedPokemon);

    pokemons = [fetchedPokemon, ... pokemons];
    console.log(pokemons);
};

const init = () => {
    form.addEventListener('submit', searchPokemon);
};

init();

