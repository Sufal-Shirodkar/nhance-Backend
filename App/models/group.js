const {Schema,model} = require('mongoose')
const groupSchema = new Schema({
    name:String,
    members:{
       type:[Schema.Types.ObjectId],
       ref:"User"
    }
})
const Group = model('Group',groupSchema)
module.exports = Group