import React from 'react';

const Nav = (props) => {
  if(props.isLoggedIn) {
    return (
      <div>
        <p>Log out</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>Log in</p>
        <p>Sign up</p>
      </div>
    )
  }
};

export default Nav;