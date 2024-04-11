const Router = require('express')
const controller = require('../controllers/authController')
const {check} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/registration', [
    check('Fullname',"ФИО пользователя не может быть пустым").notEmpty(),
    check('Login', "Login пользователя не может быть пустым").notEmpty(),
    check('Password', "Пароль пользователя должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10}),
    check('Mail', "Почта пользователя не может быть пустой").notEmpty(),
    check('Roles').custom(value => {
        if (!Array.isArray(value) || value.length === 0) {
            throw new Error('Роли пользователя не могут быть пустыми');
        }
        return true;
    })
], authMiddleware, roleMiddleware([1]), controller.registartion)

module.exports = router