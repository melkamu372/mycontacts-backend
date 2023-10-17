const express=require('express');
const router= express.Router();
const validateToken=require('../middleware/validateTokenHandeler')
const {
    currentUser,loginUser,registerUser,allUser
  }=require('../Controller/userController')

router.post('/register',registerUser);

router.post('/login',loginUser);
router.get('/all',allUser);

router.get('/current',validateToken,currentUser) ;
module.exports=router;