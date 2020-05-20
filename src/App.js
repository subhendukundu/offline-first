import React from 'react';
import './App.css';
import Store from './store';
import Vehicles from './components/Vehicles';

function App() {


  return (
    <Store>
      <Vehicles />
    </Store>
  );
}

export default App;
