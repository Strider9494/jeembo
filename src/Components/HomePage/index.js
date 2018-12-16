import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { dispatch } from "rxjs/internal/observable/pairs";

const HomeMain = styled.main`
  margin: 0;
  height: 100vh;
  background-color: #b2bec3;
  position: relative;
`;

const Welcome = styled.h2`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

class HomePage extends Component {
  render() {
    return (
      <HomeMain>
        {this.props.store.sign.log ? (
          <Welcome>Welcome back {this.props.store.sign.user.name}!</Welcome>
        ) : (
          <Redirect to={`/auth`} />
        )}
      </HomeMain>
    );
  }
}

export default connect(state => ({
  store: state
}))(HomePage);
