import React from "react";
import "./style.scss";
import "../../../node_modules/nes.css/css/nes.css";

function PokemonOptions(props) {
  const { pokemonList } = props;
  function handleClick(e) {
    const pokemonSelected = e.target.textContent;
    props.pokemonSelected(pokemonSelected);
  }

  console.log(pokemonList);
  return (
    <ul>
      {pokemonList.map((pokemon, key) => (
        <li key={pokemon} onClick={(e) => handleClick(e)}>
          {pokemon}
        </li>
      ))}
    </ul>
  );
}

export default PokemonOptions;
