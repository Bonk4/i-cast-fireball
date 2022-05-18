import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/NavBar/navbar';
import { InitiativeApp } from './components/InitiativeApp/InitiativeApp';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <InitiativeApp />
    </div>
  );
}

export default App;
