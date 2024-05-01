const Student = require('../models/Student')
const Direction = require('../models/Direction')
const {validationResult} = require('express-validator')

class studentController {
    async create(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при создании студента", errors})
            }
            const {Fullname, Group, Topic, ScientificAdviser, Avg_Mark, Red_Diplom, YearOfDefense, NameDirection} = req.body
            const direction = await Direction.findOne({where: {
                Name_direction: NameDirection
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
}
module.exports = new studentController()