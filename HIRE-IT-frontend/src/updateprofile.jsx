import { useState, useEffect } from 'react';
import axios from 'axios';
import './cssComponent/updateprofile.css'

const Profile = () => {
  const [formData, setFormData] = useState({
    education: '',
    specialization: '',
    linkedinId: '',
    achievements: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const userid = localStorage.getItem('userid');
  const [imagePreview, setImagePreview] = useState(null); // Preview state

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/${userid}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchProfileData();
  }, [userid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/user/updateuser/${userid}`, formData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  // Handle file input change for profile picture
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    
    // Preview the selected image
    if (selectedImage) {
      const objectUrl = URL.createObjectURL(selectedImage);
      setImagePreview(objectUrl);
    }
  };

  // Handle profile picture upload
  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', image);

    try {
      const response = await axios.post(`http://localhost:3000/api/user/${userid}/profile-picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Profile picture uploaded successfully');
        setImage(null); // Clear the image state
        setImagePreview(null); // Clear the preview
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert('Failed to upload profile picture. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading profile data...</p>; // Loading indicator
  }

  return (
    <div className='maincontainer'>
    <div className="profile-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="education">Education:</label>
          <input
            type="text"
            id="education"
            name="education"
            value={formData.education || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="specialization">Specialization:</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={formData.specialization || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="linkedinId">LinkedIn ID:</label>
          <input
            type="text"
            id="linkedinId"
            name="linkedinId"
            value={formData.linkedinId || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="achievements">Achievements:</label>
          <textarea
            id="achievements"
            name="achievements"
            value={formData.achievements || ''}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* File input for uploading profile picture */}
        <input type="file" className="image" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Image Preview" className="image-preview" />}
        <button type="button" onClick={handleUpload}>Upload Profile Picture</button>
        
        <button type="submit">Update Profile</button>
      </form>
    </div>
    </div>
  );
};

export default Profile;
