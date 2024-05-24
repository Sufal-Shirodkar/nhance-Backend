const {Schema, model} = require('mongoose')

const groupmsgSchema = new Schema({
    senderName:String,
    groupId:{
        type:Schema.Types.ObjectId,
        ref:'Group'
    },
    message:String
},{timestamps : true})

const GroupMessage = model('GroupMessage', groupmsgSchema)

module.exports = GroupMessage;