import React from 'react';
import capitalizeString from "../../../../utils/stringUtils";
import './PokemonListItem.css';

function PokemonListItem({ name, id, spriteUrl, types, pokemonColor }) {

    return (
        <li className="pokemonListItem">
            <img src={spriteUrl} alt={`${name} sprite`} />
            <span>{capitalizeString(name)}</span>
            <ul>
                {types.map(type => (
                    <li key={`${id}${type.type.name}`}>{type.type.name}</li>
                ))}
            </ul>
        </li>
    );
}

export default PokemonListItem;