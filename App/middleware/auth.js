const jwt = require('jsonwebtoken')

const authenticateUser = async(req,res,next)=>{
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).json({error:'token is required'})
    }
    try{
        const tokenData = jwt.verify(token, process.env.JWT_SECRETKEY)
        const user = {
            id : tokenData.id,
        }
        req.user = user
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({error:[err]})
    }
}


module.exports = { authenticateUser}