const User = require('../models/User')
const Role = require('../models/Role')
const UserRole = require('../models/UserRole')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')

const generateAccessToken = (id_U, mail, roles) => {
   const payload = {
      id_U,
      mail,
      roles
   }
   return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
     async registartion(req, res) {
        try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return res.status(400).json({message:"Ошибка при регистрации", errors})
         }
         const {Fullname, Login, Password, Mail, Post, Roles} = req.body 
         const candidate = await User.findOne({ where: {
            Login: Login
          }})
         if (candidate) {
            return res.status(400).json({message: "Пользователь с таким логином уже существует"})
         }
         const hashPassword = bcrypt.hashSync(Password, 7);
         const user = new User({Fullname, Login, Password: hashPassword, Mail, Post})
         await user.save()
         const this_user = await User.findOne({ where: {
            Login: Login
          }})
         const userId = this_user.id_U;
         for (const roleId of Roles) {
            const role = await Role.findOne({ where: { id_R: roleId } });
            if (!role) {
                console.log(`Роль с id "${role}" не найдена`);
                continue;
            }
            const userRole = new UserRole({ id_U: userId, id_R: role.id_R });
            await userRole.save();
        }

         
         return res.json({message: "Пользователь успешно зарегистрирован"})

        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
     }
     async login(req, res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
               return res.status(400).json({message:"Ошибка при авторизации", errors})
            }
            const {Login, Password} = req.body
            const user = await User.findOne({ where: {
               Login: Login
             }})
             if (!user) {
                  return res.status(400).json({message: `Пользователь ${Login} не найден`})
             }
             const validPassword = bcrypt.compareSync(Password,user.Password)
             if (!validPassword) {
               return res.status(400).json({message: 'Введен неверный пароль'})
             }
             const UserRoles = await UserRole.findAll({where: {
               id_U: user.id_U
             }})
             const roleIds = UserRoles.map(userRole => userRole.id_R);
             console.log("Role IDs = ", roleIds);

            
             const token = generateAccessToken(user.id_U, user.Mail, roleIds)
             return res.json({token})

        } catch(e) {
         console.log(e)
         res.status(400).json({message: 'Login error'})
        }
     }
      async getUsers(req, res){
        try {
            
            res.json("server work")

        } catch(e) {
            console.log(e)
        }
        
     }

}
module.exports = new authController()