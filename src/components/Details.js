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
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Box from '@material-ui/core/Box';
import Listscreen from './ListScreen';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import {CocktailsContext} from '../context/cocktailsContext';
import React, { useState, useEffect, useContext } from 'react';

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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
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

  return (
  <div className={classes.main}>
{selectedCocktail != null &&  (
  <Box display="flex" flexDirection="column" alignItems="center">
<Card className={classes.root}>
  <CardHeader
    avatar={
      <Avatar aria-label="recipe" className={classes.avatar}>
       {selectedCocktail.strDrinkThumb}
      </Avatar>
    }
    action={
      <IconButton aria-label="settings">
        <MoreVertIcon />
      </IconButton>
    }
    // title="Shrimp and Chorizo Paella"
    title= {selectedCocktail.strDrink}
    // subheader="September 14, 2016"
  />
  <CardMedia
    className={classes.media}
    // image ="https://cdn.download.ams.birds.cornell.edu/api/v1/asset/202984001"
    image= {selectedCocktail.strDrinkThumb}
    title="Paella dish"
  />
  <CardContent>
    <Typography variant="body2" color="textSecondary" component="p">
    {selectedCocktail.strInstructions}

    </Typography>
  </CardContent>
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