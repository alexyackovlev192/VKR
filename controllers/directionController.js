const Direction = require('../models/Direction')
const {validationResult} = require('express-validator')

class directionController {
    async getAllDirections(req, res) {
        try {
            const directions = await Direction.findAll();
            if (!directions || directions.length === 0) {
                return res.status(404).json({ message: 'Направления не найдены' });
            }
            return res.json(directions);
        } catch(e) {
            return res.status(500).json(e);
        }
    }
}
module.exports = new directionController()