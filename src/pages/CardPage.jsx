import React from 'react'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../components/Header'

function CardPage() {
  return (
   <>
   <Header/>
    <div className=' bg-gray-100'>
    <div className='lg:container lg:mx-auto lg:px-72'>
    <div className="relative max-w-xl p-5 mx-auto mb-3">
    </div>
    <div className='mt-8'>
    <article className='bg-white rounded-lg shadow-md overflow-hidden'>
      <img src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" className='w-full h-full object-cover' alt="" />
      <div className="p-6">
        <h2 className='text-2xl font-bold mb-2'>Title</h2>
        <div className='text-gray-600 text-sm mb-4'>
          By Argo • 22/03/2000
        </div>
        <div className='relative'>
         <p className='text-gray-700 mb-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas mollitia vel modi natus optio officiis soluta aliquam impedit reiciendis? Cumque optio, aut praesentium repudiandae consequuntur accusantium natus fugit doloremque illo!</p>
        </div>
        <div className='mt-2 flex align-middle  justify-between'>
          <div>
          <FontAwesomeIcon className='text-gray-500 text-2xl hover:text-pink-600 transition-colors' icon={faHeart} />
          <span className='ms-1'>24</span>
          </div>
          <div>
          </div>
        </div>
        <div className='mt-6'>
        <h3 className='text-xl font-semibold mb-4'>
          Comments
        </h3>

        <form className='mb-4' action="">
          <textarea className='w-full p-3 border border-black rounded-lg resize-none ' placeholder='Add a comment' rows={3} name="" id="" />
        </form>
        <div className='flex justify-end'>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Post Comment
        </button>
        </div>
        <div className="space-y-4 mt-5">
          <div className="bg-gray-200 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Argo</span>
              <span className="text-sm text-gray-500">

              </span>
            </div>
            <p className="text-gray-700">Love you work</p>
          </div>
        </div>
      </div>
      </div>
    </article>
    </div>
    </div>
    </div>
   </>
  )
}

export default CardPage