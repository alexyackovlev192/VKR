const Router = require('express')
const controller = require('../controllers/userController')
const {check} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/', authMiddleware, roleMiddleware([3]), controller.getAllMembersOfGec)
router.put('/:id', [
    check('Fullname').optional().notEmpty().withMessage('ФИО пользователя не может быть пустым'),
    check('Mail').optional().isEmail().withMessage('Почта пользователя не может быть пустой') 
], authMiddleware, roleMiddleware([3]), controller.updateMemberOfGec)
module.exports = router