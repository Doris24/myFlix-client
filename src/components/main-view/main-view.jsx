import React from 'react';

import { MovieCard } from '../movie-card/movie-card';

export class MainView extends React.Component {

  constructor() {
    super(); // initializes the component's state, calls constructor of the parent class (here: React.Component)
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...' },
        { _id: 2, Title: 'The Shawshark Redemption', Description: 'desc2...', ImagePath: '...' },
        { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...' }
      ]
    }
  }

  render() { //what will be seen on
    const { movies } = this.state;
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {movies.map((movie) => <MovieCard key={movie._id} movieData={movie} />)}
      </div>
    );
  }
}