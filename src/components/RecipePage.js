import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class RecipePage extends Component {
    render() {
      return (
        <div id="main" className="Recipe">
          <div className="container">
            <h1>Crêpes</h1>
            <ul>
              <li>310 ml (1 1/4 tasse) de lait</li>
              <li>2 oeufs</li>
              <li>180 ml (3/4 tasse) de farine tout usage non blanchie</li>
              <li>30 ml (2 c. à soupe) de sucre</li>
              <li>1 pincée de sel</li>
              <li>Beurre pour badigeonner</li>
            </ul>
            <ul>
            <li>
              Dans un mélangeur, mélanger tous les ingrédients jusqu'à ce que la pâte soit lisse et homogène.
            </li>
            <li>
              Dans une poêle antiadhésive de 18 cm (7 po) légèrement badigeonnée de beurre, cuire de 8 à 10 crêpes, une à la fois, en les faisant dorer des deux côtés. Placer les crêpes cuites dans une assiette au fur et à mesure et couvrir de papier d'aluminium pour éviter qu'elles ne sèchent.
            </li>
            </ul>
          </div>
        </div>
      )
    }
  }

  export default RecipePage;
