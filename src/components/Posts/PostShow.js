import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost } from '../../actions';

import './PostShowStyle.scss';

class PostShow extends Component {
  componentDidMount() {
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  renderAdmin = () => {
    if (this.props.userId === this.props.post.userId) {
      const { id } = this.props.match.params;
      return (
        <div
          className="ui right floated button"
          style={{ backgroundColor: 'unset', padding: '0' }}
        >
          <Link to={`/post/edit/${id}`} className="ui primary button">
            Edit Post
          </Link>
          <Link to={`/post/delete/${id}`} className="ui red button">
            Delete Post
          </Link>
        </div>
      );
    }
  };

  render() {
    if (!this.props.post) return 'Loading...';

    const {
      name,
      date,
      profileImageUrl,
      title,
      category,
      description
    } = this.props.post;

    return (
      <div>
        <Link to="/" style={{ fontSize: '1rem' }}>
          &larr; Back
        </Link>
        <div className="ui clearing " style={{ padding: '2rem 0' }}>
          {this.renderAdmin(this.props.isSignedIn)}
          <h4 className="ui header" style={{ display: 'inline' }}>
            <img
              src={profileImageUrl}
              alt={name}
              className="ui circular image"
            />
            <div className="content">
              {name}
              <div className="sub header">{date}</div>
            </div>
          </h4>
        </div>
        <div>
          <h2 className="ui header">
            {title}
            <div className="sub header" style={{ marginTop: '0.2rem' }}>
              Category:- {category}
            </div>
          </h2>
          <p className="paragraph">{description}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.match.params;
  return {
    post: state.posts[id],
    userId: state.auth.userId
  };
}

export default connect(mapStateToProps, {
  fetchPost
})(PostShow);
