const Router = require('express')
const controller = require('../controllers/gecController')
const {check} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/create', [
    check('Name_direction',"Наименование направления не может быть пустым").notEmpty(),
    check('Fullname', "ФИО секретаря гэк не может быть пустым").notEmpty(),
    check('Year', "Год защит у комиссии не может быть пустым").notEmpty()
], authMiddleware, roleMiddleware([3]), controller.create)
router.get('/', authMiddleware, roleMiddleware([3]), controller.getAllGecs)
router.get('/UserGecs/:id', authMiddleware, roleMiddleware([4]), controller.getGecIdsByUserId)
router.get('/SecretaryId/:id', authMiddleware, roleMiddleware([3]), controller.getSecretaryIdByGecId)
router.get('/:id', authMiddleware, roleMiddleware([2,3,4]), controller.getGecById)
router.put('/:id', [
    check('Name_direction').optional().notEmpty().withMessage('Направление не может быть пустым'),
    check('Year').optional().notEmpty().withMessage('Год не может быть пустым')
], authMiddleware, roleMiddleware([3]), controller.updateGec);
router.put('/EndWork/:id', [
    check('Status',"Статус работы ГЭК не может быть пустым").notEmpty()
], authMiddleware, roleMiddleware([3]), controller.updateStatusGec);


module.exports = router