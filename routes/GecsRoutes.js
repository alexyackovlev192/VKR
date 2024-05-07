const Router = require('express')
const controller = require('../controllers/gecController')
const {check} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/create', [
    check('NameDirection',"Наименование направления не может быть пустым").notEmpty(),
    check('FullnameSecretary', "ФИО секретаря гэк не может быть пустым").notEmpty(),
    check('Year', "Год защит у комиссии не может быть пустым").notEmpty()
], authMiddleware, roleMiddleware([3]), controller.create)
router.get('/', authMiddleware, roleMiddleware([3]), controller.getAllGecs)
router.get('/UserGecs/:id', authMiddleware, roleMiddleware([4]), controller.getGecIdsByUserId)

module.exports = router