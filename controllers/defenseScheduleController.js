const DefenseSchedule = require('../models/DefenseSchedule')
const Direction = require('../models/Direction')
const Gec = require('../models/Gec')
const { Op } = require('sequelize');
const {validationResult} = require('express-validator')

class defenseScheduleController {
    async create(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при создании защиты", errors})
            }
            const {GecId, NameDirection, Date, Time, Classroom} = req.body
            const direction = await Direction.findOne({where: {
                Name_direction: NameDirection
            }})
            if (!direction) {
                return res.status(404).json({ message: "Направление не найдено" });
            }
            const gec = await Gec.findOne({where: {
                id_G: GecId
            }})
            if (!gec) {
                return res.status(404).json({ message: "ГЭК не найдена" });
            }

            const defenseSchedule = new DefenseSchedule({ id_G: gec.id_G, id_D: direction.id_D, date:  Date, time: Time, classroom: Classroom });
            await defenseSchedule.save()
            return res.json({message: "Защита успешно создана"})
        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка создания защиты'})
        }
    }
    async updateDefense(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при обновлении информации о защите", errors})
            }
            const { id } = req.params;
            const {GecId, NameDirection, Date, Time, Classroom} = req.body 
            if (!id) {
                res.status(400).json({message: "Id не указан"})
            }
            let updateData = {};

            if (GecId) {
                const gec = await Gec.findOne({ where: { id_G: GecId } });
                if (!gec) {
                    return res.status(404).json({ message: "ГЭК не найдена" });
                }
                updateData.id_G = GecId;
            }

            if (NameDirection) {
                const direction = await Direction.findOne({ where: { Name_direction: NameDirection } });
                if (!direction) {
                    return res.status(404).json({ message: "Направление не найдено" });
                }
                updateData.id_D = direction.id_D;
            }

            if (Date !== undefined) updateData.date = Date;
            if (Time !== undefined) updateData.time = Time;
            if (Classroom !== undefined) updateData.classroom = Classroom;
            
            const updatedRowsCount = await DefenseSchedule.update(
                updateData,
                { where: { id_DS: id } }
            )
            if (updatedRowsCount[0] === 0) {
                return res.status(404).json({ message: `Нет защиты с таким идентификатором: ${id}` })
            }
            const updatedDefense = await DefenseSchedule.findOne({ where: { id_DS: id } }); 
            return res.status(200).json(updatedDefense);

        } catch(e) {
            res.status(500).json({ message: 'Ошибка при обновлении данных защиты', e})
        }
    }
    async getDefenseForThisYear(req, res) {
        try {
            const currentYear = new Date().getFullYear();
            const defenseScheduleThisYear = await DefenseSchedule.findAll({
                where: {
                    date: {
                        [Op.gte]: new Date(`${currentYear}-01-01`), 
                        [Op.lt]: new Date(`${currentYear + 1}-01-01`) 
                    }
                },
                order: [['date', 'ASC']]
            });
            if (!defenseScheduleThisYear) {
                return res.status(404).json({ message: 'Защиты этого года не найдены' });
            }
            return res.json(defenseScheduleThisYear)
        } catch(e) {
            return res.status(500).json(e)
        }
    }
    async getDefensesByGecId(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({message: "Id не указан"})
            }
            const defenseSchedule = await DefenseSchedule.findAll({
                where: {
                    id_G: id
                },
                order: [['date', 'ASC']]
            });
            if (!defenseSchedule) {
                return res.status(404).json({ message: 'Защиты не найдены' });
            }
            return res.json(defenseSchedule)
        } catch(e) {
            return res.status(500).json(e)
        }
    }
}
module.exports = new defenseScheduleController()