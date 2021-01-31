import { Component } from 'react';
import {} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import AccountSettings from './AccountSettings';
import ContentContainer from '../shared/ContentContainer/ContentContainer';
import axios from 'axios';
const apiUrl = 'https://jonahsplace.herokuapp.com/api/v1';
const apiUrl2 = 'https://arcane-badlands-30704.herokuapp.com/api/v1';

//http://localhost:3001/api/v1
class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginEmailInput: '',
      loginPasswordInput: '',
      loginError: false,
      signUpNameInput: '',
      signUpEmailInput: '',
      signUpPasswordInput: '',
      signUpPasswordConfirmInput: '',
      redirect: null,
      userName: this.props.user.name,
      userEmail: this.props.user.email,
      userPassword: '',
      userNewPassword: '',
      userConfirmPassword: '',
    };

    this.handleAccountInputs = this.handleAccountInputs.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.editFormSubmit = this.editFormSubmit.bind(this);
    this.changePasswordSubmit = this.changePasswordSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user === '' && this.props.user !== '') {
      this.setState({
        userName: this.props.user.name,
        userEmail: this.props.user.email,
      });
    }
  }

  //update state in relation to whats being typed in the input fields
  handleAccountInputs(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //action after you click on Login in
  async loginSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/users/login`,
        {
          email: this.state.loginEmailInput,
          password: this.state.loginPasswordInput,
        },
        { withCredentials: true }
      );

      console.log(res);

      if (res.status === 200) {
        this.props.appRerender();
        this.setState({ redirect: '/' });
      }
    } catch (err) {
      console.log('error');
      this.setState({ loginError: true });
      window.setTimeout(() => this.setState({ loginError: false }), 3000);
    }
  }

  //action when you click on edit button in accountSettings
  async editFormSubmit(e) {
    e.preventDefault();
    const res = await axios.patch(
      'http://localhost:3001/api/v1/users/updateMe',
      { name: this.state.userName, email: this.state.userEmail },
      { withCredentials: true }
    );

    if (res.status === 200) {
      window.location.reload();
    }
  }

  //action when you click on change password button in accountSettings
  async changePasswordSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.patch(
        'http://localhost:3001/api/v1/users/updateMyPassword',
        {
          currentPassword: this.state.userPassword,
          newPassword: this.state.userNewPassword,
          newPasswordConfirm: this.state.userConfirmPassword,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        window.location.reload();
      }

      if (res.status === 401) {
        console.log(res);
      }
    } catch (err) {
      if (this.state.userNewPassword !== this.state.userConfirmPassword) {
        console.log('not equal');
      }
    }
  }

  renderCorrectComponent() {
    if (this.props.renderLogin) {
      return (
        <Login
          handleAccountInputs={this.handleAccountInputs}
          loginEmailInput={this.state.loginEmailInput}
          loginPasswordInput={this.state.loginPasswordInput}
          loginError={this.state.loginError}
          loginSubmit={this.loginSubmit}
          signUpNameInput={this.state.signUpNameInput}
          signUpEmailInput={this.state.signUpEmailInput}
          signUpPasswordInput={this.state.signUpPasswordInput}
          signUpPasswordConfirmInput={this.state.signUpPasswordConfirmInput}
          redirect={this.state.redirect}
        />
      );
    } else if (this.props.renderSignUp) {
      return (
        <SignUp
          signUpNameInput={this.state.signUpNameInput}
          handleAccountInputs={this.handleAccountInputs}
        />
      );
    } else if (this.props.renderSettings) {
      return (
        <AccountSettings
          userTitle={this.props.user.name}
          userName={this.state.userName}
          userEmail={this.state.userEmail}
          userPassword={this.state.userPassword}
          userNewPassword={this.state.userNewPassword}
          userConfirmPassword={this.state.userConfirmPassword}
          handleAccountInputs={this.handleAccountInputs}
          editFormSubmit={this.editFormSubmit}
          appRerender={this.props.appRerender}
          changePasswordSubmit={this.changePasswordSubmit}
          redirect={this.state.redirect}
        />
      );
    }
  }

  render() {
    return <ContentContainer>{this.renderCorrectComponent()}</ContentContainer>;
  }
}

export default Account;
