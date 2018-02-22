import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import firebase from '../scripts/firebase';
import {recipesRef, usersRef } from '../scripts/db';

class RecipeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeID: "-L5z2Vtx8njBP-V7kNN7", // Change back to this later after testing: this.props.recipeID
            recipeObject: {},
            creatorObject: {},
            loaded: true
        }
    }

    getRecipePath = () => {
        //TODO this function will return the path of the recipe
        //Will therefore require username from state
        return "/recipe"
    }

    getRecipeTitle = () => {
        return this.state.recipeObject.recipe;
    }

    getRecipeCreatorFullName = () => {
        // const firstName = this.state.creatorObject.firstName;
        // const lastName = this.state.creatorObject.lastName;
        // const fullName = `${firstName} ${lastName}`;
        return this.state.recipeObject.username;
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

    render() {
        { return !this.state.loaded 
            ? <div className="card">
                <h2>Loading Mock Card Here For Testing Purposes</h2>
            </div>
            : (
                <div className="card">
                    <Link to={this.getRecipePath()}>
                        <h2>{this.getRecipeTitle()}</h2>
                        <p>{this.getRecipeCreatorFullName()}</p>
                    </Link>  
                </div>
              )
        }
    }
}

export default RecipeCard;