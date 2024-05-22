const mongoose = require('mongoose')
const configureDb = async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/chatsystem')
        console.log('successfully connect to the database')
    }catch(err){
        console.log(err)
    }
}
module.exports=configureDb;