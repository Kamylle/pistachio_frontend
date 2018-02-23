import React, { Component } from 'react';
import { accountsRef, cookbooksRef } from "../scripts/db";
//import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
      super(props);
      this.state = {
          userID: this.props.userID,
          linkSlected: "all",
          cookbooksListLoaded: false,
          cookbookObjectsloaded: false,
          userCookbooks: null
      }
  }

  componentWillMount = () => {
    let userCookbooks = [];
    let userCookbooksList = [];
    accountsRef
    .child(`${this.state.userID}/cookbooksList`)
    .once('value')
    .then(snap => { 
      this.setState({
        cookbookIDs: snap.val(), cookbooksListLoaded: true
      });
      userCookbooksList = snap.val(); // snap.val() = An array of strings representing the user cookbooks' IDs
      return snap.val()
    })
    .then(async returnedUserCookbookList => 
      await Promise.all(returnedUserCookbookList.map(cookbookID =>
        cookbooksRef
        .child(`${cookbookID}`)
        .once('value')
        .then(snap => snap.val())
      ))
    )
    .then((userCookbooks) => {
      console.log("*** userCookbooks", userCookbooks);
      this.setState({ userCookbooks, cookbookObjectsloaded: true })
    })
    .catch();
  }

  handleLinkSelect = (cookbookID) => () => {
    this.setState({ linkSlected: cookbookID });
    this.props.sidebarState(cookbookID);
  }

  getCookbookTitle = idx => {
    return this.state.cookbookObjectsloaded 
      ? this.state.userCookbooks[idx].title.value
      : "..."
  }

  render() {
    return (
      <aside className="cookbookMarks">
      <h3>Cookbooks</h3>
        <ul>
          <li onClick={this.handleLinkSelect("all")}>All recipes</li>
          { this.state.cookbooksListLoaded
            ? (this.state.cookbookIDs.map((cookbookID, idx) => (
              <li onClick={this.handleLinkSelect(cookbookID)}>
                {
                  this.state.cookbookObjectsloaded
                  ? `${this.getCookbookTitle(idx)}` : null
                }
              </li>
              )))
            : <div>... Loading Cookbooks ...</div> }
        </ul>
        <button>Create a new cookbook</button>
      </aside>
    )
  }
}

  export default Sidebar;