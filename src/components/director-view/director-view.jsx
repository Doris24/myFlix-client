import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import './director-view.scss';
import { Link } from 'react-router-dom';


export class DirectorView extends React.Component {

  render() {
    const { director } = this.props;

    return (

      <Row>
        <Col>
          <Card>
            <Card.Body className="director-view">
              <h1 className="director-name" >{director.Name}</h1>
              <div className="director-bio">
                <span className="label">Bio: </span>
                <div className="value">{director.Bio}</div>
              </div>
              <div className="director-year">
                <span className="label">Birthyear: </span>
                <div className="value">{director.Birth}</div>
              </div>
              <Link to={`/`}>
                <Button className="back-to-movies-button" variant="link">Back to movie list</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>


    );
  }
}

//specify how DirectorView's props should look
DirectorView.propTypes = {
  director: PropTypes.shape({ //must include a movie object
    Name: PropTypes.string.isRequired, //must contain a Title key(must be string)
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};