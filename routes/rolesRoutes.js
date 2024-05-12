const Router = require('express')
const controller = require('../controllers/roleController')
const {check} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')


router.get('/', authMiddleware, roleMiddleware([1]), controller.getAllRoles)

module.exports = router