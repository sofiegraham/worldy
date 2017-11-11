import React from 'react';

const UserProfile = (props) => {
  return (
    <div>
      <div>
        <h1>{props.currentUser.name}</h1>
        <p>{props.currentUser.score}</p>
      </div>
      
    </div>
  );
};

export default UserProfile;