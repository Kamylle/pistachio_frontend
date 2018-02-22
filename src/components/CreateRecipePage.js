import React, { Component } from 'react';
import firebase from '../scripts/firebase';
//import { Link } from 'react-router-dom';

class CreateRecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      recipe: "",
      cookbook: "",
      cookTime: "20 minutes",
      prepTime: "15 minutes",
      cookBookID: "123",
      ownerAnecdotes: [{
        0: "blabla",
        1: "bla"
      }],
      ownerNotes: [{
        0: "blabla",
        1: "bla"
      }],
      people: {
        authorID: "0",
        creatorID: "1"
      },
      starRating: "4.5",
      yieldNb: "6",
      title: {
        prettifiedPath: "al-and-mon",
        value: "Al & Mon"
      },
      tags: {
        defaultTags: [{ 0: "dessert" }],
        personalTags: [{ 0: "favourite" }]
      },
      ingredients: [{
        qty: '',
        unit: '',
        ingr: ''
      }],
      prep: [{ step: '' }],
    };
  }

    componentDidMount() {
      //get localstorage state and set it
      console.log(this.state.username)
      const state = JSON.parse(localStorage.getItem('state'));
      this.setState(state);
    }

    setAppState = (state) => {
      this.setState(state, () => {
        localStorage.setItem('state', JSON.stringify(this.state));
      });
    }

    writeRecipe = async (recipe) => {
      const db = firebase.database();
      const recipeKey = await db.ref('Recipes/').push().key;
      db.ref(`Recipes/${recipeKey}`).set({ ...recipe, recipeID: recipeKey });
    }

    handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      if(value === "New Cookbook") {
        console.log("hey")
      }

      this.setAppState({
        [name]: value
      });
    }

    formatArray = (arr) => arr.reduce((acc, curr, index) => {
      return { ...acc, [index]: curr }
    }, {})

    handleSubmit = async (event) => {
      // alert('A recipe was submitted: ' + this.state.recipe);
      console.log(this.state);
      const recipe = { 
        ...this.state,
        ingredients: this.formatArray(this.state.ingredients),
        prep: this.formatArray(this.state.prep)
      };
     
      console.log("Recipe sent");
      event.preventDefault();
      try {
        console.log(recipe)
        await this.writeRecipe(recipe);
      }
      catch (err) { console.log(err) }
    }

    //dynamic forms from: https://goshakkk.name/array-form-inputs/

    handleIngredientChange = (idx, type) => (evt) => {
      const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
        if (idx !== sidx) return ingredient;
        else if (type === "qty") return { ...ingredient, qty: evt.target.value };
        else if (type === "unit") return { ...ingredient, unit: evt.target.value };
        else if (type === "ingr") return { ...ingredient, ingr: evt.target.value };
        else return null;
      });

      this.setAppState({ ingredients: newIngredients });
    }

    handleAddIngredient = () => {
      this.setAppState({
        ingredients: this.state.ingredients.concat([{ qty: '', unit: '', ingr: '' }])
      });
    }

    handleRemoveIngredient = (idx) => () => {
      this.setAppState({
        ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
      });
    }

    handleStepChange = (idx) => (evt) => {
      const newStep = this.state.prep.map((step, sidx) => {
        if (idx !== sidx) return step;
        else return { ...step, step: evt.target.value };
      });

      this.setAppState({ prep: newStep });
    }

    handleAddStep = () => {
      this.setAppState({
        prep: this.state.prep.concat([{ step: '' }])
      });
    }

    handleRemoveStep = (idx) => () => {
      this.setAppState({
        prep: this.state.prep.filter((s, sidx) => idx !== sidx)
      });
    }


    render() {
      console.log(this.state)
      return (
        <div id="main">
          <form onSubmit={this.handleSubmit}>
            <h2>New Recipe</h2>

            <label>
              Recipe
              <input
                name="recipe"
                type="text"
                placeholder="Recipe Name"
                value={this.state.recipe}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Cookbook
              <select
                name="cookbook"
                type="text"
                value={this.state.cookbook}
                onChange={this.handleInputChange}>
                <option value="Select a Cookbook">Select a cookbook</option>
                <option value="Favorites">Favorites</option>
                <option value="Classics">Classics</option>
                <option value="Livre de Grand-Maman">Livre de Grand Maman</option>
                <option value="Apetizers">Apetizers</option>
                <option value="New Cookbook">New Cookbook</option>
              </select>
            </label>

            <h3>Ingredients</h3>
            {this.state.ingredients.map((ingredient, idx) => (
              <div className="ingredient">
                <input
                  type="text"
                  placeholder={"Quantity"}
                  value={ingredient.qty}
                  onChange={this.handleIngredientChange(idx, "qty")}
                />
                <select
                  type="text"
                  value={ingredient.unit}
                  onChange={this.handleIngredientChange(idx, "unit")}>
                  <option value="unit">Unit</option>
                  <option value="Cups">Cups</option>
                  <option value="Tbs">Tbs</option>
                  <option value="Tsp">Tsp</option>
                  <option value="ml">ml</option>
                  <option value="g">g</option>
                </select>
                <input
                  type="text"
                  placeholder={`Ingredient #${idx + 1}`}
                  value={ingredient.ingr}
                  onChange={this.handleIngredientChange(idx, "ingr")}
                />

                <button type="button" onClick={this.handleRemoveIngredient(idx)} className="small">-</button>
              </div>
            ))}
            <button type="button" onClick={this.handleAddIngredient} className="small">Add Ingredient</button>


            <h3>Preparation</h3>
            {this.state.prep.map((prep, idx) => (
              <div className="step">
                <textarea
                  type="text"
                  placeholder={`Step #${idx + 1}`}
                  value={prep.step}
                  onChange={this.handleStepChange(idx)}
                />
                <button type="button" onClick={this.handleRemoveStep(idx)} className="small">-</button>
              </div>
            ))}
            <button type="button" onClick={this.handleAddStep} className="small">Add Step</button>

            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
  export default CreateRecipePage;
