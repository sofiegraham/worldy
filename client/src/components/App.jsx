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
        id: 1,
        name: '',
        email: '',
        score: 0,
        countries: []
      },
      gameData: {},
      gameIsPlaying: false,
      countries: []
    }
    // const name = prompt("Please enter your name");
    // const email = prompt("Please enter your email");
    // const password = prompt("Please enter your password");
    const newUser = {
      name: 'sofie',
      email: 'sofie@sofie.com',
      password: 'password',
    }

    //const username = prompt("What is your username?");
    this.setUser(newUser);
    this.getCountryData();
    
    
  }

  componentDidMount() {
    return new Promise((resolve, reject) => {
      resolve(this.getUser('sofie'));
    })
    .then(() => {
      this.fetchGameData(); //fetchCountryData
    })
  }

  getCountryData = () => {
    const app = this;
    fetch('/countries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(countries => {
      const parsed = countries.map(country => {
        country.geometry = JSON.parse(country.geometry);
        return country;
      });
      app.setState({
        countries: parsed
      })
    });
  }

  gameGuess = (country) => {
    const app = this;
    const newData = {
      userId: this.state.user.id,
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
      }).then(responseData => {
        console.log('DATA', responseData);
        const updateUser = app.state.user;
        updateUser.score = responseData.userScore;
        updateUser.countries = responseData.userCountryData;
        app.setState({
          user: updateUser
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
    fetch(`/game/flag?userid=${this.state.user.id}`, {
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
        {this.state.countries.length > 0 && <Map countries={this.state.countries} userCountries={this.state.user.countries} />}
        <Nav isLoggedIn={this.state.isLoggedIn}/>
        <UserProfile user={this.state.user}/>
        <Game gameGuess={this.gameGuess} gameData={this.state.gameData} gameIsPlaying={this.state.gameIsPlaying}/>
      </div>
    );
  }
}

export default App;