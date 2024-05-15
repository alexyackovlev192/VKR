const Router = require('express')
const controller = require('../controllers/directionController')
const {check} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')


router.get('/', authMiddleware, roleMiddleware([3]), controller.getAllDirections)
router.get('/:id', authMiddleware, roleMiddleware([3,2,4]), controller.getDirectionById)

module.exports = router