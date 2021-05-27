import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Login from './Login';
import SearchPage from './SearchPage';
import Favorites from './Favorites';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ChatIcon from '@material-ui/icons/Chat';
import { Icon } from '@material-ui/core';
import { AuthContext } from "../context/authContext";
import firebase from "../firebaseConfig.js";


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
      } else {
        // No user is signed in.
        console.log("Not signed in")
      }
    });
  };
  useEffect(() => {
    checkIfLoggedIn();
  }, []);
  
  
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <AppBar position="static" style={{backgroundColor:'violet'}}>
        <Toolbar>
          <Button color="inherit">
            <Link to="/Login">Login</Link>     
          </Button> 
          <Link to="/SearchPage">{isLoggedIn && <h6>LogOut</h6>}</Link>
            <Typography variant="h6" className={classes.title} >
                <Link to="/SearchPage">Buddel Cocktails</Link>
          </Typography>
          {/* {user && <p>Welcome {user.name}</p>} */}
          <Button color="inherit">
            <Link to="/Favorites">Favorites</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;