import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';

class Cookbook extends Component {
    render() {
      return (

        <div className="flexContain">
            <div>
                <h1>Cookbook</h1>
            </div>
            <div className="cardContain">
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
          </div>
        </div>

      )
    }
  }

  export default Cookbook;