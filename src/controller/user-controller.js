const User = require('../model/user-model');

exports.getAllUsers = async (req, res , next) => {

    try {
        const [users , _ ] = await User.findAll();

        res.status(200).json({ count : users.length , users });
    } catch (err) {
        console.log(err);

        // Letting the global error handler handle the errors encountered 
        next(err);
    }
}

exports.createUser = async (req, res , next) => {
    try {

        let { role, firstName, lastName, email, password, profilePic, contactNumber } = req.body;

        // Creating the object for the user 
        let user = new User(role, firstName, lastName, email, password, profilePic, contactNumber);

        user = await user.save();

        // console.log(user);

        res.status(200).json({ message: 'New User Created Successfully.', data: user });

    } catch (err) {
        console.log(err);

        // Letting the global error handler handle the errors encountered 
        next(err);
    }
}

exports.getUserByID = async (req, res , next) => {
    try {
        const [user , _ ] = await User.findById(req.params.id);

        res.status(200).json({ user });
    } catch (err) {
        console.log(err);

        // Letting the global error handler handle the errors encountered 
        next(err);
    }
}