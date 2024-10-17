import React, { useState } from 'react';
import axios from 'axios';  
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      });

      
      if( response.data){
        navigate("/register")
      }
      console.log('Login successful:', response.data);
    } catch (err) {
      
      setError('Login failed. Please check your credentials.');
      console.error('Error logging in:', err);
    }
  };

  return (
    <div className="form">
      <form className="login" onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div className="pw">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Register now</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
