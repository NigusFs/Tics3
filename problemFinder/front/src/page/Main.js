import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../page/Home";
import ListProblems from "../page/ListProblems";
import About from "../page/About";
import Problem from "../page/Problem";
import ListFilterDif from "../page/ListFilterDif";
import NavBarr from "../components/Navbar";
import Login from "../page/Login";
// import Profile from "../page/Profile";
import Demonio from "../page/Demonio";
import { Route, Switch } from "react-router-dom";

function Main() {
  return (
    <div>
      <NavBarr />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/list-problems" component={ListProblems} />
        <Route path="/about" component={About} />
        <Route path="/problem/:Id" component={Problem} />
        <Route path="/login" component={Login} />
        <Route path="/demonio" component={Demonio} />
        <Route
          exact
          path="/list-filter/difficulty/:difficulty"
          component={ListFilterDif}
        />
      </Switch>
    </div>
  );
}

export default Main;
