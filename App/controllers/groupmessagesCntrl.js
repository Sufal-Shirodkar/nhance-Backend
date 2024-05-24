const GroupMessage = require("../models/groupmsg-model")

const groupMsgCntrl = {}

groupMsgCntrl.create = async(data)=>{
    try{
        const message1 = new GroupMessage(data)
        await message1.save()
    }catch(err){
        console.log(err)
    }
}

groupMsgCntrl.messages = async(req, res)=>{
    const id = req.params.id
    try{
        const messages = await GroupMessage.find({groupId:id})
        res.json(messages)
    }catch(err){
        console.log(err)
    }
}

module.exports = groupMsgCntrl;
