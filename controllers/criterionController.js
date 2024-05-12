const Criterion = require('../models/Criterion')
const {validationResult} = require('express-validator')

class criterionController {
    async getAllCriteria(req, res) {
        try {
            const criteria = await Criterion.findAll();
            if (!criteria || criteria.length === 0) {
                return res.status(404).json({ message: 'Критерии не найдены' });
            }
            return res.json(criteria);
        } catch(e) {
            return res.status(500).json(e);
        }
    }
}
module.exports = new criterionController()