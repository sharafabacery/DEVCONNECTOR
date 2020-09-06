const express = require('express')
const gravatar=require('gravatar')
const bcrypt=require('bcryptjs')
const config=require('config')
const jwt=require('jsonwebtoken')
const {
    check,
    validationResult
} = require('express-validator')
const router = express.Router()

const User=require('../../models/User')


router.post('/', [check('name', "name is required").not().isEmpty(),
 check('email', "please include avalid email").isEmail(),
 check('password', "please length 6 or above ").isLength({min:6})],
  async(req, res) => {
      //set error
      const errors=validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
      }
      const{name,email,password}=req.body 
    try {
        let user=await User.findOne({email})

        if(user){
        return res.status(400).json({errors:[{msg:"User already exists"}]})
        }

        const avatar=gravatar.url(email,{s:'200',r:'pg',d:'mm'})//def image
        user=new User({name,email,avatar,password})

        const salt=await bcrypt.genSalt(10)


        user.password=await bcrypt.hash(password,salt)
        await user.save()

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





module.exports = router