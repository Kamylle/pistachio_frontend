import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';


class Cookbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cookbookID: this.props.cookbookID,
            cookbookTitle: "Cookbook Title"
        }
    }
    render() {
      return (

        <div className="flexContain">
            <div>
                <h1>{this.state.cookbookTitle}</h1>
            </div>
            <div className="cardContain">
                <RecipeCard recipeID={"11111"}/>
                <RecipeCard recipeID={"22222"}/>
                <RecipeCard recipeID={"33333"}/>
            </div>
        </div>

      )
    }
  }

  export default Cookbook;