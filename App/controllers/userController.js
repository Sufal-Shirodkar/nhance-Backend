const User = require('../models/usermodel')
const {validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const userController ={}
 userController.register = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        const body = req.body
        const user = new User(body)
        const salt = await bcryptjs.genSalt();
        const encryptedPassword = await bcryptjs.hash(user.password, salt);
        user.password = encryptedPassword;
        await user.save()
        res.status(201).json(user)

    }catch(err){
        console.log(err)
        res.status(500).json('internal server error')
    }
}
userController.login = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { mobile, password } = _.pick(req.body, ['mobile', 'password'])
    try {
        const user = await User.findOne({ mobile: mobile})
        if (!user) {
            return res.status(404).json({ error: 'invalid mobile number /password' })
        }
        const checkPassword = await bcryptjs.compare(password, user.password)
        if (!checkPassword) {
            return res.status(404).json({ error: 'invalid mobile number/password' })
        }
        const tokenData = {
            id: user._id
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, { expiresIn: '7d' })
        res.json({ token: token ,user:user})
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' })
  }

}
userController.list =async(req,res)=>{
    try{
        const id = req.user.id
        console.log(id)
        const users = await User.find()
        const filteredUsers= users.filter(ele =>{
            return ele._id != id
        })
        console.log(filteredUsers)
        res.json(filteredUsers)
    }catch(err){
        console.log(err)
    }
}
module.exports = userController