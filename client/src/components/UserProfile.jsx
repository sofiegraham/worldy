import React from 'react';

const UserProfile = (props) => {
  return (
    <div>
      <div>
        <h1>{props.currentUser.name}TSET</h1>
        <p>{props.currentScore}</p>
      </div>
      
    </div>
  );
};

export default UserProfile;