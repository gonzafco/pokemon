import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Challenge from "./pages/Challenge";
import Home from "./pages/Home";
import Score from "./pages/Score";

ReactDOM.render(
  <Router>
    <Route exact path="/" component={Home} />
    <Route exact path="/challenge/:difficulty" component={Challenge} />
    <Route exact path="/score/:score" component={Score} />
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();