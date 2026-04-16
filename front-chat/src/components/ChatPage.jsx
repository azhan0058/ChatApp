import React, { useRef, useState } from 'react'
import { MdAttachFile, MdSend } from "react-icons/md";


const [messages, setMessages] = useState([]);
const[input, setInput] = useState("");
const inputRef = useRef(null);
const chatBoxRef = useRef(null); 
const[stompClient, setStompClient] = useState(null);
const[roomId, setRoomId] = useState("");

const ChatPage = () => {
  return (
    <div>
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
        <main className='py-20 w-2/3 dark:bg-slate-700 mx-auto  h-screen overflow-auto'> 
            <div className='message-container'>
                <h1>hi</h1>
            </div>
        </main>

        {/*this is input message container portion */}
        <div className="fixed bottom-5 w-full h-12">
            <div className="h-full pr-8 gap-4 flex items-center justify-between w-1/2 mx-auto dark:bg-gray-900 shadow rounded ">
              <input type="text" placeholder='type your text here' className='dark:border-gray-700 dark:bg-gray-800 px-5 py-2 rounded-full w-full  h-full focus:ring-0 focus:outline-none'/>
              
              <div className='flex gap-3'>
                <button className='dark:bg-gray-700 px-3 py-2 border-0 rounded-full flex justify-center items-center'>
                  <MdAttachFile size={20}/>
                </button>
                <button className='dark:bg-green-700 px-3 py-2 border-0 rounded-full flex justify-center items-center'>
                  <MdSend size={20}/>
                </button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ChatPage