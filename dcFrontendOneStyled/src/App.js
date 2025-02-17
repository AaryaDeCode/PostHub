import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import PostForm from './components/PostForm';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="brand">Interview Hub</Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/create" className="nav-link">New Post</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/details/:id" element={<PostDetails />} />
        <Route path="/create" element={<PostForm />} />
        <Route path="/update/:id" element={<PostForm isUpdate={true} />} />
      </Routes>
    </Router>
  );
}

export default App;