import React, { Component } from "react";
import firebase from '../scripts/firebase';
//import { Link } from 'react-router-dom';

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      recipeID: "",
      creatorID: "",
    };
  }

  // componentDidMount () {
  //Currently return anything after the pistach.io/recipe/
  // var recipeID = this.props.recipe;
  // console.log(recipeID)
  //TODO use this info from the path to fetch recipe details from firebase
  //When the recipe is loaded, change the state of isLoading to false so it renders the recipe
  // }

  // getRecipes = () => {
  //   var getRecipe = firebase.database().ref("RecipesTest/");
  //   getRecipe.on("value", function(snapshot) {
  //     var recipes = snapshot.val();
  //   });
  // };
 getRecipePath = () => {
        //TODO this function will return the path of the recipe
        //Will therefore require username from state
        return "/recipe"
    }

    getRecipeTitle = () => {
        return this.state.recipeObject.title.value;
    }

    getRecipeCreatorFullName = () => {
        const firstName = this.state.creatorObject.firstName;
        const lastName = this.state.creatorObject.lastName;
        const fullName = `${firstName} ${lastName}`;
        return fullName;
    }

    componentWillMount = () => {

        let recipe = {};

        recipesRef
        .child(this.state.recipeID)
        .once("value")
        .then(snapshot => { 
            console.log(snapshot.val());
            recipe = snapshot.val();
            return recipe.people.creatorID;
        })
        .then(creatorID => {
            console.log("creatorID =", creatorID);
            return usersRef
            .child(creatorID)
            .once("value")
        })
        .then(creatorObj => { 
            console.log("creator Object =", creatorObj.val());
            this.setState({ 
                recipeObject: recipe,
                creatorObject: creatorObj.val(),
                loaded: true 
            })
        })
        .catch(err => { console.log(err) } );
    }

  getRecipe = () => {
    var getRecipe = firebase.database().ref("RecipesTest/");
    getRecipe.on("value", function(snapshot) {
      var recipes = snapshot.val(); 
      // console.log(recipes)
    });
      
      // console.log(recipe1)
    return (
      <div className="container">
        {/* <h1>{recipe1.recipe}</h1> */}
        <ul>
          <li>310 ml (1 1/4 tasse) de lait</li>
          <li>2 oeufs</li>
          <li>180 ml (3/4 tasse) de farine tout usage non blanchie</li>
          <li>30 ml (2 c. à soupe) de sucre</li>
          <li>1 pincée de sel</li>
          <li>Beurre pour badigeonner</li>
        </ul>
        <ul>
          <li>
            Dans un mélangeur, mélanger tous les ingrédients jusqu'à ce que la
            pâte soit lisse et homogène.
          </li>
          <li>
            Dans une poêle antiadhésive de 18 cm (7 po) légèrement badigeonnée
            de beurre, cuire de 8 à 10 crêpes, une à la fois, en les faisant
            dorer des deux côtés. Placer les crêpes cuites dans une assiette au
            fur et à mesure et couvrir de papier d'aluminium pour éviter
            qu'elles ne sèchent.
          </li>
        </ul>
      </div>
    );
  }

  render() {
    // console.log(this.props);
    return (
      <div id="main" className="Recipe">
        {this.state.isLoading ? "loading animation" : this.getRecipe()}
      </div>
    );
  }
}

export default RecipePage;
