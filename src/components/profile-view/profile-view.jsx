import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './profile-view.scss';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CardGroup, Form } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/CardHeader';

import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';

//import { FavMoviesView } from './fav-movies';


import { Link } from 'react-router-dom';
import { MovieView } from '../movie-view/movie-view';

export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getUser(accessToken);
    }
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
    const Username = localStorage.getItem('user');
    console.log(Username);
    axios.get(`https://movyis.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` } //bearer authorization in header of HTTP request to make authorized request to API
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  editUser(e) {
    //e.preventDefault();
    const Username = localStorage.getItem('user');
    const accessToken = localStorage.getItem('token');

    axios.put(`https://movyis.herokuapp.com/users/${Username}`, {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday
    },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday
        });
        localStorage.setItem('user', response.data.username);
        console.log('user updated');
      })
      .catch(error => {
        console.log('Error updating profile');
      })
  }

  setUsername(value) {
    //new Username
    this.setState({
      Username: value
    });
    this.Username = value;
  }

  setPassword(value) {
    //new Password
    this.setState({
      Passeord: value
    });
    this.Password = value;
  }

  setEmail(value) {
    //new Email
    this.setState({
      Email: value
    });
    this.Email = value;
  }

  setBirthday(value) {
    //new Birthday
    this.setState({
      Birthday: value
    });
    this.Birthday = value;
  }

  onDeregistration() {
    //delete all user data
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.delete(`https://movyis.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open(`/`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavMovie() {
    //remove Movie from FavList
  }

  render() {
    const { movies, user } = this.props;
    const { Username, Password, Email, Birthday, FavoriteMovies } = this.state;

    console.log('profile-view');
    console.log(`${Username} ${Password} ${Email} ${Birthday}`);
    console.log(`FavMovies: ${FavoriteMovies}`);
    // console.log(Username);
    return (
      <Container className="profile-container">
        <Row className="main-view justify-content-md-center">
          <h1>Profile</h1>
          <Col sm={12} md={6}>
            <Card className="user-info profile-card">
              <Card.Body>
                <Card.Title>My Info</Card.Title>
                <div className="user-info-div">
                  <div className="user-info">
                    <span className="label">Username: </span>
                    <div className="value">{Username}</div>
                  </div>
                  <div className="user-info">
                    <span className="label">E-Mail: </span>
                    <div className="value">{Email}</div>
                  </div>
                  <div className="user-info">
                    <span className="label">Birthday: </span>
                    <div className="value">{Birthday}</div>
                  </div>
                </div>

                <Button
                  className="deregister-button"
                  variant="submit"
                  onClick={() => this.onDeregistration()}
                >
                  Delete Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="update-user-info profile-card">
              <Card.Body>
                <Card.Title>Update Profile</Card.Title>
                <Form onSubmit={(e) => this.editUser(
                  e,
                  this.Username,
                  this.Password,
                  this.Email,
                  this.Birthday
                )}
                >
                  <Form.Group className="update-formgroup">
                    <Form.Label className="label">Username: </Form.Label>
                    <Form.Control
                      className="update-control"
                      type="text"
                      value={Username}
                      onChange={e => this.setUsername(e.target.value)}
                      placeholder="Username should have at least 5 characters"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="update-formgroup">
                    <Form.Label className="label">Password: </Form.Label>
                    <Form.Control
                      className="update-control"
                      type="password"
                      value={Password}
                      onChange={e => this.setPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="update-formgroup">
                    <Form.Label className="label">Email: </Form.Label>
                    <Form.Control
                      className="update-control"
                      type="text"
                      value={Email}
                      onChange={e => this.setEmail(e.target.value)}
                      placeholder="e.g. johndoe@example.com"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="update-formgroup">
                    <Form.Label className="label">Birthday: </Form.Label>
                    <Form.Control
                      className="update-control"
                      type="date"
                      value={Birthday}
                      onChange={e => this.setBirthday(e.target.value)}
                    //placeholder=""
                    //required
                    />
                  </Form.Group>
                  <Button className="button" type="submit" onClick={this.editUser}>Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="fav-movies-card profile-card justify-content-md-center">
          <Row>
            <Col>
              <Card.Body>
                <Card.Title> Favorite Movies</Card.Title>
              </Card.Body>
            </Col>
          </Row>
          <Row >
            {/* <Card.Body> */}
            <div>
              {FavoriteMovies.length === 0 && (
                <Col>
                  <h5>No Favorite Movies</h5>
                </Col>
              )}
            </div>
            {FavoriteMovies.length > 0 &&
              movies.map((movie) => {
                if (movie._id ===
                  FavoriteMovies.find((fav) => fav === movie._id)
                ) {
                  return (
                    // <Row className="main-view justify-content-md-center">
                    <Col xs={12} sm={4} md={3} key={movie._id}>
                      <Card className="movie-card" >
                        <Card.Img variant="top" src={movie.ImagePath} />
                        <Card.Body className="movie-card-body" >
                          <Link to={`/movies/${movie._id}`} className="link-to-movie">
                            <Card.Title className="movie-title">{movie.Title}</Card.Title>
                          </Link>
                          {/* <Card.Text className="movie-card-text" >{movie.Description}</Card.Text> */}
                          <Button className="button" type="submit" onClick={this.removeFavMovie}>Remove</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                    // </Row>
                  )
                }
              })}
            {/* </Card.Body> */}

          </Row>
        </Card >
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