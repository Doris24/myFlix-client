import React from 'react';
import axios from 'axios'; // used to fetch movie

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import './main-view.scss';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export class MainView extends React.Component {

  constructor() {
    super(); // initializes the component's state, calls constructor of the parent class (here: React.Component)
    //initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null, //state value to identify if movie cards were clicked
      user: null,
      register: null
    }
  }

  //mounted: fully renderd and added to DOM -> visible in browser
  //execute code right after the component is mounted
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  //function that updates the state of the selectedMovie Property when movie is clicked
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  //triggered by handlehandleSubmit in loginView
  //updates user state, when successfully logged in
  //authData logs the state
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username //user's username is saved in the user state
    });

    //auth information (user and token) is saved in local storage
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token); //get Movies when user is logged in, this is the object itself (here: MainView class)
  }

  //GET request to get movies endpoint of the Node.js API
  getMovies(token) {
    axios.get('https://movyis.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` } //bearer authorization in header of HTTP request to make authorized request to API
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() { //what will be seen on screen
    const { movies, selectedMovie, user, register } = this.state;


    if (!register)
      return <RegistrationView onRegister={register => this.onRegister(register)} />

    //if there is no user, the LoginView is rendered, if user is logged in, the user details are passed as a prop to the LoginView
    if (!user)
      return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;


    //Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;


    return (
      <div>
        <Navbar className="navbar-container" fixed="top" expand="md">
          <Container>
            <Navbar.Brand>movyis</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="navbar-nav">
                <Nav.Link className="navbar-link navbar-link-active">Movies</Nav.Link>
                <Nav.Link>Profile</Nav.Link>
                <Nav.Link onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
              <Col>
                <MovieView
                  movie={selectedMovie}
                  onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}
                />
              </Col>
            )
            : movies.map(movie => (
              <Col lg={3} md={4} sm={6} key={movie._id}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}
                />

              </Col>
            ))
          }
          <Button className="unregister-button" type="submit">Unregister</Button>
        </Row>
      </div>
    );
  }
}