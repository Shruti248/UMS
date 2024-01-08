const express = require('express');
const router = express.Router();
const authController = require('../controller/auth-controller');

/**
 * @description Log in
 * @method POST /login
 */
router.post('/login' , authController.login)

/**
 * @description Register
 * @method POST /register
 */
router.post('/register' , authController.register)

module.exports = router;