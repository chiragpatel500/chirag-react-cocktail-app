// imports
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import firebase from "../firebaseConfig.js";
import { useHistory } from "react-router-dom";

// Css
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

// Navigation bar function with navigation to login/out and FAVORITES
function NavBar() {
  const classes = useStyles();
  const history = useHistory();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    // the login function to check if user is checked in or not 
  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //signed in.
        console.log(user);
        setUser(user);
        setIsLoggedIn(true);
      } else {
        // No user is signed in.
        console.log("Not signed in");
      }
    });
  };
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  // Log out function to log out the user.
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        setUser(null);
        history.push("/Searchpage");
        console.log("you are signed out");
      })
      .catch((error) => {
        console.log("oops ");
      });
  };

// return
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "violet" }}>
        <Toolbar>
          {/* only If, the user is loggedin it will display logout */}
          {isLoggedIn && (
            <Button color="inherit" onClick={signOut}>
              LogOut
            </Button>
          )}

          <Typography variant="h6" className={classes.title}>
            <Link to="/SearchPage">Buddel Cocktails</Link>
          </Typography>

          <Button color="inherit">
            {/* if loggedin is true then it will display FAVORITES else The login button */}
            {isLoggedIn ? (
              <Link to="/Favorites">Favorites</Link>
            ) : (
              <Link to="/Login">Login </Link>
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
