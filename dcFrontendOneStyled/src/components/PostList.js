import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('/api/post-list/')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);
  
  const handleDelete = (id) => {
    API.delete(`/api/post-delete/${id}/`)
      .then(response => setPosts(posts.filter(post => post.id !== id)))
      .catch(error => console.error('Error deleting post:', error));
  };
  

  return (
    <div className="container">
      <h1>Interview Experiences</h1>
      <Link to="/create">Create New Post</Link>
      <ul>
        {posts.map(post => (
          <li className="post-card" key={post.id}>
          <div className="post-header">
            <Link to={`/details/${post.id}`} className="company-role">
              {post.company_name} - {post.role}   
            </Link>
           
            <button className="delete-btn" onClick={() => handleDelete(post.id)}>
                Delete
            </button>
          </div>
        </li>
          
        ))}
      </ul>
    </div>
  );
}



export default PostList;