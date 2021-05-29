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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar() {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

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

  const history = useHistory();

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

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "violet" }}>
        <Toolbar>
          {isLoggedIn && (
            <Button color="inherit" onClick={signOut}>
              LogOut
            </Button>
          )}

          <Typography variant="h6" className={classes.title}>
            <Link to="/SearchPage">Buddel Cocktails</Link>
          </Typography>

          <Button color="inherit">
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
