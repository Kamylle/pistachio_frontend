import React, { Component } from 'react';
import firebase from "../scripts/firebase";
import { accountsRef, cookbooksRef, setPrettifiedCookbookPath } from "../scripts/db";
//import { Link } from 'react-router-dom';

class Sidebar extends Component {
  constructor(props) {
      super(props);
      this.state = {
          userID: this.props.userID,
          linkSlected: "all",
          cookbooksListLoaded: false,
          cookbookObjectsloaded: false,
          userCookbooks: null,
          showAddCookbookFields: false,
          newUserCookbookNameFromSidebar: ""
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
      this.setState({ userCookbooks, cookbookObjectsloaded: true })
    })
    .catch();
  }

  handleLinkSelect = (cookbookID) => () => {
    this.setState({ linkSlected: cookbookID });
    this.props.sidebarState(cookbookID);
  }

  getCookbookTitle = idx => {
    try {
      return this.state.cookbookObjectsloaded
        ? this.state.userCookbooks[idx].title.value
        : "..."
    } catch(err) {}
  }

  toggleAddCookbookFields = () => {
    this.setState({ showAddCookbookFields: !this.state.showAddCookbookFields });
  }

  handleAddCookbook = async () => {
      this.addNewCookbookFromSidebarField.value = ""; // Clears the new cookbook name input field upon submission
      this.setState({ newCookbookAdded: true });

      const db = firebase.database();
      // First, we're creating the cookbook in "Cookbooks"...
      const cookbookKey = await db.ref("Cookbooks/").push().key;
      db.ref(`Cookbooks/${cookbookKey}`)
      .set(
        { ownerUserID: this.props.userID,
          recipeIDs: [],
          title: {
            prettifiedPath: setPrettifiedCookbookPath(cookbookKey),
            value: this.state.newUserCookbookNameFromSidebar
          }
        }
      );
      // Then, we're adding the new cookbook into the user's 'cookbooks' list on his/her account...
      const userCookbooks = this.state.cookbookIDs;
      const updatedCookbooksList = userCookbooks.concat(cookbookKey);
      console.log("UPDATED COOKBOOKS LIST = ", updatedCookbooksList);
      db.ref(`Accounts/${this.props.userID}/cookbooksList`)
      .set(updatedCookbooksList);

      // TODO: Refresh Cookbooks List In Sidebar
      this.toggleAddCookbookFields();
    }

  checkForCookbookNameConflict = () => {
    this.setState({ newUserCookbookNameFromSidebar: this.addNewCookbookFromSidebarField.value});
  }

  showCookbookAddButtonOnConflictClear = () => {
    const userCookbookTitles = this.state.userCookbooks.map(cb => {
      return cb.title.value
    });
    userCookbookTitles.push(""); // This should not be a valid cookbook name...

    const cookbookNameIsValid = userCookbookTitles.every(
      cbt => cbt.toLowerCase() !== this.state.newUserCookbookNameFromSidebar.toLowerCase());

    if (!cookbookNameIsValid) {
      return <button disabled>Add</button>
    }
    return <button onClick={this.handleAddCookbook}>Add</button>
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
        {
          this.state.showAddCookbookFields
          ? <div>
              <input 
                type="text" 
                ref={ancfsf => this.addNewCookbookFromSidebarField = ancfsf}
                placeholder="New Cookbook Name"
                onChange={this.checkForCookbookNameConflict}/>
              <div>
                {this.state.showAddCookbookFields ? this.showCookbookAddButtonOnConflictClear() : null}
                <button onClick={this.toggleAddCookbookFields}>Cancel</button>
              </div>
            </div>
          : <button onClick={this.toggleAddCookbookFields}>Create a new cookbook</button>}
      </aside>
    )
  }
}

  export default Sidebar;