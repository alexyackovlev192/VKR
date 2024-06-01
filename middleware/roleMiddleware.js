const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')

module.exports = function(roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
          }
        
          try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
              return res.status(403).json({ message: `Пользователь не авторизован` })
            }
            const {roles: userRoles} = jwt.verify(token, secret) 

            console.log('User Roles:', userRoles);
            console.log('Required Roles:', roles);

            let hasRole = false
            userRoles.forEach(role => {
                console.log('Checking Role:', role);
                if(roles.includes(role)) {
                    hasRole = true
                    console.log("есть роль!")
                }
            })
            if (!hasRole) {
                return res.status(403).json({message: "У вас нет доступа"})
            }
            next()
          } catch (error) {
            console.log(error)
            return res.status(403).json({ message: 'Пользователь не авторизован' })
          }
    }
}