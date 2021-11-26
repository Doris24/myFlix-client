import React from 'react';
import PropTypes from 'prop-types'; //PropTypes validate data types based on the app's configuration

//Bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;
    console.log("movie-card");
    return (
      <Card className="movie-card" >
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body className="movie-card-body" >
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className="movie-card-text" >{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className="movie-card-button" variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card >
    );
  }
}

//specify how MovieCard's props should look
MovieCard.propTypes = {
  movie: PropTypes.shape({ //must include a movie object
    Title: PropTypes.string.isRequired, //must contain a Title key(must be string)
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired //must contain onMovieClick, must be a function
}