import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSignInAlt,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { dispatch } from "rxjs/internal/observable/pairs";
import { actions, tryLog } from "../../actions";
import { globVars } from "../../globVars";

library.add(faSignInAlt, faSignOutAlt, faSearch);

const HeaderBackground = styled.header`
  background: #0984e3;
`;

const StyledHeader = styled.div`
  margin: 0 auto;
  width: 1200px;
  position: relative;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const HeaderTitle = styled.h1`
  font-size: 3rem;
  color: #00cec9;
  line-height: 3rem;
  margin: 0;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

const HeaderIconConteiner = styled.button`
  font-size: 3rem;
  color: #00cec9;
  background: 0;
  border: none;
  cursor: pointer;
  text-decoration: none;
  :focus {
    outline: none;
  }
`;

const NavBar = styled.nav`
  width: 1000px;
  position: relative;
`;

const SearchBox = styled.div`
  position: absolute;
  top: 50%;
  left: 170px;
  transform: translate(-50%, -50%);
  height: 40px;
  background: #00cec9;
  border-radius: 40px;
`;

const SearchBar = styled.input`
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  transition: 0.4s;
  line-height: 40px;
  font-family: "Raleway", sans-serif;
  font-size: 1rem;
  width: 0;
  :focus {
    width: 240px;
    padding-left: 10px;
  }
  .searchBox:hover & {
    width: 240px;
    padding-left: 10px;
  }
`;

const SearchBtn = styled.button`
  color: #0984e3;
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 40px;
`;

const HeaderAvatar = styled.div`
  position: absolute;
  right: 30px;
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
  state = {
    serverPath: globVars.serverPath
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      const logOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
      this.props.signIn(this.state.serverPath + "/users/auth", logOptions);
    }
  }
  render() {
    return (
      <HeaderBackground>
        <StyledHeader>
          <StyledLink to={``}>
            <HeaderTitle>JeemBo</HeaderTitle>
          </StyledLink>
          {this.props.store.sign.log ? (
            <NavBar>
              <SearchBox className="searchBox">
                <SearchBar type="text" placeholder="Type to search" />
                <SearchBtn>
                  <FontAwesomeIcon icon="search" />
                </SearchBtn>
              </SearchBox>
              <StyledLink to={`/home`}>
                <HeaderAvatar
                  src={
                    this.props.store.sign.user.avatar
                      ? this.props.store.sign.user.avatar
                      : ""
                  }
                />
              </StyledLink>
            </NavBar>
          ) : (
            ""
          )}
          {!this.props.store.sign.log ? (
            <StyledLink to={`/auth`}>
              <HeaderIconConteiner>
                <FontAwesomeIcon icon="sign-in-alt" />
              </HeaderIconConteiner>
            </StyledLink>
          ) : (
            <HeaderIconConteiner onClick={this.props.signOut}>
              <FontAwesomeIcon icon="sign-out-alt" />
            </HeaderIconConteiner>
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
      localStorage.removeItem("token");
      dispatch({ type: actions.LOG_OUT });
    },
    signIn: (path, logOptions) => {
      dispatch(tryLog(path, logOptions));
    }
  })
)(Header);
