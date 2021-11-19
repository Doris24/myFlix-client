import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState(''); //variable and a method that updates the variable
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); //prevents the default refresh of the page after button (type="submit") click
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username); //a user is automatically logged in regardless of the input, new login after refresh
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
      {/* <button type="button">Unregister</button> */}
    </div>
  );
}

LoginView.propTypes = {
  movie: PropTypes.shape({ //must include a movie object
    Username: PropTypes.string.isRequired, //must contain a Title key(must be string)
    Password: PropTypes.string.isRequired
  }).isRequired,
  onLoggedIn: PropTypes.func.isRequired //must contain onMovieClick, must be a function
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