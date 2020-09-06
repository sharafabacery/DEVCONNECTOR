const express=require('express')
const router=express.Router()
const auth=require('../../middleware/auth')
const User=require('../../models/User')
const bcrypt=require('bcryptjs')
const {
    check,
    validationResult
} = require('express-validator')
const config=require('config')
const jwt=require('jsonwebtoken')
router.get('/',auth,async(req,res)=>{
    try {
        const user=await User.findById(req.user.id).select('-password')
        res.json(user)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("server error")
    }
})

router.post('/', [
 check('email', "please include avalid email").isEmail(),
 check('password', "please length 6 or above ").exists()],
  async(req, res) => {
      //set error
      const errors=validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
      }
      const{email,password}=req.body 
    try {
        let user=await User.findOne({email})

        if(!user){
        return res.status(400).json({errors:[{msg:"Invalid credin"}]})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.status(400).json({errors:[{msg:"Invalid credin"}]})    
        }
        const payload={
            user:{id:user.id}
        }
        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},(err,token)=>{
            if(err)throw err;
            else{res.json({token})}
        })
     
        
       
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("server1 error")
        
    }


    
})






module.exports=router