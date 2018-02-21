import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import RecipePage from './components/RecipePage';
import CreateRecipePage from './components/CreateRecipePage';
import SearchPage from './components/SearchPage';

import Header from './components/Header';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userID: "123456789",
      username: "Lorem Ipsum"
    }
  }



  render() {
    if (!this.state.username) {
      return (
        <div className="App">
          <Route path="/recipe" 
            // This route renders the header for paths outside of login
            render={(routeProps) => (
              <Header 
                username={this.state.username}
              />
            )}
          />
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
              render={(routeProps) => (
                <LoginPage/>
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
                username={this.state.username}
              />
            )}
          />
          <Route
            path="/recipe"
            render={(routeProps) => (
              <RecipePage/>
            )}
          />
          <Route
            exact path="/add"
            render={(routeProps) => (
              <CreateRecipePage/>
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
