import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import SignIn from "./Components/SignIn";
import Registration from "./Components/Registration";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/" component={Header} />
        <Route path="/auth" component={SignIn} />
        <Route path="/registration" component={Registration} />
      </React.Fragment>
    );
  }
}

export default App;
