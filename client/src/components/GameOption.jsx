import React from 'react';

const GameOption = (props) => {
  return (
    <div className='game-option' onClick={(e) => props.gameGuess(props.country)}>
      <p>{props.country.name}</p>
    </div>
  );
};

export default GameOption;