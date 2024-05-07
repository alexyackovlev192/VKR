const Router = require('express')
const controller = require('../controllers/defenseScheduleStudentController')
const {check} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.put('/:id', authMiddleware, roleMiddleware([3]), controller.updateDefenseScheduleStudents)
router.get('/:id', authMiddleware, roleMiddleware([3,2,4]), controller.getStudentsForDefense)
module.exports = router