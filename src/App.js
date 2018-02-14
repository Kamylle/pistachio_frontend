import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import RecipePage from './components/RecipePage';
import CreateRecipePage from './components/CreateRecipePage';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route 
            exact path="/" 
            component={HomePage} 
          />
          <Route 
            path="/login"
            render={(routeProps) => (
              <LoginPage/>
            )}
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
			  </Switch>
      </div>
    );
  }
}

export default App;
