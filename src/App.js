import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import RecipePage from './components/RecipePage';
import CreateRecipePage from './components/CreateRecipePage';
import SearchPage from './components/SearchPage';

import Header from './components/Header';
// import firebase from './scripts/firebase';
import './App.css';

// var user = firebase.auth().currentUser;

class App extends Component {
  constructor() {
    super();
    this.state = {
      userID: undefined,
      username: undefined,
      userCookbooks: undefined
    }
  }

  getUserCookbooks = () => {
    console.log("LOGGED IN USER ID =", this.state.userID);
  }

  componentDidMount() {
    const state = JSON.parse(localStorage.getItem('login'));
    this.setState(state);
  }

  setLoginState = (state) => {
    this.getUserCookbooks();
    this.setState(state, () => {
      localStorage.setItem('login', JSON.stringify(this.state));
    });
  }

  setUsernameAndID = (username, userID) => {
    this.setLoginState({userID, username})
  }

  render() {
    if (!this.state.username) {
      return (
        <div className="App">
          {/* <Route path="/recipe" 
            // This route renders the header for paths outside of login
            render={(routeProps) => (
              <Header 
                username={this.state.username}
              />
            )}
          /> */}
          <Switch>
            <Route
              path="/recipe/:recipe"
              render={(routeProps) => (
                <RecipePage 
                  recipe={routeProps.match.params.recipe}
                />
              )}
            />
            <Route
              exact path="/"
              render={(routeProps) => (
                <LoginPage
                  setUsernameAndID={(username, userID) => this.setUsernameAndID(username, userID)}
                />
              )}
            />
          </Switch>
        </div>
      );
    }
    return (
      <div className="App">
        <Header 
          username={this.state.username}
        />
        <Switch>
          <Route
            exact path="/"
            render={(routeProps) => (
              <HomePage
                userID={this.state.userID}
                username={this.state.username}
              />
            )}
          />
          <Route
            path="/recipe"
            render={(routeProps) => (
              <RecipePage
              recipe={routeProps.match.params.recipe}
              username={this.state.username}
              history={routeProps.history}
              />
            )}
          />
          <Route
            exact path="/add"
            render={(routeProps) => (
              <CreateRecipePage
              username={this.state.username}
              location={routeProps.location}
              />
            )}
          />
          <Route
            path="/search"
            render={(routeProps) => (
              <SearchPage/>
            )}
          />
          <Route
            render={() =>
              <h1>Page not found</h1>}
          />
		    </Switch>
      </div>
    );
  }
}

export default App;
