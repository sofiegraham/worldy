import React from 'react';

const UserProfile = (props) => {
  return (
    <div className='profile'>
      <div>
        <h1>{props.user.name}</h1>
        <p>{props.user.score}</p>
      </div>
      
    </div>
  );
};

export default UserProfile;