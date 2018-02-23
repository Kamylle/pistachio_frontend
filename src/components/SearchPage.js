import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import SidebarSearch from './SidebarSearch';
import Cookbook from './Cookbook';


class SearchPage extends Component {
  constructor(props) {
    super(props);
  }
    render() {
      return (
        <div className="flexContain">
          <SidebarSearch/>
          <div id="main" className="Search cardContain">
            <Cookbook cookbookID={this.props.cookbookID}/>
            <Cookbook cookbookID={this.props.recipeID}/>
          </div>
        </div>
      )
    }
  }

  export default SearchPage;
