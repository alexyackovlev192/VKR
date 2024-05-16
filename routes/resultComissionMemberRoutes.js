const controller = require('../controllers/resultComissionMemberController')
const {check} = require("express-validator")
const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/create', [
    check('id_DSS',"Id защиты конкретного студента не может быть пустым").notEmpty(),
    check('id_U', "Id члена ГЭК не может быть пустым").notEmpty(),
    check('scores').custom(value => {
        if (!Array.isArray(value) || value.length === 0) {
            throw new Error('Оценки защиты по критериям не могут быть пустыми');
        }
        if (value.length !== 3) {
            throw new Error('Оценки защиты должны быть представлены для каждого из трех критериев');
        }
        return true;
    })
], authMiddleware, roleMiddleware([2]), controller.create)
router.get('/GecResult/:id', authMiddleware, roleMiddleware([4]), controller.getResultsByIdDSS)
router.get('/:id', [
    check('id_U', "Id члена ГЭК не может быть пустым").notEmpty()
], authMiddleware, roleMiddleware([2]), controller.getResultByUserIdAndIdDSS)

module.exports = router