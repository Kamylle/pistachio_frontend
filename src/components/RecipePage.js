import React, { Component } from "react";
import firebase from "../scripts/firebase";
import { Route } from "react-router";
// import { Link } from "react-router-dom";
import { recipesRef, usersRef } from "../scripts/db";
import CreateRecipePage from "./CreateRecipePage";

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeID: "-L68Sr3X_fpb5ZHI0V-_", // Change back to this later after testing: this.props.recipeID
      recipeObject: {},
      creatorObject: {},
      loaded: false,
      img: '',
      defaultImg: ''
    };
  }


  getRecipePath = () => {
    //TODO this function will return the path of the recipe
    //Will therefore require username from state
    if (this.state.loaded) {
      try {
        const userID = this.props.userID;
        const prettifiedPath = this.state.recipeObject.title.prettifiedPath;
        return `/recipe/${userID}/${prettifiedPath}`;
      } catch (err) {
        return "/recipe";
      }
    }
    return "/recipe";
  };

  getRecipeTitle = () => {
    return this.state.recipeObject.recipe;
    // console.log(this.state.recipeObject);
  };

  getRecipeImage = () => {
    return this.state.recipeObject.img
  }

  // getDefaultImg = () => {

  //   return ;
  // }

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


  componentWillMount = () => {
    let recipe = {};

    recipesRef
      .child(this.state.recipeID)
      .once("value")
      .then(snapshot => {
        // console.log(snapshot.val());
        recipe = snapshot.val();
        // console.log(recipe);
        return recipe.people.creatorID;
      })
      .then(creatorID => {
        // console.log("creatorID =", creatorID);
        return usersRef.child(creatorID).once("value");
      })
      .then(creatorObj => {
        // console.log("creator Object =", creatorObj.val());
        this.setState({
          recipeID: recipe.recipeID,
          recipeObject: recipe,
          creatorObject: creatorObj.val()
          // loaded: true
        });
      })
      .catch(err => {
        console.log(err);
      });

      //Set default Image
      var img = firebase.storage().ref('/images/Riffelsee.JPG').getDownloadURL()
      .then((url) => {
        this.setState({ defaultImg: url });
      }).catch(function(error) {
        // Handle any errors here
      });
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
              {this.state.img !== "" ?
              <div className="recipeImg" style={{backgroundImage: `url(${this.getRecipeImage()})`}}/> :
                <div className="recipeImg" style={{backgroundImage: `url(${this.state.defaultImg})`}}/>
              }
            </div>
            <div className="container">
              <h1>{this.getRecipeTitle()}</h1>
              <ul className="ingredientsList">
                <h3> Ingredients </h3>
                <hr align="left"/>
                {this.getRecipeIndredients()}
              </ul>
              <div className="notes displayDesktop">
                <h3>Notes</h3>
                <hr align="left"/>
                <p> Morbi quis consequat est. Fusce tincidunt ullamcorper ipsum nec lobortis. Proin laoreet volutpat lorem. Maecenas nisl tortor, sodales ut malesuada a, sagittis quis elit. Etiam varius velit nec mauris sagittis laoreet. Nunc aliquam est vel orci faucibus ultrices. Suspendisse lacinia ipsum ac dui efficitur, at dictum nunc maximus.</p>
              </div>
              <ul className="prepList">
                <h3> Preparation </h3>
                <hr align="left"/>
                {this.getPrepSteps()}
              </ul>
              <div className="notes displayMobile">
                <h3>Notes</h3>
                <hr align="left"/>
                <p> Morbi quis consequat est. Fusce tincidunt ullamcorper ipsum nec lobortis. Proin laoreet volutpat lorem. Maecenas nisl tortor, sodales ut malesuada a, sagittis quis elit. Etiam varius velit nec mauris sagittis laoreet. Nunc aliquam est vel orci faucibus ultrices. Suspendisse lacinia ipsum ac dui efficitur, at dictum nunc maximus.</p>
              </div>
              <div className="anecdote">
                <h3>Anectdotes</h3>
                <hr align="left"/>
                <p> Morbi quis consequat est. Fusce tincidunt ullamcorper ipsum nec lobortis. Proin laoreet volutpat lorem. Maecenas nisl tortor, sodales ut malesuada a, sagittis quis elit. Etiam varius velit nec mauris sagittis laoreet. Nunc aliquam est vel orci faucibus ultrices. Suspendisse lacinia ipsum ac dui efficitur, at dictum nunc maximus.</p>
              </div>
              {/* <div>
                <button onClick={this.deleteRecipe}>Delete recipe</button>
              </div> */}
            </div>
            <div className="sideTools">
              <i className="icon send i24"></i>
              <i onClick={this.editRecipe} className="icon edit i24"></i>
              <i className="icon print i24"></i>
            </div>
          </div>
        )};
      </div>
    );
  }
}

export default RecipePage;
