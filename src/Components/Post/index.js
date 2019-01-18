import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

export const PostContainer = styled.section`
  background: #dfe6e9;
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #00cec9;
  box-shadow: 0 0 10px #0984e3;
  font-family: "Raleway", sans-serif;
`;

const PostHeader = styled.div`
  border-bottom: 1px solid #0984e3;
`;

const PostTitle = styled.h3`
  margin: 0;
  font-weight: normal;
`;

const DeleteButton = styled.button``;

export default function Post({ post, deletePost }) {
  return (
    <PostContainer>
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
      </PostHeader>
      <p>{post.body}</p>
      <DeleteButton onClick={deletePost}>Delete</DeleteButton>
    </PostContainer>
  );
}
