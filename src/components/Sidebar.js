import { accountsRef } from "../scripts/db";
//import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
      super(props);
      this.state = {
          userID: this.props.userID,
          linkSlected: "all",
          loaded: false
      }
  }

  componentDidMount = () => {
    accountsRef
    .child(`${this.state.userID}/cookbooksList`)
    .on('value', snap => { 
      this.setState({
        cookbookIDs: snap.val(), 
        loaded: true})
    })
  }

  handleLinkSelect = (cookbookID) => () => {
    this.setState({ linkSlected: cookbookID });
    this.props.sidebarState(cookbookID);
  }

  render() {
    return (
      <aside className="cookbookMarks">
      <h3>Cookbooks</h3>
        <ul>
          <li onClick={this.handleLinkSelect("all")}>All recipes</li>
          { this.state.loaded 
            ? this.state.cookbookIDs.map((cookbookID, idx) => (
              <li onClick={this.handleLinkSelect(cookbookID)}>
                {cookbookID}
              </li>
              ))
            : <div>... Loading Cookbooks ...</div> }
        </ul>
        <button>Create a new cookbook</button>
      </aside>
    )
  }
}

  export default Sidebar;