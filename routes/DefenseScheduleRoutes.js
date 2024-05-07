const Router = require('express')
const controller = require('../controllers/defenseScheduleController')
const {check} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/create', [
    check('GecId',"Id ГЭК не может быть пустым").notEmpty(),
    check('NameDirection', "Название направления не может быть пустым").notEmpty(),
    check('Date', "Дата защиты не может быть пустой").notEmpty(),
    check('Time', "Время защиты не может быть пустым").notEmpty(),
    check('Classroom', "Аудитория защиты не может быть пустой").notEmpty(),
], authMiddleware, roleMiddleware([3]), controller.create)
router.put('/:id', [
    check('GecId').optional().notEmpty().withMessage('Id ГЭК не может быть пустым'),
    check('NameDirection').optional().notEmpty().withMessage('Название направления не может быть пустым'),
    check('Date').optional().notEmpty().withMessage('Дата защиты не может быть пустой'),
    check('Time').optional().notEmpty().withMessage('Время защиты не может быть пустым'),
    check('Classroom').optional().notEmpty().withMessage('Аудитория защиты не может быть пустой')
], authMiddleware, roleMiddleware([3]), controller.updateDefense)
router.get('/thisYear', authMiddleware, roleMiddleware([3]), controller.getDefenseForThisYear)

module.exports = router