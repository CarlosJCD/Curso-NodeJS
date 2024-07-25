const {httpClientPlugin} = require("../plugins/http-client.plugin")


const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon"

const getPokemonById = async ( pokemonId) => {
    const pokemonSearchUrl = `${POKEMON_API_URL}/${pokemonId}`

    const pokemonInfo = await httpClientPlugin.get(pokemonSearchUrl);

    return await pokemonInfo.name
}

module.exports = getPokemonById