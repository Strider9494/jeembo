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
  width: 1200px;
  background: #a29bfe;
  height: 100vh;
  margin: auto;
  display: flex;
`;

const SideBar = styled.section`
  width: 300px;
  background: blue;
  height: 100vh;
`;

const MainSection = styled.section`
  width: 900px;
  background: #a29bfe;
  height: 100vh;
`;

class HomePage extends Component {
  render() {
    return (
      <HomeMain>
        {!this.props.store.sign.log ? (
          <Redirect to={`/auth`} />
        ) : (
          <HomePageBody>
            <SideBar />
            <MainSection />
          </HomePageBody>
        )}
      </HomeMain>
    );
  }
}

export default connect(state => ({
  store: state
}))(HomePage);
