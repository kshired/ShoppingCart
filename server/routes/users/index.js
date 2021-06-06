const express = require('express');
const signUp = require('./signUp');
const login = require('./login');
const refresh = require('./refresh');
const { seeProfile, modifyProfile } = require('./profile');
const authJwt = require('../../utils/auth');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/profile', authJwt, seeProfile);
router.patch('/profile', authJwt, modifyProfile);
router.post('/refresh', refresh);

module.exports = router;
