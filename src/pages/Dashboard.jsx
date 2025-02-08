import React, { useState } from 'react';
import AddPost from '../components/AddPost';
import Header from '../components/Header';
import { faAngleDown, faAngleUp, faComment, faHeart, faLock, faTrash, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditPost from '../components/EditPost';
import { Button } from '@material-tailwind/react';
import Comments from '../components/Comments';

function Dashboard() {
  const [showMore, setShowMore] = useState(false);
  const [showComments, setShowComments] = useState(false);

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
              {/* Cover Image */}
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              
              {/* Profile Info */}
              <div className="relative px-6 pb-6">
                <div className="flex flex-col sm:flex-row items-center -mt-16 sm:-mt-20">
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="w-16 h-16 text-blue-500" />
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                    <h1 className="text-2xl mt-5 text-gray-900 font-bold">Anonymous User</h1>
                    <p className="text-gray-600 mt-4">user@example.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Posts */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">My Posts</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Hello world</h3>
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {showMore
                      ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore totam rerum error autem, soluta possimus odio consectetur sunt corrupti, eum ratione perspiciatis quisquam dolores ad temporibus ab facere, doloribus officiis?"
                      : "Lorem ipsum dolor sit amet consectetur adipisicing elit..."}
                  </p>
                  <button 
                    className="text-blue-500 flex items-center" 
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Show Less" : "Show More"} 
                    <FontAwesomeIcon icon={showMore ? faAngleUp : faAngleDown} className="ml-1" />
                  </button>
                  
                  <div className="flex items-center text-sm text-gray-500 mt-4">
                    <span className="flex items-center mr-4">
                      <FontAwesomeIcon className="text-gray-500 text-2xl hover:text-pink-600 transition-colors" icon={faHeart} />
                      <span className="ml-1">35 likes</span>
                    </span>
                    <span className="flex items-center mr-auto cursor-pointer" onClick={() => setShowComments(!showComments)}>
                      <FontAwesomeIcon className="text-gray-600 text-2xl" icon={faComment} />
                      <span className="ml-1">23 comments</span>
                    </span>
                    <div className="flex space-x-3">
                      <EditPost />
                      <Button className="bg-purple-500">
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                      <FontAwesomeIcon icon={faLock} className="text-gray-700 cursor-pointer" />
                      <FontAwesomeIcon icon={faUnlock} className="text-gray-700 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Render Comments Only When ShowComments is True */}
              {showComments && <Comments />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
