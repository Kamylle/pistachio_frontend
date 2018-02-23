import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../scripts/firebase";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username
    };
  }

  logout = () => {
    firebase.auth().signOut();
    console.log(firebase.auth().currentUser);
    this.setState({ username: "" });
  };

  getHeaderContentLogguedIn = () => {
    return (
      <div>
        <Link to="/add" className="newRecipeBtn">
          + New recipe
        </Link>
        <div className="accountLinks">
          <p>Welcome {this.state.username}</p>
          <a onClick={this.logout}>Logout</a>
        </div>
      </div>
    );
  };

  getHeaderContentLogguedOut = () => {
    return (
      <div>
        <Link to="/login">Login</Link>
      </div>
    );
  };

  render() {
    // console.log(this.state.recipeObject)
    return (
      <header>
        <Link to="/" className="logo">
          Pistach.io
        </Link>
        <form>
            <input 
              type="text" 
              name="name" 
              placeholder="Search"
              ref={ r => this.searchInput = r }
            />

          <Link to="/search" 
            className="searchbar" 
            onClick={this.performSearch}
          >
            <i>O</i>
          </Link>
        </form>
        {this.state.username
          ? this.getHeaderContentLogguedIn()
          : this.getHeaderContentLogguedOut()}
      </header>
    );
  }
}

export default Header;
