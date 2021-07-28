const Users = require('./users.model');
const generatePassword = require('../tools/generate_password');
const authentication = require('../tools/authentication');

class UserService {
    async register(data) {
        let user = await Users.findOne({ email: data.email });
        if (user)
            return {
                code: 405,
                msg: "EMAIL_EXISTS"
            }

        let hashPassword = generatePassword.createHash(data.password);
        let userData = {
            email: data.email,
            name: data.name,
            password: hashPassword.hash,
            salt: hashPassword.salt,
        }

        let newUser = await Users.create(userData);
        if (newUser)
            return {
                code: 200,
                msg: "SUCCESS"
            }

        return {
            code: 405,
            msg: "ERROR"
        }

    }

    async login(data) {
        let userdata = await Users.findOne({
            email: data.email,
        });
        if (!userdata)
            return {
                code: 405,
                msg: "USE_NOT_FOUND",
            }
        let checked = generatePassword.validateHash(userdata.password, data.password);
        let token = authentication.generateToken(userdata.name);
        if (checked) {
            delete userdata["password"]
            delete userdata["salt"]
            return {
                code: 200,
                msg: "SUCCESS",
                data: userdata,
                token: token
            }
        } else {
            return {
                code: 405,
                msg: "CRED_ERROR"
            }
        }

    }
}

module.exports = new UserService();