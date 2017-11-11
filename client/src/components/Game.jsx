import React from 'react';
import GameOption from './GameOption.jsx';

const Game = (props) => {
  if(!props.gameIsPlaying) {
    return (
      <div>
        <p>Please start a game</p>
      </div>
    )

  } else {
    return (
      <div>
        <div>
          {/* show a random flag and four random country names 
  
          all countries
  
          GAME LOOP
          show random flag
          + 4 possible name options (one is correct);
  
          player can click one
  
          when clicked
            check if it is correct
            if yes update score in table
          END GAME
  
          one correct country data (a country that the user does not yet have)
          3 incorrect country data
          callback to update db and
          callback to setState of user score
          
          */}
          <img src={props.gameData.targetCountry.Country.flag}/>
        </div>
        {props.gameData.countries.map(country => {
          return <GameOption country={country} key={country.id}/>
        })}
      </div>
    
    );
  }

};

export default Game;