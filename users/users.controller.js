const express = require('express');
const router = express.Router();
const validator = require('../tools/validators');

const UserService = require('./users.service');
class UserController {
    constructor() {
        router.post('/register', this.registerUser);
        router.post('/login', this.login);
    }

    async registerUser(req, res) {
        const data = {
            name: req.body.name != undefined ? req.body.name.trim() : '' || '',
            email: req.body.email != undefined ? req.body.email.toLowerCase().trim() : '' || '',
            password: req.body.password != undefined ? req.body.password.trim() : '' || '',
        }
        let required = ['email', 'password', 'name'];
        if (!validator.validateForm(required, data)) {
            let requiredata = validator.getRequiredParam(required, data);
            return res.status(200).json({
                code: 405,
                msg_type: requiredata[0].toUpperCase() + "_INVALID"
            })
        }
        const result = await UserService.register(data);
        res.json(result);
    }

    async login(req, res) {
        const data = {
            email: req.body.email != undefined ? req.body.email.toLowerCase().trim() : '' || '',
            password: req.body.password != undefined ? req.body.password.trim() : '' || '',
        }
        let required = ['email', 'password'];
        if (!validator.validateForm(required, data)) {
            let requiredata = validator.getRequiredParam(required, data);
            return res.status(200).json({
                code: 405,
                msg_type: requiredata[0].toUpperCase() + "_INVALID"
            })
        }
        const result = await UserService.login(data);
        res.json(result);
    }
}

new UserController();
module.exports = router;