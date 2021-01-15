import { Component } from 'react';

import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <h1 className="Login-header">login</h1>
        <form className="Login-form">
          <label className="Login-label" htmlFor="email">
            email
          </label>
          <br></br>
          <input
            className="Login-input"
            type="email"
            name="loginEmailInput"
            id="email"
            value={this.props.loginEmailInput}
            onChange={this.props.handleAccountInputs}
            required
          />
          <br></br>
          <label className="Login-label" htmlFor="password">
            password
          </label>
          <input
            className="Login-input"
            type="password"
            id="password"
            name="loginPasswordInput"
            minLength="8"
            value={this.props.loginPasswordInput}
            onChange={this.props.handleAccountInputs}
            required
          />
          <br></br>
          <button className="Login-submit" onClick={this.props.loginSubmit}>
            login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
