import React, { Component } from 'react';
import axios from 'axios';
import './styles/stylesFilms.css'

class Films extends Component { 
    constructor(props) {
      super(props)
        this.state = {
          movies: [],
          showInfoMovie: false,
          movieInfo: [],
          characters: [],
          movieTitle: '',
        }//State
    this.showMovie = this.showMovie.bind(this) 
  }//Contructo
  
  componentDidMount() {
    axios.get('https://swapi.co/api/films')
      .then(result => {
        let movieListSortByDate = result.data.results
     
        movieListSortByDate.sort(function(a,b) {
          return a.release_date.slice(0,4) - b.release_date.slice(0,4)
      })
    this.setState({ movies: movieListSortByDate });
  })
}//ComponentDidMount

showMovie = (movie) => {
  this.setState({showInfoMovie: true})
    
    let findClickedMovie = this.state.movies
      
      for (var i=0; i < findClickedMovie.length; i++) {
        if(findClickedMovie[i].title === movie) {
        this.setState({movieTitle: findClickedMovie[i].title })
    
        axios.all(findClickedMovie[i].characters.map(chars => axios.get(chars)))
        .then(axios.spread((...result) => {
          let ListOfCharactersInMovie = result
          let ListOfCharactersToShow = []
       
            for(let i=0; i < ListOfCharactersInMovie.length; i++) {
              ListOfCharactersToShow.push(ListOfCharactersInMovie[i].data)
          
  this.setState({characters: ListOfCharactersToShow })
        }//forLoop characters
      }))//axios call characters
    }//ifStatmentFindMovie
  }//forLoopFindMovie
}//showMovie

hideMovie = () => {
  this.setState({characters: []})
  this.setState({showInfoMovie: false})
}//hideMovie
  
render() {
  return (
    <div className="films">
      <h3>All Star Wars Movies:</h3>
        <h4>In asscending order by release date:</h4>
          <ul>
            {this.state.movies.length === 0
              ? <div className="loadingScreen"><h2>Loading movies...</h2></div>
              :
                this.state.movies.map(movie => 
            <li key={movie.title}>
              <button className="showMovie" onClick={() => this.showMovie(movie.title)}>
                {movie.title} | Episode: {movie.episode_id} | Release Date: {movie.release_date}</button>
            </li>)}
          </ul>
            
        {this.state.showInfoMovie ?
          <div className="movieInfo">
            <button className="goBack" onClick={() => this.hideMovie()}>Go Back</button>
              <p className="nameOfEpisode">Name of Epiode: {this.state.movieTitle}</p>
              <p className="chars">Characters in this episode:</p>
            <ul className="ulCharacters">
                {this.state.characters.map(chars => 
              <li className="listCharacters" key={chars.name}>
                <p>Name: {chars.name}</p>
              </li>)}
            </ul>
        </div>//movieInfo
        :null
      }
    </div>//Div Films
    );//return
  }//render
}//Films Component
  
 export default Films;
  
