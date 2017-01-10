import React, { Component } from 'react';
import { Link } from 'react-router';
import base from './config';
import './App.css';

class App extends Component {
  constructor () {
    super()
    this.state = {
      topics: []
    }
  }

  componentDidMount () {
    base.fetch('topics', {
      context: this,
      asArray: true,
      then: (data) => {
        this.setState({
          topics: data
        })
      }
    })
    // base.onAuth(this.authStateChanged.bind(this))
  }

// logIn () {
//     base.authWithPassword({
//     email    : this.email.value,
//     password : this.password.value
//   }, authHandler);
// }
//
// authStateChanged (error, user)
//  if()
//
// logOut () {
//   base.unauth()
    //  this.setState ({
    //    user: ""
    //  })
// }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the Fire Forum</h2>
        </div>
        <p className="App-intro">
          Chat Away!
        </p>
        <ul className="chatTopics">
          {this.state.topics.map(topic => {
            return (
               <li key={topic}>
                 <Link to={topic}>{topic}</Link>
              </li>
          )})}
        </ul>
        <form className="logIn">
          <input placeholder="Email" />
          <input placeholder="Password" />
          <button className="log">Log In</button>
          <button className="log">Log Out</button>
        </form>
        {this.props.children}
      </div>
    );
  }
}

export default App;
