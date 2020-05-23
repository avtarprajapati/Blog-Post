import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import './App.scss';
import Header from './Header/Header';
import { PostCreate, PostDelete, PostEdit, PostList, PostShow } from './Posts';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router history={history}>
          <Header />
          <Switch>
            <Route path="/" exact component={PostList} />
            <Route path="/post/create" exact component={PostCreate} />
            <Route path="/post/delete/:id" exact component={PostDelete} />
            <Route path="/post/edit/:id" exact component={PostEdit} />
            <Route path="/post/:id" exact component={PostShow} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
