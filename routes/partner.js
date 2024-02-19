const express = require('express')
const router = express.Router()
const logout = require('../controller/partner')
const login = require('../controller/partner')
const upload = require('../controller/partner')
const referral = require('../controller/partner')
const commission = require('../controller/partner')
const notify = require('../controller/partner')
const user = require('../controller/partner')
const icon = require('../controller/partner')
const register = require('../controller/partner')


router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/upload', upload)
router.post('/referral', referral)
router.post('/commission', commission)
router.get('/notify', notify)
router.post('/icon', icon)
router.post('/user', user)

module.exports = router
