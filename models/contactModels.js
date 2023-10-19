const mongoose = require('mongoose');
const fs = require('fs');
const validator=require('validator');
const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add the contact\'s name'],
      maxlength:[40,"name should not greater than 40 characters"],
      minlength:[2,"contact name should have minimum 2 letters"],
      validate:[validator.isAlpha,"name should contain only alphabets "]
    },
    email: {
      type: String,
      required: [true, 'Please add the contact\'s email'],
      unique: [true, 'Please use a unique email address'],
    },
    phone: {
      type: String,
      required: [true, 'Please add the contact\'s phone'],
      
    },
    createdBy: {
        type: String,
      },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

contactSchema.virtual('fullAddress').get(function () {
  return `${this.name}, ${this.email}, ${this.phone}`;
});
contactSchema.pre('save',function (next){
this.createdBy="melkamu";
next();
})

// document middleware, query middleware, agreegate middleware
contactSchema.post('save',function(doc,next){
    const content=`ane document is added ${doc.name} has been  created by ${doc.createdBy}\n`;
    fs.writeFile('./log/log.txt', content, {flag:'a'}, (err) => {
        console.log(err);
    })
    next();
})


module.exports = mongoose.model('Contact', contactSchema);