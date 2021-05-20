// 1.import the modules
import React, {createContext, useState, useEffect }from 'react';


//2.inititalize the context
const initCocktailsContext ={
    cocktails:[]
};

//3. create context
export const CocktailsContext = createContext(initCocktailsContext);

//4.make provider =>value/ children 
export const CocktailsContextProvider = ({ children })=>{
    const [cocktails, setCocktails] = useState(initCocktailsContext.cocktails);
    console.log(cocktails);
    return(
        <CocktailsContext.Provider value= {{cocktails, setCocktails}}>
            {children}
        </CocktailsContext.Provider>
    )
}; 