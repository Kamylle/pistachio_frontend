import React, { Component } from 'react';
import googleIcon from '../img/icon_google_login.svg';
import firebase from '../scripts/firebase';
import { accountsRef } from "../scripts/db";
// const auth = firebase.auth();

var provider = new firebase.auth.GoogleAuthProvider();
// var user = firebase.auth().currentUser;

class LoginPage extends Component {
  constructor() {
    super();
    this.state = { 
      userID: undefined, 
      userName: undefined, 
      display: 'signin', 
      error: '' 
    }
  }

  login = async (e) => {
    e.preventDefault();
    const email = this.email.value;
    const password = this.password.value;
    // const username = this.state.userName;
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password).then(firebaseUser => {
      this.props.setUsernameAndID(firebaseUser.displayName, firebaseUser.uid);
    })
    .catch(error => { this.setState({ error: error.message }); });
  }

  signup = async (e) => {
    e.preventDefault();
    const email = this.email.value;
    const password = this.password.value;
    const username = this.username.value;
    const auth = firebase.auth();
    try {
      const firebaseUser = await auth.createUserWithEmailAndPassword(email, password);
      await firebaseUser.updateProfile({ displayName: username });
      await this.writeAccountData(firebaseUser.uid, username, firebaseUser.email);
      this.props.setUsernameAndID(firebaseUser.displayName, firebaseUser.uid);
    }
    catch (error) { this.setState({ error: error.message }); }
  }

  googleSignIn = () => {
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // var profile = result.additionalUserInfo.profile;

      //fetch la database pour voir si user existe déjà
      accountsRef
      .once("value")
      .then(snapshot => {
        console.log(snapshot.val());
        // return snapshot.val();
        // return recipe.people.creatorID;
      })

      
      this.writeAccountData(user.uid, user.displayName, user.email);
      this.props.setUsernameAndID(user.displayName, user.uid);
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorCode, errorMessage, email, credential)
    });
  }

  writeAccountData = async (userId, username, email) => {
    // const key = firebase.database().ref('/').push().key;
    await firebase.database().ref('Accounts/' + userId).set({
      username,
      email,
      // cookbooksList: [key]
    });
  }

  setDisplay = (display) => {
    this.setState({ display });
  }

  render() {
    return (
      <div className="LoginPage">
        <div className="container">
          <div className="titleSection">
            <h1>Pistach.io</h1>
            <p>Digital familial cookbook. <br/> Create, share and print your recipes.</p>
          </div>
          {/* {this.state.error !== '' && <p className="error">Error occured: {this.state.error}</p>} */}
          {this.state.display === 'signin' ? (
            <div className="Login">
                <div className="googleLogin">
                  <button 
                    id="btnGoogle" 
                    onClick={this.googleSignIn}
                    className="googleSignInBtn">
                    <img src={googleIcon} alt="Google Icon" style={{height: "4em"}}/>
                    Sign in with Google
                  </button>
                  <span>or</span>
                </div>
              <form 
                className="Form"
                onClick={this.login}
                type="submit"
              >
                <label>
                  Email
                  <input 
                    id="txtEmail" 
                    type="email" 
                    placeholder="Email" 
                    ref={r => this.email = r} 
                  />
                </label>
                <label>
                  Password
                  <input 
                    id="txtPassword" 
                    type="password" 
                    placeholder="Password" 
                    ref={r => this.password = r} 
                  />
                </label>
                <button 
                  id="btnSignIn" 
                  className="secondaryBtn">
                  Sign in
                </button>
              </form>
              <div className="logSign"> 
                <a 
                  id="btnSignUp"  
                  onClick={() => this.setDisplay('signup')}>
                  <h5>You don't have an account ? </h5>
                  <span>Signup</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="Signup">
              <form 
                className="Form"
                onSubmit={this.signup}
              >
                <label>
                  Email
                  <input 
                    id="txtEmail" 
                    type="email" 
                    placeholder="Email" 
                    ref={r => this.email = r} 
                  />
                </label>
                <label>
                  Username
                  <input 
                    id="txtName" 
                    type="username" 
                    placeholder="Username" 
                    ref={r => this.username = r} 
                  />
                </label>
                <label>
                  Password
                  <input 
                    id="txtPassword" 
                    type="password" 
                    placeholder="Password" 
                    ref={r => this.password = r} 
                  />
                </label>
                <button 
                  id="btnSignUp" 
                  className="secondaryBtn" 
                  type="submit"
                >
                  Signup
                </button>
              </form>
              <div className="logSign">
                <a 
                  id="btnSignIn" 
                  className="btn btn-action" 
                  onClick={() => this.setDisplay('signin')}>
                  <h5>Already have an account?</h5>
                  <span>Sign In</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LoginPage;
