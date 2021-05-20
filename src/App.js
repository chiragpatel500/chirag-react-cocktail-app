import React, { useState, useEffect } from 'react';
import './App.css';
import SearchPage from './components/SearchPage';
import NavBar from './components/NavBar';
import ListScreen from './components/ListScreen';
import Details from './components/Details';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ChatRoom from './components/ChatRoom';
import {CocktailsContextProvider} from './context/cocktailsContext';

// This can be used anywhere in the app
// const Wrapper = ({ children }) => (
//   <div>
//     <h1> header</h1>
//     <div>{children}</div>
//     <div>footer</div>
//   </div>
// );

function App() {
  return ( 
      <CocktailsContextProvider>
    <Router>
    <div className="App">
      <NavBar/>
        <Switch>
            <Route exact path="/">
            <SearchPage />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/SearchPage">
        <SearchPage/>
          </Route>
          <Route exact path="/ChatRoom">
            <ChatRoom />
          </Route>
          <Route exact path="/Register">
            <Register />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/ListScreen/:cocktailsName">
            <ListScreen/>
          </Route>
          <Route exact path="/Details/:drinkId">
          <Details/>
          </Route>
        </Switch>
      </div>
    </Router>
  </CocktailsContextProvider>
  );
}

export default App;
