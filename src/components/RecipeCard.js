import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecipeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeID: this.props.recipeID,
            recipeTitle: "Recipe Title"
        }
    }

    getRecipePath = () => {
        //TODO this function will return the path of the recipe
        return "/recipe"
    }

    render() {
      return (
            <div className="card">
                <Link to={this.getRecipePath()}>
                    <h2>{this.state.recipeTitle}</h2>
                </Link>  
            </div>
         
        
      )
    }
  }

  export default RecipeCard;
