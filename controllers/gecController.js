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
            const {Name_direction, Fullname, Year} = req.body
            const direction = await Direction.findOne({where: {
                Name_direction: Name_direction
            }})
            
             const secretaryGec = await User.findOne({where: {
                Fullname: Fullname
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
    async getSecretaryIdByGecId(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Id не указан" });
            }
    
            const secretaryId = await Gec.findOne({
                where: { 
                    status: null,
                    id_G: id
                },
                attributes: ['id_U'] 
            });
    
            if (!secretaryId) {
                return res.status(404).json({ message: 'Id секретаря по id ГЭК не найден' });
            }
    
            return res.json(secretaryId);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
    async getGecById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({message: "Id не указан"})
            }
            const gec = await Gec.findOne({
                where: {
                    id_G: id
                }
            });
            if (!gec) {
                return res.status(404).json({ message: 'ГЭК не найдена' });
            }
            return res.json(gec)
        } catch(e) {
            return res.status(500).json(e)
        }
    }
    async updateGec(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при обновлении информации о ГЭК", errors})
            }
            const { id } = req.params;
            const {Name_direction, Year} = req.body 
            if (!id) {
                res.status(400).json({message: "Id не указан"})
            }
            let updateData = {year:Year};

            if (Name_direction) {
                const direction = await Direction.findOne({
                    where: { Name_direction: Name_direction }
                });

                if (!direction) {
                    return res.status(404).json({ message: "Направление не найдено" });
                }

                updateData.id_D = direction.id_D;
            }

            const updatedRowsCount = await Gec.update(updateData, { where: { id_G: id } });
            
            if (updatedRowsCount[0] === 0) {
                return res.status(404).json({ message: `Нет ГЭК с таким идентификатором: ${id}` })
            }
            const updatedGec = await Gec.findOne({ where: { id_G: id } }); 
            return res.status(200).json(updatedGec);

        } catch(e) {
            res.status(500).json({ message: 'Ошибка при обновлении данных ГЭК', e})
        }
    }
    async updateStatusGec(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при обновлении статуса работы ГЭК", errors})
            }
            const { id } = req.params;
            const {Status} = req.body 
            if (!id) {
                res.status(400).json({message: "Id не указан"})
            }
            let updateData = {status:Status};

            const updatedRowsCount = await Gec.update(updateData, { where: { id_G: id } });
            
            if (updatedRowsCount[0] === 0) {
                return res.status(404).json({ message: `Нет ГЭК с таким идентификатором: ${id}` })
            }
            const updatedGec = await Gec.findOne({ where: { id_G: id } }); 
            return res.status(200).json(updatedGec);

        } catch(e) {
            res.status(500).json({ message: 'Ошибка при обновлении статуса работы ГЭК', e})
        }
    }


}
module.exports = new gecController()