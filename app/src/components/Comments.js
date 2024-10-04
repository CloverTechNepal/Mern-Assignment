import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Comments.css';

const Comments = () => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const commentsPerPage = 10;

  useEffect(() => {
    if (showComments) {
      fetchComments(currentPage);
    }
  }, [currentPage]);

  const fetchComments = async (page) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${commentsPerPage}`
      );
      setComments(response.data);
      const totalComments = response.headers['x-total-count'];
      setTotalPages(Math.ceil(totalComments / commentsPerPage));
    } catch (error) {
      console.error('Error fetching the comments', error);
    }
  };

  const clicked = () => {
    setShowComments(!showComments);
    if (!showComments && comments.length === 0) {
      fetchComments(currentPage);
    }
  };

  
  const getPageNumbers = () => {
    const pageNumbers = [];
    const ellipsis = '...';

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, ellipsis, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, ellipsis, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, ellipsis, currentPage - 1, currentPage, currentPage + 1, ellipsis, totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="comments-section">
      <button onClick={clicked}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>

      {showComments && (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.id}</td>
                  <td>{comment.email}</td>
                  <td>{comment.body}</td>
                </tr>
              ))}
            </tbody>
          </table>

          
          <div className="pagination">
            <button
              className="pagination-button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt;
            </button>

            {getPageNumbers().map((page, index) =>
              typeof page === 'number' ? (
                <button
                  key={index}
                  className={`pagination-button ${page === currentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ) : (
                <span key={index} className="pagination-ellipsis">
                  {page}
                </span>
              )
            )}

            <button
              className="pagination-button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
