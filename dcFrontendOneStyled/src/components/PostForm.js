import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api';
import axios from 'axios';


function PostForm({ isUpdate = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    company_name: '',
    role: '',
    experience: '',
    author: '',
    photos: null,
  });


useEffect(() => {
  if (isUpdate && id) {
    API.get(`/api/post-details/${id}/`)
      .then(response => {
        const { company_name, role, experience, author } = response.data;
        setFormData({ company_name, role, experience, author, photos: null });
      })
      .catch(error => console.error('Error fetching post data:', error));
  }
}, [isUpdate, id]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photos') {
      setFormData(prevState => ({ ...prevState, photos: files[0] }));
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data;
    let headers = {};

    if (formData.photos) {
      data = new FormData();
      data.append('company_name', formData.company_name);
      data.append('role', formData.role);
      data.append('experience', formData.experience);
      data.append('author', formData.author);
      data.append('photos', formData.photos);
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      data = {
        company_name: formData.company_name,
        role: formData.role,
        experience: formData.experience,
        author: formData.author,
      };
    }

    if (isUpdate) {
      axios.put(`/api/post-update/${id}/`, data, { headers })
        .then(response => {
          navigate('/');
        })
        .catch(error => console.error('Error updating post:', error));
    } else {
      axios.post('/api/post-create/', data, { headers })
        .then(response => {
          navigate('/');
        })
        .catch(error => console.error('Error creating post:', error));
    }
  };

  return (
    <div className="container">
      <h2>{isUpdate ? 'Update Post' : 'Create New Post'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Experience:</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Photo (optional):</label>
          <input
            type="file"
            name="photos"
            onChange={handleChange}
          />
        </div>
        <button type="submit">{isUpdate ? 'Update' : 'Create'}</button>
      </form>
      <br />
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default PostForm;