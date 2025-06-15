import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import './cssComponent/jobDetail.css';

const JobDetail = () => {
    const { jobid } = useParams(); 
    const [job, setJob] = useState(null); 
    const [isApplying, setIsApplying] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState('');
    
    // Check if user has already applied
    const checkIfApplied = useCallback(() => {
        const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
        return appliedJobs.includes(jobid);
    }, [jobid]);

    const fetchJobDetail = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/jobs/${jobid}`);
            setJob(response.data); 
        } catch (error) {
            console.log('Error fetching job details:', error);
        }
    }, [jobid]);
    
    useEffect(() => {
        const checkApplicationStatus = async () => {
            await fetchJobDetail();
            if (checkIfApplied()) {
                setApplicationStatus('You have already applied for this job.');
                setIsApplying(true); // Disable button
            }
        };
        checkApplicationStatus();
    }, [fetchJobDetail, checkIfApplied]); 

    if (!job) {
        return <div>Loading...</div>; // or some fallback UI
    }

    const handleApply = async () => {
        const token = localStorage.getItem('authtoken');
        const userId = localStorage.getItem('userid');
    
        if (!userId) {
            console.error('User ID is not available in local storage');
            return; // Prevent proceeding if user ID is undefined
        }
    
        console.log('User ID:', userId);
        setIsApplying(true); // Disable button while applying
    
        try {
            // Make the API request
            const response = await axios.post(`http://localhost:3000/api/application/${userId}/${jobid}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.status === 201) {
                setApplicationStatus('Application successful.');
    
                // Save the job ID to local storage (to track applied jobs)
                const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
                appliedJobs.push(jobid);
                localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    
                // Disable the apply button after successful application
                setIsApplying(true);
            } 
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data === 'You have already applied') {
                setApplicationStatus('You have already applied for this job.');
            } else {
                console.error('Error creating application:', error);
                setApplicationStatus('Application failed. Please try again later.');
            }
        } finally {
            setIsApplying(false); // Re-enable the button after applying
        }
    };
    

    return (
        <>
        <div className="detail">
            <div className="application-card">
                <h1>Apply Here</h1>
                <h3>{job.job_role || "No Title Provided"}</h3>
                <p>{job.job_description || "No Description Available"}</p>
                <p><strong>Location:</strong> {job.job_location || "Location not specified"}</p>
                <p><strong>Salary:</strong> ${job.job_salary || "Not Specified"}</p>
                <p><strong>Job Type:</strong> {job.job_type || "Not Specified"}</p>
                <p><strong>Job Expiring:</strong> {job.end_date || "Not Specified"}</p>
           
            
                <button className="applybutton"
                    onClick={handleApply} 
                    disabled={isApplying || applicationStatus.includes('already applied')}
                    style={{ cursor: (isApplying || applicationStatus.includes('already applied')) ? 'not-allowed' : 'pointer' }}>
                    {isApplying ? 'Applied':  'Apply'}
                </button>
                <p>{applicationStatus}</p>
            </div>
            </div>
    </>
    );
};

export default JobDetail;
