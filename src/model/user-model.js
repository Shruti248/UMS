// var dbConnection = require('../../config/db_config');

// var user = (user) => {
//     this.role = user.role,
//     this.firstName = user.firstName,
//     this.lastName = user.lastName,
//     this.email = user.email,
//     this.password = user.password,
//     this.profilePic = user.profilePic,
//     this.contactNumber = user.contactNumber,
//     this.createdAt = new Date(),
//     this.updatedAt = new Date(),
// };

// module.exports = user;

const db = require('../../config/db_config')

class User {
    constructor(role , firstName , lastName , email , password , profilePic , contactNumber) {
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.profilePic = profilePic;
        this.contactNumber = contactNumber;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // save to database
    async save() {
let sql = `
    INSERT INTO user(
        role,
        firstName,
        lastName,
        email,
        password,
        profilePic,
        contactNumber,
        createdAt,
        updatedAt
    ) VALUES (
        '${this.role}',
        '${this.firstName}',
        '${this.lastName}',
        '${this.email}',
        '${this.password}',
        '${this.profilePic}',
        '${this.contactNumber}',
        '${this.createdAt.toISOString().slice(0, 19).replace('T', ' ')}',
        '${this.updatedAt.toISOString().slice(0, 19).replace('T', ' ')}'
    )
`;

        /**returns an array : Hence destructing it*/
        // assigns firstValue to newUser
        // _ -- second value is intentionally ignored 
        // const [newUser , _]  = await db.execute(sql);

        // return newUser;
        return db.execute(sql);

    }

    // No need to cerate the object -- User.findAll 
    static findAll() {
        let sql = 'SELECT * from user;';

        return db.execute(sql);
    }

    static findById(id){
        let sql = `SELECT * from user WHERE id = ${id};`

        return db.execute(sql);
    }
}


module.exports = User;