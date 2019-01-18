import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { getPosts, deletePost } from "../../actions";

import { globVars } from "../../globVars";
import PostList from "../PostList";
import NewPost from "../NewPost";

const HomeMain = styled.main`
  margin: 0;
  height: 105vh;
  background-color: #b2bec3;
  position: relative;
`;

const HomePageBody = styled.section`
  width: 1200px;
  height: 100vh;
  margin: auto;
  display: flex;
`;

const SideBar = styled.section`
  width: 280px;
  height: 100vh;
  padding: 25px;
`;

const MainSection = styled.section`
  width: 900px;
  height: 100vh;
  padding: 25px;
`;

const AvatarConteiner = styled.div`
  background: #dfe6e9;
  padding: 15px;
  border: 1px solid #00cec9;
  box-shadow: 0 0 10px #0984e3;
`;

const Avatar = styled.img`
  width: 250px;
`;

class HomePage extends Component {
  state = {
    serverPath: globVars.serverPath
  };

  deletePost = postId => {
    console.log(postId);
    if (this.props.store.sign.user.name) {
      const token = localStorage.getItem("token");
      const options = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          user: this.props.store.sign.user.name,
          postId: postId
        }
      };
      this.props.deletePost(this.state.serverPath + "/users/posts", options);
      this.getPosts();
    } else {
      return;
    }
  };

  componentDidMount = () => {
    this.getPosts();
  };
  getPosts = () => {
    if (this.props.store.sign.user.name) {
      const token = localStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          user: this.props.store.sign.user.name
        }
      };
      this.props.fetchPosts(this.state.serverPath + "/users/posts", options);
    } else {
      return;
    }
  };
  render() {
    return (
      <HomeMain>
        {!this.props.store.sign.log ? (
          <Redirect to={`/auth`} />
        ) : (
          <HomePageBody>
            <SideBar>
              <AvatarConteiner>
                <Avatar src={this.props.store.sign.user.avatar} />
              </AvatarConteiner>
            </SideBar>
            <MainSection>
              <NewPost getPosts={this.getPosts} />
              {this.props.store.posts.posts !== [] ? (
                <PostList
                  posts={this.props.store.posts.posts}
                  deletePost={this.deletePost}
                />
              ) : (
                ""
              )}
            </MainSection>
          </HomePageBody>
        )}
      </HomeMain>
    );
  }
}
export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    fetchPosts: (path, options) => {
      dispatch(getPosts(path, options));
    },
    deletePost: (path, options) => {
      dispatch(deletePost(path, options));
    }
  })
)(HomePage);
