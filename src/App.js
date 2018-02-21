import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import RecipePage from './components/RecipePage';
import CreateRecipePage from './components/CreateRecipePage';
import SearchPage from './components/SearchPage';

import Header from './components/Header';
// import firebase from './components/firebase';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userName: "josé",
      userID: "123"
    }
  }

  setUsernameAndID = (username, userID, routeProps) => {
    this.setState(st => ({
      userName: username,
      userID: userID
    }));
  };

  render() {
    if (!this.state.userID) {
      return (
        <div className="App">
        <Header/>
          <Switch>
            
            <Route
              path="/recipe"
              render={(routeProps) => (
                <RecipePage/>
              )}
            />
            <Route
              render={(routeProps) => (
                <LoginPage
                  setUsernameAndID={(username, userID) => this.setUsernameAndID(username, userID, routeProps)}
                />
              )}
            />
          </Switch>
        </div>
      );
    }
    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route
            exact path="/"
            component={HomePage}
          />
          <Route
            path="/recipe"
            render={(routeProps) => (
              <RecipePage/>
            )}
          />
          <Route
            exact path="/add"
            component={CreateRecipePage}
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
