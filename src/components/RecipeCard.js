import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecipeCard extends Component {
    render() {
      return (
        
        
            <div className="card">
            <Link to="/recipe">
                <h2>Titre de la recette</h2>
                <p>Lorem ipsum si meliora dies ut vina poemata redict</p>
            </Link>  
            </div>
         
        
      )
    }
  }

  export default RecipeCard;
