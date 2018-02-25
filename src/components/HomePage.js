import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { accountsRef } from "../scripts/db";
import Sidebar from './Sidebar';
import Cookbook from './Cookbook';

class HomePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sidebarSelect: "all",
        cookbookIDs: ["newCookbook"],
        cookbooksFetchedFromDB: false
      }
    }

    setUserCookbookIDs = async () => {
      await accountsRef
      .child(`${this.props.userID}/cookbooksList`)
      .on('value', snap => {
        console.log("COOKBOOKS LIST SNAPVAL =", snap.val());
        if (snap.val() !== null) { 
          this.setState({ cookbookIDs: snap.val(), cookbooksFetchedFromDB: true })
        }
      })
    }

    getUserCookbookIDs = () => {
      return this.state.cookbookIDs;
    }

    getSidebarState = (stateFromSidebar) => {
      this.setState({sidebarSelect: stateFromSidebar})
    }

    renderAllCookbooks = () => {
      if (this.state.cookbooksFetchedFromDB) {
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