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
      <div className='navbar-inner container'>
      <ul>
        <li className='logo'>Worldly</li>
      </ul>
      <ul>
        <li>Log in</li>
        <li>Sign up</li>
      </ul>
      </div>
      </div>
    )
  }
};

export default Nav;