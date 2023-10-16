const mongoose=require('mongoose');
const contantSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,'please add contacts name']
    }
    ,
    email:{
        type:String,
        required:[true,'please add contacts email'],
        unique:[true, 'use unique email address']
    },
    phone:{
        type:String,
        required:[true,'please add contacts phone']
    }
},
{
    timestamps:true
}
);
module.exports=mongoose.model('Contact',contantSchema);