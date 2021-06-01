// imports
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Box from "@material-ui/core/Box";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { CocktailsContext } from "../context/cocktailsContext";
import { AuthContext } from "../context/authContext";
import firebase from "../firebaseConfig.js";
import { useHistory } from "react-router-dom";

// Css
const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "violet",
    margintop: "-20px",
    paddingBottom: "10px",
  },
  root: {
    maxWidth: 345,
    backgroundColor: "violet",
    color: "white",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

// Details Page
function Details() {
  const classes = useStyles();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { cocktails, setCocktails } = useContext(CocktailsContext);
  const history = useHistory();
  let { drinkId } = useParams();
  console.log(drinkId);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  console.log(cocktails);

  // Filtering the cocktail per id
  const findCocktail = () => {
    const selectedCocktail = cocktails.filter((cocktail) => {
      console.log(cocktail.idDrink);
      return cocktail.idDrink == drinkId;
    });
    setSelectedCocktail(selectedCocktail[0]);
  };
  console.log(selectedCocktail);

  useEffect(() => {
    findCocktail();
  }, []);

  // saving the favorite in the firebase database
  const db = firebase.firestore();
  const addFavorite = () => {
    console.log("hello");
    if (user) {
      var userDocument = db.collection("users").doc(user.uid);
      userDocument
        .update({
          favorites: firebase.firestore.FieldValue.arrayUnion(selectedCocktail),
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    } else {
      history.push("/Login");
    }
  };

  // return
  return (
    <div className={classes.main}>
      {selectedCocktail != null && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label={selectedCocktail.strDrinkThumb}
                  className={classes.avatar}
                >
                  {selectedCocktail.strDrinkThumb}
                </Avatar>
              }
              title={selectedCocktail.strDrink}
            />
            <CardMedia
              className={classes.media}
              image={selectedCocktail.strDrinkThumb}
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
                Click <FavoriteIcon onClick={() => addFavorite()} />
                Favorite
              </IconButton>
            </CardActions>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUISDO05e3kmEAQNLEbkK_dYlF2G_Dbk3nJw&usqp=CAU"
              alt=""
            />
          </Card>
        </Box>
      )}
    </div>
  );
}

export default Details;
