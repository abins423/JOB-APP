import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import User from './usercard';
import axios from "axios";
import './cssComponent/profile.css';

const Getuser = () => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState(localStorage.getItem('profilePicUrl') || './assets/react.svg');

    const navigate = useNavigate();
    const id = localStorage.getItem('userid');

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/user/${id}`);
            if (response.status === 200) {
                const user = response.data;
                setUsername(user.username);
                setAge(user.age);
                setAddress(user.address);
                setPhoneNumber(user.phonenumber);

                const imageUrl = user.profileImage
                    ? `http://localhost:3000/${user.profileImage}`
                    : './assets/react.svg';

                setProfilePicUrl(imageUrl);
                localStorage.setItem('profilePicUrl', imageUrl);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const navigateToUpdateProfile = () => {
        navigate('/updateprofile');
    };

    return (
        <div className="profiledetails">
            <h2>User Details:</h2>
            <img src={profilePicUrl} alt="Profile" className="profile-picture" />

            <User
                username={username}
                age={age}
                address={address}
                phoneNumber={phoneNumber}
            />

            {/* Button to navigate to update profile page */}
            <button onClick={navigateToUpdateProfile}>Update Profile</button>
        </div>
    );
};

export default Getuser;
