const mongoose = require('mongoose');
const fs = require('fs');
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
contactSchema.post('save',function(doc,next){
    const content=`ane document is added ${doc.name} has been  created by ${doc.createdBy}\n`;
    fs.writeFile('./log/log.txt', content, {flag:'a'}, (err) => {
        console.log(err);
    })
    next();
})

module.exports = mongoose.model('Contact', contactSchema);