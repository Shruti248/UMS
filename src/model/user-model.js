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

const db = require('../../config/db_connection')
const moment = require('moment-timezone');

// Get the current time in Indian Standard Time (IST)
const nowIST = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

class User {
    constructor(role , firstName , lastName , email , password , profilePic , contactNumber) {
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.profilePic = profilePic;
        this.contactNumber = contactNumber;
        this.createdAt = nowIST; 
        this.updatedAt = nowIST;
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
        '${nowIST}',
        '${nowIST}'
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

    static findByIdAndUpdate(id , data){
        let sql = `UPDATE user SET 
        role = '${data.role}',
        firstName = '${data.firstName}',
        lastName = '${data.lastName}',
        email = '${data.email}',
        password = '${data.password}',
        profilePic = '${data.profilePic}',
        contactNumber = '${data.contactNumber}',
        createdAt = '${nowIST}',
        updatedAt = '${nowIST}'
        WHERE ID = "${id}"`;
    
        return db.execute(sql);

    }

    static findByIdAndDelete(id){
        let sql = `
            DELETE FROM user WHERE id = ${id};
        `;

        return db.execute(sql);
    }

    static findOneByEmail(email){
        let sql = `
        SELECT * FROM user WHERE email = ?;
        `

        return db.execute(sql , [email]);
    }
}


module.exports = User;