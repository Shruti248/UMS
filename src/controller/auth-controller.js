const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user-model');

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

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

        res.status(200).json({ message: 'Login Successful.', data: user });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, profilePic, contactNumber } = req.body;
        const maxAge = 24 * 60 * 60;

        if (!firstName || !lastName || !email || !password || !contactNumber) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // Adjust the saltRounds as needed

        // Create the user with the hashed password
        let user = new User('user', firstName, lastName, email, hashedPassword, profilePic, contactNumber);

        user = await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.secret, { expiresIn: maxAge });

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // Max age in milliseconds
        });

        res.status(200).json({ message: 'Registration Successful.', data: user });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
