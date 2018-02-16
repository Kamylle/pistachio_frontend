import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import RecipePage from './components/RecipePage';
import CreateRecipePage from './components/CreateRecipePage';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userID: "123"
    }
  }

  render() {
    if (this.state.userID === false) {
      return (
        <Route
          render={(routeProps) => (
            <LoginPage/>
          )}
        />
      )
    }
    return (
      <div className="App">
      <Header/>
      <Sidebar/>
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
            render={() =>
            <h1>Page not found</h1>}
            />
			  </Switch>
      </div>
    );
  }
}

export default App;
