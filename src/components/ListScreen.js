// import React, { useState, useEffect } from "react";


// const ListScreen = () => {
//     const [drinks, setdrink] = useState("");
    

//   const fetchApi = () => {
//     const url = "https://cab-cors-anywhere.herokuapp.com/https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
//     fetch(url, {
//       method: "GET",
//       headers: {
//         "X-Auth-Token": "1",
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         console.log(response);
//         return response.json();
//       })
//         .then((data) => {
//             console.log(data);
//             setdrink(data.drinks);
       
//         });
//   };

//   useEffect(() => {
//     fetchApi();
//   });
   
    
//   return (
//     <div>
//       {drinks.length !== 0 ? (
//         drinks.map((drinks) => {
//           return (
//             <div>
              
//                 <li>{drinks.strDrink}</li>
//                 <li>{drinks.strDrinkThumb}</li>
                  
//             </div>
//           );
//         })
//       ) : (
//         <p>Searching For you</p>
//       )}
//     </div>
//   );
// };

// export default ListScreen;



import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";




export default function AlignItemsList() {
  const [drinks, setdrink] = useState("");

  const fetchApi = () => {
    const url =
      "https://cab-cors-anywhere.herokuapp.com/https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
    fetch(url, {
      method: "GET",
      headers: {
        "X-Auth-Token": "1",
        "Content-Type": "application/json"
      }
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
    }
  }));

  const classes = useStyles();

  return (
    <div>
      {drinks.length !== 0 ? (
        drinks.map((drinks) => {
          return (
            <div>
              
              {/* <li>{drinks.strDrink}</li>
              <li>{drinks.strDrinkThumb}</li> */}
              <List className={classes.root}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={drinks.strDrinkThumb}
                      className={classes.large}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    // primary = <p>{drinks.strDrink}</p>
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
                        {/* {" — I'll be in your neighborhood doing errands this…"} */}
                        Type:{drinks.strAlcoholic}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            </div>
          );
        })
      ) : (
        <p>Searching For you</p>
      )}
    </div>
  );
}

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
