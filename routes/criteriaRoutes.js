const Router = require('express')
const controller = require('../controllers/criterionController')
const {check} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')


router.get('/', authMiddleware, roleMiddleware([2,4]), controller.getAllCriteria)

module.exports = router