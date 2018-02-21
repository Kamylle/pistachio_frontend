import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Cookbook from './Cookbook';

class HomePage extends Component {
    render() {
      console.log(this.props)
      return (
        <div className="flexContain">
          <Sidebar userID={this.props.username}/>
          <div id="main" className="Home">
            <Cookbook cookbookID={"44444"}/>
            <Cookbook cookbookID={"55555"}/>
          </div>
        </div>
      )
    }
  }

  export default HomePage;
