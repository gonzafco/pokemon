import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styles from "./Challenge.module.scss";
import "./style.scss";
import "../../../node_modules/nes.css/css/nes.css";
import PokemonOptions from "../../components/PokemonOptions";

const axios = require("axios");

function Challenge() {
  const params = {
    easy: {
      renderButton: false,
      renderInput: false,
      renderList: true,
      helpQty: 2,
    },
    medium: {
      renderButton: false,
      renderInput: false,
      renderList: true,
      helpQty: 5,
    },
    hard: {
      renderButton: true,
      renderInput: true,
      renderList: false,
      helpQty: 0,
    },
  };
  const { difficulty } = useParams();
  const history = useHistory();
  const [pokemonData, setPokemonData] = useState({
    pokemon_name: "",
    pokemon_img: "",
  });

  const [pokemonHelp, setPokemonHelp] = useState([]);

  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);

  const [input, setInput] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(false);

  function getRandomPokemon() {
    let n = Math.floor(Math.random() * 100);
    return n;
  }

  async function fetchData(id) {
    const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemons = pokeData.data;
    setPokemonData({
      pokemon_name: pokemons.name,
      pokemon_img: pokemons.sprites.other.dream_world.front_default,
    });
    setPokemonHelp([pokemons.name]);

    //Este codigo queriamos reutilizar pero tuvimos muchos problemas de promises a resolver a futuro
  }

  async function getHelpList(qtyHelp) {
    for (let index = 0; index < qtyHelp; index++) {
      let pokeData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${getRandomPokemon()}`
      );
      let pokemons = pokeData.data.name;
      setPokemonHelp((pokemonHelp) => [...pokemonHelp, pokemons]);
    }
  }

  useEffect(() => {
    fetchData(getRandomPokemon());
    if (difficulty != "hard") {
      getHelpList(params[difficulty].helpQty);
    }
  }, []);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleClick(pokemonSelected) {
    checkAnswer(pokemonSelected);
    setCounter((prevStatus) => prevStatus + 1);
    setTimeout(() => {
      nextPokemon();
      setInput("");
    }, 3000);
  }

  function checkAnswer(answer) {
    if (answer == pokemonData.pokemon_name) {
      setScore((prevStatus) => prevStatus + 1);
      setCorrectAnswer(true);
    }
  }

  function nextPokemon() {
    setCorrectAnswer(false);
    fetchData(getRandomPokemon());
  }

  function revealPokemon() {}

  if (counter === 10) {
    history.push(`/score/${score}`);
  }

  function handleCallBack(pokemonSelected) {
    handleClick(pokemonSelected);
  }

  return (
    <div className={styles.container}>
      <p>
        Respuestas correctas: {score}/{counter}
      </p>
      <img
        className={`${correctAnswer ? `knownPokemon` : `unknownPokemon`} ${
          styles.pokeimg
        }`}
        src={pokemonData.pokemon_img}
      />

      {params[difficulty].renderList && (
        <PokemonOptions
          pokemonList={pokemonHelp}
          pokemonSelected={(pokemonSelected) => handleCallBack(pokemonSelected)}
        />
      )}

      {params[difficulty].renderInput && (
        <input
          type="text"
          className="nes-input"
          onChange={handleChange}
          value={input}
        />
      )}

      {params[difficulty].renderButton && (
        <button className="nes-btn main-btn" onClick={handleClick}>
          Enviar
        </button>
      )}
      {correctAnswer && <p>respuesta correcta</p>}
    </div>
  );
}

export default Challenge;
