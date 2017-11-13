import React from 'react';

const Nav = (props) => {
  if(props.isLoggedIn) {
    return (
      <div className='navbar'>
        <p>Log out</p>
      </div>
    )
  } else {
    return (
      <div className='navbar'>
        <p>Log in</p>
        <p>Sign up</p>
      </div>
    )
  }
};

export default Nav;