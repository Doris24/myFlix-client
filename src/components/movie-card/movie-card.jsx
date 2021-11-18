import React from 'react';
import PropTypes from 'prop-types'; //PropTypes validate data types based on the app's configuration

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
  }
}

//specify how MovieCard's props should look
MovieCard.PropTypes = {
  movie: PropTypes.shape({ //must include a movie object
    Title: PropTypes.string.isRequired, //must contain a Title key(must be string)
    Description: PropTypes.string.isRequired,
    ImapePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }),
    Featured: PropTypes.bool.isRequired,
    Actors: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired //must contain onMovieClick, must be a function
}