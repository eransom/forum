import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import Topic from './Topic';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <Route path="/:topic" component={Topic} />
    </Route>
  </Router>,
    document.getElementById('root')
);
