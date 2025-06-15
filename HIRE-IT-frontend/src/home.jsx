import { useState, useEffect } from "react";
import axios from "axios";
import JobCard from './JobCard';
import '../src/cssComponent/HomePage.css';


// HomePage component
const HomePage = () => {
  const [jobs, setJobs] = useState([]); // Initialize as an array
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Renaming for clarity
  

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('authtoken');
    const userid = localStorage.getItem('userid');

    if (!token || !userid) {
      window.location.href = 'http://localhost:5173'; // Redirect to login if not authenticated
    }
  }, []); 

  const fetchJobs = async (page) => {
    const userid = localStorage.getItem('userid'); // Fetch user ID from localStorage
    try {
      const response = await axios.get(`http://localhost:3000/api/jobs/getjob/${userid}?page=${page}&limit=9`); // Corrected the API URL
      setJobs(response.data.jobs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching jobs: ", error);
    }
  };

  // Fetch jobs when the component mounts and when currentPage changes
  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  return (
    <>
    <div>
    <div className="homePage">
      <h2 className="my">Job Listings</h2>
      <div className="joblist">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1} className="p-button">
          Previous Page
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}className="p-button">
          Next Page
        </button>
        
        <p>Page {currentPage} of {totalPages}</p>
      </div>
    </div>
    </div>
    </>
  );
};

export default HomePage;
