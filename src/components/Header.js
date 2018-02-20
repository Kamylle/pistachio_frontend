import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor() {
      super();
      this.state = {

      }
    }
    
    render() {
      return (
        <header>
          <Link to="/" className="logo">Pistach.io</Link>
          
          <Link to="/search" className="searchbar">Search <i>O</i></Link>
          <Link to="/add" className="newRecipeBtn">+ New recipe</Link>
          <div className="accountLinks">
            <a>Welcome {this.props.username}</a>
            <a>Logout</a>
          </div>
        </header>
      )
    }
  }

  export default Header;
