import React, { useEffect, useState } from 'react';
import PokemonListItem from "./components/PokemonListItem/PokemonListItem";
import pokeapi from "../../services/pokeAPI";
import './Main.css';

function Main({ activeGeneration }) {
    const [pokemonsOfGenerationList, setPokemonsOfGenerationList] = useState([]);

    useEffect(() => {
        pokeapi.get('/pokemon/?limit=151').then(response => {
            const { results } = response.data;

            handlePokemonRequests(results);

            // NUNCA MAIS FAZER ISSO:

            // results.map(async (nameAndUrl) => {
            //     const response = await pokeapi.get(`/pokemon/${nameAndUrl.name}`);
            //     const { id, name, types, sprites } = response.data;
            //     const pokemon = { id, name, types, sprites };
            //     console.log(pokemon);
            // });
        });
    }, []);

    useEffect(() => {
        // eslint-disable-next-line default-case
        switch (activeGeneration) {
            case 0:
                pokeapi.get('/pokemon/?limit=151').then(response => {
                    const { results } = response.data;

                    handlePokemonRequests(results);

                    // NUNCA MAIS FAZER ISSO:

                    // results.map(async (nameAndUrl) => {
                    //     const response = await pokeapi.get(`/pokemon/${nameAndUrl.name}`);
                    //     const { id, name, types, sprites } = response.data;
                    //     const pokemon = { id, name, types, sprites };
                    //     console.log(pokemon);
                    // });
                });
                break;

            case 1:
                pokeapi.get('/pokemon/?offset=151&limit=100').then(response => {
                    const { results } = response.data;

                    handlePokemonRequests(results);

                    // NUNCA MAIS FAZER ISSO:

                    // results.map(async (nameAndUrl) => {
                    //     const response = await pokeapi.get(`/pokemon/${nameAndUrl.name}`);
                    //     const { id, name, types, sprites } = response.data;
                    //     const pokemon = { id, name, types, sprites };
                    //     console.log(pokemon);
                    // });
                });
                break;

            case 2:
                pokeapi.get('/pokemon/?offset=251&limit=135').then(response => {
                    const { results } = response.data;

                    handlePokemonRequests(results);

                    // NUNCA MAIS FAZER ISSO:

                    // results.map(async (nameAndUrl) => {
                    //     const response = await pokeapi.get(`/pokemon/${nameAndUrl.name}`);
                    //     const { id, name, types, sprites } = response.data;
                    //     const pokemon = { id, name, types, sprites };
                    //     console.log(pokemon);
                    // });
                });
                break;
            case 3:
                pokeapi.get('/pokemon/?offset=386&limit=108').then(response => {
                    const { results } = response.data;

                    handlePokemonRequests(results);

                    // NUNCA MAIS FAZER ISSO:

                    // results.map(async (nameAndUrl) => {
                    //     const response = await pokeapi.get(`/pokemon/${nameAndUrl.name}`);
                    //     const { id, name, types, sprites } = response.data;
                    //     const pokemon = { id, name, types, sprites };
                    //     console.log(pokemon);
                    // });
                });
                break;
        }
    }, [activeGeneration]);


    async function handlePokemonRequests(results) {
        const pokemonRequisitions = results.map(pokemonNameAndUrl => pokeapi.get(`/pokemon/${pokemonNameAndUrl.name}`));
        const pokemonsValues = await Promise.all(pokemonRequisitions);
        const pokemonsData = pokemonsValues.map(response => response.data);
        const pokemons = pokemonsData.map((pokemonData) => {
            const { order, species, types, sprites } = pokemonData;
            const { name } = species;
            const { front_default } = sprites;
            return { order, name, types, sprites: front_default }
        });

        const pokemonSpecieRequisitions = pokemons.map(({ order }) => pokeapi.get(`/pokemon-species/${order}`));
        const pokemonsSpeciesValues = await Promise.all(pokemonSpecieRequisitions);
        const pokemonsSpeciesData = pokemonsSpeciesValues.map(response => response.data);
        const pokemonsSpecies = pokemonsSpeciesData.map((pokemonSpeciesData) => {
            const { color, flavor_text_entries } = pokemonSpeciesData;
            const { flavor_text } = flavor_text_entries[0];
            return { color: color.name, description: flavor_text };
        });

        const pokemonCompleteData = pokemons.map((pokemon, index) => ({ ...pokemon, ...pokemonsSpecies[index] }));
        setPokemonsOfGenerationList(pokemonCompleteData);
    }





    return (
        <>
            <div className='pokemonsList'>
                {pokemonsOfGenerationList.map(pokemon => {
                    return <PokemonListItem key={pokemon.order} id={pokemon.order} name={pokemon.name} spriteUrl={pokemon.sprites} types={pokemon.types} />
                })}
            </div>
        </>
    );
}

export default Main;