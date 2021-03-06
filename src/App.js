import React from "react";
import "./App.css";
import SearchPage from "./components/SearchPage";
import NavBar from "./components/NavBar";
import ListScreen from "./components/ListScreen";
import Details from "./components/Details";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CocktailsContextProvider } from "./context/cocktailsContext";
import BottomNav from "./components/BottomNav";
import { AuthContextProvider } from "./context/authContext";
import Favorites from "./components/Favorites";

function App() {
  console.log(process.env.REACT_APP_AUTH_DOMAIN);
  
  return (
    <AuthContextProvider> 
      <CocktailsContextProvider>
        <Router>
          <div className="App">
            <NavBar />
            <Switch>
              <Route exact path="/">
                <SearchPage />
              </Route>
              <Route exact path="/Login">
                <Login />
              </Route>
              <Route exact path="/SearchPage">
                <SearchPage />
              </Route>
              <Route exact path="/Favorites">
                <Favorites />
              </Route>
              <Route exact path="/Register">
                <Register />
              </Route>
              <Route exact path="/Login">
                <Login />
              </Route>
              <Route exact path="/ListScreen/:cocktailsName">
                <ListScreen />
              </Route>
              <Route exact path="/Details/:drinkId">
                <Details />
              </Route>
            </Switch>
            <BottomNav />
          </div>
        </Router>
      </CocktailsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
