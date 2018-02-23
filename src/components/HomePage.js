import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { accountsRef } from "../scripts/db";
import Sidebar from './Sidebar';
import Cookbook from './Cookbook';

class HomePage extends Component {
    constructor() {
      super();
      this.state = {
        sidebarSelect: "all",
        cookbookIDs: null
      }
    }

    //TODO get cookbook names from User ID

    setUserCookbookIDs = () => {
      accountsRef
      .child(`${this.props.userID}/cookbooksList`)
      .on('value', snap => {
        console.log("COOKBOOKS LIST SNAPVAL =", snap.val());
        this.setState({ cookbookIDs: snap.val() });
      })
    }

    getUserCookbookIDs = () => {
      return this.state.cookbookIDs;
    }

    getSidebarState = (stateFromSidebar) => {
      this.setState({sidebarSelect: stateFromSidebar})
    }

    renderAllCookbooks = () => {
      try {
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
      } catch(err) {
        return (<div></div>)
      }
    }

    componentWillMount = () => {
      this.setUserCookbookIDs();
    }

    render() {
      return (
        <div className="flexContain">
          <Sidebar 
            userID={this.props.userID}
            username={this.props.username}
            cookbookIDs={this.props.cookbookIDs}
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
