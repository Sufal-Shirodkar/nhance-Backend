const Group = require('../models/group')
const groupController={}
groupController.create =async(req,res)=>{
    try{
        const body = req.body
        console.log(body)
        const group =  new Group(body)
        await group.save()
        res.status(201).json(group)
    }catch(err){
        console.log(err)
        res.status(500).json('internal server error')
    }
}
groupController.list=async(req,res)=>{
    try{
        const groups = await Group.find()
        res.json(groups)
    }catch(err){
        console.log(err)
        res.status(500).json('internal server error')
    }
}
groupController.update=async(req,res)=>{
    const id = req.params.id
    const member = req.body
    console.log(member.user._id)
    try{
        const group = await Group.findOne({_id:id})
        if(!group.members.includes(member.user._id)){
            group.members =[...group.members,member.user._id]
        }
        await group.save()
        console.log(group)
        res.json(group)

    }catch(err){
        console.log(err)
        res.json('internal server error')
    }
    

}
module.exports = groupController