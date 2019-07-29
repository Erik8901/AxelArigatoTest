import React, { Component } from 'react';
import axios from 'axios';
import './styles/stylesFilms.css'

class Films extends Component { 
    constructor(props) {
      super(props)
        this.state = {
          movies: [],
          sortedList: []
  
      }//State
  }//Contructo
  
  componentDidMount() {
    axios.get('https://swapi.co/api/films')
    .then(res => {
      let list = res.data.results
      list.sort(function(a,b) {
        return a.release_date.slice(0,4) - b.release_date.slice(0,4)
    })
    this.setState({ movies: list });
    })
  }
  
render() {
  return (
    <div className="Films">
      <h3>All Star Wars Movies:</h3>
        <ul>
          { this.state.movies.length == 0
            ? <h2>Loading movies...</h2>
            :
            this.state.movies.map(movie => <li key={movie.title}>
          <button>Star Wars, Episode:{movie.episode_id} Date: {movie.release_date}</button>
        </li>)}
      </ul>
    </div>
    );
    }
  }
  export default Films;
  