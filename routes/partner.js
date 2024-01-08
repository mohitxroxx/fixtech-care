const express=require('express')
const router=express.Router()
const login=require('../controller/partner')
const home=require('../controller/partner')
const user=require('../controller/partner')
const {register}=require('../controller/auth')


router.post('/register',register)


router.post('/login',login)
router.get('/home',home)
router.get('/user',user)

module.exports=router