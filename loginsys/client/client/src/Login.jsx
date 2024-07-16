import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Upload from '../../../../client/src/components/Upload';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(res => {
        if (res.data.status === 'success') {
          if (res.data.role === "admin") {
            window.location.href = 'http://localhost:3000/admin-upload'; 
          }
        } else {
          setLoginStatus('Login failed');
        }
      })
      .catch(err => {
        console.log(err);
        setLoginStatus('Login failed');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input
              type="email"
              placeholder='Enter Email'
              name='email'
              className='form-control rounded-0'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input
              type="password"
              placeholder='Enter Password'
              name='password'
              className='form-control rounded-0'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-0">Login</button>
        </form>
        <p className="mt-3">Don't have an account? <Link to="/" className="signup-link">Sign Up</Link></p>
        {loginStatus && <p>{loginStatus}</p>}
      </div>
    </div>
  );
}

export default Login;
