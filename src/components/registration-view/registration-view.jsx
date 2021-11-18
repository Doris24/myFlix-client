import React from 'react';
import { useState } from 'react/cjs/react.development';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault(); //prevents the default refresh of the page after button (type="submit") click
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username); //a user is automatically logged in regardless of the input, new login after refresh
  };

  return (
    <div>
      <h2>Registration</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
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