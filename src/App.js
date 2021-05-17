import React, { useState, useEffect } from 'react';
import './App.css';
import SearchPage from './components/SearchPage';
import NavBar from './components/NavBar';
import ListScreen from './components/ListScreen';
import Details from './components/Details';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <NavBar/>
      <SearchPage />
    <Switch>
          <Route exact path="/">
            <SearchPage />
          </Route>
          <Route exact path="/ListScreen">
            <ListScreen />
          </Route>
          <Route exact path="/detail/:id" children={<Details />} />
        </Switch>
      
      </div>
    </Router>
  );
}

export default App;
