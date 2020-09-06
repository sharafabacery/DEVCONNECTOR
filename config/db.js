const moongoose = require('mongoose')
const config=require('config')
const db=config.get('mongoURI')
const connectDB=async()=>{
try {
  await moongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}) //access data
console.log("mongoDB connected")
} catch (error) {
    console.log(error.message)
    process.exit(1)
}

}

module.exports=connectDB