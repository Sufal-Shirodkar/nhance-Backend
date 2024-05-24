const messageCntrl = {}
const Message = require("../models/message-model")

messageCntrl.create = async(data)=>{
    try{
        const message1 = new Message(data)
        await message1.save()
    }catch(err){
        console.log(err)
    }
}


messageCntrl.messages = async(req, res)=>{
    try{
        const messages = await Message.find({room:{$regex:req.user.id}})
        res.json(messages)
    }catch(err){
        console.log(err)
    }
}

module.exports = messageCntrl;
