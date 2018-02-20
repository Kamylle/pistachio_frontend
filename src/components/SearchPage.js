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
            <Cookbook/>
            <Cookbook/>
          </div>
        </div>
      )
    }
  }

  export default SearchPage;
