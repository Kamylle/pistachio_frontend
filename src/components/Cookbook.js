import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
// import { firebase } from '../scripts/firebase';
import { cookbooksRef, usersRef } from '../scripts/db';

class Cookbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cookbookID: this.props.cookbookID, // Once completed, set back to: this.props.cookbookID
            cookbookObject: {},
            creatorObject: {}, // Required Anywhere ? Remove Later If Not
            cookbookTitle: null,
            recipeIDs: [],
            loaded: false
        }
    }

    componentWillMount = async () => {

      let cookbook = {};
      let cookbookRecipeIDs;
      let cookbookTtl;

      await cookbooksRef
      .child(`${this.state.cookbookID}`)
      .once("value")
      .then(snapshot => {
          cookbook = snapshot.val();
          console.log("COOKBOOK =", cookbook);
          cookbookTtl = cookbook.title.value;
          cookbookRecipeIDs = cookbook.recipeIDs;
        //   console.log(cookbook.ownerUserID)
          return cookbook.ownerUserID;
      })
      .then(ownerUserID => {
          return usersRef
          .child(ownerUserID)
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
      .catch(err => { console.log("COOKBOOK.JS > COMPONENTWILLMOUNT ERROR =", err) } );
  }

    getClassName = () => {
        return `flexContain cookBookContainer ${this.props.isHidden ? "isHidden" : ""}`;
    }

    renderAllRecipe = () => {
        try {
            return (
            this.state.recipeIDs.map((recipeID, idx) => (
                <RecipeCard
                recipeID={recipeID}
                username={this.props.username}
                userID={this.props.userID}
                />
            ))
            )
        } catch(err) { console.log("RENDER ALL RECIPES ERROR =", err) }
      }

    render() {
      return this.state.loaded
      ? (
        <div className={this.getClassName()}>
            <header>
                <h1>{this.state.cookbookTitle}</h1>
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
