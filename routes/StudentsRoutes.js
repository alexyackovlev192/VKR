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

module.exports = router