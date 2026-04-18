import React, { useEffect, useRef, useState } from 'react'
import { MdAttachFile, MdSend } from "react-icons/md";
import { useNavigate } from 'react-router';
import useChatContext from '../context/ChatContext';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { baseURL } from '../config/AxiosHelper';
import toast from 'react-hot-toast'; 
import { getMessages } from "../services/RoomService";
import { formatTimeAgo } from '../config/helper';





const ChatPage = () => {

    const {roomId, currentUser, connected, setConnected, setCurrentUser, setRoomId} = useChatContext();

    const navigate = useNavigate();
    useEffect(( )=> {
        if(!connected) {
            navigate('/')
        }  
    }, [connected, roomId, currentUser,]);



    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const inputRef = useRef(null);
    const chatBoxRef = useRef(null); 
    const [stompClient, setStompClient] = useState(null);

    //page init
    //load messages
    useEffect(() => {
        async function loadOldMessages() {
        try {
            const messages = await getMessages(roomId);
            setMessages(messages); 
        } catch (error) {
            console.error("Error fetching message history:", error);
            toast.error("Failed to load history.");
         }
        } if (connected && roomId) loadOldMessages();    
             }, [roomId, connected]);  
        //scroll down
        useEffect(() => {
            if (chatBoxRef.current) {
                  chatBoxRef.current.scrollTo({
                    top: chatBoxRef.current.scrollHeight,
                    behavior: "smooth", // Makes it look nice
                  });
            }
        }, [messages])     



    //init stomp client
      //subscribe stomp client


      useEffect(() => {
    let client = null; // 1. Define at the top of the effect scope

    const connectWebSocket = () => {
        const sock = new SockJS(`${baseURL}/chat`);
        client = Stomp.over(sock); // 2. Assign to the scoped variable

        client.connect({}, () => {
            setStompClient(client);
            toast.success("connected");
            client.subscribe(`/topic/room/${roomId}`, (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prev) => [...prev, newMessage]);
            });
        });
    };

    if (connected && roomId) {
        connectWebSocket();
    }

    return () => {
        if (client) { // 3. Now this block can see the 'client' variable
            client.disconnect(() => {
                console.log("Cleanup: Disconnected");
            });
        }
    };
}, [roomId, connected]);



    //send message handler
    const sendMessage = async () => {
    if (stompClient && connected && input.trim() !== "") {
        // 2. Construct the message payload
        const message = {
            sender: currentUser,
            content: input,
            roomId: roomId,
        } 
        try {
            stompClient.send(`/app/sendMessage/${roomId}`,{},JSON.stringify(message));
            setInput("");
        } catch (error) {
            console.error("Failed to send message:", error);
            toast.error("Message could not be sent.");
            }
     } else if (!connected) {
             toast.error("Not connected to chat server.");
       }
};


const handleLogOut = () => {
    if (stompClient) {
        stompClient.disconnect(() => {
            console.log("Disconnected");
        });
    }
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
    toast.success("Left the room");
};




  return (
    <div>
        {/*this is header portion */}
        <header className='dark:border-gray-700 dark:bg-gray-800 shadow fixed w-full border rounded-lg flex px-2 py-4 gap-10 justify-around items-center '>
            {/*noom name div */}
            <div className='text-xl font-semibold'>
                <h1>Room: <span>{roomId}</span></h1>
            </div>
            {/* user name div*/}
            <div className='text-xl font-semibold'>
                <h1>User: <span>{currentUser}</span></h1>
            </div>
            {/*button for leave room */}
            <div className='text-xl font-semibold'>
                <button onClick={handleLogOut} className="px-6 py-2 text-red-600 bg-red-50 border border-red-200 hover:bg-red-600 hover:text-white font-semibold rounded-full transform hover:-translate-y-0.5 transition-all duration-150">
                    Leave Room
                </button>
            </div>
        </header>

        {/*this is chat portion*/}
        <main ref={chatBoxRef} className='py-20 w-2/3 dark:bg-slate-700 mx-auto  h-screen overflow-auto'> 
            {messages.map((message,index) => (
                    <div key={index} className={`flex ${message.sender==currentUser? "justify-end":"justify-start" }`}>
                        <div className= {`my-2 ${message.sender==currentUser? "bg-green-800 ":"bg-gray-800"} p-2 max-w-xs rounded`}>
                            <div className='flex flex-row gap-2'>
                                <img className='h-10 w-10' src='https://cdn-icons-png.flaticon.com/128/9172/9172473.png' alt=''/>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-sm font-bold'>{message.sender}</p>
                                    <p>{message.content} </p>
                                    <p className="text-[10px] text-gray-400"> {formatTimeAgo(message.timeStamp)} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </main>

        {/*this is input message container portion */}
        <div className="fixed bottom-5 w-full h-12">
            <div className="h-full pr-8 gap-4 flex items-center justify-between w-1/2 mx-auto dark:bg-gray-900 shadow rounded ">
              <input value={input} onChange={(e)=>{setInput(e.target.value)}} onKeyDown={(e)=>{
                if(e.key === "Enter") {
                    sendMessage();
                }
              }} type="text" placeholder='type your text here' className='dark:border-gray-700 dark:bg-gray-800 px-5 py-2 rounded-full w-full  h-full focus:ring-0 focus:outline-none'/>
              
              <div className='flex gap-3'>
                <button className='dark:bg-gray-700 px-3 py-2 border-0 rounded-full flex justify-center items-center'>
                  <MdAttachFile size={20}/>
                </button>
                <button onClick={sendMessage} className='dark:bg-green-700 px-3 py-2 border-0 rounded-full flex justify-center items-center'>
                  <MdSend size={20}/>
                </button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ChatPage
