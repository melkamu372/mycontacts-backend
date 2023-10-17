const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const saltRounds = 10;

// get register user
const registerUser = asyncHandler(async (req,res)=>{
    const {userName, email, password } = req.body;
    if (!userName || !email | !password) {
      res.status(400);
      throw new Error("All Fields are required ");
    }
  const available= await User.findOne({email});
if(available){
    res.status(400);
   throw new Error("Email should be unique ");
   }
   const hashedPassword=await bcrypt.hash(password,saltRounds);
   const user=await User.create({userName,email,password : hashedPassword});
   if(user){
    res.status(200).json({id:user.id,email:user.email})
   }
   else{
   res.status(400);
    throw new Error('user data not valid');

   }
});
// get  user login
const loginUser = asyncHandler(async (req,res)=>{
  const {email, password} = req.body;
  if (!email | !password) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }
 
const user= await User.findOne({email});
if(user&&(await bcrypt.compare(password,user.password))){
  const accessToken=jwt.sign({
   user:{
   userName:user.userName,
   email:user.email,
   id:user.id
}
}, 
  process.env.ACCESS_TOKEN_SECERET,
  {expiresIn:"50m"}
  );
  res.status(200).json({accessToken});
}
else{
  res.status(401);
  throw new Error("the user have no access");
}
});
  // get current user user
const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user)
});
const allUser = asyncHandler(async (req,res)=>{
  const documents = await User.find();
  res.status(200).json(documents);
});
  module.exports={currentUser,loginUser,registerUser,allUser}