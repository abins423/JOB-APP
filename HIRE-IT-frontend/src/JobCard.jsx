import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './cssComponent/jobcard.css'
const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <Link to={`/jobs/${job._id}`}style={{ textDecoration: 'none',}}>
        <h3>{job.job_role || "No Title Provided"}</h3>
        <p className='para'>{job.job_description || "No Description Available"}</p>
        <p><strong >Location:</strong> {job.job_location || "Location not specified"}</p>
        <p ><strong className='para'>Salary:</strong> ${job.job_salary || "Not Specified"}</p>
        <p ><strong className='para'>Job Type:</strong> {job.job_type || "Not Specified"}</p>
       
      </Link> {/* Properly closing Link */}
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    _id:PropTypes.string.isRequired,
    job_role: PropTypes.string.isRequired,
    job_description: PropTypes.string.isRequired,
    job_location: PropTypes.string.isRequired,
    job_salary: PropTypes.number,
    job_type: PropTypes.string.isRequired, 
    //end_date:PropTypes.number.isRequired
  }).isRequired,
};

export default JobCard;
