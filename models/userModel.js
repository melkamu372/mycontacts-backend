const mongoose=require('mongoose');
const userSchema=mongoose.Schema(
    {
        userName:{
            type:String,
            required:[true,'user name is required ' ]
        },
        email:{
            type:String,
            required:[true,'please add the user address'],
            unique:[true, 'use unique email address']
        },
        password:{
            type:String,
            required:[true,'password is required ' ]
        },

    }
    ,{
        timestamps:true
    }
);
module.exports=mongoose.model("user", userSchema);