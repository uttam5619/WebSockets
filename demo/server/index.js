require('dotenv').config()

const app = require('express')
// creating the http server and using express for request handling 
const server = require('http').createServer(app)

const {Server} = require('socket.io')
// binded the socket server together with http server
const io = new Server(server)

const port = process.env.PORT || 4010



// listening WebSocket server on port 5646
io.on('connection',(socket)=>{
    console.log(`A new client node conntected to socket server with socket id ${socket.id}`)
})


// listening http server on port 5646
server.listen(port,()=>{
    console.log(`http Server is listning on port ${port}`)
})



