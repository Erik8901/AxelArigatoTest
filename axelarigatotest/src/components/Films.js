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
          movieTitle1: ''
  
      }//State
     this.showMovie = this.showMovie.bind(this) 
  }//Contructo
  
  componentDidMount() {
    axios.get('https://swapi.co/api/films')
    .then(res => {
      let list = res.data.results
     
      list.sort(function(a,b) {
        return a.release_date.slice(0,4) - b.release_date.slice(0,4)
    })
    this.setState({ movies: list });
    console.log(this.state.movies)
  })
}



  showMovie = (movie) => {
    
  this.setState({showInfoMovie: true})
    
    let self = this.state.movies
    for (var i=0; i < self.length; i++) {
     if(self[i].title === movie) {
    console.log(self[i].title)
    this.setState({movieTitle: self[i].title })

    axios.all(self[i].characters.map(chars => axios.get(chars)))
      .then(axios.spread((...res) => {
        //console.log(res)
        let nameList = res
        let charList = []
       
        for(let i=0; i < nameList.length; i++) {
        
          charList.push(nameList[i].data)
          
        this.setState({characters: charList})
        
       // console.log(this.state.characters)
        }
        
      }))
      
     }//if
    }//forLoop
    
  }//showMovie

  hideMovie = () => {
    this.setState({showInfoMovie: false})
  }
  
render() {
  return (
    <div className="Films">
      <h3>All Star Wars Movies:</h3>
        <ul>
          { this.state.movies.length === 0
            ? <h2>Loading movies...</h2>
            :
            this.state.movies.map(movie => <li key={movie.title}>
          <button onClick={() => this.showMovie(movie.title)}>Star Wars, Episode:{movie.episode_id} Date: {movie.release_date}</button>
          
        </li>)}
      </ul>
      {
        this.state.showInfoMovie ?
        <div className="movieInfo">
           <button onClick={() => this.hideMovie()}>Go Back</button>

            {this.state.movieTitle}
          <ul>
         {this.state.characters.map(chars => <li key={chars.name}>
         <p>{chars.name}</p>
         </li>)}
        </ul>
          </div>
        :null
      }
      
    </div>
    );
    }
  }
  export default Films;
  
