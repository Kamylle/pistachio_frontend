import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import SidebarSearch from "./SidebarSearch";
import Cookbook from "./Cookbook";


class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsFound: this.props.itemsfound
    }
  }
   render() {
     console.log(this.props)
    return (
      <div className="flexContain">
        <SidebarSearch />
        <div id="main" className="Search cardContain">
          <Cookbook cookbookID={this.state.itemsfound} />
          {/* <Cookbook cookbookID={this.props.recipeID} /> */}
        </div>
      </div>
    );
  }
}

export default SearchPage;
