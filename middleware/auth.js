const jwt=require('jsonwebtoken')
const config=require('config')

module.exports=(req,res,next)=>{
    //get token from header 
    const token=req.header('x-auth-token')//header key where token in
    if(!token){
        return res.status(401).json({msg:"No token,authorization denied"})
    }

    try {
        const decoded=jwt.verify(token,config.get('jwtSecret'))
        //get our payload
        req.user=decoded.user
        next()
    } catch (error) {
        res.status(401).json({msg:"token invalid"})
        
    }
}