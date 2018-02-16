import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

  class CreateRecipePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        recipe: "",
        cookbook: "",
        ingr: [
          {
            qty: "",
            unit:"",
            ingr:"",
          }
        ],
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
                  <option value="grapefruit">Grapefruit</option>
                  <option value="lime">Lime</option>
                  <option value="coconut">Coconut</option>
                  <option value="mango">Mango</option>
                  <option value="add a cookbook">Mango</option>
              </select>
            </label>

            <h3>Ingredients</h3>
            <div className="ingredient">
              <label>
                <input
                  name="qty"
                  type="text"
                  placeholder="Quantity"
                  value={this.state.ingr[0].qty}
                  onChange={this.handleInputChange}
                />
              </label>
              <select
                name="unit1"
                type="text"
                value={this.state.ingr[0].unit}
                onChange={this.handleInputChange}>
                  <option value="Select a Mesurement">Select a recipe</option>
                  <option value="g">Grapefruit</option>
                  <option value="ml">Lime</option>
                  <option value="cups">Coconut</option>
                  <option value="tbs">Mango</option>
                  <option value="tsp">Mango</option>
                  <option value="pinch">Mango</option>
              </select>
              <label>
                <input
                  name="ingr"
                  type="text"
                  placeholder="Ingredient"
                  value={this.state.ingr[0].ingr}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>

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
