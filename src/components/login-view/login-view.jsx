import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


import './login-view.scss';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [username, setUsername] = useState(''); //variable and a method that updates the variable
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); //prevents the default refresh of the page after button (type="submit") click
    console.log(username, password);
    /* Send a POST request to the server for authentication */
    axios.post('https://movyis.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (

    <div>
      {/* <Navbar className="login-navbar" fixed="top" expand="md">
        <Container>
          <Navbar.Brand>movyis</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="navbar-nav">
              <Nav.Link>Movies</Nav.Link>
              <Nav.Link>Profile</Nav.Link>
              <Nav.Link className="navbar-link navbar-link-active">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}

      <Container>
        <Row>
          <Col>
            <Card className="login-card">
              <Card.Body>
                <Card.Title className="login-title" >Login</Card.Title>
                <Form className="login-form" >
                  <Form.Group controlId="formUsername">
                    <Form.Label className="form-label">Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Username"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                  </Form.Group>
                  <Button className="login-button" variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Link to={`/register`}>
                    <Button className="login-button register-button" variant="link">Register</Button>
                  </Link>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}

// import React from 'react';

// export class LoginView extends React.Component {
//   constructor(props) {
//     super(props);

//     //component stores username and passwort in its local state
//     this.state = {
//       username: '',
//       passwort: ''
//     };

//     this.onUsernameChange = this.onUsernameChange.bind(this);
//     this.onPasswordChange = this.onPasswordChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   //
//   onUsernameChange(event) {
//     this.setState({
//       username: event.target.value
//     });
//   }

//   onPasswordChange(event) {
//     this.setState({
//       passwort: event.target.value
//     });
//   }

//   handleSubmit() {
//     const { username, passwort } = this.state;
//     console.log(username, password);
//     /* Send a request to the server for authentication */
//     /* then call this.props.onLoggedIn(username) */
//     this.props / onLoggedIn(username);
//   }

//   render() {
//     return (
//       <form>
//         <label>
//           Username:
//           <input type="text" value={this.state.username} onChange={this.onUsernameChange} />
//         </label>
//         <label>
//           Password:
//           <input type="password" value={this.state.passwort} onChange={this.onPasswordChange} />
//         </label>
//         <button type="button" onClick={this.handleSubmit}>Submit</button>
//       </form>
//     );
//   }
// }