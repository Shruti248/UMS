const express = require('express');
const router = express.Router();
const userController = require('../controller/user-controller');

/**
 * @description Get All Users
 * @method GET /users
 */
router.get('/users' , userController.getAllUsers);

/**
 * @description Create a New User
 * @method POST /user
 */
router.post('/user' , userController.createUser);


/**
 * @description Get a User by ID
 * @method GET /user/:id
 */
router.get('/user/:id' , userController.getUserByID);

module.exports = router;