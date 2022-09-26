//Link sad

const requestPokemon = async (pokemon) => {
    
    try{
        const baseURL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

        const res = await fetch(baseURL);
        const data = await res.json();
        // console.log(data);

        return data;
    } catch (error){
        
        console.log(`ERROR: Revisar ${error}`);
    }

};
