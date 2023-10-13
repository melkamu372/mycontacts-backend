const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");

// get all contacts 
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.find({user_id:req.user.id});
  res.status(200).json(contact);
});

// get contact buy id 
const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("the data is not found ");
  }
  res.status(200).json(contact);
});

// add new contact 
const addContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email | !phone) {
    res.status(400);
    throw new Error("All Fields are required ");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id
  });
  res.status(200).json(contact);
});

// update new contact 
const updateContact = asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("the data is not found");
    }
    if(contact.user_id.toString()!=req.user.id){
      res.status(403);
      throw new Error("you have no permmision to update")
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true

        }
      );
    res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        res.status(404);
        throw new Error("The data is not found");
      }
      if(contact.user_id.toString()!=req.user.id){
        res.status(403);
        throw new Error("you have no permmision to update")
      }
      await Contact.deleteOne({ _id: req.params.id });
      res.status(200).json(contact);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

module.exports = {
  getContact,
  getContacts,
  addContact,
  updateContact,
  deleteContact,
};
