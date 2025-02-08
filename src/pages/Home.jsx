
import React from 'react'
import Header from '../components/Header'
import UserCard from '../components/UserCard'


function Home() {
  return (
    <>
    <Header/>
    <div className=' bg-gray-100'>
    <div className='lg:container lg:mx-auto lg:px-72'>
    <div className="relative max-w-xl p-5 mx-auto mb-3">
      <input
        type="text"
        placeholder="Search posts..."
        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-700"
      />
    </div>
    <div className='mt-8'>
    <UserCard />
    </div>
    <div className='mt-8'>
    <UserCard />
    </div>
    <div className='mt-8'>
    <UserCard />
    </div>
    </div>
    </div>
   
    </>
  )
}

export default Home