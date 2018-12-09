import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthMain, SubButton, ButtonCont } from "../SignIn";
import { globVars } from "../../globVars";

const AuthSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormTitle = styled.h2`
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  margin-bottom: 10px;
`;

const AuthForm = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const AuthInput = styled.input`
  background: #dcdde1;
  border: solid 1px #00a8ff;
  padding: 5px;
  height: 1.5em;
  font-size: 1.2em;
  font-family: "Cairo", sans-serif;
`;

const WarningContainer = styled.div`
  height: 2em;
  color: #e84118;
  font-size: 1.2em;
`;

const WarningMessage = styled.span`
  ${props => (!props.visable ? "display: none" : "")};
`;

export default class Registration extends Component {
  state = {
    form: {
      login: "",
      email: "",
      password1: "",
      password2: ""
    },
    serverPath: globVars.serverPath,
    loginInvalid: false,
    emailInvalid: false,
    password1Invalid: false,
    password2Invalid: false,
    passwordsNotSame: false,
    shema: {
      login: /^[a-zA-Z0-9_-]{4,12}$/,
      email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
      password1: /^[a-zA-Z0-9]{4,12}$/,
      password2: /^[a-zA-Z0-9]{4,12}$/
    }
  };

  handleChange = event => {
    console.log(event.target.id);
    this.setState({
      form: { ...this.state.form, [event.target.id]: event.target.value }
    });
  };

  hanldeValid = event => {
    switch (event.target.id) {
      case "password2" || "password1":
        if (this.state.form.password1 !== this.state.form.password2) {
          this.setState({
            passwordsNotSame: true
          });
          return;
        } else {
          this.setState({
            passwordsNotSame: false
          });
          break;
        }
        defalult: if (
          !this.state.shema[event.target.id].test(
            this.state.form[event.target.id]
          )
        ) {
          return this.setState({
            [`${event.target.id}Invalid`]: true
          });
        } else {
          return this.setState({
            [`${event.target.id}Invalid`]: false
          });
        }
    }
  };

  validForm = () => {
    let valid = true;
    for (let prop in this.state.form) {
      if (!this.state.shema[prop].test(this.state.form[prop])) {
        valid = false;
        this.setState({
          [`${prop}Invalid`]: true
        });
      }
    }

    if (valid) {
      return;
    } else {
      this.setState({
        form: { ...this.state.form, password1: "", password2: "" }
      });
    }
  };

  sendForm = async () => {
    const regOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.form.login,
        email: this.state.form.email,
        password: this.state.form.password1
      })
    };

    fetch(this.state.serverPath + "/users/reg", regOptions)
      .then(this.onResponse)
      .catch(reason => console.log(reason));
  };

  onResponse = async response => {
    const json = await response.json();
    console.log(json);
  };

  handleReg = async event => {
    if (!this.validForm()) return;
    this.sendForm();
  };

  render() {
    return (
      <AuthMain>
        <AuthSection>
          <FormTitle>Create an account</FormTitle>
          <AuthForm>
            <WarningContainer>
              <WarningMessage
                visable={this.state.loginInvalid || this.state.password1Invalid}
              >
                Invalid login or password!
              </WarningMessage>
            </WarningContainer>
            <AuthInput
              id="login"
              value={this.state.form.login}
              onChange={this.handleChange}
              onBlur={this.hanldeValid}
              placeholder="Login"
            />
            <WarningContainer>
              <WarningMessage visable={this.state.emailInvalid}>
                Invalid email!
              </WarningMessage>
            </WarningContainer>
            <AuthInput
              type="email"
              id="email"
              value={this.state.form.email}
              onChange={this.handleChange}
              onBlur={this.hanldeValid}
              placeholder="Email"
            />
            <WarningContainer>
              <WarningMessage visable={this.state.password1Invalid}>
                Invalid password!
              </WarningMessage>
            </WarningContainer>
            <AuthInput
              id="password1"
              type="password"
              value={this.state.form.password1}
              onChange={this.handleChange}
              onBlur={this.hanldeValid}
              placeholder="Password"
            />
            <WarningContainer>
              <WarningMessage
                visable={
                  this.state.password2Invalid || this.state.passwordsNotSame
                }
              >
                {(this.state.passwordsNotSame && "Passwords not the same!") ||
                  (this.state.password2Invalid && "Invalid password!")}
              </WarningMessage>
            </WarningContainer>

            <AuthInput
              id="password2"
              type="password"
              value={this.state.form.password2}
              onChange={this.handleChange}
              onBlur={this.hanldeValid}
              placeholder="Repeat your password"
            />
            <ButtonCont>
              <SubButton type="button" onClick={this.handleReg}>
                Registration
              </SubButton>
              <SubButton type="button">Back</SubButton>
            </ButtonCont>
          </AuthForm>
        </AuthSection>
      </AuthMain>
    );
  }
}
