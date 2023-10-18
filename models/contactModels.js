const mongoose = require('mongoose');

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

module.exports = mongoose.model('Contact', contactSchema);