const express = require('express');
const router = express.Router();
const userController = require('../controller/user-controller');
const { userAuth } = require('../middleware/auth-middleware')

/**
 * @description Get All Users
 * @method GET /users
 */
router.get('/users',userAuth, userController.getAllUsers);

/**
 * @description Create a New User (Only admin can)
 * @method POST /user
 */
router.post('/user', userController.createUser);


/**
 * @description Get a User by ID
 * @method GET /user/:id
 */
router.get('/user/:id', userAuth , userController.getUserByID);

/**
 * @description Update a User by ID
 * @method PUT /user/:id
 */
router.put('/user/:id' , userController.editTheUser);

/**
 * @description Delete a User by ID
 * @method DELETE /user/:id
 */
router.delete('/user/:id' , userController.deleteAUser);


module.exports = router;