import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const HomeMain = styled.main`
  margin: 0;
  height: 100vh;
  background-color: #b2bec3;
  position: relative;
`;

const HomePageBody = styled.section`
  width: 1000px;
  background: #a29bfe;
  height: 1000px;
  margin: auto;
`;

class HomePage extends Component {
  render() {
    return (
      <HomeMain>
        {!this.props.store.sign.log ? (
          <Redirect to={`/auth`} />
        ) : (
          <HomePageBody />
        )}
      </HomeMain>
    );
  }
}

export default connect(state => ({
  store: state
}))(HomePage);
