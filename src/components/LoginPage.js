import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class LoginPage extends Component {
    render() {
      return (
        <div id="main" className="Login">
          <div className="container">
            <form>
              <label>
                Email or Username
                <input></input>
              </label>
              <label>
                Password
                <input></input>
              </label>
              <button>Submit</button>
            </form>
          </div>
        </div>
      )
    }
  }

  export default LoginPage;
