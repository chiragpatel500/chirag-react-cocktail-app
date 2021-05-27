import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import { BrowserRouter as Router,Switch,Route,Link, useParams, } from "react-router-dom";
import Details from "./Details";
import {CocktailsContext} from '../context/cocktailsContext';




const ListScreen = (props) => { 
  const { cocktails, setCocktails} = useContext(CocktailsContext);
  let {cocktailsName} = useParams();

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

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
            setLoading(false)
            if(data.drinks === null){
              setError('Sorry, this drink is not available')
            }else{
              setCocktails(data.drinks);
            }
       
        });
  };

  useEffect(() => {
    fetchApi();
  },[]);

const useStyles = makeStyles((theme) => ({
  main:{
    backgroundColor:'violet',
    color:'white',
    margintop:'-20px',
    paddingBottom:'25px',
  },  
  root: {
      width: "100%",
      maxWidth: "30ch",
    // backgroundColor: theme.palette.background.paper,
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
    <div className={classes.main}>
    <Box display="flex" flexDirection="column" alignItems="center">
      {
        loading ? (
          <p>Searching For you</p>
        ): (
          error === null ? (
            cocktails.map((cocktail) => {
              return (
                <Link to={`/Details/${cocktail.idDrink}`}>
                   <List className={classes.root}>
                     <ListItem>
                       <ListItemAvatar>
                       <Avatar
                          alt="Remy Sharp"
                          src={cocktail.strDrinkThumb}
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
                              <li>{cocktail.strDrink}</li>
                              <li>{cocktail.strCategory}</li>
                            </Typography>
                            Type:{cocktail.strAlcoholic} 
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </List>
              </Link>
              );
            })
          ) : (
            <p>{error}</p>
          )
        )
      }
     
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUISDO05e3kmEAQNLEbkK_dYlF2G_Dbk3nJw&usqp=CAU" alt="" />
    </Box>
    </div>
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
