import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        email,
        password
      });

      
      if( response.data){
        navigate("/")
      }
      console.log('User created successfully:', response.data);
    } catch (err) {
      
      setError('Registration failed. Please check your credentials.');
      console.error('Error register:', err);
    }
  };
  return (
    <div className="form">
      <form className="Register" onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <h1>Registration Form</h1>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email"  onChange={(e) => setEmail(e.target.value)} 
            required />
        </div>
        <div className="pw">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password"   onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
