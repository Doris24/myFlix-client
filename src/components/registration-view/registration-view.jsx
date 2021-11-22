import React, { useState } from 'react';
import PropTypes from 'prop-types';


// Bootstrap
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onRegister(username) */
    props.onRegister(username); //a user is automatically logged in regardless of the input, new login after refresh
  };

  return (

    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Registration</Card.Title>
              <Form>
                <Form.Group className="register-username" >
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                  />
                </Form.Group>

                <Form.Group className="register-password" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </Form.Group>

                <Form.Group className="register-email" >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </Form.Group>

                <Form.Group className="register-birthday" >
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={e => setBirthday(e.target.value)}
                    placeholder="Birthday"
                  />
                </Form.Group>
                <Button className="register-button" type="submit" onClick={handleRegister}>
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired
}
