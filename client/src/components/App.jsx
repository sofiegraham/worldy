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
        email: 'f@f.ccom',
        id: 2
      },
      gameData: {
        target: {},
        countries: []
      }
    }
    // const name = prompt("Please enter your name");
    // const email = prompt("Please enter your email");
    // const password = prompt("Please enter your password");
    const newUser = {
      name: 'cakes',
      email: 'sofie@sofie.com',
      password: 'password',
    }
    
    this.setUser(newUser);
    this.fetchGameData();
  }

  fetchGameData = () => {
    fetch(`/game/flag?userid=${this.state.currentUser.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      // `data` is the parsed version of the JSON returned from the above endpoint.
      console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
    });
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