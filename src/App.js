import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import SignIn from "./Components/SignIn";
import Registration from "./Components/Registration";
import HomePage from "./Components/HomePage";
import StartPage from "./Components/StartPage";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/" component={Header} />
        <Route exact path="/" component={StartPage} />
        <Route path="/auth" component={SignIn} />
        <Route path="/registration" component={Registration} />
        <Route path="/home" component={HomePage} />
      </React.Fragment>
    );
  }
}

export default App;
