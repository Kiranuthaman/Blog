import React from 'react'

function Comments() {
  return (
    <>
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
    </>
  )
}

export default Comments