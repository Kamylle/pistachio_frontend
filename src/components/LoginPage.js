import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import firebase from './firebase';
// const auth = firebase.auth();

var provider = new firebase.auth.GoogleAuthProvider();
// var user = firebase.auth().currentUser;

class LoginPage extends Component {
  constructor() {
    super();
    this.state = { userID: undefined, userName: undefined, display: 'signin', error: '' }
  }

  login = async () => {
    const email = this.email.value;
    const password = this.password.value;
    const username = this.state.userName;
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password).then(firebaseUser => {
      console.log(firebaseUser);
      this.props.setUsernameAndID(firebaseUser.displayName, firebaseUser.uid);
    })
    .catch(error => { this.setState({ error: error.message }); });
  }

  signup = async () => {
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
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var profile = result.additionalUserInfo.profile;
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
    return await firebase.database().ref('Accounts/' + userId).set({
      username: username,
      email: email,
      // profile_picture : imageUrl
    });
  }

  setDisplay = (display) => {
    this.setState({ display });
  }

  // logout = () => {
  //   firebase.auth().signOut();
  // }

  render() {
    return (
      <div className="App">
        {this.state.display === 'signin' ? (
          <div>
            <div>
              <input id="txtEmail" type="email" placeholder="Email" ref={r => this.email = r} />
              <input id="txtPassword" type="password" placeholder="Password" ref={r => this.password = r} />
              <button id="btnSignIn" className="btn btn-action" onClick={this.login}>Sign in</button>
            </div>
            <div>
              <h4> You don't have an account ?</h4>
              <button id="btnSignUp" className="btn btn-action" onClick={() => this.setDisplay('signup')}>Create an account</button>
            </div>
            <div>
              <h4>Or sign in with Google: </h4>
              <button id="btnGoogle" className="btn btn-action hide" onClick={this.googleSignIn}>Sign in with Google</button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <input id="txtEmail" type="email" placeholder="Email" ref={r => this.email = r} />
              <input id="txtName" type="username" placeholder="Username" ref={r => this.username = r} />
              <input id="txtPassword" type="password" placeholder="Password" ref={r => this.password = r} />
              <button id="btnSignUp" className="btn btn-secondary" onClick={this.signup}>Create an account</button>
            </div>
            <div>
              <h4>Already have an account?</h4>
              <button id="btnSignIn" className="btn btn-action" onClick={() => this.setDisplay('signin')}>Sign In</button>
            </div>
          </div>
        )}
        {this.state.error !== '' && <h3>Error occured: {this.state.error}</h3>}
      </div>
    );
  }
}

export default LoginPage;
