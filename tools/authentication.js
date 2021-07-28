const jwt = require('jsonwebtoken');
const config = require('../config');

class authentication {
    generateToken(username) {
        let token = jwt.sign({
            data: username
        }, config.jwt_secret, { expiresIn: config.token_exp });
        return token
    }

    verifyToken() {
        jwt.verify(token, config.jwt_secret, function (err, decoded) {
            if(!err){
                return true
            }else{
                return false
            }
        });
    }
}

module.exports = new authentication();