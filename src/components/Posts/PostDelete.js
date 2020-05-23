import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../../actions';
import history from '../../history';
import Modal from '../Modal';

class PostDelete extends Component {
  componentDidMount() {
    if (!this.props.post) {
      this.props.fetchPost(this.props.match.params.id);
    }
  }

  renderActions = () => {
    return (
      <>
        <button
          onClick={() => this.props.deletePost(this.props.post.id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to={`/post/${this.props.post.id}`} className="ui button ">
          Cancel
        </Link>
      </>
    );
  };

  renderContent() {
    if (!this.props.post) return 'Are you sure want to delete this post ?';
    return `Are you sure want to delete this post with title: ${this.props.post.title}`;
  }

  render() {
    return (
      <Modal
        title="Delete Post"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostDelete);
