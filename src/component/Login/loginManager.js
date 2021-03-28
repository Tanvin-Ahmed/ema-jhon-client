import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }else {
        firebase.app(); // if already initialized, use that one
      }
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const {displayName, photoURL, email} = result.user;
        const signedInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL,
            success: true
        }
        return signedInUser
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorMessage, email);
        // ...
      });
  };

  export const handleFacebookSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;
        user.success = true;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;
        return (user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorMessage);
        // ...
      });
  };


//   export const handleGithubSignIn = () => {
//     const githubProvider = new firebase.auth.GithubAuthProvider();
//     firebase
//       .auth()
//       .signInWithPopup(githubProvider)
//       .then((result) => {
//         /** @type {firebase.auth.OAuthCredential} */
//         var credential = result.credential;

//         // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//         var token = credential.accessToken;

//         // The signed-in user info.
//         var user = result.user;
//         console.log(user);
//         setUser(user);
//         // ...
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // The email of the user's account used.
//         var email = error.email;
//         // The firebase.auth.AuthCredential type that was used.
//         var credential = error.credential;
//         // ...
//         console.log(errorMessage);
//       });
//   };

  export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        success: false
      }
      return (signedOutUser);
    }).catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }

 export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      // Signed in
      const newUserInfo = result.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      return newUserInfo;
      // ..
    });
 } 

 export const signInWithEmailAndPassword = (email, password) => {
    return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      // Signed in
      const newUserInfo = result.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const newUserInfo = {};
      newUserInfo.error = error.Message;
      newUserInfo.success = false;
      return (newUserInfo);
    });
 }

 const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    console.log(name);
    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log("user Name Update Successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };