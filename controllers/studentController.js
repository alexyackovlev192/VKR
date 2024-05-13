const Student = require('../models/Student')
const Direction = require('../models/Direction')
const {validationResult} = require('express-validator')

class studentController {
    async create(req, res) {
        try {
            const errors = validationResult(req)
            console.log(errors);
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при создании студента", errors})
            }
            const {Fullname, Group, Topic, ScientificAdviser, Avg_Mark, Red_Diplom, YearOfDefense, Name_direction} = req.body
            const direction = await Direction.findOne({where: {
                Name_direction: Name_direction
            }})

            if (!direction) {
                return res.status(404).json({ message: "Направление не найдено" });
            }

            const student = new Student({Fullname: Fullname, Group: Group, Topic: Topic, ScientificAdviser: ScientificAdviser, Avg_Mark: Avg_Mark, Red_Diplom: Red_Diplom, YearOfDefense: YearOfDefense, Name_direction: direction.Name_direction});
            await student.save()
            return res.json({message: "Студент успешно добавлен"})
        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка добавления студента'})
        }
    }
    async updateStudent(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при обновлении информации о студенте", errors})
            }
            const { id } = req.params;
            const {Fullname, Group, Topic, ScientificAdviser, Avg_Mark, Red_Diplom, YearOfDefense, Name_direction} = req.body 
            if (!id) {
                res.status(400).json({message: "Id не указан"})
            }
            if (Name_direction) {
                const direction = await Direction.findOne({
                    where: {
                        Name_direction: Name_direction
                    }
                });
    
                if (!direction) {
                    return res.status(404).json({ message: "Направление не найдено" });
                }
            }
            const updatedRowsCount = await Student.update(
                { Fullname, Group, Topic, ScientificAdviser, Avg_Mark, Red_Diplom, YearOfDefense, Name_direction: Name_direction },
                { where: { id_S: id } }
            )
            if (updatedRowsCount[0] === 0) {
                return res.status(404).json({ message: `Нет студента с таким идентификатором: ${id}` })
            }
            const updatedStudent = await Student.findOne({ where: { id_S: id } }); 
            return res.status(200).json(updatedStudent);

        } catch(e) {
            res.status(500).json({ message: 'Ошибка при обновлении данных студента', e})
        }
    }
    async getStudentsDefThisYear(req, res) {
        try {
            const currentYear = new Date().getFullYear();
            const studentsDefThisYear = await Student.findAll({where: { YearOfDefense: currentYear }})
            if (!studentsDefThisYear) {
                return res.status(404).json({ message: 'Студенты, защищающиеся в этом году не найдены!' });
            }
            return res.json(studentsDefThisYear)
        } catch(e) {
            return res.status(500).json(e)
        }
    }
    async getStudentById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({message: "Id не указан"})
            }
            const student = await Student.findOne({where: { id_S: id }})
            if (!student) {
                return res.status(404).json({ message: 'Студент не найден!' });
            }
            return res.json(student)
        } catch(e) {
            return res.status(500).json(e)
        }
    }

}
module.exports = new studentController()