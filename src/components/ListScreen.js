import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import { BrowserRouter as Router,Switch,Route,Link, useParams} from "react-router-dom";
import Details from "./Details";
// import {CocktailsContext} from '../context/cocktailsContext';



const ListScreen = (props) => {
  const [drinks, setdrink] = useState("");
  
let {cocktailsName} = useParams();
  const fetchApi = () => {
    const url = "https://cab-cors-anywhere.herokuapp.com/https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+cocktailsName;
    fetch(url, {
      method: "GET",
      headers: {
        "X-Auth-Token": "1",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
        .then((data) => {
            console.log(data);
            setdrink(data.drinks);
       
        });
  };

  useEffect(() => {
    fetchApi();
  });

const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline"
  },
    flexcenter: {
      display: "flex",
      flexDirection:"column",
      alignItems: "center",
    }
  }));

  const classes = useStyles();
    
  return (
    <Router>
    <Box display="flex" flexDirection="column" alignItems="center">
      {drinks.length !== 0 ? (
        drinks.map((drinks) => {
          return (
               <List className={classes.root}>
                 <ListItem>
                   <ListItemAvatar>
                   <Avatar
                      alt="Remy Sharp"
                      src={drinks.strDrinkThumb}
                      className={classes.large}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <li>{drinks.strDrink}</li>
                        </Typography>
                        Type:{drinks.strAlcoholic}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
          );
        })
      ) : (
        <p>Searching For you</p>
      )}
    </Box>
  </Router>
  );
};

export default ListScreen;


// listscreen
// www.thecocktaildb.com/api/json/v1/1/search.php?
// Main screen shows name =    "strDrink": "Margarita",,
// Main shows thumbnail  = "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",

// Deatails
// deatils 1 shows name = "strDrink": "Margarita",
// details 2 shows picture = "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
// detail 3 shows cetgory = "strCategory": "Ordinary Drink",
// detail 4 shows type = "strAlcoholic": "Alcoholic",
// detail 5 shows glass type ="Cocktail glass",
// deatils 6 shows making process = "strInstructions":"In a mixing glass half-filled with crushed ice",
