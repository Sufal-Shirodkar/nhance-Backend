const {Schema,model} = require('mongoose')
const chatHistorySchema = new Schema({
    history:[Object],
    members:{
        type:[Schema.Types.Object],
        ref:"User"
    }
})
const ChatHistory = model('ChatHistory',chatHistorySchema)
module.exports = ChatHistory