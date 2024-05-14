const DefenseScheduleStudent = require('../models/DefenseScheduleStudent')
const User = require('../models/User')
const ResultComissionSecretary = require('../models/ResultComissionSecretary')
const {validationResult} = require('express-validator')

class resultComissionSecretaryController {
    async create(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при создании результата защиты студента секретарем ГЭК", errors})
            }
            const {id_DSS, id_U, Result, RecMagistracy, RecPublication, NumberProtocol} = req.body
            const defenseStudent = await DefenseScheduleStudent.findOne({where: {
                id_DSS: id_DSS
            }})

            if (!defenseStudent) {
                return res.status(404).json({ message: "Защита данного студента не найдена" });
            }
            const SecretaryOfGec = await User.findOne({where: {
                id_U: id_U
            }})
            if (!SecretaryOfGec) {
                return res.status(404).json({ message: "Секретарь ГЭК не найден" });
            }

            const resultSecretary = new ResultComissionSecretary({id_DSS: id_DSS, id_U: id_U, Result: Result, RecMagistracy: RecMagistracy, RecPublication: RecPublication, NumberProtocol: NumberProtocol});
            await resultSecretary.save()
            return res.json({message: "Результат защиты для студента, выставленный секретарем ГЭК, добавлен"})
        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка добавления результата защиты студента, выставленного секретарем ГЭК'})
        }
    }
    async getResultsByIdDSS(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Id не указан" });
            }
    
            const result = await ResultComissionSecretary.findOne({
                 where: { id_DSS: id },
                 attributes: ['Result', 'RecMagistracy', 'RecPublication', 'NumberProtocol']
                });
            if (!result) {
                return res.status(404).json({ message: 'Результаты от секретаря ГЭК для защиты не найдены' });
            }

            
            
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении результата от секретаря ГЭК для защиты', error });
        }
    }
}
module.exports = new resultComissionSecretaryController()