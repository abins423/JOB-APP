
import {  useNavigate } from 'react-router-dom';
import './cssComponent/GetStarted.css'; // Optional for styling

const GetStarted = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register'); // Navigates to the login page
  };

  return (
    <div className="container">
      <span className='head'><h1>ASAP-Jobs..</h1></span>

      <img
       src='' 
       alt='no image'></img>
      <h1>Welcome to the Job Portal!</h1>
      <p>Discover the best jobs suited for your career. Click below to get started!</p>
      <button onClick={handleGetStarted} className="get-started-btn button ">
        Get Started
      </button>

     
    </div>
  );
};

export default GetStarted;
