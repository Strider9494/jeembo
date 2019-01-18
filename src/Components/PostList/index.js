import React, { Component } from "react";
import styled from "styled-components";
import Post from "../Post";

const PostModule = styled.li`
  list-style: none;
`;

const PostUl = styled.ul`
  padding: 0;
`;

export default class PostList extends Component {
  deletePost = postId => {
    console.log(postId);
    this.props.deletePost(postId);
  };
  render() {
    const postElements = this.props.posts.map(post => (
      <PostModule>
        <Post post={post} deletePost={this.deletePost.bind(this, post._id)} />
      </PostModule>
    ));
    return <PostUl>{postElements}</PostUl>;
  }
}
