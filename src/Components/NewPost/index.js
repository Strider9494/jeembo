import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { PostContainer } from "../Post";
import { globVars } from "../../globVars";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { dispatch } from "rxjs/internal/observable/range";

library.add(faPlus);

const PostHeader = styled.div`
  border-bottom: 1px solid #0984e3;
  padding-bottom: 5px;
  margin-bottom: 5px;
`;

const PostBody = styled.div`
  position: relative;
`;

const PostInput = styled.input`
  width: 90%;
  font-size: 1em;
  line-height: 1.2em;
  padding: 5px;
  border: 2px solid #74b9ff;
  border-radius: 5px;
  ::placeholder {
    color: #636e72;
    font-family: "Raleway", sans-serif;
  }
  :focus {
    border-color: #0984e3;
    outline: none;
  }
`;

const PostBodyInput = styled.div`
  width: 90%;
  height: 60px;
  font-size: 1em;
  line-height: 1.2em;
  padding: 5px;
  border: 2px solid #74b9ff;
  border-radius: 5px;
  background: white;
  :empty:before {
    color: #636e72;
    content: attr(data-placeholder);
  }
  :focus {
    border-color: #0984e3;
    outline: none;
  }
`;

const AddPostButton = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  font-size: 15px;
  color: #0984e3;
  border-radius: 15px;
  border: 2px solid #74b9ff;
  right: 5px;
  bottom: 0px;
  cursor: pointer;
  :focus {
    border-color: #0984e3;
    outline: none;
  }
`;

class NewPost extends Component {
  state = {
    serverPath: globVars.serverPath,
    title: "",
    body: ""
  };
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
        ? event.target.value
        : event.target.innerText
    });
  };
  addNewPost = async () => {
    const token = localStorage.getItem("token");
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body
      })
    };
    this.setState({
      title: "",
      body: ""
    });
    document.querySelector(".PostBodyInput").innerText = "";
    await fetch(this.state.serverPath + "/users/posts", options)
      .then(response => response.json(), err => console.log(err))
      .catch(err => console.error(err));
    this.props.getPosts();
  };

  render() {
    return (
      <PostContainer>
        <PostHeader>
          <PostInput
            id="title"
            placeholder="Type post title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </PostHeader>
        <PostBody>
          <PostBodyInput
            className="PostBodyInput"
            id="body"
            contentEditable="true"
            data-placeholder="Type post"
            onInput={this.handleChange}
          />
          <AddPostButton onClick={this.addNewPost}>
            <FontAwesomeIcon icon="plus" />
          </AddPostButton>
        </PostBody>
      </PostContainer>
    );
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({})
)(NewPost);
