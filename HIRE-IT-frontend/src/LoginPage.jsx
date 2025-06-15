import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../src/cssComponent/loginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true); // Start loading
        
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', { username, password }); 
            console.log('Response:', response.data); // Debugging response
            
            if (response.data.success) {
                const userid = response.data.Users.id;
                const token = response.data.token;

                if (userid && token) {
                    console.log(userid)
                    localStorage.setItem('authtoken', token); 
                    localStorage.setItem('userid', userid);
                    navigate('/home'); // Navigate after successful login
                } else {
                    setError('User ID or token is missing. Please try again.');
                }
            } else {
                setError(response.data.error || 'Login failed. Please check your credentials.'); // Error from the backend
            }
        } catch (error) {
            setError(`An error occurred during login: ${error.message}`);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (<>
          <span className='head'><h1>HIRE-IT</h1></span>
        <div className="firstdiv">
        <div className="logincard">
            <div className="login">
                <form id="login-form Form" onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        className="username"
                        value={username} 
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                    />
                    <input 
                        type="password"
                        className="password"
                        value={password} 
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                    <button className="loginbutton" type="submit" disabled={loading}> {/* Disable button while loading */}
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p>A new user get started by<Link to='/register'>click me</Link></p>
                </form>
                {error && <div className="error">{error}</div>} {/* Display error if exists */}

            </div>
        </div>
        </div>
        </>
    );
};

export default LoginPage;
