const {Schema, model} = require('mongoose')

const msgSchema = new Schema({
    receiverId: Schema.Types.ObjectId,
    senderId:Schema.Types.ObjectId,
    room:String,
    message:String
},{timestamps : true})

const Message = model('Message', msgSchema)

module.exports = Message;