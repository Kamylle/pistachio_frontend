import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { firebase } from '../scripts/dbconfig';
import { rootRef, recipesRef, cookbooksRef, usersRef } from '../scripts/db';

class Cookbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cookbookID: 0, // Once completed, set back to: this.props.cookbookID
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
          console.log("Snapshot value =", snapshot.val());
          cookbook = snapshot.val();
          console.log("Cookbook Object =", cookbook);
          cookbookTtl = cookbook.title.value;
          console.log("Cookbook Title =", cookbookTtl);
          cookbookRecipeIDs = cookbook.recipeIDs;
          console.log("Cookbook Recipe IDs =", cookbookRecipeIDs);
          return cookbook.people.creatorID;
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
        return `flexContain ${this.props.isHidden ? "isHidden" : null}`;
    }

    renderAllRecipe = () => {
        return (
          this.state.recipeIDs.map((recipeID, idx) => (
            <RecipeCard 
              recipeID={recipeID}
            />
          ))
        )
      }

    render() {
      return this.state.loaded 
      ? (
        <div className={this.getClassName()}>
            <div>
                <h1>{this.state.cookbookTitle}{this.state.cookbookID}</h1>
            </div>
            <div className="cardContain">
                {this.renderAllRecipe()}
            </div>
        </div>
        ) 
      : null
    }
  }

  export default Cookbook;