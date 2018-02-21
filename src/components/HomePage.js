import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Cookbook from './Cookbook';

class HomePage extends Component {
    constructor() {
      super();
      this.state = {
        sidebarSelect: "all",
        cookbookIDs: [
          //TODO get cookbookIDs from user
          "11111111",
          "22222222",
          "33333333",
          "44444444"
        ]
      }
    }

    //TODO get cookbook names from User ID

    getSidebarState = (stateFromSidebar) => {
      this.setState({sidebarSelect: stateFromSidebar})
    }

    renderAllCookbooks = () => {
      return (
        this.state.cookbookIDs.map((cookbookID, idx) => (
          <Cookbook 
            cookbookID={cookbookID}
            
            isHidden={
              this.state.sidebarSelect === "all" ? false :
              this.state.sidebarSelect === cookbookID ? false :
              true
            }
          />
        ))
      )
    }

    render() {
      return (
        <div className="flexContain">
          <Sidebar 
            userID={this.props.username}
            sidebarState={this.getSidebarState}
          />
          <div id="main" className="Home">
            {this.renderAllCookbooks()}
          </div>
        </div>
      )
    }
  }

  export default HomePage;
