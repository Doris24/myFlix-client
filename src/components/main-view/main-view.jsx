import React from 'react';
import axios from 'axios'; // used to fetch movie

import { connect } from 'react-redux';

//Routing - BrowserRouting is used to implement state-based routing (HashRouter for hash-based)
import { BrowserRouter as Router, Routes, Route, Redirect, NavLink } from 'react-router-dom';

// #0
import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

// #1 components
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


import './main-view.scss';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

//logo img
import img from './logo.png'


class MainView extends React.Component {

  constructor() {
    super(); // initializes the component's state, calls constructor of the parent class (here: React.Component)
    //initial state is set to null
    this.state = {
      user: null
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

  //GET request to get movies endpoint of the Node.js API
  getMovies(token) {
    axios.get('https://movyis.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` } //bearer authorization in header of HTTP request to make authorized request to API
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
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

  onRegistration(user) {
    console.log(user);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
  }

  //Logout
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  //what will be seen on screen
  render() {
    const { movies } = this.props;
    const { user } = this.state;

    const profile = `/users/${user}`;
    console.log("main-view-render");

    return (
      <Router>
        //Navigation
        <Navbar className="navbar-container" fixed="top" expand="sm">
          <Container>
            <Navbar.Brand>
              <NavLink to={`/`} className="navbar-logo">
                <img
                  alt="movyis"
                  src={img}
                  height="50px"
                  className="navbar-logo-img"
                />
              </NavLink>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="navbar-nav">
                <NavLink to={`/`} className="navbar-link">Movies</NavLink>
                <NavLink to={profile} className="navbar-link">Profile</NavLink>
                <NavLink to={`/`} className="navbar-link" onClick={() => { this.onLoggedOut() }}>Logout</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Row className="main-view justify-content-md-center">

          {/* <Routes> */}
          <Route exact path="/" render={() => {
            //if there is no user, the LoginView is rendered, if user is logged in, the user details are passed as a prop to the LoginView
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            //Before the movies have been loaded
            if (movies.length === 0) return <div className="main-view" />;

            //display moviecards
            return <MoviesList movies={movies} />
            // return movies.map(m => (
            //   <Col xs={12} sm={4} md={3} key={m._id}>
            //     <MovieCard movie={m} />
            //   </Col>
            // ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" /> //Redirect: prevent users from manually accessing the rest of routes without logging in
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <Redirect to="/" />;
            return <Col md={8}>
              <MovieView
                movie={movies.find(m => m._id === match.params.movieId)}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <Redirect to="/" />;
            return <Col md={8}>
              <GenreView
                genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <Redirect to="/" />;
            return <Col md={8}>
              <DirectorView
                director={movies.find(m => m.Director.Name === match.params.name).Director}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/users/:Username" render={({ history, match }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <Redirect to="/" />;
            return <Col md={12}>
              <ProfileView
                movies={movies}
                user={user === match.params.username}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />
          {/* </Routes> */}
        </Row>
      </Router>
    );
  }
}

//function that will allow the component to subscribe to store updates
//picking what your component needs from your application’s global state
let mapStateToProps = state => { // the store state
  return { movies: state.movies } // return new props
}

// function connect(mapStateToProps, mapDispatchToProps, mergePrpos, options)
export default connect(mapStateToProps, { setMovies })(MainView);