import React from 'react';
import Bingo from '../Bingo';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <h1>Play Amazing BINGO</h1>
      <div className="container">
        <Bingo />
      </div>
    </div>
  );
};

export default App;
