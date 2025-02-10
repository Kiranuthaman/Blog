import React, { useState } from 'react';
import { faHeart, faComment, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { serverUrl } from '../service/serviceUrl';
import { likePostApi } from '../service/allApi';
import Comments from './Comments';

function UserCard({ post, posts = [], setPosts = () => {} }) {
  const [showMore, setShowMore] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [hasLiked, setHasLiked] = useState(false); // Track if the user has already liked the post

  const description = post.content || "";
  const shouldShowMoreButton = description.length > 100;

  // Handle Like Function (One like per user)
  const handleLike = async (postId) => {
    if (hasLiked) return; // Prevent multiple likes from the same user

    try {
      console.log("Liking post with ID:", postId);

      // Optimistic UI update (increase likes before API call)
      const updatedPosts = posts.map((p) =>
        p._id === postId ? { ...p, likes: p.likes + 1 } : p
      );
      setPosts(updatedPosts);

      // Make API request
      const response = await likePostApi(postId, { "Content-Type": "application/json" });

      if (response && response.data && response.data.post) {
        setPosts(posts.map((p) => (p._id === postId ? response.data.post : p)));
        setHasLiked(true); // Mark post as liked
      } else {
        throw new Error("Failed to update like count");
      }
    } catch (error) {
      console.error("Error liking post:", error);
      // Revert UI update in case of error
      setPosts(posts.map((p) => (p._id === postId ? { ...p, likes: p.likes - 1 } : p)));
    }
  };

  return (
    <>
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <Link to={'/page'} state={{ post }}>
          <img
            src={`${serverUrl}/upload/${post.postImg}`}
            className="w-full h-48 object-cover"
            alt={post.title || 'Post Image'}
          />
        </Link>
        <div className="p-6">
          <Link to={'/page'} state={{ post }}>
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          </Link>
          <div className="relative">
            <p className="text-gray-700 mb-4">
              {showMore ? description : `${description.substring(0, 50)}...`}
            </p>
            {shouldShowMoreButton && (
              <button
                className="text-blue-500"
                onClick={(e) => { e.preventDefault(); setShowMore(!showMore); }}
              >
                {showMore ? 'Show Less' : 'Show More'}
                <FontAwesomeIcon icon={showMore ? faAngleUp : faAngleDown} style={{ color: '#165eda' }} />
              </button>
            )}
          </div>
          <div className="mt-2 flex align-middle justify-between">
            <div>
              <FontAwesomeIcon
                onClick={() => handleLike(post._id)}
                className={`text-gray-500 text-2xl hover:text-pink-600 transition-colors cursor-pointer ${hasLiked ? 'text-pink-600' : ''}`}
                icon={faHeart}
              />
              <span className="ms-1">{post.likes || 0}</span>
            </div>
            <div>
              <button onClick={() => setShowComments(!showComments)} className="text-gray-600 text-2xl">
                <FontAwesomeIcon icon={faComment} />
              </button>
            </div>
          </div>
          {showComments && <Comments postId={post._id} />}
        </div>
      </article>
    </>
  );
}

export default UserCard;
