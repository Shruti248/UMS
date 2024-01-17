const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user-model');
const validateRegisterInput = require('../validations/register');

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const maxAge = 24 * 60 * 60;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Find user by email in the database
        const user = await User.findOneByEmail(email);

        if (user[0].length == 0) {
            return res.status(404).json({ message: 'User not found. Please register.' });
        }

        // Validate the password
        const validPassword = await bcrypt.compare(password, user[0][0].password);

        if (!validPassword) { 
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ userId: user[0][0].id , role : user[0][0].role} /**payload */, process.env.secret, { expiresIn: maxAge });

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // Max age in milliseconds
        });

        res.status(200).json({ message: 'Login Successful.', data: user[0]});
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, contactNumber } = req.body;
        const maxAge = 24 * 60 * 60;

        if (!firstName || !lastName || !email || !password || !contactNumber) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        let profilePic = req.file.filename;

        // const { errors, isValid } = validateRegisterInput(req.body);
        // // Check to make sure nobody has already registered with a duplicate email
        // if (!isValid) {
        //     return res.status(400).json({ message: "Failed", errors: errors });
        // }
    
        // Check for existing user 
        let existingUser = await User.findOneByEmail(email);

        // 409 Conflict
        if (existingUser[0][0]) {
            return res.status(409).json({
                message: 'User already exists'
            });
        } else {
            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10); // Adjust the saltRounds as needed

            // Create the user with the hashed password
            let user = new User('user', firstName, lastName, email, hashedPassword, profilePic, contactNumber);
        
            user = await user.save();
            // console.log(user);

            // console.log(user[0].insertId);

            user = await User.findById(user[0].insertId);

            // console.log(user[0][0].id);

            const token = jwt.sign({ userId: user[0][0].id , role : user[0][0].role} /**payload */, process.env.secret, { expiresIn: maxAge });
 

            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: maxAge * 1000, // Max age in milliseconds
            });

            res.status(200).json({ message: 'Registration Successful.', data: user[0][0] });
        }

    } catch (err) {
        console.error(err);
        next(err);
    }
};
