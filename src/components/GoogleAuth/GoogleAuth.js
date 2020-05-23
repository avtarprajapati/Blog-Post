import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignIn) => {
    if (isSignIn) {
      this.props.signIn(this.auth.currentUser.get().getBasicProfile());
    } else {
      this.props.signOut();
    }
  };

  signIn = () => this.auth.signIn();
  signOut = () => this.auth.signOut();

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red button" onClick={() => this.signOut()}>
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui primary button" onClick={() => this.signIn()}>
          Sign In
        </button>
      );
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
