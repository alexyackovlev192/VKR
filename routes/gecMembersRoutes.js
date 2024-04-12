const Router = require('express')
const controller = require('../controllers/userController')
const {check} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/', authMiddleware, roleMiddleware([3]), controller.getAllMembersOfGec)
router.put('/:id', authMiddleware, roleMiddleware([3]), controller.updateMemberOfGec)
module.exports = router