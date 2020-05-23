import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPost, editPost } from '../../actions';
import PostForm from './PostForm';

class PostEdit extends Component {
  componentDidMount() {
    if (!this.props.post) {
      this.props.fetchPost(this.props.match.params.id);
    }
  }

  onSubmit = (values) => {
    const { id } = this.props.match.params;
    this.props.editPost(id, values);
  };

  render() {
    return (
      <>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Edit Post</h2>
        <PostForm
          initialValues={this.props.post}
          actionName="Update Post"
          onSubmit={this.onSubmit}
          dismiss="/"
        />
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.match.params;
  return {
    post: state.posts[id]
  };
}

export default connect(mapStateToProps, { fetchPost, editPost })(PostEdit);
