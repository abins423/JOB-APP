import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import './cssComponent/MyApplication.css';
import ApplicationCard from './applicationcard'; // Ensure proper case

const MyApplication = () => {
    const [applications, setApplications] = useState([]); // Initialize as an array
    const [error, setError] = useState('');

    const id = localStorage.getItem('userid');

    const fetchApplications = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/application/${id}`);
            if (response.data && Array.isArray(response.data)) {
                setApplications(response.data); // Set the array of applications
                
                // Log the first application's ID if available
                if (response.data.length > 0) {
                    const firstApplicationId = response.data[0]._id; // Access the first application's _id
                    localStorage.setItem('applicationId', firstApplicationId); // Store it in localStorage
                    console.log('First Application ID:', firstApplicationId);
                }
            } else {
                console.error("Unexpected response structure", response.data);
            }
        } catch (error) {
            console.log('Error occurred in fetching data:', error);
            setError('Error fetching application data'); // Set error message
        }
    }, [id]);
    
    useEffect(() => {
        if (id) {
            fetchApplications();
        }
    }, [id, fetchApplications]);

    return (
        <div className="details">
            {applications.length > 0 ? (
                applications.map((app) => (
                    <ApplicationCard 
                        key={app._id} // Unique key for React
                        applied_at={app.applied_at}
                        status={app.status}
                        job_role={app.job_role}
                        applications_id={app._id} // Pass the application ID
                    />
                ))
            ) : (
                <p>Loading application details...</p>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default MyApplication;
