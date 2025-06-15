import PropTypes from 'prop-types';

const User = ({ username, age, address, phoneNumber}) => {
  return (
    <div className="user-card">
  
      <p>Username: {username}</p>
      <p>Age: {age}</p>
      <p>Address: {address}</p>
      <p>Phone Number: {phoneNumber}</p>
    </div>
  );
};


User.propTypes = {
  username: PropTypes.string.isRequired,     // Username must be a string
  age: PropTypes.oneOfType([                 // Age can be a string or a number
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  address: PropTypes.oneOfType([             // Address can be an array or string
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  phoneNumber: PropTypes.oneOfType([         // Phone number can be a string or number
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
 
};

export default User;
