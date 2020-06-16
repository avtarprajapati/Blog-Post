import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import history from '../../history';
import { fetchPosts } from '../../actions';

import './PostList.scss';

class PostList extends Component {
  state = {
    active: 'all'
  };
  componentDidMount() {
    this.props.fetchPosts();
  }

  showNav() {
    if (this.props.isSignedIn) {
      return (
        <div className="ui clearing segment navbar">
          <h3 className="ui right floated header" style={{ margin: 'unset' }}>
            <Link to="/post/create" className="ui primary button">
              Create Post
            </Link>
          </h3>
          <h3 className="ui left floated header">
            <button
              className="navBtn"
              onClick={() => this.setState({ active: 'all' })}
            >
              All Post
            </button>
          </h3>
          <h3 className="ui left floated header">
            <button
              className="navBtn"
              onClick={() => this.setState({ active: 'own' })}
            >
              Your Post
            </button>
          </h3>
        </div>
      );
    }
  }

  reduceDescriptionLength = (description, limit = 100) => {
    let newDesc = [];
    if (description.length >= limit) {
      description.split(' ').reduce((acc, cur) => {
        if (acc + cur.length <= limit) {
          newDesc.push(cur);
        }
        return acc + cur.length;
      }, 0);
      return `${newDesc.join(' ')} ...`;
    }
    return description;
  };

  renderPostsList(posts = this.props.posts) {
    if (!posts.length) return;

    return posts.map((post) => (
      <div key={post.id} className="ui large feed postList">
        <div className="event">
          <div className="label">
            <img
              src={post.profileImageUrl}
              alt={post.name}
              className="profileImg"
            />
          </div>
          <div className="content">
            <div
              className="summary"
              onClick={() => history.push(`/post/${post.id}`)}
              style={{ cursor: 'pointer' }}
            >
              {post.title}
              <div className="date">{post.date}</div>
            </div>
            <div className="extra text">
              {this.reduceDescriptionLength(post.description)}
            </div>
          </div>
        </div>
      </div>
    ));
  }

  renderPost() {
    if (this.props.isSignedIn) {
      if (this.state.active === 'all') {
        return this.renderPostsList(this.props.posts);
      } else {
        return this.renderPostsList(
          this.props.posts.filter((post) => post.userId === this.props.userId)
        );
      }
    }
    return this.renderPostsList(this.props.posts);
  }

  message = () => {
    if (this.props.posts.length === 0)
      return 'Their is no Post to create post please sign in';
    if (!this.props.posts.length) return 'Loading...';
  };

  render() {
    return (
      <>
        <div>{this.showNav()}</div>
        {this.message()}
        {this.renderPost()}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: Object.values(state.posts),
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId
  };
}

export default connect(mapStateToProps, {
  fetchPosts
})(PostList);
