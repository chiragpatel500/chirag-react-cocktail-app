import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { red } from '@material-ui/core/colors';
import ListScreen from './ListScreen';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: "center", 
    width: '100%',
    marginTop:"35%",
    backgroundColor:'blanchedalmond',
  },
  
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  
  },

   button: {
    margin: theme.spacing(2),
  },
   
}));

function SearchPage() {
  const classes = useStyles();
  const [searchKey, setSearchKey]= useState("");
const SearchFunction = (ev)=>{
  setSearchKey(ev.target.value);
};
  return (
    <div className={classes.root} >
         <TextField
          id="outlined-full-width"
          style={{ margin: 7 },{backgroundColor:'red'}}
          placeholder="e.g Margarita"
          onChange={(ev)=>SearchFunction(ev)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"/>
          
          <Link to={`/ListScreen/${searchKey}`}>
          <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
        </Button> 
</Link>
    
     
      
    </div>
  );
}

export default SearchPage;
