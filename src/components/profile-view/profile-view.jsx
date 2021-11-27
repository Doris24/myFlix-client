import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// import './profile-view.scss';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CardGroup, Form } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/CardHeader';



import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavMoview: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.state({
      user: null
    });
    window.open('/', '_self');
  }

  getUser(token) {
    const Username = localStorage.getItem('user')

    axios.get('https://movyis.herokuapp.com/users/${Username}', {
      headers: { Authorization: `Bearer ${token}` } //bearer authorization in header of HTTP request to make authorized request to API
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavMovies: response.data.FavoritMovies
        });

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onDeregistration(user) {
    //delete all user data
  }

  render() {
    const { movies, user } = this.props;
    const { Username, Password, Email, Birthday } = this.state;

    console.log('profile-view');
    //console.log(Username);
    return (
      <Container>
        <Row>
          <Col>
            <h1>Profile</h1>
            <Card className="user-info">
              <Card.Body>
                <h3>My Info</h3>
                <div className="user-info">
                  <span className="label">My name: </span>
                  <div className="value">{Username}</div>
                </div>
                <div className="user-info">
                  <span className="label">E-Mail: </span>
                  <div className="value">{user.Email}</div>
                </div>
                <div className="user-info">
                  <span className="label">Birthday: </span>
                  <div className="value">{user.Birthday}</div>
                </div>
                {/* Deregister */}
                {/* <Link to={} >
                  <Button className="deregister-button" variant="link">Deregister</Button>
                </Link> */}
              </Card.Body>
            </Card>

          </Col>
          <Col>
            <Card className="user-info">
              <h3>Change Info</h3>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="user-info">
              <h3>Favorite Movies</h3>
            </Card>
          </Col>
        </Row>

      </Container >


      /* 
              <Card className="user-info-change">
                <CardHeader>My Info</CardHeader>
                <Card.Body>
                  <Form className="change-user-info-form" >
                    <Form.Group>
                      <Form.Label className="profile-label">Username: </Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required>
                        {username}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="profile-label">Password: </Form.Label>
                      <Form.Control
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required>
                        {password}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="profile-label">Username: </Form.Label>
                      <Form.Control
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required>
                        {email}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="profile-label">Username: </Form.Label>
                      <Form.Control
                        type="text"
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                        required>
                        {birthday}
                      </Form.Control>
                    </Form.Group>
                  </Form>
                  <Button className="deregister-button" onClick={handleChange}>Deregister</Button>
  
                </Card.Body>
              </Card>
              <Card>
                <CardHeader>Favorite Movies</CardHeader>
                <Card.Body>
  
                </Card.Body>
                </Card>
               */



      //password
      //email
      //date of birth

      //Button deregister

      //list of favorite movies
      //allow user to remove movie from favlist

    );
  }
}

//specify how MovieView's props should look
ProfileView.propTypes = {
  // profile: PropTypes.shape({ //must include a movie object
  //   Username: PropTypes.string.isRequired, //must contain a Title key(must be string)
  //   Password: PropTypes.string.isRequired,
  //   Email: PropTypes.string.isRequired

  // }).isRequired
  // onBackClick: PropTypes.func.isRequired
};