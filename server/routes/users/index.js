const express = require('express');
const signUp = require('./signUp');
const login = require('./login');
const { seeProfile, modifyProfile } = require('./profile');
const authJwt = require('../../middlewares/auth');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/profile', authJwt, seeProfile);
router.patch('/profile', authJwt, modifyProfile);

module.exports = router;
