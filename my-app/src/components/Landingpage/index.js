import React from 'react';
import './index.css'; // Import your CSS for styling
import { Component } from 'react';
import SearchBar from '../SearchBar';
import { Link } from 'react-router-dom';

class Landingpage extends Component {
  state = { 
    locationsDetails: [], 
    technician_details: [], 
    location: "Mumbai", 
    technician: "" 
  };

  componentDidMount() {
    this.getLocation();
    this.fetchTechnicians();
  }

  getLocation = async () => {
    const apiUrl = 'http://localhost:5000/locations';
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const locData = await response.json();
      this.setState({ locationsDetails: locData });
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  fetchTechnicians = async () => {
    const { location, technician } = this.state;
    try {
      const queryParams = new URLSearchParams({
        location: location,
        technician: technician, // Remove technician if not needed in API
      });

      const response = await fetch(`http://localhost:5000/featured-technicians?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch technicians');
      }

      const technicianData = await response.json();
      console.log(technicianData);
      this.setState({ technician_details: technicianData });
    } catch (err) {
      console.error('Error fetching technicians:', err);
    }
  };

  onchangeLocation = (event) => {
    const newLocation = event.target.value;
    this.setState({ location: newLocation }, () => {
      // Fetch technicians when location changes
      this.fetchTechnicians();
    });
  };

  render() {
    const { locationsDetails, technician_details, location } = this.state;
    return (
      <div className="app">
        {/* Header */}
        <nav className="header">
          <div className="logo">argon</div>
          <div className="auth-buttons">
            <button className="biz-login"><Link to="/business-login">BiZ Login</Link></button>
            <button className="login"><Link to="/login">User Login</Link></button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <h1>Take care of your home needs now!</h1>
          <p>ServicePro is your one-stop solution to troubleshoot, choose a vendor, and book a technician.</p>
          <div className="search-bar">
            <select
              className="location-dropdown"
              value={location} // The selected value
              onChange={this.onchangeLocation} // Event handler for change
            >
              <option value="">Select Location</option>
              {locationsDetails.map((each, index) => (
                <option key={index} value={each.location}>{each.location}</option>
              ))}
            </select>
            <SearchBar/>
            <button className="search-button">Search</button>
          </div>
        </section>

        {/* All Services */}
        <section className="services">
          <h2>All Services</h2>
          <div className="service-list">
            <div className="service-item">
              <h3>Fridge</h3>
              <p>We get insulted by others, lose trust for those others...</p>
            </div>
            <div className="service-item">
              <h3>Air Conditioner</h3>
              <p>Don’t get your heart broken by people we love...</p>
            </div>
            <div className="service-item">
              <h3>Television</h3>
              <p>What else could rust the heart more over time?</p>
            </div>
            <div className="service-item">
              <h3>Gas Stove</h3>
              <p>We get insulted by others, lose trust for those others...</p>
            </div>
          </div>
        </section>

        {/* Booking Steps */}
        <section className="steps">
          <h2>Book a request in 3 simple steps</h2>
          <div className="step-list">
            <div className="step-item">
              <h3>Provide your appliance details</h3>
              <p>Let us know your appliance details and your issue.</p>
            </div>
            <div className="step-item">
              <h3>Choose your technician</h3>
              <p>Choose from a wide variety of technicians and vendors.</p>
            </div>
            <div className="step-item">
              <h3>Get it fixed!</h3>
              <p>The technician will arrive at your doorstep shortly to fix it!</p>
            </div>
          </div>
        </section>

        {/* Featured Vendors */}
        <section className="vendors">
          <h2>Featured Vendors</h2>
          <div className="vendor-list">
            {technician_details.map((each, index) => (
              <div className="vendor-item" key={index}>
                <img src="https://via.placeholder.com/150" alt="Technician" className="vendor-photo" />
                <h3>{each.name}</h3>
                <p><strong>Specialization:</strong> {each.specialization}</p> {/* Fixed typo */}
                <p><strong>Rating:</strong> {each.rating}/5</p>
                <p>{each.description}</p>
                <button className="contact-button">Contact</button>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials">
          <h2>See what our happy customers have to say about us</h2>
          <div className="testimonial-item">
            <p>Knowledgeable and easy to work with...</p>
            <p>- Peter Breis</p>
          </div>
          <div className="testimonial-item">
            <p>Knowledgeable and easy to work with...</p>
            <p>- Peter Breis</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="contact">
            <p>Get in touch with us:</p>
            <input type="email" placeholder="Email address" />
            <button>Submit</button>
          </div>
          <div className="legal">
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="/cookies">Cookies</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Landingpage;
