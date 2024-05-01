const Router = require('express')
const controller = require('../controllers/studentController')
const {check} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/create', [
    check('Fullname',"ФИО студента не может быть пустым").notEmpty(),
    check('Group', "Группа студента не может быть пустой").notEmpty(),
    check('Topic', "Тема ВКР не может быть пустой").notEmpty(),
    check('ScientificAdviser', "ФИО научного руководителя не может быть пустым").notEmpty(),
    check('Avg_Mark', "Средний балл студента не может быть пустым").notEmpty(),
    check('YearOfDefense', "Год защиты студента не может быть пустым").notEmpty(),
    check('NameDirection', "Направление студента не может быть пустым").notEmpty()
], authMiddleware, roleMiddleware([3]), controller.create)
router.put('/:id', [
    check('Fullname').optional().notEmpty().withMessage('ФИО студента не может быть пустым'),
    check('Group').optional().notEmpty().withMessage('Группа студента не может быть пустой'),
    check('Topic').optional().notEmpty().withMessage('Тема ВКР не может быть пустой'),
    check('ScientificAdviser').optional().notEmpty().withMessage('ФИО научного руководителя не может быть пустым'),
    check('Avg_Mark').optional().notEmpty().withMessage('Средний балл студента не может быть пустым'),
    check('YearOfDefense').optional().notEmpty().withMessage('Год защиты студента не может быть пустым'),
    check('NameDirection').optional().notEmpty().withMessage('Направление студента не может быть пустым'),
], authMiddleware, roleMiddleware([3]), controller.updateStudent)
router.get('/thisYear', authMiddleware, roleMiddleware([3]), controller.getStudentsDefThisYear)

module.exports = router