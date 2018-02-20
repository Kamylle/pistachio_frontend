import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Cookbook from './Cookbook';

class HomePage extends Component {
    render() {
      return (
        <div className="flexContain">
          <Sidebar/>
          <div id="main" className="Home">
            <Cookbook/>
            <Cookbook/>
          </div>
        </div>
      )
    }
  }

  export default HomePage;
