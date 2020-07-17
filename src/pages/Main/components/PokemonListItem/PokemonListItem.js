import React from 'react';
import capitalizeString from "../../../../utils/stringUtils";
import './PokemonListItem.css';

function PokemonListItem({ name, id, spriteUrl, types }) {

    return (
        <li className="pokemonListItem">
            <img className="spriteImage" src={spriteUrl} alt={`${name} sprite`} />
            <div className="pokemonInfo">
                <span className="pokemonName">{capitalizeString(name)}</span>
                <div className="typesList">
                    {types.map(type => (
                        <li className={`${type.type.name}`} key={`${id}${type.type.name}`}>{type.type.name}</li>
                    ))}
                </div>
            </div>
        </li>
    );
}

export default PokemonListItem;