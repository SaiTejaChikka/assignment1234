
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Landingpage from './components/Landingpage';
import BusinessLogin from './components/BusinessLogin';
import LoginForm from './components/LoginForm';

function App() {
  return (
  
      <Routes>
        {/* Default landing page */}
        <Route path="/" element={<Landingpage />} />

        {/* Business Login Page */}
        <Route path="/business-login" element={<BusinessLogin />} />

        {/* Login Form */}
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    
  );
}

export default App;

