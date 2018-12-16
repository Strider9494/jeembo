import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import history from "../../history";

import { actions } from "../../actions";
import { globVars } from "../../globVars";
import {
  AuthInput,
  WarningContainer,
  WarningMessage,
  AuthForm,
  FormTitle
} from "../Registration";

export const AuthMain = styled.main`
  margin: 0;
  height: 100vh;
  background-color: #b2bec3;
  padding-top: 5vh;
`;

const AuthSection = styled.section`
  display: flex;
  justify-content: center;
`;

export const ButtonCont = styled.div`
  margin-top: 20px;
`;

export const SubButton = styled.button`
  border: 1px solid #0984e3;
  color: #0984e3;
  background: none;
  padding: 10px 10px;
  margin: 10px;
  font-family: "Raleway", sans-serif;
  font-size: 1.2em;
  cursor: pointer;
  transition: 0.4s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  :hover {
    color: #b2bec3;
  }
  ::before {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 0%;
    background: #0984e3;
    transition: 0.4s;
    bottom: 0;
    border-radius: 50% 50% 0 0;
    z-index: -1;
  }
  :hover::before {
    height: 180%;
  }
`;

class SignIn extends Component {
  state = {
    login: "",
    password: "",
    serverPath: globVars.serverPath,
    invalidForm: false,
    invalid: false,
    shema: {
      login: /^[a-zA-Z0-9_-]{4,12}$/,
      password: /^[a-zA-Z0-9]{4,12}$/
    }
  };

  handleSubmit = () => {
    if (
      !this.state.shema.login.test(this.state.login) ||
      !this.state.shema.password.test(this.state.password)
    ) {
      return this.setState({
        invalidForm: true
      });
    } else {
      this.setState({
        invalidForm: false
      });
    }
    const logOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.login,
        password: this.state.password
      })
    };

    fetch(this.state.serverPath + "/users/log", logOptions)
      .then(this.onResponse)
      .catch(reason => console.log(reason));
  };

  onResponse = async response => {
    const json = await response.json();
    json.log ? this.props.signIn(json) : this.failSign(response.status);
  };

  failSign = status => {
    if (status === 403) {
      this.setState({
        invalid: true
      });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  enterForm = event => {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  };

  render() {
    return (
      <AuthMain>
        <AuthSection>
          <AuthForm>
            <FormTitle>Sign in</FormTitle>
            <WarningContainer>
              <WarningMessage visable={this.state.invalid}>
                Invalid login or password!
              </WarningMessage>
              <WarningMessage visable={this.state.invalidForm}>
                Invalid length of login or password!
              </WarningMessage>
            </WarningContainer>
            <AuthInput
              id="login"
              value={this.state.login}
              onChange={this.handleChange}
              placeholder="Login"
            />
            <WarningContainer />
            <AuthInput
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              onKeyDown={this.enterForm}
              placeholder="Password"
            />
            <ButtonCont>
              <SubButton type="button" onClick={this.handleSubmit}>
                Login
              </SubButton>
              <Link to={`/registration`}>
                <SubButton type="button">Registration</SubButton>
              </Link>
            </ButtonCont>
          </AuthForm>
        </AuthSection>
      </AuthMain>
    );
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    signIn: json => {
      localStorage.setItem("token", json.token);
      dispatch({ type: actions.LOG_IN, payload: json.user });
      history.push("/home");
    }
  })
)(SignIn);
