import React from 'react';
import './dialog.css'; // Add your styles here

const CommentDialog = ({ comments, onClose }) => {
    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <h2>Comments</h2>
                <button onClick={onClose}>Close</button>
                {comments.length > 0 ? (
                     <table border="1" >
                     <thead>
                         <tr>
                             <th width="9%">ID</th>
                             <th >Name</th>
                             <th >Email</th>
                             <th >Body</th>
                         </tr>
                     </thead>
                     <tbody>
                         {comments.map(comment => (
                             <tr key={comment.id} >
                                 <td>{comment.id}</td>
                                 <td>{comment.name}</td>
                                 <td>{comment.email}</td>
                                 <td>{comment.body}</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
                ) : (
                    <p>No comments found.</p>
                )}
            </div>
        </div>
    );
};

export default CommentDialog;
