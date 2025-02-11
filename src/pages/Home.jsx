import React, { useContext, useEffect, useState, useCallback } from 'react';
import Header from '../components/Header';
import UserCard from '../components/UserCard';
import { allPostApi, likePostApi } from '../service/allApi';
import { likePostResponse } from '../context/ContextShare';

function Home() {
  const [allPost, setAllPost] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const { likResponse, setLikeResponse } = useContext(likePostResponse);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4; 

  // Fetch posts
  const getAllPost = useCallback(async () => {
    setLoading(true);
    if (sessionStorage.getItem("token")) {
      setIsLoggedIn(true);
      try {
        const token = sessionStorage.getItem('token');
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        };
        const result = await allPostApi(searchKey, reqHeader);
        
        // Filter and sort posts
        const filteredPosts = result.data
          .filter(post => post.public === true)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setAllPost(filteredPosts);
        setCurrentPage(1);  // Reset pagination on new search
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  }, [searchKey, likResponse]); // Add likResponse to dependencies to update on like changes

  useEffect(() => {
    getAllPost();
  }, [getAllPost]);

  // Handle Like
  const handleLike = async (postId) => {
    if (!sessionStorage.getItem("token")) return;

    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await likePostApi(postId, reqHeader);
      if (response && response.data) {
        setLikeResponse(response.data);
        setAllPost((prevPosts) =>
          prevPosts.map((p) => 
            p._id === postId ? { ...p, likes: response.data.likes, liked: true } : p
          )
        );
      } else {
        throw new Error("Failed to update like count");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPost.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(allPost.length / postsPerPage);

  return (
    <>
      <Header />
      <div className='bg-gray-100 min-h-screen'>
        <div className='lg:container lg:mx-auto lg:px-72'>
          {/* Search Input */}
          <div className="relative max-w-xl p-5 mx-auto mb-3">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-700"
            />
          </div>

          {/* Loading Indicator */}
          {loading ? (
            <div className="text-center text-gray-500 my-6">Loading posts...</div>
          ) : (
            <>
              {/* Display Posts */}
              {currentPosts.length > 0 ? (
                currentPosts.map((item) => (
                  <div className='mt-8' key={item._id}>
                    <UserCard post={item} posts={allPost} setPosts={setAllPost} handleLike={handleLike} />
                  </div>
                ))
              ) : (
                <div className="text-center h-full text-gray-500 mt-6">
                  <h1 className='text-5xl'>No posts found.</h1>
                </div>
              )}

              {/* Pagination Controls - Only Show If More Pages Exist */}
              {isLoggedIn && totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-6">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  >
                    Previous
                  </button>
                  <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage >= totalPages}
                    className={`px-4 py-2 rounded-lg ${currentPage >= totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
