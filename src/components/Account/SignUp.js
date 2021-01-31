import { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './SignUp.css';

class SignUp extends Component {
  render() {
    return (
      <div className="SignUp">
        <div className="SignUp-header">sign up</div>
        <form className="SignUp-form">
          <label className="SignUp-label">name</label>
          <br></br>
          <input
            className={`SignUp-input`}
            type="text"
            name="signUpNameInput"
            value={this.props.signUpNameInput}
            onChange={this.props.handleAccountInputs}
            required
          />
          <br></br>
          <label className="SignUp-label">email</label>
          <br></br>
          <input
            className={`SignUp-input`}
            type="email"
            name="signUpEmailInput"
            value={this.props.signUpEmailInput}
            onChange={this.props.handleAccountInputs}
            required
          />
          <br></br>
          <label className="SignUp-label">password</label>
          <br></br>
          <input
            className={`SignUp-input`}
            type="password"
            name="signUpPasswordInput"
            value={this.props.signUpPasswordInput}
            onChange={this.props.handleAccountInputs}
            required
          />
          <br></br>
          <label className="SignUp-label">password confirm</label>
          <br></br>
          <input
            className={`SignUp-input`}
            type="password"
            name="signUpPasswordConfirmInput"
            value={this.props.signUpPasswordConfirmInput}
            onChange={this.props.handleAccountInputs}
            required
          />
          <button className="Signup-submit">sign up</button>
        </form>

        <div className="SignUp-line-break"></div>

        <Link to="/login" className="SignUp-login">
          login
        </Link>
      </div>
    );
  }
}

export default SignUp;
