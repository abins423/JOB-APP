import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Ensure you have react-bootstrap installed

const HandleLogout = () => {
    const [showModal, setShowModal] = useState(true); // Control the visibility of the modal
    const navigate = useNavigate();


    const handleConfirmLogout = () => {
        // Clear authentication data
        localStorage.removeItem('authtoken');
        localStorage.removeItem('userid');

       
    };

    const handleCancelLogout = () => {
        setShowModal(false);
        // Navigate back to the previous location
        navigate('/home'); // This will redirect to the current page
    };

    return (
        <>
            <Modal show={showModal} onHide={handleCancelLogout} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:'black'}}>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{color:'black'}}>
                    Are you sure you want to log out?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelLogout}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default HandleLogout;
