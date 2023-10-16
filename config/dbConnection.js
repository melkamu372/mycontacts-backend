const mongoose=require('mongoose');
const connectDB=async()=>{
    try{
        console.log('connection start here ');
const connect=await mongoose.connect(process.env.LOCAL_CONNECTION_STRING);
   console.log('connection established . ....');
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
};
module.exports=connectDB;