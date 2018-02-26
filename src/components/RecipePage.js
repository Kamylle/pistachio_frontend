import React, { Component } from "react";
import firebase from "../scripts/firebase";
import { Route } from "react-router";
// import { Link } from "react-router-dom";
import { recipesRef, usersRef } from "../scripts/db";
import CreateRecipePage from "./CreateRecipePage";
import backgroundImgPattern from '../img/bg-green.jpg';

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeID: props.recipeID,
      recipeObject: {},
      creatorObject: {},
      loaded: false,
      img: '',
      defaultImg: backgroundImgPattern
    };
  }

  // getRecipePath = () => {
  //   //TODO this function will return the path of the recipe
  //   //Will therefore require username from state
  //   if (this.state.loaded) {
  //     try {
  //       return `/recipe/${this.state.recipeID}`;
  //     } catch (err) {
  //       return "/recipe";
  //     }
  //   }
  //   return "/recipe";
  // };

  getRecipeTitle = () => {
    return this.state.recipeObject.recipe;
  };

  getRecipeImage = () => {
    return this.state.recipeObject.img
  }

  getRecipeCreatorFullName = () => {
    return this.state.creatorObject.username;
  };

  getRecipeIndredients = () => {
    var ingredientsMap;
    if (this.state.recipeObject.ingredients) {
      ingredientsMap = this.state.recipeObject.ingredients.map(
        (content, index) => (
          <li key={index}>
            {content.qty + " " + content.unit + " " + content.ingr}
          </li>
        )
      );
    } else {
      ingredientsMap = <div />;
    }
    return ingredientsMap;
  }

  getPrepSteps = () => {
    var prepMap;
    if (this.state.recipeObject.prep) {
      prepMap = this.state.recipeObject.prep.map((content, index) => (
        <li key={index}>{content.step}</li>
      ));
    } else {
      prepMap = <div />;
    }
    return prepMap;
  }

  getNotes = () => {
    var notesMap;
    if (this.state.recipeObject.ownerNotes) {
      notesMap = this.state.recipeObject.ownerNotes.map((content, index) => (
        <li key={index}>{content.note}</li>
      ));
    } else {
      notesMap = <div />;
    }
    return notesMap;
  }

  getAnecdotes = () => {
    var anecdotesMap;
    if (this.state.recipeObject.ownerAnecdotes) {
      anecdotesMap = this.state.recipeObject.ownerAnecdotes.map((content, index) => (
        <li key={index}>{content.anecdote}</li>
      ));
    } else {
      anecdotesMap = <div />;
    }
    return anecdotesMap;
  }

  componentDidMount = () => {
    const recipeID = this.state.recipeID;
    console.log('Im mounting')
    recipesRef
      .child(recipeID)
      .once("value")
      .then(snapshot => {
        // console.log(snapshot.val());
        return snapshot.val();
        // return recipe.people.creatorID;
      })
      // .then(async creatorID => {
      //   // console.log("creatorID =", creatorID);
      //   return await usersRef.child(creatorID).once("value");
      // })
      .then((recipe) => {
        // console.log("creator Object =", creatorObj.val());
        this.setState({
          recipeID: recipe.recipeID,
          recipeObject: recipe,
          // creatorObject: creatorObj.val()
          // loaded: true
        });
      })
      .catch(err => {
        console.log(err);
      });
      //Set default Image
      //var img = firebase.storage().ref('/images/Riffelsee.JPG').getDownloadURL()
      //.then((url) => {
      //  this.setState({ defaultImg: url });
      //}).catch(function(error) {
      //  // Handle any errors here
      //});
  };

  editRecipe = () => {
    this.props.history.push("/edit", {recipeID: this.state.recipeID, recipeObject: this.state.recipeObject});
  };

  deleteRecipe = async () => {
    if(window.confirm('Are you sure you wish to delete this item?')) {
    const db = firebase.database();
    await db.ref(`Recipes/${this.state.recipeID}`).remove();
  };
}

  render() {
    return (
      <div id="main" className="Recipe">
        {this.state.loaded ? (
          "loading animation"
        ) : (
          <div>
            <div className="recipeImgContainer">
              {this.getRecipeImage() !== "" ?
              <div className="recipeImg" style={{backgroundImage: `url(${this.getRecipeImage()})`}}/> :
                <div className="recipeImg" style={{backgroundImage: `url(${this.state.defaultImg})`}}/>
              }
            </div>
            <div className="container">
              <h1>{this.getRecipeTitle()}</h1>
              <div className="recipeInfos">
                <p>Preparation time: {this.state.recipeObject.prepTime}</p>
                <p>Cook time : {this.state.recipeObject.cookTime}</p>
                <p>Render: {this.state.recipeObject.yieldNb} portion</p>
              </div>
              <ul className="ingredientsList">
                <h3> Ingredients </h3>
                <hr align="left"/>
                {this.getRecipeIndredients()}
              </ul>
              {this.state.recipeObject.ownerNotes !== "" ?
              (<div className="notes displayDesktop">
                <h3>Notes</h3>
                <hr align="left"/>
                {this.getNotes()}
              </div>)
              :
              (<div></div>)}
              <ul className="prepList">
                <h3> Preparation </h3>
                <hr align="left"/>
                {this.getPrepSteps()}
              </ul>
              <div className="notes displayMobile">
                <h3>Notes</h3>
                <hr align="left"/>
                {this.getNotes()}
              </div>
              <div className="anecdote">
                <h3>Anecdotes</h3>
                <hr align="left"/>
                {this.getAnecdotes()}
              </div>
              {/* <div>
                <button onClick={this.deleteRecipe}>Delete recipe</button>
              </div> */}
            </div>
            <div className="sideTools">
              <i className="icon send i24"></i>
              {this.props.username === this.state.recipeObject.username && 
              (<i onClick={this.editRecipe} className="icon edit i24"></i>)}
              
              <i className="icon print i24"></i>
            </div>
          </div>
        )};
      </div>
    );
  }
}
export default RecipePage;