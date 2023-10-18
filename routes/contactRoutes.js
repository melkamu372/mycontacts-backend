const express =require('express');
const router=express.Router();
const validateToken=require('../middleware/validateTokenHandeler');
router.use(validateToken);
const {getAllContact,
getMyContacts,
getContactsById,
addContact,
updateContact,
deleteContact,} = require('../Controller/contactController');
 router.route("/").get(getAllContact).post(addContact);
 router.route("/mycontact").get(getMyContacts);
 router.route("/:id").get(getContactsById).put(updateContact).delete(deleteContact);
module.exports=router;