const Gec = require('../models/Gec')
const Direction = require('../models/Direction')
const User = require('../models/User')
const {validationResult} = require('express-validator')

class gecController {
    async create(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при создании ГЭК", errors})
            }
            const {NameDirection, FullnameSecretary, Year} = req.body
            const direction = await Direction.findOne({where: {
                Name_direction: NameDirection
            }})
            
             const secretaryGec = await User.findOne({where: {
                Fullname: FullnameSecretary
             }})

             const gec = new Gec({ id_D: direction.id_D, id_U: secretaryGec.id_U, year:  Year });
             await gec.save()
             return res.json({message: "ГЭК успешно создана"})
        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка создания ГЭК'})
        }
    }
    async getAllGecs(req, res) {
        try {
            const gecs = await Gec.findAll({where: {status: null}})
            if (!gecs || gecs.length === 0) {
                return res.status(404).json({ message: 'ГЭКи не найдены' });
            }
            return res.json(gecs)
        } catch(e) {
            return res.status(500).json(e)
        }
    }
    async getGecIdsByUserId(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Id не указан" });
            }
    
            const gecs = await Gec.findAll({
                where: { 
                    status: null,
                    id_U: id
                },
                attributes: ['id_G'] 
            });
    
            if (!gecs || gecs.length === 0) {
                return res.status(404).json({ message: 'ГЭКи не найдены' });
            }
    
            return res.json(gecs);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

}
module.exports = new gecController()