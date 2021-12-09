import React from 'react';
import PropTypes from 'prop-types';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

//import './director-view.scss';
import { Link } from 'react-router-dom';


export class DirectorView extends React.Component {

  render() {
    const { director } = this.props;

    return (
      <Container>
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
                <div className="director-button-div">
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
        </Row >
      </Container>
    );
  }
}

//specify how DirectorView's props should look
DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};