import { useState } from 'react'
import './App.css'
import JoinCreateChat from './components/JoinCreateChat'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ToastContainer position="top-center" />
     <JoinCreateChat/>
    </div>
  )
}

export default App
