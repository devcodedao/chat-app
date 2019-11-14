const express = require('express');
const path = require('path')
const socketIO = require('socket.io');
const http = require('http')
const app = express();
const publicPath = path.join(__dirname + '/../public');
const {generateLocation}=require('./utils/message')
const port = process.env.PORT = 3000;
const server = http.createServer(app)
const io = socketIO(server);
/**
 * @param connection lang nghe su kien tu client gui den server
 * @param disconnect
 */

/**
 * @param socket.emit chi truyen du lieu giua client dang truc tiep thao tac : 1 client
 * @param io.emit truyen du lieu len tat ca client bao gom client dang truc tiep thao tac : n client
 * @param socket.broadcast.emit truyen du lieu len tat ca client tru client dang truc tiep thao tac : n-1 client 
 */
io.on("connection", (socket) => {
    console.log("New user connected ")
    socket.emit("newMessage", {
        content: "Welcome to chat app"
    })
    /**
     * @param callback xu ly send message thanh cong
     */
   socket.broadcast.emit("newMessage",{content:"New user join group chat"})
    socket.on("createMessage", (msg,callback) => {
        console.log(msg),
            io.emit("newMessage", msg)
            callback('The message has ben send')
    })

    socket.on("createLocation",(message)=>{
          io.emit('newLocationMessage',generateLocation(message.from,message.latitude,message.longitude))
    })
    socket.on("disconnect", () => {
        console.log("User disconnect")
    })


})

app.use(express.static(publicPath))
server.listen(port, () => {
    console.log(`Server listen on port : ${port}`)
})