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


function App() {
  return (   
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
          <Route exact path="/Details">
          <Details/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
