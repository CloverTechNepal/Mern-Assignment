import React from 'react';
import Header from './components/header/Header';
import Posts from './components/Posts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Comments from './components/Comments';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
