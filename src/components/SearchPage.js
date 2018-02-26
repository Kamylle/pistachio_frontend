import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import SidebarSearch from "./SidebarSearch";
import Cookbook from "./Cookbook";
import RecipeCard from "./RecipeCard";
import { recipesRef, accountsRef } from "../scripts/db";
import firebase from "../scripts/firebase";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsFound: "",
      recipeObject: {}
    };
  }

  logout = () => {
    firebase.auth().signOut();
    // console.log(firebase.auth().currentUser);
    localStorage.removeItem("login");
    this.setState({ username: "" });
  };

  componentDidMount() {
    //fetch data
    let recipes = {};
    recipesRef
      .once("value")
      .then(snapshot => {
        recipes = snapshot.val();
        // console.log(recipes)
        // return recipe.people.creatorID;
      })
      // .then(userID => {
      //   return accountsRef.child(userID).once("value");
      // })
      .then(() => {
        this.setState({
          recipeObject: recipes,
          // creatorObject: creatorObj.val(),
          loaded: true,
          itemsFound: []
        });
      })
      .catch(err => {
        console.log(err);
      });

    // console.log(this.props);
    const searchTerm = new URLSearchParams(this.props.location.search).get(
      "searchTerm"
    );
    //filter function on data based on search term and setState
    this.performSearch(searchTerm);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const searchTerm = new URLSearchParams(nextProps.location.search).get(
      "searchTerm"
    );
    //filter function on data based on search term
    //setState
    this.performSearch(searchTerm);
  }

  performSearch = searchTerm => {
    let wordSearch = searchTerm;
    let allRecipes = this.state.recipeObject;
    let arrOfRecipes = [];
    var recipesFound = Object.values(allRecipes).filter(item =>
      item.recipe.toLowerCase().includes(wordSearch)
    );
    // console.log(recipesFound);
    arrOfRecipes.push(recipesFound);
    console.log(arrOfRecipes);
    // let arrOfCookbooks = [];
    // var booksFound = Object.values(allRecipes).filter(item =>
    //   item.username.includes(wordSearch)
    // );
    // arrOfCookbooks.push(booksFound);
    // console.log(arrOfRecipes, arrOfCookbooks);
    // let arrOfItemsFound = [arrOfRecipes, ...arrOfCookbooks]
    // console.log(arrOfItemsFound)
    // this.setState({ itemsFound: arrOfRecipes });
    this.setState({ itemsFound: arrOfRecipes });
  };

  render() {
    console.log(this.state.itemsFound[0]);
    return (
      <div className="flexContain">
        <SidebarSearch />
        {/* {this.state.itemsFound[0].map((itemsFound, idx) => (
          <div id="main" className="Search cardContain" key={idx}>
            <RecipeCard recipeID={this.state.recipeObject.recipeID} />
          </div>
        ))}; */}
      </div>
    );
  }
}

export default SearchPage;
