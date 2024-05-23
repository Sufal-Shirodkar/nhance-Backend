//install libraries
const { Server } = require("socket.io")
const http = require('http')
require("dotenv").config();
const express = require('express')

const port = 3330
const cors = require('cors')
const { checkSchema } = require("express-validator");


//required files
const configureDb = require('./config/db')
const userController = require('./App/controllers/userController')
const groupController = require('./App/controllers/groupController')
const chatHistoryController = require('./App/controllers/chatController')
const {findMatchingHistoryId} = require('./App/helpers/index')
//validation files
const {userRegistrationValidation,loginValidationSchema} = require('./App/validations/userValidation')
const {authenticateUser} = require('./App/middleware/auth')
// app level middleware
const app = express()
const server = http.createServer(app)
app.use(express.json())
app.use(cors())
configureDb()

//socket connection
const io = new Server(server,{cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"],
    credentials:true,
}})
 
io.on("connection",(socket)=>{
    console.log('User connected',socket.id)
    socket.on('join', (data) => {
        console.log(`User joined with data: ${data}`);
        // Handle the join event, e.g., add user to a room
        socket.join(data.roomId);
        // Send a welcome message or other information
        socket.emit('welcome', { message: 'Welcome to the room!',id:data.roomId});
    });
    socket.on('message1', async(data) => {
        const {username,reciever,room,message,isGroup,groupName,members} = data
        const history = await chatHistoryController.findAll()
        console.log(JSON.stringify(history,null,2))
        const existingId = findMatchingHistoryId(history,data)
        if(existingId){
            

        }
        chatHistoryController.create(data)
        // socket.join(data.room)
        socket.to(data.room).emit('recieve_message',{
            username:username,reciever:reciever,message:message,isGroup:isGroup
        })
       
    });

    socket.on('join-group',(data)=>{
        console.log(data)
        socket.join(data.groupId)
        console.log(data.groupName)
        socket.emit('new-join',{username:data.username,groupName:data.groupName})
    })

    // Handle room message
    socket.on('group-message',(data)=>{
        socket.to(data.group).emit('recieve_group_message',{message:data})
    })

    socket.on("disconnect",()=>{
        console.log(`User ${socket.id} has left`)
    })
   
})


// set up routes
app.post('/api/users/register',checkSchema(userRegistrationValidation),userController.register)
app.post('/api/users/login',checkSchema(loginValidationSchema),userController.login)
app.get('/api/users',authenticateUser,userController.list)
app.post('/api/groups',authenticateUser,groupController.create)
app.get('/api/groups',authenticateUser,groupController.list)
app.put('/api/groups/:id',authenticateUser,groupController.update)
app.get('/api/users/account',authenticateUser,userController.account)
server.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
