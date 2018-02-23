import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../scripts/firebase";
import {recipesRef } from '../scripts/db';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      recipeID: "-L632e0WKTgH0F-ElJt-", // Change back to this later after testing: this.props.recipeID
      recipeObject: {},
      // creatorObject: {}
    };
  }

  componentWillMount = () => {
    let recipe = {};
    // let creatorObject = {};

    recipesRef
      // .child(this.state.recipeID)
      .once("value")
      .then(snapshot => {
        recipe = snapshot.val();
        // console.log(recipe)
        // return recipe.people.creatorID;
      })
      // .then(userID => {
      //   return accountsRef.child(userID).once("value");
      // })
      .then(() => {
        this.setState({
          recipeObject: recipe,
          // creatorObject: creatorObj.val(),
          loaded: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  performSearch = () => {
    // let wordSearch = this.searchInput.value;
    let allRecipes = this.state.recipeObject;
    console.log(allRecipes)
    let keysRecipe = Object.keys(allRecipes);
    console.log(keysRecipe)
    for(var i = 0; i < keysRecipe.length; i++) {
      console.log(allRecipes[i].recipe)
    }
    // let titleRecipes = Object.value(keysRecipe.recipe)
    // console.log(titleRecipes)
  }

  logout = () => {
    firebase.auth().signOut();
    console.log(firebase.auth().currentUser);
    this.setState({ username: "" });
  };

  getHeaderContentLogguedIn = () => {
    return (
      <div>
        <Link to="/edit" className="newRecipeBtn">
          + New recipe
        </Link>
        <div className="accountLinks">
          <a>Welcome {this.state.username}</a>
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
          <label>
            Search :
            <input type="text" name="name" ref={ r => this.searchInput = r }/>
          </label>

          <Link to="/search" className="searchbar" onClick={this.performSearch}>
            Search <i>O</i>
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
