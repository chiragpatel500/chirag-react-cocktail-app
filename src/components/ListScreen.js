import React, { useState, useEffect } from "react";


const ListScreen = () => {
    const [drinks, setdrink] = useState("");
    

  const fetchApi = () => {
    const url = "https://cab-cors-anywhere.herokuapp.com/https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
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
   
    
  return (
    <div>
      {drinks.length !== 0 ? (
        drinks.map((drinks) => {
          return (
            <div>
              
                <li>{drinks.strDrink}</li>
                <li>{drinks.strDrinkThumb}</li>
                  
            </div>
          );
        })
      ) : (
        <p>Searching For you</p>
      )}
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
