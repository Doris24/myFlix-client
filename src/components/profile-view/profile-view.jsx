import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import './profile-view.scss';
import { Link } from 'react-router-dom';


export class ProfileView extends React.Component {

  render() {
    console.log('ProfileView');
    return (
      <h1>Profile</h1>
    );


  }
}

//specify how MovieView's props should look
ProfileView.propTypes = {
  // profile: PropTypes.shape({ //must include a movie object
  //   Title: PropTypes.string.isRequired, //must contain a Title key(must be string)
  //   Genre: PropTypes.shape({
  //     Name: PropTypes.string.isRequired
  //   }).isRequired,

  // }).isRequired,
  // onBackClick: PropTypes.func.isRequired
};