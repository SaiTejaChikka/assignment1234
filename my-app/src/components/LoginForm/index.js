import React, { Component } from 'react';
import './index.css'; // Import the CSS for styling

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      successMessage: '',
    };
  }

  // Handle input changes
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Email validation
  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle form submission
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    // Basic validation
    if (!email || !password) {
      this.setState({ errorMessage: 'Please fill in both fields', successMessage: '' });
      return;
    }

    if (!this.validateEmail(email)) {
      this.setState({ errorMessage: 'Invalid email format', successMessage: '' });
      return;
    }

    if (!this.validatePassword(password)) {
      this.setState({
        errorMessage:
          'Password must be at least 8 characters long and include at least one letter, one number, and one special character.',
        successMessage: '',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Check if the response is successful
      if (response.ok) {
        this.setState({ successMessage: 'Login Successful!', errorMessage: '' });
      } else {
        const errorData = await response.json();
        this.setState({ errorMessage: errorData.message || 'Login Failed. Try again!', successMessage: '' });
      }
    } catch (error) {
      // Handle error response
      console.error('Error:', error);
      this.setState({ errorMessage: 'Login Failed. Try again!', successMessage: '' });
    }
  };

  render() {
    const { email, password, errorMessage, successMessage } = this.state;

    return (
      <div className="login-container">
        <h2 className="login-header">Login</h2>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
      </div>
    );
  }
}

export default LoginForm;
