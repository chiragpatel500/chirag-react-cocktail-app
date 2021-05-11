import React, { useState, useEffect } from 'react';
import './App.css';
import ListScreen from './components/ListScreen';
import SearchPage from './components/SearchPage';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <SearchPage />
      <ListScreen />
      <Register />
      <Login/>
    </div>
  );
}

export default App;
