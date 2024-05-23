const ChatHistory = require('../models/chatHistory')


const chatHistoryController={}


chatHistoryController.create =async(data)=>{
    console.log(data)
    const {username,reciever,message,members} =data
    try{
        const newChat = new ChatHistory({history:[{username,reciever,message}],members})
        const result = await newChat.save()
        console.log(result)

    }catch(err){
        console.log(err)
    }
    

}
chatHistoryController.findAll=async()=>{
    try{
        const response = await ChatHistory.find().populate("members")
        return response

    }catch(err){
        console.log(err)
    }
   

}

chatHistoryController.update=async(id,message)=>{
    try{
        await ChatHistory.findByIdAndUpdate(id,{ $push: { history: message}},{new:true})

    }catch(err){
        console.log(err)
    }

}
module.exports = chatHistoryController