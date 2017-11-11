import React from 'react';

const GameOption = (props) => {
  return (
    <div className='row'>
      <div className='col' onClick={(e) => props.gameGuess(props.country)}>
        <p>{props.country.name}</p>
      </div>
    </div>
  );
};

export default GameOption;