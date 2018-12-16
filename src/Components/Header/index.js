import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { dispatch } from "rxjs/internal/observable/pairs";
import { actions } from "../../actions";

library.add(faSignInAlt, faSignOutAlt);

const HeaderBackground = styled.header`
  background: #0984e3;
`;

const StyledHeader = styled.div`
  margin: 0 auto;
  width: 1000px;
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

const Head_IconConteiner = styled.button`
  font-size: 3rem;
  color: #00cec9;
  margin-right: 5vw;
  background: 0;
  border: none;
  cursor: pointer;
  text-decoration: none;
  :focus {
    outline: none;
  }
`;

const AvatarContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  height: 50px;
  width: 50px;
  border: 1px solid #81ecec;
  border-radius: 25px;
  background: #81ecec;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  ${props => (props.src ? `background-image:url(${props.src})` : "")};
`;

class Header extends Component {
  render() {
    return (
      <HeaderBackground>
        <StyledHeader>
          <StyledLink to={``}>
            <Header_Title>JeemBo</Header_Title>
          </StyledLink>
          {this.props.store.sign.log ? (
            <AvatarContainer src={this.props.store.sign.user.avatar} />
          ) : (
            ""
          )}
          {!this.props.store.sign.log ? (
            <StyledLink to={`/auth`}>
              <Head_IconConteiner>
                <FontAwesomeIcon icon="sign-in-alt" />
              </Head_IconConteiner>
            </StyledLink>
          ) : (
            <Head_IconConteiner onClick={this.props.signOut}>
              <FontAwesomeIcon icon="sign-out-alt" />
            </Head_IconConteiner>
          )}
        </StyledHeader>
      </HeaderBackground>
    );
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    signOut: () => {
      console.log("click");
      localStorage.removeItem("token");

      dispatch({ type: actions.LOG_OUT });
    }
  })
)(Header);
