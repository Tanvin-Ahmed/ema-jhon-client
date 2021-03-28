import React, { useContext } from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import { createUserWithEmailAndPassword, handleFacebookSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from "./loginManager";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  initializeLoginFramework();

  // redirection
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
}



  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }
  
  const facebookSignIn = () => {
    handleFacebookSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }



  // mail password
  let isFormValid = true;
  const handleFormData = (e) => {
    console.log(e.target.name, e.target.value);
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
      console.log(isFormValid);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
      console.log(isFormValid);
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      console.log(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      console.log(newUser);
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if (!newUser && user.email && user.password) {
      console.log(newUser);
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    e.preventDefault();
  };

  return (
    <div className="App">
      <button onClick={signOut}>Sign Out</button>
      <button onClick={googleSignIn}>Sign In With Google</button>
      <button onClick={facebookSignIn}>Sign In With Facebook</button>
      {/* <button onClick={handleGithubSignIn}>Sign In With Github</button> */}

      <div>
        <h1>Our own Authentication</h1>
        <input
          type="checkbox"
          onChange={() => setNewUser(!newUser)}
          name="newUser"
          id=""
        />
        <label htmlFor="newUser">New User Sign up</label>
        <form onSubmit={handleSubmit}>
          {newUser && (
            <input
              type="text"
              name="name"
              onBlur={handleFormData}
              placeholder="Name"
              required
            />
          )}
          <br />
          <input
            type="email"
            name="email"
            onBlur={handleFormData}
            placeholder="Email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            onBlur={handleFormData}
            placeholder="Password"
            required
          />
          <br />
          <input
            type="submit"
            value={newUser ? "Sign Up" : "Sign In"}
            onClick={handleSubmit}
          />
        </form>
        {user.success ? (
          <p style={{ color: "green" }}>
            User {newUser ? "Created" : "Logged In"} Successfully
          </p>
        ) : (
          <p style={{ color: "red" }}>{user.error}</p>
        )}
      </div>

      <h3>User: {user.displayName}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
};

export default Login;
