import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { io } from 'socket.io-client'

function App() {
  const socket = io('http://localhost:5646')
  const [message, setMessage] = useState('')


  useEffect(()=>{
    socket.on('connection',(data)=>{
      console.log(data)
    })

    socket.on('info',(message)=>{
      console.log(message)
    })

    return ()=>{
      socket.off('info')
    }

  },[])

  const handleFormSubmit =(e)=>{
    e.preventDefault()
    socket.emit('message',message)
  }

  return (
    <div>
      <section>
        <form>
          <input className='w-[200px] h-10'
            onChange={(e)=>setMessage(e.target.value)}
          >
          </input>
          <button onClick={(e)=>{handleFormSubmit(e)}}>submit</button>
        </form>
      </section>
    </div>
  )
}

export default App
