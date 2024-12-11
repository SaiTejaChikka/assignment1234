import React, { Component } from 'react';
import './index.css';

class BusinessLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      photo: '',
      specialization: '',
      rating: '',
      description: '',
      location: '',
      gmail: '',
      password: '',
      successMessage: '',
      errorMessage: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,16}$/;
    return passwordRegex.test(password);
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, photo, specialization, rating, description, location, gmail, password } = this.state;

    // Basic validation
    if (!name || !photo || !specialization || !rating || !description || !location || !gmail || !password) {
      this.setState({ errorMessage: 'All fields are required', successMessage: '' });
      return;
    }

    if (!this.validateEmail(gmail)) {
      this.setState({ errorMessage: 'Invalid email format', successMessage: '' });
      return;
    }

    if (!this.validatePassword(password)) {
      this.setState({
        errorMessage:
          'Password must be 8-16 characters long and include at least one letter, one number, and one special character.',
        successMessage: '',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/technician-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          photo,
          specialization,
          rating,
          description,
          location,
          gmail,
          password,
        }),
      });

      if (response.ok) {
        this.setState({
          successMessage: 'Technician successfully registered!',
          errorMessage: '',
        });
      } else {
        this.setState({
          errorMessage: 'Registration failed. Please try again.',
          successMessage: '',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      this.setState({
        errorMessage: 'An error occurred. Please try again.',
        successMessage: '',
      });
    }
  };

  render() {
    const { name, photo, specialization, rating, description, location, gmail, password, successMessage, errorMessage } = this.state;

    return (
      <div className="business-login-container">
        <h2 className="business-login-header">Business Login</h2>
        <form className="business-login-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={this.handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="photo">Photo URL:</label>
            <input
              type="text"
              id="photo"
              name="photo"
              value={photo}
              onChange={this.handleInputChange}
              placeholder="Enter photo URL"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialization">Specialization:</label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={specialization}
              onChange={this.handleInputChange}
              placeholder="Enter specialization"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={rating}
              onChange={this.handleInputChange}
              placeholder="Enter rating"
              min="1"
              max="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={this.handleInputChange}
              placeholder="Enter description"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={this.handleInputChange}
              placeholder="Enter location"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gmail">Gmail:</label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              value={gmail}
              onChange={this.handleInputChange}
              placeholder="Enter Gmail"
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
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="business-login-button">
            Register Technician
          </button>

          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
      </div>
    );
  }
}

export default BusinessLogin;
