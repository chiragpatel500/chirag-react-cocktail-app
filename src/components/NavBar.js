import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Login from './Login';
import SearchPage from './SearchPage';
import ChatRoom from './ChatRoom';
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <link to="/Login">
            <Button color="inherit">Login</Button>
          </link>
          <link to="/SearchPage">
          <Typography variant="h6" className={classes.title}>
            CockTails 
          </Typography>
          </link>
          <link to="/ChatRoom"><Button color="inherit">Chat</Button>
          </link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;