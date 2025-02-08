import { faAngleDown, faAngleUp, faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Comments from './Comments';
import { Link } from 'react-router-dom';

function UserCard() {
  const [showMore, setShowMore] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <>
      <article className='bg-white rounded-lg shadow-md overflow-hidden'>
        <Link to={'/page'}>
          <img src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" className='w-full h-48 object-cover' alt="" />
        </Link>
        <div className="p-6">
          <Link to={'/page'}>
            <h2 className='text-2xl font-bold mb-2'>Title</h2>
          </Link>
          <div className='text-gray-600 text-sm mb-4'>
            By Argo • 22/03/2000
          </div>
          <div className='relative'>
            <p className='text-gray-700 mb-4'>
              {showMore
                ? "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas mollitia vel modi natus optio officiis soluta aliquam impedit reiciendis? Cumque optio, aut praesentium repudiandae consequuntur accusantium natus fugit doloremque illo!"
                : "Lorem ipsum, dolor sit amet consectetur adipisicing elit..."}
            </p>
            <button className='text-blue-500' onClick={(e) => { e.preventDefault(); setShowMore(!showMore); }}>
              {showMore ? "Show Less" : "Show More"} <FontAwesomeIcon icon={showMore ? faAngleUp : faAngleDown} style={{color: "#165eda"}} />
            </button>
          </div>
          <div className='mt-2 flex align-middle justify-between'>
            <div>
              <FontAwesomeIcon className='text-gray-500 text-2xl hover:text-pink-600 transition-colors' icon={faHeart} />
              <span className='ms-1'>24</span>
            </div>
            <div>
              <button onClick={() => setShowComments(!showComments)} className='text-gray-600 text-2xl'>
                <FontAwesomeIcon icon={faComment} />
              </button>
              <span className='ms-1'>24</span>
            </div>
          </div>
          {showComments && <Comments />}
        </div>
      </article>
    </>
  );
}

export default UserCard;