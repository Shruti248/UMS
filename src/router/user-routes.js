const express = require('express');
const router = express.Router();
const userController = require('../controller/user-controller');
const { userAuth , adminAuth} = require('../middleware/auth-middleware')
const multer = require('multer')


// Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })

const upload = multer({ storage: storage })


/**
 * @description Get All Users
 * @method GET /users
 */
// router.get('/users',userAuth, userController.getAllUsers);
// removed auth Only for testing 
router.get('/users', userController.getAllUsers);

/**
 * @description Create a New User (Only admin can)
 * @method POST /user
 */
router.post('/user',adminAuth, upload.single('profilePic') , userController.createUser);


/**
 * @description Get a User by ID
 * @method GET /user/:id
 */
router.get('/user/:id', userAuth , userController.getUserByID);

/**
 * @description Update a User by ID
 * @method PUT /user/:id
 */
router.put('/user/:id' , adminAuth ,upload.single('file')  , userController.editTheUser);

/**
 * @description Delete a User by ID
 * @method DELETE /user/:id
 */
router.delete('/user/:id' , adminAuth , userController.deleteAUser);


module.exports = router;