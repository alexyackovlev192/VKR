const Router = require('express')
const router = new Router()
const controller = require('../controllers/emailController');
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const {check} = require("express-validator")

router.post('/send', [
    check('to',"Почта получателя не может быть пустой").notEmpty(),
    check('subject', "Тема письма не может быть пустой").notEmpty(),
    check('text', "Текст письма не может быть пустым").notEmpty()
], authMiddleware, roleMiddleware([3]), controller.send)

module.exports = router;