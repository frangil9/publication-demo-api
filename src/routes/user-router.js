const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/user-controller');

router.post('/authenticate', UserCtrl.logIn);
router.post('/signup', UserCtrl.signup);

module.exports = router;