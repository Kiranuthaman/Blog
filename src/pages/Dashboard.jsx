import React, { useEffect, useState } from 'react';
import AddPost from '../components/AddPost';
import Header from '../components/Header';
import { faAngleDown, faAngleUp, faComment, faHeart, faLock, faTrash, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditPost from '../components/EditPost';
import { Button } from '@material-tailwind/react';
import Comments from '../components/Comments';
import { userPostAPI, userRemoveAPi } from '../service/allApi';

function Dashboard() {
  const [userPosts, setUserPosts] = useState([]);
  const [showMoreState, setShowMoreState] = useState({});
  const [showCommentsState, setShowCommentsState] = useState({});
  const [removeStatus, setRemoveStatus] = useState(false);

  const userData = sessionStorage.getItem("existingUsers");
  const user = userData ? JSON.parse(userData) : null;
  
  const username = user?.username || "Anonymous User";
  const email = user?.email || "user@example.com";

  // Fetch user posts
  const fetchUserPosts = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await userPostAPI(reqHeader);
        setUserPosts(result.data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [removeStatus]);

  // Handle post deletion
  const handleDelete = async (id) => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await userRemoveAPi(id, reqHeader);
        if (result.status === 200) {
          alert('Post deleted successfully');
          setRemoveStatus(!removeStatus);
        } else {
          alert('Something went wrong');
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert('Error deleting post');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <div className="lg:container lg:mx-auto lg:px-72">
          <div className="flex relative max-w-xl p-3 justify-end mx-auto">
            <AddPost />
          </div>
          <div className="max-w-4xl mx-auto py-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="relative px-6 pb-6">
                <div className="flex flex-col sm:flex-row items-center -mt-16 sm:-mt-20">
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="w-16 h-16 text-blue-500" />
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                    <h1 className="text-2xl mt-5 text-gray-900 font-bold">{username}</h1>
                    <p className="text-gray-600 mt-4">{email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Posts */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">My Posts</h2>
              <div className="space-y-6">
                {userPosts.length > 0 ? (
                  userPosts.map((post, index) => {
                    const postId = post._id || `post-${index}`;
                    const showMore = showMoreState[postId] || false;
                    const showComments = showCommentsState[postId] || false;
                    const description = post.content || "";
                    const shouldShowMoreButton = description.length > 50;

                    return (
                      <div key={postId} className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        
                        {/* Post Content */}
                        <div className='relative'>
                          <p className="text-gray-700 mb-4">
                            {showMore ? description : `${description.substring(0, 50)}...`}
                          </p>
                          {shouldShowMoreButton && (
                            <button 
                              className="text-blue-500" 
                              onClick={(e) => { e.preventDefault(); setShowMoreState(prev => ({ ...prev, [postId]: !showMore })); }}
                            >
                              {showMore ? "Show Less" : "Show More"} 
                              <FontAwesomeIcon icon={showMore ? faAngleUp : faAngleDown} style={{ color: "#165eda" }} />
                            </button>
                          )}
                        </div>

                        {/* Post Actions */}
                        <div className="flex items-center text-sm text-gray-500 mt-4">
                          <span className="flex items-center mr-4">
                            <FontAwesomeIcon className="text-gray-500 text-2xl hover:text-pink-600 transition-colors" icon={faHeart} />
                            <span className="ml-1">{post.likes || 0} likes</span>
                          </span>
                          <span className="flex items-center mr-auto cursor-pointer" onClick={() => setShowCommentsState(prev => ({ ...prev, [postId]: !showComments }))}>
                            <FontAwesomeIcon className="text-gray-600 text-2xl" icon={faComment} />
                            <span className="ml-1">{post.comments || 0} comments</span>
                          </span>
                          <div className="flex space-x-3">
                            <EditPost post={post} />
                            <Button className="bg-purple-500" onClick={() => handleDelete(postId)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                            <FontAwesomeIcon icon={faLock} className="text-gray-700 cursor-pointer" />
                            <FontAwesomeIcon icon={faUnlock} className="text-gray-700 cursor-pointer" />
                          </div>
                        </div>

                        {/* Comments Section */}
                        {showComments && <Comments postId={postId} />}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No posts available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
