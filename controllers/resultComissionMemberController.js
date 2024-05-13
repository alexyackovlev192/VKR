const DefenseScheduleStudent = require('../models/DefenseScheduleStudent')
const Criterion = require('../models/Criterion')
const User = require('../models/User')
const ResultComissionMember = require('../models/ResultComissionMember')
const {validationResult} = require('express-validator')

class resultComissionMemberController {
    async create(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при создании результата защиты студента членом ГЭК", errors})
            }
            const {id_DSS, id_U, scores, RecMagistracy, RecPublication} = req.body
            const defenseStudent = await DefenseScheduleStudent.findOne({where: {
                id_DSS: id_DSS
            }})

            if (!defenseStudent) {
                return res.status(404).json({ message: "Защита данного студента не найдена" });
            }
            const MemberOfGec = await User.findOne({where: {
                id_U: id_U
            }})
            if (!MemberOfGec) {
                return res.status(404).json({ message: "Член ГЭК не найден" });
            }

            const criteria = await Criterion.findAll();
            if (criteria.length !== 3) {
                return res.status(400).json({ message: 'Неверное количество критериев в базе данных' });
            }

            const weights = criteria.map(criterion => criterion.Value);
            const weightedScores = [];
            for (let i = 0; i < weights.length; i++) {
                const weight = weights[i];

                console.log("Вес", i + 1, ":", weight);
                
                const weightedScore = scores[i] * weight;
                weightedScores.push(weightedScore);
            }
            console.log("Взвешенные оценки: ", weightedScores);
            const Result = weightedScores.reduce((accumulator, currentValue) => accumulator + currentValue, 0);


            const resultComMember = new ResultComissionMember({id_DSS: id_DSS, id_U: id_U, Result: Result, RecMagistracy: RecMagistracy, RecPublication: RecPublication});
            await resultComMember.save()
            return res.json({message: "Результат защиты для студента, выставленный членом ГЭК, добавлен"})
        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка добавления результата защиты для студента, выставленного членом ГЭК'})
        }
    }
}
module.exports = new resultComissionMemberController()