// imports
import firebase from "firebase/app";
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "firebase/auth";
import "firebase/firestore";
import { AuthContext } from "../context/authContext";

// Css
const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "violet",
    margintop: "-20px",
  },
  root: {
    maxWidth: 345,
    backgroundColor: "violet",
    color: "white",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  button: {
    marginBottom: "20px",
  },

}));

// Displaying favorites from firebase database with option to delete a particular cocktail
function Favorites() {
  const classes = useStyles();
  const [favorites, setFavorites] = useState();

  const db = firebase.firestore();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  console.log(user);

  // Extracting favorites from the Firebase Database to render in return 
  const myfav = async () => {
    const docRef = await db.collection("users").doc(user.uid).get();
    console.log(docRef.data());
    setFavorites(docRef.data().favorites);
  };

  useEffect(() => {
    if (user) myfav();
  }, [user]);

  // removing a particular favorite from the page as well the firebase database
  const removeFavorite = (idDrink) => {
    console.log("selected your favorite will be removed");
    console.log(idDrink);
    if (user) {
      var userDocument = db.collection("users").doc(user.uid);
      userDocument
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            const newFav = doc.data().favorites.filter((favorite) => {
              return idDrink != favorite.idDrink;
            });
            console.log(newFav);
            userDocument
              .update({ favorites: newFav })
              .then(() => {
                console.log("document updated");
                myfav();
              })
              .catch((error) => {
                console.log("Error getting document:", error);
              });
          } else {

            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  };


  // return
  return (
    <div>
      <p>My Favorite Cocktails </p>
      <div className={classes.main}>
        <Box display="flex" flexDirection="column" alignItems="center">
          {favorites ? (
            favorites.map((favorite) => {
              return (
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label={favorite.strDrinkThumb}
                        className={classes.avatar}
                      >
                        {favorite.strDrinkThumb}
                      </Avatar>
                    }
                    title={favorite.strDrink}
                  />
                  <CardMedia
                    className={classes.media}
                    image={favorite.strDrinkThumb}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <h5>Type of glass :{favorite.strGlass}</h5>
                      <h4>Instructions for making this Cocktail</h4>
                      {favorite.strInstructions}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.button}>
                    <IconButton aria-label="remove favorites">
                      Click <FavoriteIcon
                        onClick={() => removeFavorite(favorite.idDrink)}
                      /> To Delete
                    </IconButton>
                  </CardActions>
                </Card>
              );
            })
          ) : ("No Favorites Selected so far")
          }
        </Box>
      </div>
    </div>
  );
}

export default Favorites;
