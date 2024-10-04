import React, { useState } from 'react';
import axios from 'axios';
import './Posts.css'; 

const Posts = () => {
  const [showPosts, setShowPosts] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [selectedPostComments, setSelectedPostComments] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clicked = async () => {
    setShowPosts(!showPosts);

    if (!showPosts && posts.length === 0) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching the posts', error);
      }
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePostClick = async (postId) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      setSelectedPostComments(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching comments', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPostComments(null);
  };

  
  const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalPosts / postsPerPage);
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

    return (
      <div className="pagination">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          &lt;
        </button>

        {pageNumbers.map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              className={`pagination-button ${page === currentPage ? 'active' : ''}`}
              onClick={() => paginate(page)}
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
          onClick={() => paginate(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div className="btn">
      <button onClick={clicked}>
        {showPosts ? 'Hide Posts' : 'Show Posts'}
      </button>

      {showPosts && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <tr key={post.id} onClick={() => handlePostClick(post.id)}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}

      {isModalOpen && selectedPostComments && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Comments</h2>
            {selectedPostComments.length === 0 ? (
              <p>No comments available for this post.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Body</th>
                  </tr>
                </thead>
                {selectedPostComments.map((comment) => (
                  <tr key={comment.id}>
                    <td>{comment.id}</td>
                    <td>{comment.name}</td>
                    <td>{comment.email}</td>
                    <td>{comment.body}</td>
                  </tr>
                ))}
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
