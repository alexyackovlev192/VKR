const DefensePresence = require('../models/DefensePresence')
const DefenseSchedule = require('../models/DefenseSchedule')
const User = require('../models/User')
const Direction = require('../models/Direction')
const Gec = require('../models/Gec')
const { Op } = require('sequelize');
const {validationResult} = require('express-validator')

class defensePresenceController {
    async create(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при создании подтверждения присутствия", errors})
            }
            const {id_DS, id_U, Status} = req.body

            const defense = await DefenseSchedule.findOne({
                where: { id_DS: id_DS }
            });
    
            if (!defense) {
                return res.status(404).json({ message: 'Данная защита не найдена' });
            }
            const ComissionMember = await User.findOne({where: {
                id_U: id_U
            }})
            if (!ComissionMember) {
                return res.status(404).json({ message: "Член Комиссии не найден" });
            }

            const defensePresence = new DefensePresence({ id_DS: id_DS, id_U: id_U, Status:  Status});
            await defensePresence.save()
            return res.json({message: "Подтверждение присутствия успешно создано"})
        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка при создании подтверждения присутствия на защите членом комиссии'})
        }
    }
}
module.exports = new defensePresenceController()