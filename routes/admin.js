const express = require('express')
const router = express.Router()
const login = require('../controller/admin')
const logout = require('../controller/admin')
const list = require('../controller/admin')
const referral = require('../controller/admin')
const commission = require('../controller/admin')
const notify = require('../controller/admin')
const home = require('../controller/admin')

router.post('/login', login)
router.get('/logout', logout)
router.post('/list', list)
router.post('/referral', referral)
router.post('/commission', commission)
router.post('/notify', notify)
router.get('/home', home)

module.exports = router