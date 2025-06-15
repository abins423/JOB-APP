import PropTypes from 'prop-types';
import './cssComponent/application-card.css';
import { Link } from 'react-router-dom';

const ApplicationCard = ({ applied_at, status, job_role, applications_id }) => {
    console.log('Received props:', { applied_at, status, job_role, applications_id }); // Log received props

    return (
        <div className='applicationcard'>
            <Link to={`/application/${applications_id}`} style={{ textDecoration: 'none' }}>
                <h6>Applied Role: {job_role}</h6>
                <p>Applied at: {applied_at}</p>
                <p>Application status: {status}</p>
            </Link>
        </div>
    );
};

// Define prop types for validation
ApplicationCard.propTypes = {
    applied_at: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    job_role: PropTypes.string.isRequired,
    applications_id: PropTypes.string.isRequired
};

export default ApplicationCard;
