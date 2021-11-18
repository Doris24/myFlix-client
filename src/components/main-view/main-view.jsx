import React from 'react';
import axios from 'axios'; // used to fetch movie

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super(); // initializes the component's state, calls constructor of the parent class (here: React.Component)
    //initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null, //state value to identify if movie cards were clicked
      user: null,
      register: null
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
  //function that updates the state of the selectedMovie Property when movie is clicked
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  //updates user state, when successfully logged in
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  render() { //what will be seen on screen
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return <RegistrationView onRegister={register => this.onRegister(register)} />

    //if there is no user, the LoginView is rendered, if user is logged in, the user details are passed as a prop to the LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;


    //Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">

        {/* If the state of selectedMovie is not null, that selected movie will be returned otherwise, all movies will be returned */}
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

        <button type="button">Unregister</button>
      </div>
    );
  }
}