import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
      return (
        <header>
          <a className="logo">Pistach.io</a>
          <div className="searchbar">Search <i>O</i></div>
          <button className="newRecipeBtn">+ New recipe</button>
          <div className="accountLinks">
            <a>Welcome Lorem</a>
            <a>Logout</a>
          </div>
        </header>
      )
    }
  }

  export default Header;
