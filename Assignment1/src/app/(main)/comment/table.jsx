"use client";
import Loading from './loading';
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

const TableComment = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5; 
  const [isTableVisible, setIsTableVisible] = useState(false);


  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/comments')
      .then((response) => {
        setComments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);


  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);


  const totalPages = Math.ceil(comments.length / commentsPerPage);


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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] font-extrabold">Id</TableHead>
                <TableHead className="font-extrabold">Name</TableHead>
                <TableHead className="font-extrabold">Email</TableHead>
                <TableHead className="text-center font-extrabold">Body</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow >
                  <TableCell colSpan={4} className="text-center">
                    <Loading />
                  </TableCell>
                </TableRow>
              ) : (
                currentComments.map((comment) => (
                  <TableRow key={comment.id} className="cursor-pointer">
                    <TableCell>{comment.id}</TableCell>
                    <TableCell>{comment.name}</TableCell>
                    <TableCell>{comment.email}</TableCell>
                    <TableCell className="text-right">{comment.body}</TableCell>
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
    </div>
  );
};

export default TableComment;
