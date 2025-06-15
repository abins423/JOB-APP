import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authtoken');

    if (!token) {
        return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    }

    return children; // Render the child components if authenticated
};

// Define prop types for ProtectedRoute
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, // Ensure that children are a valid React node
};

export default ProtectedRoute;
