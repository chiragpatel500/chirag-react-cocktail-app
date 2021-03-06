import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import Login from "./Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import firebase from "../firebaseConfig.js";

// Css
const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "violet",
    marginTop: "5%",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "violet",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// Copyright 
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Buddel Cocktails Berlin"}
      <Link color="inherit" href="https://chirag-react-cocktail-app.netlify.app/">
        Buddel Cocktails Berlin
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


// Registration page with Firebase authentication and storing the user data in the firebase database
function Register() {
  const classes = useStyles();
  const [error, setError] = useState(null);

  // Firebase start
  const db = firebase.firestore();
  const [state, setState] = useState({ fullName: "", email: "", password: "" });
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  console.log("in register");

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  console.log(db);

  // Register function which sends the user input data to the firebase 
  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        db.collection("users")
          .doc(user.uid)
          .set({
            fullName: state.fullName,
            email: state.email,
            favorites: [],
          })
          .then(() => {
            db.collection("users")
              .doc(user.uid)
              .get()
              .then((doc) => {
                console.log(doc.data());
                setUser(doc.data());
              });
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        setUser(null);
        setError(error.message);
        setIsLoggedIn(false);
        // ..
      });
  };
  // submit data to the register function
  const handleOnSubmit = (event) => {
    event.preventDefault();
    register();
  };
  // Firebase end

  // return
  return (
    <Container component="main" maxWidth="xs" className={classes.main}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleOnSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fullname"
                name="fullName"
                // fire
                onChange={handleChange}
                value={state.fullName}
                // fire
                variant="outlined"
                required
                fullWidth
                id="fullname"
                label="FullName"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                // fire
                onChange={handleChange}
                value={state.email}
                // fire
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                // fire
                onChange={handleChange}
                value={state.password}
                // fire
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          {error && <p>{error}</p>}
          <Grid container justify="center">
            <Grid item>
              <Link to="/Login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default Register;
