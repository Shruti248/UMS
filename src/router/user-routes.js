const express = require('express');
const router = express.Router();
const userController = require('../controller/user-controller');

/**
 * @description Get All Users
 * @method GET /users
 */
router.get('/users' , userController.getAllUsers);

router.post('/user' , userController.createUser);

router.get('/user/:id' , userController.getUserByID);

module.exports = router;