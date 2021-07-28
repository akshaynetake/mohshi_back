const express = require('express');
const router = express.Router();
const validator = require('../tools/validators');

const UserService = require('./users.service');

var multer = require('multer');
class UserController {
    constructor() {
        router.post('/register', this.registerUser);
        router.post('/login', this.login);
    }

    async registerUser(req, res) {

        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, '/uploads')
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now())
            }
        })

        const data = {
            first_name: req.body.first_name != undefined ? req.body.first_name.trim() : '' || '',
            last_name: req.body.last_name != undefined ? req.body.last_name.trim() : '' || '',
            email: req.body.email != undefined ? req.body.email.toLowerCase().trim() : '' || '',
            password: req.body.password != undefined ? req.body.password.trim() : '' || '',
            role: req.body.role != undefined ? req.body.role.toLowerCase().trim() : '' || '',
            work_url: req.body.work_url != undefined ? req.body.work_url.trim() : '' || '',
        }
        let required = ['email', 'password', 'first_name', 'last_name', 'role', 'work_url'];
        if (!validator.validateForm(required, data)) {
            var upload = multer({ storage: storage })
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