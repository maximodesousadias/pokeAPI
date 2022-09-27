const form = document.querySelector(".div-form");
const input = document.querySelector("#input-bar");
const cardContainer = document.querySelector("#card");
const errorContainer = document.querySelector("#error");

let pokemons = JSON.parse(localStorage.getItem('pokemons')) || [];

const saveLocalStorage = pokemonList => {
    localStorage.setItem('pokemons', JSON.stringify(pokemonList));
};

const divideByTen = number => {
    let newNumber = number/10;
    return newNumber;
}

const relation = (height, weight) => {
    let num = height/weight;
    let relation = Math.round((num + Number.EPSILON) * 100) / 100;
    
    return relation;
};

const renderCard = pokemon => {

    const tipos = pokemon.types;

    // const matchTipo = pokemonTypes.filter(i => i == cardContainer.classList.item[0]);

    // cardContainer.classList.remove(matchTipo);

    const tipo = tipos.map(i => `<li class="item-type">${i.type.name}</li>`).join("")
    
    return `
        <h3 id="name-pokemon">${pokemon.name}</h3>
        <h3 id="health-pokemon">${pokemon.stats[0].base_stat} HP</h3>
        <div id="div-pic">
        <img id="pic-pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
        </div>
        <ul id="list-types">
        <b>Tipos:</b>
        ${tipo}
        </ul>
        <div class= "div-weight">
        <h4>Peso</h4>
        <p>${divideByTen(pokemon.weight)} hg.</p>
        </div>
        <div class="div-height">
        <h4>Altura</h4>
        <p>${divideByTen(pokemon.height)} hm.</p>
        </div>
        <div class="div-relation">
        <h4>Relacion</h4>
        <p>${relation(pokemon.height,pokemon.weight)}</p>
        </div>`;

};

const searchPokemon = async e => {
    e.preventDefault();

    const searchedPokemon = input.value.trim().toLowerCase();
    // consol.log(searchedPokemon);

    if (searchedPokemon === ''){
        alert('Por favor ingresar un Pokemon');
        return;
    };

    const fetchedPokemon = await requestPokemon(searchedPokemon);
    
    if (parseInt(searchedPokemon) > await lastId()) {
        // cardContainer.classList.remove("grid");
        cardContainer.classList.add("hide");
        // errorContainer.classList.add('error');
        errorContainer.classList.remove('hide');
        errorContainer.innerHTML = `
        <h3>Ingresar un ID menor a ${await lastId()}</h3>
        <img id="img-error" src="./img/whois2.png" alt="">
        `;
    } else {

        // errorContainer.classList.remove('error');
        errorContainer.classList.add('hide');
        const pokemonName = await fetchedPokemon.name;
        const pokemonType = await fetchedPokemon.types[0].type.name;

        pokemons = [{ name: pokemonName, type: pokemonType } , ...pokemons];

        saveLocalStorage(pokemons);

        const typesList = cardContainer.classList;
        while (typesList.length > 0) {
            typesList.remove(typesList.item(0));
        }

        cardContainer.classList.add(fetchedPokemon.types[0].type.name);
        cardContainer.classList.add("grid");
        cardContainer.innerHTML = renderCard(fetchedPokemon);
    }

};

const init = () => {
    form.addEventListener('submit', searchPokemon);
};

init();
