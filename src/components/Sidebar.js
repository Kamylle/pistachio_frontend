import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class Sidebar extends Component {
    render() {
      return (
        <aside>
        <h3>Cookbooks</h3>
          <ul>
            <li>All recipies</li>
            <li>Cookbook 1</li>
            <li>Cookbook 2</li>
            <li>Cookbook 3</li>
          </ul>
        </aside>
      )
    }
  }

  export default Sidebar;