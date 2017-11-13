import React from 'react';
import GameOption from './GameOption.jsx';

const Game = (props) => {
  if(!props.gameIsPlaying) {
    return (
      <div className='game'>
        <p>Please start a game</p>
      </div>
    )

  } else {
    return (
      <div className='game'>
        <div className='flag'>
          <img className='flag-img' src={props.gameData.targetCountry.Country.flag}/>
        </div>
        {props.gameData.countries.map(country => {
          return <GameOption gameGuess={props.gameGuess} country={country} key={country.id}/>
        })}
      </div>
    
    );
  }

};

export default Game;