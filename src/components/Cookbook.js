import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { firebase } from '../scripts/firebase';
import { rootRef, recipesRef, cookbooksRef, usersRef } from '../scripts/db';

class Cookbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cookbookID: "asdjfbjshdvfasdf", // Once completed, set back to: this.props.cookbookID
            cookbookObject: {},
            creatorObject: {}, // Required Anywhere ? Remove Later If Not
            cookbookTitle: null,
            recipeIDs: [],
            loaded: false
        }
    }

    componentWillMount = () => {

      let cookbook = {};
      let cookbookRecipeIDs;
      let cookbookTtl;

      cookbooksRef
      .child(`${this.state.cookbookID}`)
      .once("value")
      .then(snapshot => { 
          cookbook = snapshot.val();
          cookbookTtl = cookbook.title.value;
          cookbookRecipeIDs = cookbook.recipeIDs;
          return cookbook.people.creatorID;
      })
      .then(creatorID => {
          return usersRef
          .child(creatorID)
          .once("value")
      })
      .then(creatorObj => { 
          this.setState({ 
              cookbookObject: cookbook,
              cookbookTitle: cookbookTtl,
              creatorObject: creatorObj.val(),
              recipeIDs: cookbookRecipeIDs,
              loaded: true
          })
      })
      .catch(err => { console.log(err) } );
  }

    getClassName = () => {
<<<<<<< HEAD
        return `flexContain cookBookContainer ${this.props.isHidden ? "isHidden" : ""}`;
=======
        return `flexContain ${this.props.isHidden ? "isHidden" : ""}`;
>>>>>>> c21db6300f108da255b56d171cffd252b53891cc
    }

    renderAllRecipe = () => {
        return (
          this.state.recipeIDs.map((recipeID, idx) => (
            <RecipeCard 
              recipeID={recipeID}
              username={this.props.username}
              userID={this.props.userID}
            />
          ))
        )
      }

    render() {
      return this.state.loaded 
      ? (
        <div className={this.getClassName()}>
            <header>
                <h1>{this.state.cookbookTitle}{this.state.cookbookID}</h1>
            </header>
            <div className="cardContain">
                {this.renderAllRecipe()}
            </div>
        </div>
        ) 
      : null
    }
  }

  export default Cookbook;