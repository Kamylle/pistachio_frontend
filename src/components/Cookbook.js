import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';


class Cookbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cookbookID: this.props.cookbookID,
            cookbookTitle: "Cookbook",
            recipeIDs: [
                //TODO get recipeIDs from user
                "11111111",
                "22222222",
                "33333333",
                "44444444"
              ]
        }
    }

    getClassName = () => {
        var display = ""
        if (this.props.isHidden) {display = " isHidden"}
        return "flexContain" + display;
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
      return (
        <div className={this.getClassName()}>
            <div>
                <h1>{this.state.cookbookTitle}{this.state.cookbookID}</h1>
            </div>
            <div className="cardContain">
                {this.renderAllRecipe()}
            </div>
        </div>

      )
    }
  }

  export default Cookbook;