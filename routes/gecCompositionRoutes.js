const Router = require('express')
const controller = require('../controllers/CompositionGecController')
const {check} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.put('/:id', authMiddleware, roleMiddleware([3]), controller.updateGecComposition)
router.get('/:id', authMiddleware, roleMiddleware([3,2]), controller.getGecComposition)
router.get('/UserGecs/:id', authMiddleware, roleMiddleware([2]), controller.getGecIdsByUserId);
module.exports = router