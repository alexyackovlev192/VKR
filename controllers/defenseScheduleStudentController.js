const DefenseSchedule = require('../models/DefenseSchedule')
const DefenseScheduleStudent = require('../models/DefenseScheduleStudent')
const { Op } = require('sequelize');
const {validationResult} = require('express-validator')

class defenseScheduleStudentController {
    async updateDefenseScheduleStudents(req, res) {
        const id = req.params.id;
        const {studentIds} = req.body 
        try {
            if (!studentIds) {
                return res.status(400).json({ message: "Необходимо указать studentIds" });
            }

            const currentStudents = await DefenseScheduleStudent.findAll({
                where: { id_DS: id }
            });
            
            const currentStudentIds = currentStudents.map(member => member.id_S);
    
            const membersToDelete = currentStudentIds.filter(id => !studentIds.includes(id));
    
            const membersToAdd = studentIds.filter(id => !currentStudentIds.includes(id));
    
            if (membersToDelete.length > 0) {
                await DefenseScheduleStudent.destroy({
                    where: {
                        id_DS: id,
                        id_S: membersToDelete
                    }
                });
            }
            
            if (membersToAdd.length > 0) {
                const newMembers = membersToAdd.map(id_S => ({
                    id_DS: id,
                    id_S: id_S
                }));
                await DefenseScheduleStudent.bulkCreate(newMembers);
            }
            
            res.status(200).json({ message: 'Состав защищающихся для данной защиты успешно обновлен' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ошибка при обновлении состава защищающихся для данной защиты', error });
        }
    }
    async getStudentsForDefense(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                res.status(400).json({message: "Id не указан"})
            }
            const studentsForDefense  = await DefenseScheduleStudent.findAll({where: {id_DS: id}})
            return res.json(studentsForDefense)
        }
        catch(e) {
            return res.status(500).json(e)
        }
    }
}
module.exports = new defenseScheduleStudentController()