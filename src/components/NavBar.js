import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Login from './Login';
import SearchPage from './SearchPage';
import ChatRoom from './ChatRoom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ChatIcon from '@material-ui/icons/Chat';
import { Icon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,    
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar() {
  const classes = useStyles();

  return (

    <div className={classes.root} >
      <AppBar position="static"style={{backgroundColor:'violet'}}>
        <Toolbar>
          <Button color="inherit">
            <Link to="/Login">Login</Link>
          </Button>
            <Typography variant="h6" className={classes.title} >
                <Link to="/SearchPage">CockTails</Link>
          </Typography>
          <Button color="inherit">
            <Link to="/ChatRoom">Chat</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;