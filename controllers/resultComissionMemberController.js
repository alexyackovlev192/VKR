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
    async getResultsByIdDSS(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Id не указан" });
            }
    
            const resultsGec = await ResultComissionMember.findAll({ where: { id_DSS: id } });
            if (!resultsGec || resultsGec.length === 0) {
                return res.status(404).json({ message: 'Результаты от членов ГЭК для защиты не найдены' });
            }

            const totalResults = resultsGec.length;
            console.log("количество записей: ", totalResults)
            const sumResults = resultsGec.reduce((sum, result) => sum + result.Result, 0);
            console.log("сумма результатов ГЭК: ", sumResults)
            const averageResult = totalResults > 0 ? sumResults / totalResults : 0;
            console.log("среднее арифметическое результатов ГЭК: ", averageResult)

            const nonNullRecMagistracy = resultsGec.filter(result => result.RecMagistracy !== null).length;
    

            const nonNullRecPublication = resultsGec.filter(result => result.RecPublication !== null).length;
    
            const response = {
                averageResult,
                RecMagistracy: `${nonNullRecMagistracy}/${totalResults}`,
                RecPublication: `${nonNullRecPublication}/${totalResults}`
            };
    
            return res.json(response);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении общего результата ГЭК для защиты', error });
        }
    }
    async getResultByUserIdAndIdDSS(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при получении результата защиты студента, поставленного членом ГЭК", errors})
            }
            const { id, id_U } = req.params; 
            if (!id || !id_U) {
                return res.status(400).json({message: "Id или id_U не указаны"})
            }
            const resultFromMemberGec = await ResultComissionMember.findOne({ where: { id_DSS: id, id_U: id_U } });
            if (!resultFromMemberGec) {
                return res.status(404).json({ message: 'Результат защиты студента, поставленный членом ГЭК, не найден' });
            }
            return res.json(resultFromMemberGec)
        } catch(e) {
            return res.status(500).json(e)
        }
    }
    async updateResultMemberGEC(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при обновлении результата защиты студента членом ГЭК", errors})
            }
            const { id } = req.params;
            const {id_U, scores, RecMagistracy, RecPublication} = req.body
            const defenseStudent = await DefenseScheduleStudent.findOne({where: {
                id_DSS: id
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


            const updatedRowsCount = await ResultComissionMember.update(
                { Result: Result, RecMagistracy: RecMagistracy, RecPublication: RecPublication },
                { where: { id_DSS: id, id_U: id_U } }
            );
    
            if (updatedRowsCount[0] === 0) {
                return res.status(404).json({ message: "Результат защиты для студента, выставленный членом ГЭК, не найден" });
            } else {
                return res.json({ message: "Результат защиты для студента, выставленный членом ГЭК, обновлен" });
            }
        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка обновления результата защиты для студента, выставленного членом ГЭК'})
        }
    }
}
module.exports = new resultComissionMemberController()