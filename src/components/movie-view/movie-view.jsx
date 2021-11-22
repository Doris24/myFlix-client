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


export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className='Movie-Container'>
        <Row>
          <Col>
            <Card>
              <Card.Body className="movie-view">
                <div className="movie-poster">
                  <img src={movie.ImagePath} alt="Movie-Poster" />
                </div>
                <div className="movie-title">
                  <span className="label">Title: </span>
                  <div className="value">{movie.Title}</div>
                </div>
                <div className="movie-description">
                  <span className="label">Description: </span>
                  <div className="value">{movie.Description}</div>
                </div>
                <div className="movie-genre-name">
                  <span className="label">Genre: </span>
                  <div className="value">{movie.Genre.Name}</div>
                </div>
                <div className="movie-director-name">
                  <span className="label">Director: </span>
                  <div className="value">{movie.Director.Name}</div>
                </div>
                <div className="movie-button-div">
                  <Button className="movie-button" onClick={() => { onBackClick(null); }} >Back</Button>
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