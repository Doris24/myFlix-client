import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import './genre-view.scss';
import { Link } from 'react-router-dom';


export class GenreView extends React.Component {

  render() {
    const { genre } = this.props;
    console.log(genre);

    return (
      //<Container className='genre-container'>
      <Row>
        <Col>
          <Card>
            <Card.Body className="genre-view">
              {/* <span className="label">Name: </span> */}
              <h1 className="genre-name" >{genre.Name}</h1>
              <div className="genre-description">
                <span className="label">Description: </span>
                <div className="value">{genre.Description}</div>
              </div>
              <div className="genre-button-div">
                <Link to={`/`} className="director-button-link">
                  <Button
                    style={{
                      'margin- top': '10px', color: '#000',
                      'background-color': '#9D9D9D',
                      border: '#9D9D9D', 'font-weight': 'bold'
                    }}
                    className="back-to-movies-button">
                    Back to movie list
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      //</Container >

    );
  }
}

//specify how GenreView's props should look
GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};