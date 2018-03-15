import React, { Component } from 'react';
import AccesoGoogle from './components/AccesoGoogle';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
       <AccesoGoogle onClick/>
      </div>
    );
  }
}

export default App;
