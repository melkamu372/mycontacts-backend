const express=require('express');
const router= express.Router();
const validateToken=require('../middleware/validateTokenHandeler')
const {
    currentUser,loginUser,registerUser
  }=require('../Controller/userController')

router.post('/register',registerUser);

router.post('/login',loginUser);
router.get('/current',validateToken,currentUser) ;
module.exports=router;