import React, { useEffect, useState } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { serverUrl } from '../service/serviceUrl';
import { getCommentsApi } from '../service/allApi'; // ✅ Import the API function

function CardPage() {
  const location = useLocation();
  const post = location.state?.post; // Get post data from Link state
  const [allComments, setAllComments] = useState([]); 
  const [newComment, setNewComment] = useState(null); // ✅ Track new comments

  if (!post) {
    return <p className="text-center text-gray-500 mt-10">No post data available.</p>;
  }

  useEffect(() => {
    getAllComments();
  }, [post._id, newComment]); // ✅ Fix dependency array (use post._id)

  const getAllComments = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("User not logged in");
      return;
    }

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    };

    try {
      const result = await getCommentsApi(post._id, reqHeader); // ✅ Use correct post ID
      setAllComments(result.data.comments || []); 
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <div className="lg:container lg:mx-auto lg:px-72">
          <div className="relative max-w-xl p-5 mx-auto mb-3"></div>
          <div className="mt-8">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                 src={`${serverUrl}/upload/${post.postImg}`}
                className="w-full h-full object-cover"
                alt={post.title || "Post Image"}
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <div className="relative">
                  <p className="text-gray-700 mb-4">{post.content}</p>
                </div>
                <div className="mt-2 flex align-middle justify-between">

                </div>

                {/* 🔹 Comments Section */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Comments</h3>

                  <div className="space-y-4 mt-5">
                    {/* ✅ Show all fetched comments */}
                    {allComments.length > 0 ? (
                      allComments.map((comment, index) => (
                        <div key={index} className="bg-gray-200 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">{comment.author || "Anonymous"}</span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardPage;
