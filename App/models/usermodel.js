const {Schema,model} = require('mongoose')
const userSchema = new Schema({
    name:String,
    password:String,
    mobile:String
})
const User = model('User',userSchema)
module.exports = User