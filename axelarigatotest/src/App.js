import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Films from './components/Films'

class App extends Component { 
  constructor(props) {
    super(props)
      this.state = {
       
      }//State
}//Contructo

render() {
  return (
    <div className="App">
    <h1>Star Wars Movie Database</h1>
      <Films/>
    </div>
  );
  }
}
export default App;
