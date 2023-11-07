import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import './LoginComponent.module.css';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { txtUsername, txtPassword } = this.state;
    if (txtUsername && txtPassword) {
      const account = { username: txtUsername, password: txtPassword };
      this.apiLogin(account);
    } else {
      alert('Please enter your username and password');
    }
  };

  apiLogin = (account) => {
    axios.post('/api/customer/login', account)
      .then((res) => {
        const result = res.data;
        if (result.success === true) {
          this.context.setToken(result.token);
          this.context.setCustomer(result.customer);
          this.props.navigate('/home');
        } else {
          alert(result.message);
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  };

  render() {
    const { txtUsername, txtPassword } = this.state;

    return (
      <div className="login-container">
        <h2 className="login-heading">CUSTOMER LOGIN</h2>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="txtUsername"
              value={txtUsername}
              onChange={this.handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="txtPassword"
              value={txtPassword}
              onChange={this.handleInputChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">LOGIN</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);