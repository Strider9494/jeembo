import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { actions } from "../../actions";
import { globVars } from "../../globVars";

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

const AuthForm = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  text-align: center;
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
    serverPath: globVars.serverPath
  };

  handleSubmit = () => {
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
    console.log(json);
    json.log ? this.props.signIn() : console.log("log: false");
  };

  handleChange = event => {
    console.log(event.target.id);
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    return (
      <AuthMain>
        <AuthSection>
          <AuthForm>
            <label>
              Login <br />
              <input
                id="login"
                value={this.state.login}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Password <br />
              <input
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
            <br />
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
    signIn: () => {
      dispatch({ type: actions.LOG_IN });
    }
  })
)(SignIn);
