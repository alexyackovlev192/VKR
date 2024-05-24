const User = require('../models/User')
const UserRole = require('../models/UserRole')
const Role = require('../models/Role')
const {validationResult} = require('express-validator')
const { Op } = require('sequelize');

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
    async getUsersWithRoles(req, res) {
        try {
            const users = await User.findAll({ 
                where: {
                    Fullname: {
                        [Op.not]: null
                    }
                } 
            });
            
            const usersWithRoles = [];
    
            for (const user of users) {
                const userRoles = await UserRole.findAll({ 
                    where: {
                        id_U: user.id_U 
                    },
                    attributes: ['id_R'] 
                });
    
                const roles = userRoles.map(userRole => userRole.id_R);
    
                usersWithRoles.push({
                    id_U: user.id_U,
                    Login: user.Login,
                    Fullname: user.Fullname,
                    Post: user.Post,
                    Mail: user.Mail,
                    roles: roles
                });
            }
    
            return res.json(usersWithRoles);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении пользователей с ролями' });
        }
    }
    async updateUsersRoles(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при обновлении ролей пользователя", errors });
            }
    
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Не указан ID пользователя" });
            }
    
            // Удаление текущих ролей пользователя
            await UserRole.destroy({ where: { id_U: id } });
    
            const { Roles } = req.body;
            for (const roleId of Roles) {
                const role = await Role.findOne({ where: { id_R: roleId } });
                if (!role) {
                    return res.status(404).json({ message: `Роль с ID ${roleId} не найдена` });
                }
                const userRole = new UserRole({ id_U: id, id_R: role.id_R });
                await userRole.save();
            }
    
            return res.status(200).json({ message: "Роли пользователя успешно обновлены" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при обновлении ролей пользователя" });
        }
    }
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({message: "Id не указан"})
            }
            const user = await User.findOne({
                where: {
                    id_U: id
                },
                attributes: ['id_U', 'Fullname', 'Mail', 'Post']
            });
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            return res.json(user)
        } catch(e) {
            return res.status(500).json(e)
        }
    }
}

module.exports = new userController()