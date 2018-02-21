import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import firebase from './firebase';
// const auth = firebase.auth();

class LoginPage extends Component {
  constructor() {
    super();
    this.state = { userID: undefined, userName: undefined }
  }

  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(firebaseUser => {
  //     var username = this.username.value;
  //     if(firebaseUser) {
  //       // firebaseUser.updateProfile({
  //       //   displayName: username
  //       // })
  //       console.log(username, firebaseUser.uid);
  //       // btnLogout.classList.remove('hide')
  //       this.writeAccountData(firebaseUser.uid, username, firebaseUser.email);
  //     } else {
  //       console.log('Not logged in')
  //       // btnLogout.classList.add('hide')
  //     }
  //   });
  // }

  login = async () => {
    const email = this.email.value;
    const password = this.password.value;
    const username = this.username.value;
    const auth = firebase.auth();
    try {
      const firebaseUser = await auth.signInWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      if (user != null) {
        user.providerData.forEach(function (profile) {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + username);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
          console.log(profile)
        });
      }
      this.props.setUsernameAndID(username, firebaseUser.uid);
    }
    catch(err) {
      console.log(err);
    }
  }

  signup = async () => {
    console.log('signup');
    const email = this.email.value;
    const password = this.password.value;
    const username = this.username.value;
    const auth = firebase.auth();
    try {
      const firebaseUser = await auth.createUserWithEmailAndPassword(email, password);
      console.log(firebaseUser);
      await this.writeAccountData(firebaseUser.uid, username, firebaseUser.email);
      
    }
    catch(err) { console.log(err); }
    // const btnLogout = document.getElementById('btnLogout');
    // promise.catch(e => console.log(e.message));
    
  }

  writeAccountData = async (userId, username, email) => {
    return await firebase.database().ref('Accounts/' + userId).set({
      username: username,
      email: email,
      // profile_picture : imageUrl
    });
  }

  logout = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="App">
        <input id="txtEmail" type="email" placeholder="Email" ref={r => this.email = r} />
        <input id="txtName" type="username" placeholder="Username" ref={r => this.username = r} />
        <input id="txtPassword" type="password" placeholder="Password" ref={r => this.password = r} />
        <button id="btnLogin" className="btn btn-action" onClick={this.login}>Log in</button>
        <button id="btnSignUp" className="btn btn-secondary" onClick={this.signup}>Sign Up</button>
        <button id="btnLogout" className="btn btn-action hide" onClick={this.logout}>Log out</button>
      </div>
    );
  }
}

export default LoginPage;
