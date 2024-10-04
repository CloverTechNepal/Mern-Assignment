"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"; 
import { Switch } from '@/components/ui/switch';
import Loading from './loading';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'; 

const TableComment = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; 
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); 
  const [selectedPost, setSelectedPost] = useState(null); 
  const [selectedComments, setSelectedComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false); 

  // Fetch posts data from the API
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Function to fetch comments for the selected post
  const handleRowClick = async (postId) => {
    setLoadingComments(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      setSelectedComments(response.data);
      setSelectedPost(posts.find(post => post.id === postId));
      setDialogOpen(true);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
    setLoadingComments(false);
  };

  const indexOfLastComment = currentPage * postsPerPage;
  const indexOfFirstComment = indexOfLastComment - postsPerPage;
  const currentposts = posts.slice(indexOfFirstComment, indexOfLastComment);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const maxVisiblePages = 5; 
  const halfVisible = Math.floor(maxVisiblePages / 2);
  let startPage = Math.max(currentPage - halfVisible, 1);
  let endPage = Math.min(currentPage + halfVisible, totalPages);

  if (endPage - startPage < maxVisiblePages - 1) {
    if (startPage === 1) {
      endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    } else {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
  }

  return (
    <div className="mt-8 pr-5 pl-5">
      <Switch onClick={() => setIsTableVisible(prev => !prev)} width={50} height={50}/>
      <span className="pl-2 font-extrabold text-slate-500">{isTableVisible ? 'Hide Table' : 'Show Table'}</span>

      {isTableVisible && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] font-extrabold">Id</TableHead>
                <TableHead className="font-extrabold">Title</TableHead>
                <TableHead className="text-center font-extrabold">Body</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow >
                  <TableCell colSpan={3} className="text-center">
                    <Loading />
                  </TableCell>
                </TableRow>
              ) : (
                currentposts.map((post) => (
                  <TableRow key={post.id} className="cursor-pointer" onClick={() => handleRowClick(post.id)}>
                    <TableCell>{post.id}</TableCell>
                    <TableCell>{post.title}</TableCell>
                    <TableCell className="text-right">{post.body}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-center mt-5">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="mx-1"
            >
              &lt; 
            </Button>
            {[...Array(endPage - startPage + 1)].map((_, index) => (
              <Button
                key={startPage + index}
                onClick={() => setCurrentPage(startPage + index)}
                className={`mx-1 ${currentPage === startPage + index ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
              >
                {startPage + index}
              </Button>
            ))}
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="mx-1"
            >
              &gt; 
            </Button>
          </div>
        </>
      )}

    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-h-[80vh] overflow-y-auto"> {/* Set max height and enable scrolling */}
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
          <hr className="my-2" />
          <DialogDescription>
            {loadingComments ? (
              <Loading />
            ) : (
              selectedPost && (
                <>
                  {selectedComments.map(comment => (
                    <div key={comment.id}>
                      <p><strong>Name:</strong> {comment.name}</p>
                      <p><strong>Email:</strong> {comment.email}</p>
                      <p><strong>Comment:</strong> {comment.body}</p>
                      <hr className="my-2" />
                    </div>
                  ))}
                </>
              )
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogClose />
      </DialogContent>
    </Dialog>
    </div>
  );
};

export default TableComment;
