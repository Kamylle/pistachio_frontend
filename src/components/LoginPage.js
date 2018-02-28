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
    .then(this.setState())
    .catch(error => { this.setState({ error: error.message }); });
    // console.log(this.state.error)
  }

  signup = async (e) => {
    e.preventDefault();
    const email = this.email.value;
    const password = this.password.value;
    const username = this.username.value;
    const auth = firebase.auth();
    const db = firebase.database();
    const defaultCookbookKey = await db.ref("Cookbooks/").push().key;
    try {
      const firebaseUser = await auth.createUserWithEmailAndPassword(email, password);
      await firebaseUser.updateProfile({ displayName: username });
      await this.writeAccountData(firebaseUser.uid, username, firebaseUser.email);
      this.props.setUsernameAndID(firebaseUser.displayName, firebaseUser.uid);

      // // !!!

      // db.ref(`Accounts/${firebaseUser.uid}/cookbooksList`).set({ 0: defaultCookbookKey });
      // db.ref(`Cookbooks/${defaultCookbookKey}`)
      // .set(
      //   { ownerUserID: firebaseUser.uid,
      //     recipeIDs: [],
      //     title: {
      //       value: "Favorites"
      //     }
      //   }
      // )

      // // !!!
    }
    catch (error) { this.setState({ error: error.message }); }
  }

  googleSignIn = () => {
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      //console.log(user)
      accountsRef
      .once("value")
      .then(snapshot => {
        console.log(snapshot.val());
        const users = snapshot.val();
        if(!users[user.uid]) {
          this.writeAccountData(user.uid, user.displayName, user.email);
        }
        this.props.setUsernameAndID(user.displayName, user.uid);
      })
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
    // * Step 1 : Check if the user already has cookbooks, and save them to 'currentCookbooks'...
    const currentCookbooks = [];
    firebase.database().ref(`Accounts/${userId}/cookbooksList`)
    .on("value", snap => currentCookbooks.push(snap.val())); // Gets the user's current cookbooks, if any exists.

    const flattenedCookbooksList = [].concat.apply([], currentCookbooks); // Flattens the array, if/as required.

    // * Step 2 : Check the length of the returned currentCookbooks array, and build a default cookbook if there are no cookbooks in the array :
    // "BEGIN : If the user has no cookbooks"...
    if (currentCookbooks.length < 1) {

      const defaultCookbookKey = await firebase.database().ref("Cookbooks/").push().key; // Create a key for a new cookbook in Firebase...
      firebase.database().ref(`Accounts/${userId}/cookbooksList`).set({ 0: defaultCookbookKey }); // Sets a new CookbookID/Key at array position 0.
      firebase.database().ref(`Cookbooks/${defaultCookbookKey}`) // Sets the default cookbook's title to 'Favorites'...
      .set(
        { ownerUserID: userId,
          recipeIDs: [],
          title: {
            value: "Favorites"
          }
        }
      )
    }
    // "END : If the user has no cookbooks"...

     // Step 3 : Poll the DB again to make sure any new default cookbook is being taken into account in the next steps.
     const potentialUpdatedCookbooks = [];
     firebase.database().ref(`Accounts/${userId}/cookbooksList`)
     .on("value", snap => potentialUpdatedCookbooks.push(snap.val()));

     const flattenedUpdatedCookbooksList = [].concat.apply([], currentCookbooks); // Flattens the array, if/as required.

     // Step 4 : Convert the flattened 'Updated' CookbooksList into an object that can be set on firebase, under the user's account Node ("cookbooksList"):
    const existingCookbooksList = {};
    flattenedUpdatedCookbooksList.forEach((cookbook, cookbookIdx) => {
      return Object.assign(existingCookbooksList, 
            { [cookbookIdx]: cookbook }
      );
    });

    await firebase.database().ref(`Accounts/${userId}`).set({
      username,
      email,
      cookbooksList: existingCookbooksList
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
