const express =require('express');
const router=express.Router();
const validateToken=require('../middleware/validateTokenHandeler');
router.use(validateToken);
const {getContact,getContacts,addContact,updateContact,deleteContact} = require('../Controller/contactController');
 router.route("/").get(getContact).post(addContact);
 router.route("/:id").get(getContacts).put(updateContact).delete(deleteContact);
module.exports=router;