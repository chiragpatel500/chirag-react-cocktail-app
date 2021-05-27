import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Box from '@material-ui/core/Box';
import Listscreen from './ListScreen';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import {CocktailsContext} from '../context/cocktailsContext';
import { AuthContext } from "../context/authContext";
import firebase from "../firebaseConfig.js";

const useStyles = makeStyles((theme) => ({
 main:{
  backgroundColor:'violet',
  margintop: '-20px',
 },
  root: {
    maxWidth: 345,
    backgroundColor:'violet',
    color:'white',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
 
  // avatar: {
  //   backgroundColor: red[500],
  // },
}));

function Details() {
  const classes = useStyles();
  const { cocktails, setCocktails} = useContext(CocktailsContext);

  let {drinkId} = useParams();
  console.log(drinkId);

  const [selectedCocktail, setSelectedCocktail] = useState(null);
  console.log(cocktails);

  const findCocktail =()=>{
  const selectedCocktail = cocktails.filter(cocktail=>{
    console.log(cocktail.idDrink)
    return cocktail.idDrink == drinkId
    })
    setSelectedCocktail(selectedCocktail[0])
  }
  console.log(selectedCocktail)

useEffect(() => {
  findCocktail();
},[]);


const db = firebase.firestore();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const {Cocktails } = useParams();
  console.log(cocktails);
  const addFavorite = () => {
    var userDocument = db.collection("Cocktails").doc(user.uid);
    userDocument
      .update({
        favorites: firebase.firestore.FieldValue.arrayUnion(cocktails),
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  return (
  <div className={classes.main}>
{selectedCocktail != null &&  (
  <Box display="flex" flexDirection="column" alignItems="center">
<Card className={classes.root}>
  <CardHeader
    avatar={
      <Avatar aria-label={selectedCocktail.strDrinkThumb} className={classes.avatar}>
       {selectedCocktail.strDrinkThumb}
      </Avatar>
    }
    title= {selectedCocktail.strDrink}
  />
  <CardMedia
    className={classes.media}
    image= {selectedCocktail.strDrinkThumb}
  />
  <CardContent>
    <Typography variant="body2" color="textSecondary" component="p">
    <h5>Type of glass :{selectedCocktail.strGlass}</h5>
    <h4>Instructions for making this Cocktail</h4>
    {selectedCocktail.strInstructions}
    </Typography>
  </CardContent>
  <CardActions>
      <IconButton aria-label="add to favorites">
          <FavoriteIcon  onClick={() => addFavorite()} />
      </IconButton>
  </CardActions>

    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUISDO05e3kmEAQNLEbkK_dYlF2G_Dbk3nJw&usqp=CAU" alt="" />
</Card>
</Box>
)}
</div> 
)
}

export default Details;

// Deatails
// deatils 1 shows name = "strDrink": "Margarita",
// details 2 shows picture = "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
// detail 3 shows cetgory = "strCategory": "Ordinary Drink",
// detail 4 shows type = "strAlcoholic": "Alcoholic",
// detail 5 shows glass type ="Cocktail glass",
// deatils 6 shows making process = "strInstructions":"In a mixing glass half-filled with crushed ice",