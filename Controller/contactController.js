const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");
const crudOperations = require("../middleware/crudOperations");
// get all contacts 
const getAllContact = crudOperations.getAll(Contact);

//get all my contacts 
const getMyContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id },req.query);
  res.status(200).json(contacts);
});
 
// get contact buy id 
const getContactsById=crudOperations.getById(Contact);

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
      console.log(contact);
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
  getAllContact,
  getMyContacts,
  getContactsById,
  addContact,
  updateContact,
  deleteContact,
};
