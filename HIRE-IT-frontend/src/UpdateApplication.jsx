import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './cssComponent/updateapplication.css'
const AppUpdate = () => {
    const { id } = useParams(); // Get the application ID from the URL
    console.log('id:',id)
    const navigate = useNavigate();
    
    const authToken = localStorage.getItem('authtoken');
    console.log(authToken) // For redirecting after successful deletion
    if (!authToken) {
        navigate('/login'); // Redirect to login if no auth token
    }

    const [resume, setResume] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    // Handle file input change for resume upload
    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    // Function to upload the updated resume
    const handleResumeUpload = async () => {
        if (!resume) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('resume', resume);

        try {
            const response = await axios.put(`http://localhost:3000/api/application//update${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${authToken}`, // Pass token in headers
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setUploadSuccess(true);
                alert('Resume updated successfully.');
            } else {
                alert('Failed to upload resume.');
            }
        } catch (error) {
            console.error('Error uploading resume:', error);
            alert('There was an error uploading the resume.');
        }
    };

    // Function to remove the application
    const handleRemoveApplication = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this application?');

        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/application/delete/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`, // Pass token in headers
                    },
                });

                if (response.status === 200) {
                    alert('Application removed successfully.');
                    navigate('/MyApplications'); // Redirect to applications list after deletion
                } else {
                    alert('Failed to remove application.');
                }
            } catch (error) {
                console.error('Error removing application:', error);
                alert('There was an error removing the application.');
            }
        }
    };

    return (
        <div className='application'>
            <h2>Update Application</h2>

            {/* Section to update resume */}
            <div className='application'>
                <h3>Update Resume</h3>
                <input  className='file' type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                <button onClick={handleResumeUpload} className='updatebutton'>Upload Resume</button>
                {uploadSuccess && <p>Resume uploaded successfully!</p>}
            </div>

            <hr />

            {/* Section to remove application */}
            <div>
                <h3>Remove Application</h3>
                <button  className='' onClick={handleRemoveApplication} style={{ color: 'red' }}>
                    Delete Application
                </button>
            </div>
        </div>
    );
};

export default AppUpdate;
