const express=require('express')
const cors = require('cors')
const connectDB=require('./config/db')
const app=express()
app.use(cors())
 
const PORT=process.env.PORT ||5000
connectDB()

app.use(express.json({extended:false}))//get data delete body-parser packege

app.use('/api/users',require("./routes/api/users"))
app.use('/api/profile',require("./routes/api/profile"))
app.use('/api/posts',require("./routes/api/posts"))
app.use('/api/auth',require("./routes/api/auth"))








app.listen(PORT,()=>{console.log("1")})