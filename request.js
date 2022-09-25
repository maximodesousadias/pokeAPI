//Link sad

const requestPokemon = async (pokemon) => {
    const baseURL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    const res = await fetch(baseURL);
    const data = await res.json();
    // console.log(data);

    return data;
    
}

requestPokemon(3);
//  TODO:Ver de Hacer tal cosa.
