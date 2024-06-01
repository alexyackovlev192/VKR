const Router = require('express')
const controller = require('../controllers/defensePresenceController')
const {check} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/create', [
    check('id_DS',"Id защиты не может быть пустым").notEmpty(),
    check('id_U', "Id члена комиссии не может быть пустым").notEmpty()
], authMiddleware, roleMiddleware([2, 4]), controller.create)

module.exports = router