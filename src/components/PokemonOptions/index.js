import React from "react";
import "./style.scss";
import "../../../node_modules/nes.css/css/nes.css";

function PokemonOptions(props) {
  const { pokemonList } = props;
  function handleClick(e) {
    const pokemonSelected = e.target.textContent;
    props.pokemonSelected(pokemonSelected);
  }

  return (
    <ul>
      {pokemonList.map((pokemon, key) => (
        <li key={pokemon} onClick={e => handleClick(e)} key={key}>
          {pokemon.name}
        </li>
      ))}
    </ul>
  );
}

export default PokemonOptions;
