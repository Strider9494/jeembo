import React, { Component } from "react";
import styled from "styled-components";

import react_icon from "../../images/Tecs/1200px-React-icon.svg.png";
import redux_icon from "../../images/Tecs/redux-icon.png";
import react_router_icon from "../../images/Tecs/react-router-icon.png";
import styled_icon from "../../images/Tecs/styled-icon.png";
import node_icon from "../../images/Tecs/node-icon.png";
import express_icon from "../../images/Tecs/Expressjs-icon.png";
import mongo_icon from "../../images/Tecs/Mongo-db-logo.png";
import mongoose_icon from "../../images/Tecs/mongoose-icon.jpg";

const StartPageMain = styled.main`
  margin: 0;
  height: 100vh;
  background-color: #b2bec3;
  position: relative;
  padding-top: 30px;
  text-align: center;
`;

const Welcome = styled.h1`
  color: #2d3436;
  margin-top: 0;
  margin-bottom: 10px;
`;

const TecSection = styled.section`
  margin: auto;
  width: 1000px;
  display: flex;
  flex-direction: column;
`;

const TecSectionTitle = styled.h2`
  color: #2d3436;
  margin: 10px 0;
`;

const TecSectionSubTitle = styled.h3`
  color: #2d3436;
`;

const TecStack = styled.div`
  display: flex;
  justify-content: space-around;
`;

const TecIcon = styled.img`
  height: 100px;
  background: ${props => props.background || "white"}
  border: solid 2px #00cec9;
  transition: 0.2s;
  :hover {
    transform: scale(1.2);
  }
`;

export default class StartPage extends Component {
  render() {
    return (
      <StartPageMain>
        <Welcome>Welcome to JeemBo app!</Welcome>
        <TecSection>
          <TecSectionTitle>Built with:</TecSectionTitle>
          <TecSectionSubTitle>Front-End:</TecSectionSubTitle>
          <TecStack>
            <a href="https://reactjs.org/" target="blank">
              <TecIcon src={react_icon} background="#2d3436" />
            </a>
            <a href="https://redux.js.org/" target="blank">
              <TecIcon src={redux_icon} />
            </a>
            <a href="https://reacttraining.com/react-router/" target="blank">
              <TecIcon src={react_router_icon} />
            </a>
            <a href="https://www.styled-components.com/" target="blank">
              <TecIcon
                src={styled_icon}
                background="linear-gradient(#fdcb6e, #fd79a8);"
              />
            </a>
          </TecStack>
          <TecSectionSubTitle>Back-End:</TecSectionSubTitle>
          <TecStack>
            <a href="https://nodejs.org/en/" target="blank">
              <TecIcon src={node_icon} background="#2d3436" />
            </a>
            <a href="https://expressjs.com/" target="blank">
              <TecIcon src={express_icon} />
            </a>
            <a href="https://www.mongodb.com/" target="blank">
              <TecIcon src={mongo_icon} />
            </a>
            <a href="https://mongoosejs.com/" target="blank">
              <TecIcon src={mongoose_icon} />
            </a>
          </TecStack>
        </TecSection>
      </StartPageMain>
    );
  }
}
