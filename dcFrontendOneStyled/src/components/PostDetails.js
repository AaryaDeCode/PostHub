import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  

useEffect(() => {
  API.get(`/api/post-details/${id}/`)
    .then(response => setPost(response.data))
    .catch(error => console.error('Error fetching post details:', error));
}, [id]);


  if (!post) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{post.company_name}</h2>
      <div className="detail-container">
        <div>
          <p className="experience-text">{post.experience}</p>
        </div>
        <div className="meta-section">
          <p><strong>Role:</strong> {post.role}</p>
          <p><strong>Author:</strong> {post.author}</p>
          <p><strong>Posted:</strong> {new Date(post.created_at).toLocaleDateString()}</p>
          {post.photos && (
            <div className="photo-container">
              <img src={post.photos} alt="Interview" />
            </div>
          )}
          <div className="action-buttons">
            <Link to={`/update/${post.id}`} className="edit-btn">Edit Post</Link>
            <Link to="/" className="back-link">Back to List</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;