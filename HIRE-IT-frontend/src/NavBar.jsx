import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './cssComponent/NavBar.css'; // Ensure you have your custom CSS

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"> {/* Dark background for the navbar */}
            <div className="container-fluid">
                <Link className="navbar-brand name" to="/home">HIRE-IT</Link> {/* Title on the left */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav"> {/* Align items to the right */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="navclass" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="navclass" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="navclass" to="/Myapplications">Applied jobs</Link>
                        </li>
                        {/* Dropdown menu */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle navclass" href="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                More
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/aboutus">About Us</Link></li>

                                <li><Link className="dropdown-item" to="/LogOut">Log Out</Link></li>
                            </ul>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
