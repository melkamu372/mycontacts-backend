const express =require('express');
const router=express.Router();
const validateToken=require('../middleware/validateTokenHandeler');
router.use(validateToken);
const contact = require('../Controller/contactController');
 router.route("/").get(contact.getAllContact).post(contact.addContact);
 router.route("/mycontact").get(contact.getMyContacts);
 router.route("/:id").get(contact.getContactsById).put(contact.updateContact).delete(contact.deleteContact);
module.exports=router;