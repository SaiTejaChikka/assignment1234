import React, { Component } from 'react';
import './index.css'

class SearchBar extends Component {
  
    state = {
      query: '', 
      suggestions: [], 
    }

  
  fetchSuggestions = async (query) => {
    if (query.length < 2) {
      
      this.setState({ suggestions: [] });
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/appliance-suggestions?query=${query}`);
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        this.setState({ suggestions: data });
      } else {
        console.error('Failed to fetch appliance suggestions');
      }
    } catch (error) {
      console.error('Error fetching appliance suggestions:', error);
    }
  };

  // Handle input change and fetch suggestions
  handleInputChange = (e) => {
    const value = e.target.value;
    this.setState({ query: value });
    this.fetchSuggestions(value); // Fetch suggestions as the user types
  };

  render() {
    const { query, suggestions } = this.state;
    return (
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={this.handleInputChange}
          placeholder="Search Appliance Type"
          className="search-input"
        />
        {suggestions.length >=0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="suggestion-item" >
                {suggestion.specialization} {/* Assuming appliance_type is returned */}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default SearchBar;
