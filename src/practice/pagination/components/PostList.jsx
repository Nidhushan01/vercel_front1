import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import axios from 'axios';

const itemsPerPage = 5; // Number of posts per page

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data whenever currentPage changes
useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
        params: { _page: currentPage, _limit: itemsPerPage },
      });
      setTotalPages(Math.ceil(100 / itemsPerPage)); // Since API has 100 posts
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  fetchPosts();
}, [currentPage]);


  return (
    <div className="max-w-2xl mx-auto p-5">
      <h2 className="text-xl font-bold mb-3 text-center">Paginated Posts</h2>

      {/* Display posts */}
      <ul className="bg-white shadow-md rounded-lg p-4">
        {posts.map((post) => (
          <li key={post.id} className="p-3 border-b last:border-none">
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>

      {/* Pagination Component */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}