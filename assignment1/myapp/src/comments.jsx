import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import "./comment.css";

const Comments = () => {
    const [comments, setcomments] = useState([]);


    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then(response => {
                setcomments(response.data);
            })
            .catch(error => {
                console.error("Error fetching comments:", error);
            });
    }, []); 

    return (
        <>
                <table className="table" border="1">
                    <thead>
                        <tr>
                            <th width="9%">ID</th>
                            <th >NAME</th>
                            <th >EMAIL</th>
                            <th >Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map(comment => (
                            <tr key={comment.id}>
                                <td>{comment.id}</td>
                                <td>{comment.name}</td>
                                <td>{comment.email}</td>
                                <td>{comment.body}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </>
    );
};

export default Comments;
