const User = require('../models/User')
const UserRole = require('../models/UserRole')
const {validationResult} = require('express-validator')

class userController {

    async getAllMembersOfGec(req, res) {
        try {
            const membersOfGec = await UserRole.findAll({where: {id_R: 2}})
            if (!membersOfGec || membersOfGec.length === 0) {
                return res.status(404).json({ message: 'Пользователи с указанной ролью не найдены' });
            }
            const userIds = membersOfGec.map(userRole => userRole.id_U)
            const usersGec = await User.findAll({where: {id_U: userIds}})
            return res.json(usersGec)
        } catch(e) {
            return res.status(500).json(e)
        }
    }
    async updateMemberOfGec(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при обновлении данных члена гэк", errors})
            }
            const { id } = req.params;
            const {Fullname, Mail, Post} = req.body 
            if (!id) {
                res.status(400).json({message: "Id не указан"})
            }
            const updatedRowsCount = await User.update(
                { Fullname, Mail, Post },
                { where: { id_U: id } }
            )
            if (updatedRowsCount[0] === 0) {
                return res.status(404).json({ message: `Нет члена гэк с таким идентификатором: ${id}` })
            }
            const updatedUser = await User.findOne({ where: { id_U: id } }); 
            return res.status(200).json(updatedUser);

        } catch(e) {
            res.status(500).json({ message: 'Ошибка при обновлении данных члена гэк', e})
        }
    }
    async getAllSecretariesGec(req, res) {
        try {
            const secretariesGec = await UserRole.findAll({where: {id_R: 4}})
            if (!secretariesGec || secretariesGec.length === 0) {
                return res.status(404).json({ message: 'Пользователи с указанной ролью не найдены' });
            }
            const userIds = secretariesGec.map(userRole => userRole.id_U)
            const usersSekGec = await User.findAll({where: {id_U: userIds}})
            return res.json(usersSekGec)
        } catch(e) {
            return res.status(500).json(e)
        }
    }
    async updateSecretaryGec(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при обновлении данных секретаря гэк", errors})
            }
            const { id } = req.params;
            const {Fullname, Mail, Post} = req.body 
            if (!id) {
                res.status(400).json({message: "Id не указан"})
            }
            const updatedRowsCount = await User.update(
                { Fullname, Mail, Post },
                { where: { id_U: id } }
            )
            if (updatedRowsCount[0] === 0) {
                return res.status(404).json({ message: `Нет секретаря гэк с таким идентификатором: ${id}` })
            }
            const updatedUser = await User.findOne({ where: { id_U: id } }); 
            return res.status(200).json(updatedUser);

        } catch(e) {
            res.status(500).json({ message: 'Ошибка при обновлении данных секретаря гэк', e})
        }
    }
}
module.exports = new userController()