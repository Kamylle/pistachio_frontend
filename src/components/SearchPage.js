import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import SidebarSearch from "./SidebarSearch";
import Cookbook from "./Cookbook";
import {recipesRef} from '../scripts/db';

class SearchPage extends Component {
   render() {
    return (
      <div className="flexContain">
        <SidebarSearch />
        <div id="main" className="Search cardContain">
          <Cookbook cookbookID={this.props.cookbookID} />
          <Cookbook cookbookID={this.props.recipeID} />
        </div>
      </div>
    );
  }
}

export default SearchPage;
