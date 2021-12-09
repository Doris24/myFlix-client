import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie-view.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



export class MovieView extends React.Component {

  addMovieToFavList = (e) => {
    e.preventDefault();

    console.log('addMovie');

    const Username = localStorage.getItem("user");
    const accessToken = localStorage.getItem("token");
    const { movie } = this.props;

    console.log(Username);

    axios.post(`https://movyis.herokuapp.com/users/${Username}/movies/${movie._id}`, {

    },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
      .then(response => {
        alert(`Movie added to Favorites`)
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;
    console.log('moviedata: ' + movie.Title);
    return (
      <Container className='Movie-Container'>
        <Row>
          <Col>
            <Card className="movie-card">
              <Card.Body className="movie-view">
                <div className="movie-poster">
                  <img src={movie.ImagePath} className="movie-poster-img" alt="Movie-Poster" />
                </div>
                <h1 className="movie-title">{movie.Title}</h1>
                <div className="movie-description">
                  <span className="label">Description: </span>
                  <div className="value">{movie.Description}</div>
                </div>
                <div className="movie-genre-name">

                  <span className="label">Genre: </span>
                  <Link to={`/genres/${movie.Genre.Name}`} className="link">
                    <div className="value">{movie.Genre.Name}</div>
                  </Link>
                </div>
                <div className="movie-director-name">
                  <span className="label">Director: </span>
                  <Link to={`/directors/${movie.Director.Name}`} className="link">
                    <div className="value">{movie.Director.Name}</div>
                  </Link>
                </div>
                <div className="movie-button-div">
                  <Button className="movie-button add-movie-button"
                    type="submit"
                    onClick={this.addMovieToFavList}>
                    Add to Favorites
                  </Button>
                  <Button className="movie-button"
                    onClick={() => { onBackClick(); }}>
                    Back
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container >
    );
  }
}

//specify how MovieView's props should look
MovieView.propTypes = {
  movie: PropTypes.shape({ //must include a movie object
    Title: PropTypes.string.isRequired, //must contain a Title key(must be string)
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
    //Featured: PropTypes.bool.isRequired,
    //Actors: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};