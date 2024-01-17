const express = require('express');
const router = express.Router();
const authController = require('../controller/auth-controller');

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
 * @description Log in
 * @method POST /login
 */
router.post('/login' , authController.login)

/**
 * @description Register
 * @method POST /register
 */
router.post('/register' ,upload.single('profilePic') , authController.register)

module.exports = router;