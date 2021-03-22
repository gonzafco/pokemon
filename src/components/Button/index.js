import React from "react";
import "./style.scss";
import "../../../node_modules/nes.css/css/nes.css";
import { Link } from "react-router-dom";

function Button(props) {
  const { difficulty } = props;
  return (
    <Link className="nes-btn main-btn" to={`challenge/${difficulty}`}>
      {difficulty}
    </Link> 
  );
}

export default Button;
