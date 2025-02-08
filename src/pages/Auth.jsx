import React from 'react'
import { Link } from 'react-router-dom'

function Auth() {
  return (
    <>
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-10 bg-white shadow-lg rounded-lg w-full max-w-3xl">
      {/* Image Section */}
      <div className="hidden md:block">
        <img className="w-60 p-5" src="https://cdn-icons-png.flaticon.com/512/10026/10026257.png" alt="Icon" />
      </div>
  
      {/* Authentication Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input type="Username" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Login
          </button>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Register
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-3">
          Don't have an account? <a href="#" className="text-blue-500 hover:underline"><Link to={'/register'}>Sign up</Link></a>
        </p>
        <p className="text-sm text-gray-600 mt-3">
          Login into your <a href="#" className="text-blue-500 hover:underline"><Link to={'/login'}>Account</Link></a>
        </p>
        <p className="text-sm text-gray-600 mt-3">
          Go Back <a href="#" className="text-blue-500 hover:underline"><Link to={'/'}>Home</Link></a>
        </p>
      </div>
    </div>
  </div>
  

   </>
        )
}

        export default Auth