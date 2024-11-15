import {httpClientPlugin} from "../plugins/http-client.plugin";


const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon"

export const getPokemonById = async ( pokemonId: string| number): Promise<string > => {
    try{
        const pokemonSearchUrl = `${POKEMON_API_URL}/${pokemonId}`
        const pokemonInfo = await httpClientPlugin.get(pokemonSearchUrl);
        return await pokemonInfo.name
    } catch (error) {
        throw `Pokemon not found with id ${ pokemonId }`;
    }
}