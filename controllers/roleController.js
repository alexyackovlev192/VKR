const Role = require('../models/Role')
const {validationResult} = require('express-validator')

class roleController {
    async getAllRoles(req, res) {
        try {
            const roles = await Role.findAll();
            if (!roles || roles.length === 0) {
                return res.status(404).json({ message: 'Роли не найдены' });
            }
            return res.json(roles);
        } catch(e) {
            return res.status(500).json(e);
        }
    }
}
module.exports = new roleController()