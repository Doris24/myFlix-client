import React from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super(); // initializes the component's state, calls constructor of the parent class (here: React.Component)
    this.state = {
      movies: [
        {
          _id: 1,
          Title: 'Inception',
          Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
          ImagePath: 'https://www.imdb.com/title/tt1375666/mediaviewer/rm459633664/?ref_=tt_ov_i'
        },
        {
          _id: 2,
          Title: 'The Shawshark Redemption',
          Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
          ImagePath: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm3396001280/?ref_=tt_ov_i'
        },
        {
          _id: 3,
          Title: 'Gladiator',
          Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
          ImagePath: 'https://www.imdb.com/title/tt0172495/mediaviewer/rm3946017792/?ref_=tt_ov_i'
        }
      ],
      selectedMovie: null //state value to identify if movie cards were clicked
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() { //what will be seen on screen
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView
            movie={selectedMovie}
            onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />

          : movies.map((movie) => (<MovieCard
            key={movie._id}
            movieData={movie}
            onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />))}
      </div>
    );
  }
}