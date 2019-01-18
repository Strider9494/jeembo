import React from "react";
import styled from "styled-components";

const SearchConteiner = styled.div`
  position: absolute;
  top: 60px;
  left: 35px;
  height: 80px;
  width: 265px;
  background: #b2bec3;
  border: 3px solid #81ecec;
  border-radius: 5px;
  display: flex;
  align-items: center;
  z-index: 2;
`;

const SearcUserAvatar = styled.div`
  height: 60px;
  width: 60px;
  border: 2px solid #0984e3;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  ${props => (props.src ? `background-image:url(${props.src})` : "")};
`;

const SearchUserName = styled.p``;

export default function SearchUser(props) {
  return (
    <SearchConteiner>
      <SearcUserAvatar src={props.user.avatar} />
      <SearchUserName>{props.user.name}</SearchUserName>
    </SearchConteiner>
  );
}
