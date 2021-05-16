import React, { useState, useEffect } from 'react';
import './App.css';
import ListScreen from './components/ListScreen';
import SearchPage from './components/SearchPage';
import Register from './components/Register';
import Login from './components/Login';
import Details from './components/Details';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <SearchPage />
      {/* <ListScreen />
      <Details/>
      <Register/>
      <Login />
       */}
    </div>
  );
}

export default App;
