// imports
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

// Css 
const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "violet",
    color: "white",
    fontFamily: "arial",
  },
  root: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "center",
    width: "100vw",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  button: {
    margin: theme.spacing(1),
  },
}));


// the Search page
function SearchPage() {
  const classes = useStyles();
  const history = useHistory();
  const [searchKey, setSearchKey] = useState("");
 
  // Search function
  const SearchFunction = (ev) => {
    setSearchKey(ev.target.value);
  };

  // return
  return (
    <div className={classes.main}>
      <div>
        <h2> WELCOME TO BUDDEL'S COCKTAILS CHOICE APP</h2>
        <h4>
          Choose the Cocktail of your choice and learn how to make it
        </h4>
        <h4>
          Seacrh for your preffered choice of cocktail and know
          about it's details
        </h4>
        <h4>
          Once you find the cocktail of your choice kindly click on it to get
          more details about it.
        </h4>
        <div className={classes.root}>
          <TextField
            id="outlined-full-width"
            style={{ margin: 7 }}
            placeholder="e.g Margarita"
            onChange={(ev) => SearchFunction(ev)}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          {searchKey == "" ? <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
          ></Button> : <Link to={`/ListScreen/${searchKey}`}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<Icon>send</Icon>}
            ></Button>
          </Link>}
        </div>
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUISDO05e3kmEAQNLEbkK_dYlF2G_Dbk3nJw&usqp=CAU"
            alt="buddel cocktail"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
