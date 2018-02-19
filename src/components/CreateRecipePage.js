import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

  class CreateRecipePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        recipe: "",
        cookbook: "",
        ingredients: [{ 
          qty: '',
          unit: '',
          ingr: '' }],
        prep: [],
      };

      this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    //alert('A recipe was submitted: ' + this.state.recipe);
    console.log("Recipe sent")
    event.preventDefault();
  }

//dynamic forms from: https://goshakkk.name/array-form-inputs/

  handleIngredientChange = (idx, type) => (evt) => {
    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
      else if (type === "qty") return { ...ingredient, qty: evt.target.value };
      else if (type === "unit") return { ...ingredient, unit: evt.target.value };
      else if (type === "ingr") return { ...ingredient, ingr: evt.target.value };
    });

    this.setState({ ingredients: newIngredients });
  }

  handleAddIngredient = () => {
    this.setState({ ingredients: this.state.ingredients.concat([{qty: '', unit: '', ingr: '' }]) });
  }

  handleRemoveIngredient = (idx) => () => {
    this.setState({ ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx) });
  }

  render() {
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
                  <option value="Select a Cookbook">Select a recipe</option>
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
                {/* <input
                  type="text"
                  placeholder={"Unit"}
                  value={ingredient.unit}
                  onChange={this.handleIngredientChange(idx, "unit")}
                /> */}
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
            <label>
              Step 1
              <textarea
                name="prep"
                type="text"
                placeholder="Step 1"
                value={this.state.prep}
                onChange={this.handleInputChange}
              />
            </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default CreateRecipePage;
