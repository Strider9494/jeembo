import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faSignInAlt, faSignOutAlt);

const StyledHeader = styled.header`
  background: #0984e3;
  position: relative;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Header_Title = styled.h1`
  font-size: 3rem;
  color: #00cec9;
  line-height: 3rem;
  margin: 0 0 0 5vw;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Head_IconConteiner = styled.div`
  font-size: 3rem;
  color: #00cec9;
  margin-right: 5vw;
`;

class Header extends Component {
  render() {
    return (
      <StyledHeader>
        <StyledLink to={``}>
          <Header_Title>JeemBo</Header_Title>
        </StyledLink>

        {!this.props.store.sign_in.log ? (
          <StyledLink to={`/auth`}>
            <Head_IconConteiner>
              <FontAwesomeIcon icon="sign-in-alt" />
            </Head_IconConteiner>
          </StyledLink>
        ) : (
          <Head_IconConteiner>
            <FontAwesomeIcon icon="sign-out-alt" />
          </Head_IconConteiner>
        )}
      </StyledHeader>
    );
  }
}

export default connect(state => ({
  store: state
}))(Header);
