import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentDialog from './commentDialog';
import './post.css';

const Post = () => {
    const [showTable, setShowTable] = useState(false);
    const [posts, setPosts] = useState([]);
    const [selectedComments, setSelectedComments] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10; // Number of posts to display per page

    const toggleTable = () => {
        setShowTable(prev => !prev);
    };

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    const handleRowClick = (postId) => {
        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => {
                setSelectedComments(response.data);
                setIsDialogOpen(true);
            })
            .catch(error => {
                console.error("Error fetching comments:", error);
            });
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedComments([]);
    };

    // Calculate the current posts based on the current page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Calculate total pages
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // Function to handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to create sliding pagination buttons
    const renderPaginationButtons = () => {
        const buttons = [];
        const maxButtons = 10; // Maximum buttons to display
        const half = Math.floor(maxButtons / 2);

        let startPage = Math.max(1, currentPage - half);
        let endPage = Math.min(totalPages, currentPage + half);

        // Adjust for boundaries
        if (currentPage <= half) {
            endPage = Math.min(maxButtons, totalPages);
        } else if (currentPage + half >= totalPages) {
            startPage = Math.max(1, totalPages - maxButtons + 1);
        }

        // Add the page buttons
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => paginate(i)}
                    className={i === currentPage ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }

        // Add "..." for gaps in the pagination
        if (startPage > 1) {
            buttons.unshift(<span key="start-ellipsis">...</span>);
        }
        if (endPage < totalPages) {
            buttons.push(<span key="end-ellipsis">...</span>);
        }

        return buttons;
    };

    return (
        <>
            <div className='button'>
                <button onClick={toggleTable}>
                    {showTable ? 'No table' : 'Click for table'}
                </button>
            </div>

            {showTable && (
                <>
                    <table className="table" border="1">
                        <thead>
                            <tr>
                                <th width="9%">ID</th>
                                <th width="50%">Title</th>
                                <th width="30%">Body</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map(post => (
                                <tr key={post.id} onClick={() => handleRowClick(post.id)} style={{ cursor: 'pointer' }}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="pagination">
                        {renderPaginationButtons()}
                        {currentPage > 1 && (
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                Previous
                            </button>
                        )}
                        {currentPage < totalPages && (
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                                Next
                            </button>
                        )}
                    </div>
                </>
            )}

            {isDialogOpen && (
                <CommentDialog comments={selectedComments} onClose={closeDialog} />
            )}
        </>
    );
};

export default Post;
