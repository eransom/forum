import React, { Component } from 'react';
import base from './config'

class Topic extends Component {
  constructor () {
    super()
    this.state = {
      topic: "",
      users: []
    }
    // this.renderButtons = this.renderButtons.bind(this)
  }

  componentDidMount () {
    base.fetch(`${this.props.params.topic}/topic`, {
      context: this,
      then: (data) => {
        this.setState({
          topic: data
        })
      }
    })
    this.sync = base.syncState(`${this.props.params.topic}/users`, {
      state: 'users',
      context: this,
      asArray: true
    })
  }

  componentWillReceiveProps (nextProps) {
    base.fetch(`${nextProps.params.topic}/topic`, {
      context: this,
      then: (data) => {
        this.setState({
          topic: data
        })
      }
    })
    base.removeBinding(this.sync)
    this.sync = base.syncState(`${nextProps.params.topic}/users`, {
      state: 'users',
      context: this,
      asArray: true
    })
  }

  signUp () {
    var password = this.password.value
    if(password.length<6) {
      alert('Password must be 6 or more characters')
    } else {
      base.createUser({
        email: this.email.value,
        password: this.password.value
      },this.authStateChanged.bind(this))
    }
    this.email.value = ""
    this.password.value = ""
  }

  signIn(){
    base.authWithPassword({
      email: this.email.value,
      password: this.password.value
    },this.authStateChanged.bind(this))
    this.email.value = ""
    this.password.value = ""
  }

  signOut(){
    base.unauth()
    this.setState({
      users: ""
    })
  }

  authStateChanged (error, user){
    if(error) {
      alert('wrong password')
    } else {
      console.log(user)
        this.setState({
          user: user.email
        })
    }
  }

  addUser (event) {
    event.preventDefault()
    let newUser = {
      message: this.message.value
    }
    let newUserArray = this.state.users.concat(newUser)
    this.setState ({
      users: newUserArray
    })
    this.message.value = ""
  }

  // deletePost (clickedPost) {
  //   var newRoom = this.state.room.filter(post => post !==clickedPost)
  //   this.setState({
  //     room: newRoom
  //   })
  // }

  renderButtons (){
    if (!this.state.user) {
      return (
          <form>
             <input
                ref={node => this.email = node}
                placeholder="email" />
             <input
                ref={node => this.password = node}
                placeholder="password"
                type='password' />
            <button
             type="submit"
             onClick={this.signUp.bind(this)}>Sign up with us!</button>
            <button
             type="submit"
             onClick={this.signIn.bind(this)}>Sign in!</button>
           </form>
       )
    } else {
      return (
        <button
         type="submit"
         onClick={this.signOut.bind(this)}>Sign out!
        </button>
       )
    }
  }


  render() {
    return (
      <div>
        <div className="display">
            {this.state.users.map(user => {
              return <p className="message" key={user.email}>{user.email}:   {user.message}</p>
            })
            }
        </div>
        <p className="App-intro">
          You are in the {this.state.topic} chat room
        </p>
        <form className="textInput">
          <input
            ref={node => this.message = node}
            placeholder="Type Chat Here" />
          <button
            type="submit"
            onClick={this.addUser.bind(this)}>Submit Message</button>
        </form>
      </div>
    );
  }

};

export default Topic;
