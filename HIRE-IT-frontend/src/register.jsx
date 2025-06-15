import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './cssComponent/register.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'user', // Default to 'user'
  });

  const [message, setMessage] = useState('');

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/user/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        userType: formData.userType, // Include user type in request
      });

      if (response.status === 200) {
        setMessage('Registration successful!');
        // You can redirect the user to login page or another page
        navigate('/login');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred during registration');
    }
  };

  return (
    <div className='maincontainer'>
      <span className='head'><h1>HIRE-IT..</h1></span>
      <div className="register-container">
        <h2 className='heading'>Register</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>User Type:</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              required
            >
              <option value="user">User</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>
          <br />
          <button className='registerbutton' type="submit">Register</button>
          <br />
          <p>Existing user? <Link to={'/login'}>YES</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
