import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Posts from './Posts';
import Comments from './comments';
import Read from './Read'

const App = () => {
  return (
    <>
    
      {/* <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/comments">Comments</Link>
          <Link to="/read">Read</Link>
        </nav>
      </header> */}
      <nav class="header">
            <div>LOGO</div>
            <div class="header-right">
                <Link to="/"  class="link">Home</Link>
                <Link to="/posts" class="link">Post</Link>
                <Link to="/comments" class="link" >Comment</Link>
            </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
    </>
  );
};

export default App;
