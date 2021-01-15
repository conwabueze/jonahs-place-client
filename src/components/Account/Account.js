import { Component } from 'react';
import Login from './Login';
import ContentContainer from '../shared/ContentContainer/ContentContainer';
import axios from 'axios';
const apiUrl = 'https://jonahsplace.herokuapp.com/api/v1';
//http://localhost:3001/api/v1
class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginEmailInput: '',
      loginPasswordInput: '',
    };

    this.handleAccountInputs = this.handleAccountInputs.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  //update state in relation to whats being typed in the input fields
  handleAccountInputs(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //action after you click on Login in
  async loginSubmit(e) {
    e.preventDefault();
    const res = await axios.post(
      `${apiUrl}/users/login`,
      {
        email: this.state.loginEmailInput,
        password: this.state.loginPasswordInput,
      },
      { withCredentials: true }
    );
    console.log(res);
    // const res2 = await axios.get(`${apiUrl}/users/me`);
    // console.log(res2);
  }

  render() {
    return (
      <ContentContainer>
        <Login
          handleAccountInputs={this.handleAccountInputs}
          loginEmailInput={this.state.loginEmailInput}
          loginPasswordInput={this.state.loginPasswordInput}
          loginSubmit={this.loginSubmit}
        />
      </ContentContainer>
    );
  }
}

export default Account;
