import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
    <div>
      <h2>Registration</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        </label>
        <label>
          Birthday:
          <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Birthday" />
        </label>
        <button type="submit" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}

LoginView.propTypes = {
  movie: PropTypes.shape({ //must include a movie object
    Username: PropTypes.string.isRequired, //must contain a Title key(must be string)
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  }).isRequired,
  onRegister: PropTypes.func.isRequired //must contain onMovieClick, must be a function
}