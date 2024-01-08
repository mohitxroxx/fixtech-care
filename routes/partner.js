const express=require('express')
const router=express.Router()
const login=require('../controller/partner')
const home=require('../controller/partner')
const user=require('../controller/partner')


router.post('/login',login)
router.get('/home',home)
router.get('/user',user)

module.exports=router