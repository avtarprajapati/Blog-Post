import React, { Component } from 'react';

// import Nav from './Nav';
import './HeaderStyle.scss';
import GoogleAuth from '../GoogleAuth/GoogleAuth';

class Header extends Component {
  render() {
    return (
      <div className="ui clearing segment head">
        <h3 className="ui right floated header signbtn">
          <GoogleAuth />
        </h3>
        <h3 className="ui left floated header">Blog Post</h3>
      </div>
    );
  }
}

export default Header;
