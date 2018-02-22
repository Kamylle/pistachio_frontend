import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import SidebarSearch from './SidebarSearch';
import Cookbook from './Cookbook';


class SearchPage extends Component {
    render() {
      return (
        <div className="flexContain">
          <SidebarSearch/>
          <div id="main" className="Search cardContain">
            <Cookbook cookbookID={"66666"}/>
            <Cookbook cookbookID={"77777"}/>
          </div>
        </div>
      )
    }
  }

  export default SearchPage;
