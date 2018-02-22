import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class Sidebar extends Component {
  constructor(props) {
      super(props);
      this.state = {
          userID: " ",
          linkSlected: "all",
          cookbookIDs: [
            "11111111",
            "22222222",
            "33333333",
            "44444444"
          ]
      }
  }

  //TODO get cookbook names from User ID

  handleLinkSelect = (cookbookID) => () => {
    this.setState({ linkSlected: cookbookID });
    this.props.sidebarState(cookbookID);
  }


  render() {
    return (
      <aside className="cookbookMarks">
      <h3>Cookbooks</h3>
        <ul>
          <li onClick={this.handleLinkSelect("all")}>All recipies</li>
          {this.state.cookbookIDs.map((cookbookID, idx) => (
            <li onClick={this.handleLinkSelect(cookbookID)}>
              {cookbookID}
            </li>
          ))}
        </ul>
        <button>Create a new cookbook</button>
      </aside>
    )
  }
}

  export default Sidebar;