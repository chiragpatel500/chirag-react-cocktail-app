import React, { useState, useContext } from "react";
import { Grid,Paper, Avatar, TextField, Button, Typography} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Register from './Register';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import firebase from "../firebaseConfig.js";
import { useHistory } from "react-router-dom";
import SearchPage from './SearchPage';


const Login=()=>{
    // Firebase start
    const [state, setState] = useState({ email: "", password: "" });
    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
   const [error, setError] = useState(null);
   
const handleChange = (e) => {
      setState({ ...state, [e.target.name]: e.target.value });
    };
  const history = useHistory();

    const login = () => {
      console.log(state.email)
        firebase
        .auth()
        .signInWithEmailAndPassword(state.email, state.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          setUser(user);
          setIsLoggedIn(true);
          history.push("/Searchpage")
          console.log(user);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          setUser(null);
          setIsLoggedIn(false);
          setError(error.message);
          console.log(error);
        });
    };

            const signOut =()=>{
              firebase
              .auth()
              .signOut()
              .then(() => {
              console.log("you are signed out")
            })
            .catch((error) => {
              console.log("oops ")
            });
            };
              

  
    const handleOnSubmit = (event) => {
      event.preventDefault();
      login();
    };
    // Firebase end 

    
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto", backgroundColor:'violet',}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Log In</h2>
                </Grid>
                <TextField onChange={handleChange} name='email' label='Email' placeholder='Enter Email' fullWidth required/>
                <TextField onChange={handleChange} name='password' label='Password' placeholder='Enter password' type='password' fullWidth required/>
            
            <FormControlLabel control={<Checkbox name="checkedB" color="primary"/>} label="Remember me"/>
                
                
                <Button onClick={handleOnSubmit} color='primary' variant="contained" style={btnstyle} fullWidth>sign-in</Button>
        {
          error && <p>{error}</p>
        }
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link to="/Register">
                     Register Now 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login;
