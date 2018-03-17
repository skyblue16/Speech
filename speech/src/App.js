import React, { Component } from 'react';
import AccesoGoogle from './components/AccesoGoogle';
import logo from './logo.svg';
import './App.css';
//accesogoogle contiene todos los demas componentes 
// asi dejo limpio el app.js
class App extends Component {
  render() {
    return (
      <div className="App">
       <AccesoGoogle />
      </div>
    );
  }
}

export default App;