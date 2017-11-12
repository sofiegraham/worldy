import React, { Component } from 'react';
import 'whatwg-fetch';
import Promise from 'promise-polyfill';
import Game from './Game.jsx';
import UserProfile from './UserProfile.jsx';
import Nav from './Nav.jsx';
import Map from './Map.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {
        id: 0,
        name: '',
        email: '',
        score: 0,
        countries: []
      },
      currentUser: {
        name: 'sofie',
        id: 1
      },
      currentScore: 0,
      gameData: {},
      gameIsPlaying: false
    }
    // const name = prompt("Please enter your name");
    // const email = prompt("Please enter your email");
    // const password = prompt("Please enter your password");
    const newUser = {
      name: 'cakes',
      email: 'sofie@sofie.com',
      password: 'password',
    }

    //const username = prompt("What is your username?");
    
    this.getUser('cakes');
    this.setUser(newUser);
    this.fetchGameData();
  }

  gameGuess = (country) => {
    const app = this;
    const newData = {
      userId: this.state.currentUser.id,
      countryId: country.id,
      columnName: 'flag',
      newValue: true
    }
    if(country.id === this.state.gameData.targetCountry.CountryId) {
      fetch('/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      }).then(response => {
        return response.json();
      }).then(function(score) {
        console.log('DATA', score);
        app.setState({
          currentScore: score
        })
      });
    }
    app.setState({
      gameIsPlaying: false,
    })
    app.fetchGameData();
  }

  fetchGameData = () => {
    const app = this;
    fetch(`/game/flag?userid=${this.state.currentUser.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      app.setState({
        gameData: data,
        gameIsPlaying: true
      })
    });
  }

  getUser = (username) => {
    const app = this;
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username})
    })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(userObj => {
      app.setState({
        user: userObj
      })
      console.log('JSON', userObj);
    })
    .catch(error => {
      console.log(error);
    })
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
        <Map />
        <Nav isLoggedIn={this.state.isLoggedIn}/>
        <UserProfile user={this.state.user}/>
        <Game gameGuess={this.gameGuess} gameData={this.state.gameData} gameIsPlaying={this.state.gameIsPlaying}/>
      </div>
    );
  }
}

export default App;