import { useState, useEffect } from 'react';
import axios from 'axios';
import './cssComponent/searchbar.css'; // Optional: Import your CSS for styling if necessary

const SearchBar = () => {
    const [data, setData] = useState([]); // Original data from API
    const [filteredData, setFilteredData] = useState([]); // Data to display based on search
    const [query, setQuery] = useState(''); // State for the search input
    const [selectedJob, setSelectedJob] = useState(null); // State for selected job details

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/jobs/getByName',{
                    name:query
                ,
                headers: {
                    'Cache-Control': 'no-cache'
            }});
                const fetchedData = response.data;

                // Ensure fetchedData is an array
                const jobs = Array.isArray(fetchedData) ? fetchedData : [fetchedData];

                setData(jobs);
                setFilteredData(jobs); // Set filtered data initially to all fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [query]); // Fetch data once on mount

    // Handle input change
    const handleChange = (event) => {
        const { value } = event.target;
        setQuery(value);
        
        // Filter data based on the search term
        const lowerCaseSearchTerm = value.toLowerCase();
        const filtered = data.filter((job) =>
            job.job_role.toLowerCase().includes(lowerCaseSearchTerm)
        );

        setFilteredData(filtered); // Update filteredData based on the search
    };

    // Handle job selection
    const handleJobClick = (job) => {
        setSelectedJob(job); // Set the selected job details
    };

    // Handle back to search
    const handleBack = () => {
        setSelectedJob(null); // Clear selected job
    };

    return (
        <div className="App">
            <h1>Job Search</h1>
            <div className="search-bar">
                <input 
                    type="text" 
                    value={query} 
                    onChange={handleChange} 
                    placeholder="Search for jobs..." 
                />
            </div>

            {selectedJob ? (
                <div className="job-details">
                    <h2>{selectedJob.job_role}</h2>
                    <p><strong>Company:</strong> {selectedJob.job_company}</p>
                    <p><strong>Description:</strong> {selectedJob.job_description}</p>
                    <p><strong>Location:</strong> {selectedJob.job_location}</p>
                    <button onClick={handleBack}>Back to Search</button>
                </div>
            ) : (
                <div>
                    {filteredData.map((job) => (
                        <div key={job._id} onClick={() => handleJobClick(job)} style={{ cursor: 'pointer' }}>
                            <h2>{job.job_role}</h2>
                            <p>{job.job_company}</p>
                            <p>{job.job_description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
