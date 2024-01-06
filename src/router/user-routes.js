const express = require('express');
const router = express.Router();
const userController = require('../controller/user-controller');

/**
 * @description Get All Users
 * @method GET /users
 */
router.get('/users' , userController.getAllUsers);

module.exports = router;