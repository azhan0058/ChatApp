import {useState} from 'react'
import ChatIcon from "../assets/react.svg"
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { api, joinChatApi } from '../services/RoomService';
import useChatContext from '../context/ChatContext';



const JoinCreateChat = () => {

  const navigate = useNavigate();

  const {roomId, userName, setRoomId, setCurrentUser, setConnected} = useChatContext();

  const [detail, setDetail]= useState({
    roomId: "",
    userName: "",
  });

  function handleFormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]:event.target.value,
    })
  }

 async function joinChat(event) {
  event.preventDefault();

  if (!detail.userName.trim()) {
    toast.error("Please enter your name");
    return;
  }

  if (!detail.roomId.trim()) {
    toast.error("Please enter room ID");
    return;
  }
  
  try{
    const room = await joinChatApi(detail.roomId);
    toast.success("Joined room successfully !!");
    setCurrentUser(detail.userName);
      setRoomId(room.roomId);
      setConnected(true);
      navigate(`/chat`);

  }catch(error){
    console.log(error)
    toast.error("Error in joining room !!")
  }
}

  async function createRoom(event){
    event.preventDefault();
    if (!detail.userName.trim()) {   
       toast.error("Please enter your name");  
         return;
                                 }

     if (!detail.roomId.trim()) {
    toast.error("Please enter room ID");
    return;
                                }
      //create room
    console.log(detail);
    //call api to create room on backend
    try{
      const response = await api((detail.roomId));
      console.log(response)
      toast.success("Room Created Successfully");
      //join the room 
      setCurrentUser(detail.userName);
      setRoomId(response.roomId);
      setConnected(true);

      navigate(`/chat`);
      //forward to chat page....

    }catch(error) {
      console.log(error);
      if(error.response && error.response.status === 400) {
        toast.error("Room Id already exist !!")
      } else {
      console.log("Error in creating room");
      }
    }
  };



  return (
    <div className= "min-h-screen flex items-center justify-center">  
      <div className='p-10 dark:border-gray-700 w-full flex flex-col gap-5 max-w-md rounded-lg dark:bg-gray-700 shadow'> 
        <div className='flex justify-center'> <img src={ChatIcon} alt="" /></div>
        <h1 className='text-2xl font-semibold text-center mb-4'>Join Room / Create Room </h1>
        {/* div for name*/}
        <div className=''>
            <label htmlFor="name" className='block font-medium mb-2'>Your Name</label>
            <input onChange={handleFormInputChange} value={detail.userName} name='userName' placeholder='Enter the name' type='text' id='name' className='w-full dark:bg-gray-600 px-4 py-2 rounded-full border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
        </div>
        {/* div for Room Id*/}
        <div className=''>
            <label htmlFor="name" className='block font-medium mb-2'>Room ID / New Room ID</label>
            <input onChange={handleFormInputChange} value={detail.roomId} name='roomId' placeholder='Enter the room Id'  type='text' id='name' className='w-full dark:bg-gray-600 px-4 py-2 rounded-full border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
        </div>
        {/* div for button*/}
        <div className='flex px-2 py-4 justify-center gap-20 mt-2' >
            <button onClick={joinChat} className="px-2 py-4 dark:bg-blue-600 hover:dark:bg-blue-800 rounded-full"> Join Room </button>
            <button onClick={createRoom} className="px-2 py-4  dark:bg-orange-600 hover:dark:bg-orange-800 rounded-full"> Create Room </button>
        </div>
      </div>

    </div>
  )
}

export default JoinCreateChat