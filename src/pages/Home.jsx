import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import UserCard from '../components/UserCard';
import { allPostApi } from '../service/allApi';

function Home() {
  const [allPost, setAllPost] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4; 

  const getAllPost = async () => {
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
        setAllPost(result.data);
        setCurrentPage(1); // Reset to first page on new search
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllPost();
  }, [searchKey]); // Ensure it runs on search change

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPost.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => {
    if (currentPage < Math.ceil(allPost.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
                  <div className='mt-8' key={item._id}> {/* Use _id as key */}
                    <UserCard post={item} posts={posts} setPosts={setPosts} />
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 mt-6">
                  <p>No posts found.</p>
                </div>
              )}

              {/* Pagination Controls - Only Show If Logged In */}
              {isLoggedIn && allPost.length > postsPerPage && (
                <div className="flex justify-center items-center space-x-4 mt-6">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  >
                    Previous
                  </button>
                  <span className="text-gray-700">
                    Page {currentPage} of {Math.max(1, Math.ceil(allPost.length / postsPerPage))}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={currentPage >= Math.ceil(allPost.length / postsPerPage)}
                    className={`px-4 py-2 rounded-lg ${currentPage >= Math.ceil(allPost.length / postsPerPage) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
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
