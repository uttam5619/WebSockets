require('dotenv').config()
const cors = require('cors')
const express = require('express')

const app = express()
// creating the http server and using express for request handling 
const server = require('http').createServer(app)

const {Server} = require('socket.io')
// binded the socket server together with http server
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:['GET', 'POST'],
        credentials:true,
    }
})

const port = process.env.PORT || 4010

app.use(
    cors({
        origin:"http://localhost:5173",
        methods:['GET', 'POST'],
        credentials:true,
    })
)


// listening WebSocket server on port 5646
io.on('connection',(socket)=>{
    console.log(`A new client node conntected to socket server with socket id ${socket.id}`)
    socket.emit('connection',`hello client node! i am server , our socket id is ${socket.id}`)
    //socket.broadcast.emit('connection',`hello to all, i am a new client node with socket id ${socket.id}`)
    socket.on('message',(message)=>{
        console.log(message)
        socket.broadcast.emit('info', message)
    })

    
    
})


// listening http server on port 5646
server.listen(port,()=>{
    console.log(`http Server is listning on port ${port}`)
})



