import firebase from "firebase/app";
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import "firebase/auth";
import "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../context/authContext";

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
    paddingTop: "56.25%", // 16:9
  },
}));

function Favorites() {
  const [favorites, setFavorites] = useState();
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  const db = firebase.firestore();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  console.log(user);
  const myfav = async () => {
    const docRef = await db.collection("users").doc(user.uid).get();
    console.log(docRef.data());

    setFavorites(docRef.data().favorites);
  };

  useEffect(() => {
    if (user) myfav();
  }, [user]);
  const classes = useStyles();
  return (
    <div>
      <p>My Favorite cocktails </p>
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
                </Card>
              );
            })
          ) : (
            <p>No favorites selected so far</p>
          )}
        </Box>
      </div>
    </div>
  );
}

export default Favorites;
