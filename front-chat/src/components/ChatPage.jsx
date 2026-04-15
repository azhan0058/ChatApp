import React from 'react'

const ChatPage = () => {
  return (
    <div>ChatPage made by me
        {/*this is header portion */}
        <header className='dark:border-gray-700 dark:bg-gray-800 shadow fixed w-full border rounded-lg flex px-2 py-4 gap-10 justify-around items-center '>
            {/*noom name div */}
            <div className='text-xl font-semibold'>
                <h1>Room: <span>family Room</span></h1>
            </div>
            {/* user name div*/}
            <div className='text-xl font-semibold'>
                <h1>User: <span>Arish</span></h1>
            </div>
            {/*button for leave room */}
            <div className='text-xl font-semibold'>
                <button className="px-6 py-2 text-red-600 bg-red-50 border border-red-200 hover:bg-red-600 hover:text-white font-semibold rounded-full transform hover:-translate-y-0.5 transition-all duration-150">
                    Leave Room
                </button>
            </div>
        </header>

        {/*this is chat portion*/}
        <div>/</div>
    </div>
  )
}

export default ChatPage