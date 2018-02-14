import React, { Component } from 'react';
import { Router, Switch } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class LoginPage extends Component {
  render() {
    return (
      <div className="LoginPage">
        Login Page!
      </div>
    )
  }
}

class HomePage extends Component {
  render() {
    return (
      <div className="LoginPage">
        Home Page!
      </div>
    )
  }
}

class RecipePage extends Component {
  render() {
    return (
      <div className="LoginPage">
        Recipe Page!
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        It's working!
      </div>
    );
  }
}

export default App;
