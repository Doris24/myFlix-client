import React from 'react';
import axios from 'axios'; // used to fetch movie

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super(); // initializes the component's state, calls constructor of the parent class (here: React.Component)
    this.state = {
      movies: [],
      selectedMovie: null //state value to identify if movie cards were clicked
    }
  }

  //mounted: fully renderd and added to DOM -> visible in browser
  //execute code right after the component is mounted
  componentDidMount() {
    axios.get('https://movyis.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() { //what will be seen on screen
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView
            movie={selectedMovie}
            onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />

          : movies.map(movie => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />))
        }
      </div>
    );
  }
}