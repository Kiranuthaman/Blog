import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 

function EditPost() {
     const [open, setOpen] = useState(false);
    
      const handleOpen = () => setOpen(!open);
  return (
    <>
     <div>
      <Button onClick={handleOpen} className='bg-blue-500'>
      <FontAwesomeIcon icon={faPenToSquare} />      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className='text-blue-500'>Edit Your Post</DialogHeader>
        <DialogBody>
          <div className="container">
            <div className='grid grid-cols-2'>
             <div className='justify-center align-middle'>
             <label className='flex justify-center align-middle' htmlFor="projectImage">
                <input type="file" className='hidden' id='projectImage' />
                <img className='w-52' src="https://www.freeiconspng.com/thumbs/person-icon-blue/person-icon-blue-18.png" alt="" />
              </label>
             </div>
             <div className='ms-3'>
             <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter post title"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={6}
            placeholder="Write your post content..."
            required
          />
        </div>
             </div>
            </div>
          </div>
         
        </DialogBody>
        <DialogFooter>
          <Button
           
           
            onClick={handleOpen}
            className="mr-1 bg-purple-500"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
    </>
  )
}

export default EditPost