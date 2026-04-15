import React from 'react'
import ChatIcon from "../assets/react.svg"

const JoinCreateChat = () => {
  return (
    <div className= "min-h-screen flex items-center justify-center">  
      <div className='p-10 dark:border-gray-700 w-full flex flex-col gap-5 max-w-md rounded-lg dark:bg-gray-700 shadow'> 
        <div className='flex justify-center'> <img src={ChatIcon} alt="" /></div>
        <h1 className='text-2xl font-semibold text-center mb4'>Join Room / Create Room </h1>
        {/* div for name*/}
        <div className=''>
            <label htmlFor="name" className='block font-medium mb-2'>Your Name</label>
            <input type='text' id='name' className='w-full dark:bg-gray-600 px-4 py-2 rounded-full border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
        </div>
        {/* div for Room Id*/}
        <div className=''>
            <label htmlFor="name" className='block font-medium mb-2'>Room ID / New Room ID</label>
            <input type='text' id='name' className='w-full dark:bg-gray-600 px-4 py-2 rounded-full border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
        </div>
        {/* div for button*/}
        <div className='flex px-2 py-4 justify-center gap-20 mt-2' >
            <button className="px-2 py-4 dark:bg-blue-600 hover:dark:bg-blue-800 rounded-full"> Join Room </button>
            <button className="px-2 py-4  dark:bg-orange-600 hover:dark:bg-orange-800 rounded-full"> Create Room </button>
        </div>
      </div>

    </div>
  )
}

export default JoinCreateChat