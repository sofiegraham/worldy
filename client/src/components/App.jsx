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
        id: 2
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
      }).then(function(data) {
        app.setState({
          currentScore: data.score
        })
      });
      //post score to db
      //response is new score
      //set new score to state.currentscore
    }
    app.setState({
      gameIsPlaying: false,
    })
    app.fetchGameData();
    //end the game
    //start a new game
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
        <Game gameGuess={this.gameGuess} gameData={this.state.gameData} gameIsPlaying={this.state.gameIsPlaying}/>
      </div>
    );
  }
}

export default App;