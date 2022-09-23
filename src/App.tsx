import React from 'react';
import './App.css';
import { RandomFact } from './components/RandomFact';
import { Settings } from './components/Settings';
import { Tracker } from './components/Tracker';

function App() {
  return (
    <div className="app">
      <div className="container">
        <Settings />
        <RandomFact />
        <Tracker />
      </div>
    </div>
  );
}

export default App;
