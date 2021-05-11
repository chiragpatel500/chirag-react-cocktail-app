import { Search } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import './App.css';
import ListScreen from './components/ListScreen';
import SearchPage from './components/SearchPage';

function App() {
  return (
    <div className="App">
      <ListScreen />
      <SearchPage/>
    </div>
  );
}

export default App;
