import React from 'react';
import './App.css';
import { RandomFact } from './components/RandomFact';
import { Tracker } from './components/Tracker';

function App() {
  return (
    <div className="app">
      <RandomFact />
      <Tracker />
    </div>
  );
}

export default App;
