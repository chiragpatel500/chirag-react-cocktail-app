import firebase from "firebase/app";
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import "firebase/auth";
import "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../context/authContext";

// const useStyles = makeStyles((theme) => ({
//   main:{
//    backgroundColor:'violet',
//    margintop: '-20px',
//   },
//    root: {
//      maxWidth: 345,
//      backgroundColor:'violet',
//      color:'white',
//    },
//    media: {
//      height: 0,
//      paddingTop: '56.25%', // 16:9
//    },
//  }));
// const classes = useStyles();  

function Favorites() {
  // const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [selectedfav, setSelectedfav] = useState(true);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

       const db = firebase.firestore();
          const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
           console.log(user);                                                       
                const myfav= async()=>{
                         const docRef = await db.collection("users")
                                      .doc(user.uid)
                                            .get()                          
                                              console.log(docRef.data());                                   
                                      const selectedfav = docRef.data().Favorites;
                                        console.log(selectedfav);
                                  };

                                  useEffect(() => {
                                    myfav();
                                  }, []);                               
  
                              return(
                                <div>
                                <p>my favorites</p>
                                    {/* <div className={classes.main}>
                                      <Box display="flex" flexDirection="column" alignItems="center">
                                        Favorites.map((selectedfav) => {
                                         return (
                                         <Card className={classes.root}>
                                           <CardHeader
                                             avatar={
                                               <Avatar aria-label={selectedfav.strDrinkThumb} className={classes.avatar}>
                                                 {selectedfav.strDrinkThumb}
                                               </Avatar>
                                             }
                                             title={selectedfav.strDrink}
                                           />
                                           <CardMedia
                                             className={classes.media}
                                             image={selectedfav.strDrinkThumb}
                                            />
                                           <CardContent>
                                             <Typography variant="body2" color="textSecondary" component="p">
                                               <h5>Type of glass :{selectedfav.strGlass}</h5>
                                               <h4>Instructions for making this Cocktail</h4>
                                               {selectedfav.strInstructions}
                                             </Typography>
                                           </CardContent>
                                         </Card>
                                       )})
                                    </Box> 
                                </div>        */}
                           </div> )
};

export default Favorites;
