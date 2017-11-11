import React, { Component } from 'react';
import 'whatwg-fetch';
import Promise from 'promise-polyfill';
import Game from './Game.jsx';
import UserProfile from './UserProfile.jsx';
import Nav from './Nav.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      currentUser: {
        name: 'sofie',
        score: 100,
      },
      userCountries: {
        zambia: {
          flag: false,
        },
        ireland: {
          flag: true,
        }
      }
    }
    // const name = prompt("Please enter your name");
    // const email = prompt("Please enter your email");
    // const password = prompt("Please enter your password");
    const newUser = {
      name: 'fred',
      email: 'fred@fred.com',
      password: 'password',
    }
    
    this.setUser(newUser);
  }

  setUser = (newUser) => {
    fetch('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(function(response) {
      console.log(response);
    });
  }

  render() {
    return (
      <div>
        <Nav isLoggedIn={this.state.isLoggedIn}/>
        <UserProfile currentUser={this.state.currentUser}/>
        <Game />
      </div>
    );
  }
}

export default App;