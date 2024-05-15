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
    async getDirectionById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({message: "Id не указан"})
            }
            const direction = await Direction.findOne({
                where: {
                    id_D: id
                }
            });
            if (!direction) {
                return res.status(404).json({ message: 'Направление не найдено' });
            }
            return res.json(direction)
        } catch(e) {
            return res.status(500).json(e)
        }
    }
}
module.exports = new directionController()