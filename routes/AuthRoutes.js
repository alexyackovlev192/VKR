const Router = require('express')
const controller = require('../controllers/authController')
const {check} = require("express-validator")
const router = new Router()


router.post('/login', [
    check('Login', "Login пользователя не может быть пустым").notEmpty(),
    check('Password', "Пароль пользователя не может быть пустым").notEmpty()
], controller.login) 
 

module.exports = router
