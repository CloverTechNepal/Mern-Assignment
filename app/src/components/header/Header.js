import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';



const Header = () => {
  return (
    <nav class="navbar">
        <ul>Logo</ul>
        <ul class="right-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/posts" >Posts</Link></li>
            <li><Link to="/comments">Comments</Link></li>
        </ul>
    </nav>
  )
}

export default Header