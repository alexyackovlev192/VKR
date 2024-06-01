const DefenseScheduleStudent = require('../models/DefenseScheduleStudent')
const User = require('../models/User')
const ResultComissionSecretary = require('../models/ResultComissionSecretary')
const Student = require('../models/Student')
const DefenseSchedule = require('../models/DefenseSchedule')
const Direction = require('../models/Direction')
const {validationResult} = require('express-validator')
const { Op } = require('sequelize');


class resultComissionSecretaryController {
    async create(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при создании результата защиты студента секретарем ГЭК", errors})
            }
            const {id_DSS, id_U, Result, RecMagistracy, RecPublication, NumberProtocol, id_S, Red_Diplom} = req.body
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

            if (id_S && Red_Diplom !== undefined) {
                const updatedRowsCount = await Student.update(
                    { Red_Diplom: Red_Diplom },
                    { where: { id_S: id_S} }
                )
    
                if (updatedRowsCount[0] === 0) {
                    return res.status(404).json({ message: `Студент с id ${id_S} не найден` })
                }
            }

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
    async getResultsByIdDOrYear(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при получении результатов защит по id_D и Year или по Year", errors });
            }
            const { id_D, Year } = req.query;
    
            console.log('id_D:', id_D);
            console.log('Year:', Year);
    
            if (!Year) {
                return res.status(400).json({ message: "Необходимо указать параметр: Year" });
            }
    
            // Формируем критерии поиска
            const searchCriteria = {};
            if (id_D) searchCriteria.id_D = id_D;
            if (Year) {
                const yearStart = new Date(`${Year}-01-01`);
                const yearEnd = new Date(`${Year}-12-31`);
                searchCriteria.date = {
                    [Op.between]: [yearStart, yearEnd]
                };
            }
    
            // Находим записи в таблице Defense_Schedule
            const defenseSchedules = await DefenseSchedule.findAll({
                where: searchCriteria
            });
    
            if (!defenseSchedules.length) {
                return res.status(404).json({ message: 'Записи с указанными id_D или Year не найдены' });
            }
    
            // Получаем направления и id_G для найденных защит
            const directionIds = defenseSchedules.map(ds => ds.id_D);
            const directions = await Direction.findAll({
                where: {
                    id_D: directionIds
                }
            });
    
            const defenseScheduleIds = defenseSchedules.map(ds => ds.id_DS);
            const defenseScheduleStudents = await DefenseScheduleStudent.findAll({
                where: {
                    id_DS: defenseScheduleIds
                }
            });
    
            if (!defenseScheduleStudents.length) {
                return res.status(404).json({ message: 'Студенты для указанных защит не найдены' });
            }
    
            // Находим результаты защиты студентов
            const studentResults = await Promise.all(defenseScheduleStudents.map(async (dss) => {
                const result = await ResultComissionSecretary.findOne({
                    where: {
                        id_DSS: dss.id_DSS
                    }
                });
    
                if (!result) return null;
    
                const student = await Student.findOne({
                    where: {
                        id_S: dss.id_S
                    }
                });
    
                const defenseSchedule = defenseSchedules.find(ds => ds.id_DS === dss.id_DS);
                const direction = directions.find(dir => dir.id_D === defenseSchedule.id_D);
    
                return {
                    id_DS: dss.id_DS,
                    studentName: student ? student.Fullname : 'Не найдено',
                    Group: student.Group,
                    Topic: student.Topic,
                    ScientificAdviser: student.ScientificAdviser,
                    Red_Diplom: student.Red_Diplom,
                    Year: student.YearOfDefense,
                    Name_direction: direction ? direction.Name_direction : 'Не найдено',
                    gec: defenseSchedule.id_G,
                    result: result.Result,
                    recMagistracy: result.RecMagistracy,
                    recPublication: result.RecPublication,
                    numberProtocol: result.NumberProtocol
                };
            }));
    
            // Фильтруем результаты без null (если result не найден)
            const validResults = studentResults.filter(result => result !== null);
    
            return res.status(200).json(validResults);
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении результата защиты по Id_D или Year', error });
        }
    }
    async updateResultSecretaryGEC(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при обновлении результата защиты студента секретарем ГЭК", errors });
            }
    
            const { id } = req.params;
            const { id_U, Result, RecMagistracy, RecPublication, NumberProtocol, id_S, Red_Diplom } = req.body;
    
            // Проверка существования записи о защите студента
            const defenseStudent = await DefenseScheduleStudent.findOne({ where: { id_DSS: id } });
            if (!defenseStudent) {
                return res.status(404).json({ message: "Защита данного студента не найдена" });
            }
    
            // Проверка существования секретаря ГЭК
            const SecretaryOfGec = await User.findOne({ where: { id_U: id_U } });
            if (!SecretaryOfGec) {
                return res.status(404).json({ message: "Секретарь ГЭК не найден" });
            }
    
            let resultUpdateSuccess = true;
            let studentUpdateSuccess = true;
    
            // Обновление основных полей результата защиты, если они предоставлены
            if (Result !== undefined || RecMagistracy !== undefined || RecPublication !== undefined || NumberProtocol !== undefined) {
                const [updatedResultRowsCount] = await ResultComissionSecretary.update(
                    { Result, RecMagistracy, RecPublication, NumberProtocol },
                    { where: { id_DSS: id, id_U: id_U } }
                );
    
                resultUpdateSuccess = updatedResultRowsCount > 0;
            }
    
            // Обновление красного диплома, если id_S и Red_Diplom предоставлены
            if (id_S && Red_Diplom !== undefined) {
                const [updatedRowsCount] = await Student.update(
                    { Red_Diplom: Red_Diplom },
                    { where: { id_S: id_S } }
                );
    
                studentUpdateSuccess = updatedRowsCount > 0;
            }
    
            if (!resultUpdateSuccess && !studentUpdateSuccess) {
                return res.status(404).json({ message: "Результат защиты и студент не найдены" });
            } else if (!resultUpdateSuccess) {
                return res.status(404).json({ message: "Результат защиты для студента, выставленный секретарем ГЭК, не найден" });
            } else if (!studentUpdateSuccess) {
                return res.status(404).json({ message: `Студент с id ${id_S} не найден` });
            }
    
            return res.json({ message: "Результат защиты для студента, выставленный секретарем ГЭК, обновлен" });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Ошибка обновления результата защиты студента, выставленного секретарем ГЭК' });
        }
    }
}
module.exports = new resultComissionSecretaryController()