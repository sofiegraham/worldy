import React from 'react';

const UserProfile = (props) => {
  return (
    <div className='profile'>
    <div className='profile-row'>
      <div className='profile-col'>
      <img className='profile-img' src='https://avatars1.githubusercontent.com/u/10235700?s=460&v=4' />
      </div>
      <div className='profile-col'>
        <p className='username'>{props.user.name}</p>
      </div>
      <div className='profile-col float-right'>
        <p className='score'>{props.user.score} <span className='total-countries'>/ 249</span></p>
      </div>
      </div>
    </div>
  );
};

export default UserProfile;