import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../scripts/firebase";
import { recipesRef } from "../scripts/db";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      recipeID: "-L632e0WKTgH0F-ElJt-", // Change back to this later after testing: this.props.recipeID
      recipeObject: {}
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
          loaded: true,
          itemsFound: []
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  performSearch = () => {
    let wordSearch = this.searchInput.value;
    let allRecipes = this.state.recipeObject;
    let arrOfRecipes = [];
    var recipesFound = Object.values(allRecipes).filter(item =>
      item.recipe.includes(wordSearch)
    );
    console.log(recipesFound);
    arrOfRecipes.push(recipesFound);
    return arrOfRecipes;
    this.setState({ itemsFound: arrOfRecipes})
  };

  logout = () => {
    firebase.auth().signOut();
    console.log(firebase.auth().currentUser);
    localStorage.removeItem("login");
    this.setState({ username: "" });
  };

  getHeaderContentLogguedIn = () => {
    return (
      <div>
        <Link to="/edit" className="newRecipeBtn">
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
            ref={r => (this.searchInput = r)}
          />

          <Link to="/search" className="searchbar" onClick={this.performSearch} itemsfound={this.state.itemsFound}>
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
