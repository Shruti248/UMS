var dbConnection = require('../../config/db_config');

var user = (user) => {
    this.role = user.role,
    this.firstName = user.firstName,
    this.lastName = user.lastName,
    this.email = user.email,
    this.password = user.password,
    this.profilePic = user.profilePic,
    this.contactNumber = user.contactNumber,
    this.createdAt = new Date(),
    this.updatedAt = new Date(),
}