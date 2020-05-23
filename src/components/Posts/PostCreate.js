import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPost } from '../../actions';
import PostForm from './PostForm';

class PostCreate extends Component {
  onSubmit = (formValue) => {
    this.props.createPost(formValue);
  };

  render() {
    // if (!this.props.isSignedIn) return <div>Loading...</div>;

    return (
      <>
        <Link to="/" style={{ fontSize: '1rem' }}>
          &larr; Back
        </Link>
        <h1 className="ui header" style={{ marginBottom: '2rem' }}>
          Create Post
        </h1>
        <PostForm
          actionName="Create Post"
          onSubmit={this.onSubmit}
          dismiss="/"
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSignedIn: state.auth.isSignedIn
  };
}

export default connect(mapStateToProps, { createPost })(PostCreate);
