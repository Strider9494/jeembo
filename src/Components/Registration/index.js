import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthMain, SubButton, ButtonCont } from "../SignIn";

const AuthSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AuthForm = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export default class Registration extends Component {
  state = {
    email: "",
    login: "",
    password1: "",
    password2: ""
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
          <h2>Create an account</h2>
          <AuthForm onSubmit={this.handleSubmit}>
            <input
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
            />
            <input
              id="login"
              value={this.state.login}
              onChange={this.handleChange}
              placeholder="Login"
            />
            <input
              id="password1"
              type="password"
              value={this.state.password1}
              onChange={this.handleChange}
              placeholder="Password"
            />
            <input
              id="password2"
              type="password"
              value={this.state.password2}
              onChange={this.handleChange}
              placeholder="Repeat your password"
            />
            <ButtonCont>
              <SubButton type="submit">Registration</SubButton>
              <Link to={`/registration`}>
                <SubButton type="button">Back</SubButton>
              </Link>
            </ButtonCont>
          </AuthForm>
        </AuthSection>
      </AuthMain>
    );
  }
}
