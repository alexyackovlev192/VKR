const Router = require('express');
const controller = require('../controllers/userController');
const { check } = require("express-validator");
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/:id', authMiddleware, roleMiddleware([3,2,4]), controller.getUserById)

module.exports = router