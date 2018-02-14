import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import RecipePage from './components/RecipePage';
import CreateRecipePage from './components/CreateRecipePage';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userID: 123
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
        <Switch>
          <Route 
            exact path="/" 
            component={HomePage} 
          />
          <Route 
            path="/home"
            render={(routeProps) => (
              <HomePage/>
            )}
          />
          <Route 
            path="/recipe"
            render={(routeProps) => (
              <RecipePage/>
            )}
          />
          <Route 
            path="/add"
            render={(routeProps) => (
              <CreateRecipePage/>
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
