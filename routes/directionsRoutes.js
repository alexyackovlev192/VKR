const Router = require('express')
const controller = require('../controllers/directionController')
const {check} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')


router.get('/', authMiddleware, roleMiddleware([3]), controller.getAllDirections)

module.exports = router