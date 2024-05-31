const controller = require('../controllers/resultComissionSecretaryController')
const {check} = require("express-validator")
const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/create', [
    check('id_DSS',"Id защиты конкретного студента не может быть пустым").notEmpty(),
    check('id_U', "Id секретаря ГЭК не может быть пустым").notEmpty(),
    check('Result', "Результат защиты не может быть пустым").notEmpty(),
    check('NumberProtocol', "Номер протокола защиты не может быть пустым").notEmpty(),
    check('id_S').optional().notEmpty().withMessage('Id студента не может быть пустым')
], authMiddleware, roleMiddleware([4]), controller.create)
router.get('/resultsByIdDOrYear', [
    check('id_D').optional().notEmpty().withMessage('Id направления не может быть пустым'),
    check('Year').optional().notEmpty().withMessage('Год защиты не может быть пустым'),
], authMiddleware, roleMiddleware([3]), controller.getResultsByIdDOrYear)
router.get('/:id', authMiddleware, roleMiddleware([4]), controller.getResultsByIdDSS)



module.exports = router