var express=require('express');

var router=express.Router();

var user=require('./user');

router.get('/api/user',user.userValidate);



module.exports=router;