import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== rePassword) {
      setError('Passwords do not match');
      return;
    }
    axios.post('http://localhost:3001/register',{name,email,password})
    .then(res =>{
      // alert("Created")
      navigate('/login')
    }).catch(err => console.log(err))
  }
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'><strong>Name</strong></label>
            <input
              type="text"
              placeholder='Enter Name'
              name='name'
              className='form-control rounded-0'
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input
              type="email"
              placeholder='Enter Email'
              name='email'
              className='form-control rounded-0'
              onChange={(e) => setEmail(e.target.value)}
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
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='rePassword'><strong>Re-enter Password</strong></label>
            <input
              type="password"
              placeholder='Re-enter Password'
              name='rePassword'
              className='form-control rounded-0'
              onChange={(e) => setRePassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 rounded-0">Register</button>
        </form>
        <p className="mt-3">Already have an account? <Link to="/login" className="login-link">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
