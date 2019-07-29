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
          characters: []
  
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
    console.log(this.state.movies)
    })
    
    
   
  }

  showMovie = (movie) => {
    this.setState({showInfoMovie: true})
    
    let self = this.state.movies
    for (var i=0; i < self.length; i++) {
     if(self[i].title === movie) {
    //  console.log(self[i].characters)

      axios.all(self[i].characters.map(chars => axios.get(chars)))
      .then(axios.spread(function(...res) {
       // console.log(res)
        let charList = res
        let nameList = []
        for(let i=0; i < charList.length; i++) {
         //console.log(charList[i].data.name)
          nameList.push(charList[i].data.name)
          
         


          console.log(nameList)
        }
        //this.setState({characters: nameList})
      }))
     
      
      
      //this.setState({movieInfo:self[i].characters})
      
     }//if
    }//forLoop
  }//showMovie

  hideMovie = () => {
    
    console.log("iojppz")
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
        <div className="movieInfo">{this.state.movieInfo}
          <button onClick={() => this.hideMovie()}>Go Back</button>
        
        </div>
        :null
      }
      
    </div>
    );
    }
  }
  export default Films;
  
