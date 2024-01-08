const express=require('express')
const router=express.Router()
const login=require('../controller/admin')
const home=require('../controller/admin')

router.post('/login',login)
router.get('/home',home)

module.exports=router