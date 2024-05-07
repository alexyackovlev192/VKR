const CompositionGec = require('../models/CompositionGec')
const Gec = require('../models/Gec')

class compositionGecController {
    async updateGecComposition(req, res) {
        const id = req.params.id;
        const {memberIds, secretaryId} = req.body 
        try {
            if (!memberIds || !secretaryId) {
                return res.status(400).json({ message: "Необходимо указать memberIds и secretaryId" });
            }

            const currentMembers = await CompositionGec.findAll({
                where: { id_G: id }
            });
            
            const currentMemberIds = currentMembers.map(member => member.id_U);
    
            const membersToDelete = currentMemberIds.filter(id => !memberIds.includes(id));
    
            const membersToAdd = memberIds.filter(id => !currentMemberIds.includes(id));
    
            if (membersToDelete.length > 0) {
                await CompositionGec.destroy({
                    where: {
                        id_G: id,
                        id_U: membersToDelete
                    }
                });
            }
            
            if (membersToAdd.length > 0) {
                const newMembers = membersToAdd.map(id_U => ({
                    id_G: id,
                    id_U: id_U
                }));
                await CompositionGec.bulkCreate(newMembers);
            }
                                   
            await Gec.update({ id_U: secretaryId },
                { where: { id_G: id } }
            );
            
            res.status(200).json({ message: 'Состав ГЭК успешно обновлен' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ошибка при обновлении состава ГЭК', error });
        }
    }
    async getGecComposition(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                res.status(400).json({message: "Id не указан"})
            }
            const compositionGec  = await CompositionGec.findAll({where: {id_G: id}})
            return res.json(compositionGec)
        }
        catch(e) {
            return res.status(500).json(e)
        }
    }
    /*async getGecIdsByUserId(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                res.status(400).json({message: "Id не указан"})
            }
            const gecIds = await CompositionGec.findAll({
                where: { id_U: id },
                attributes: ['id_G'] 
            });
            const gecIds = await CompositionGec.findAll({
                where: { 
                    id_U: id 
                },
                include: [{
                    model: Gec,
                    required: true, 
                    where: {
                        status: null 
                    }
                }],
                attributes: ['id_G']
            });
            res.status(200).json(gecIds);
        }
        catch (e) {
            res.status(500).json({ message: 'Ошибка при получении id_G по id_U', e });
        }
    }*/
    async getGecIdsByUserId(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Id не указан" });
            }
    
            const gecIds = await CompositionGec.findAll({
                where: { id_U: id },
                attributes: ['id_G'] 
            });
    
            const filteredGecIds = [];
            for (const gecIdObj of gecIds) {
                const gecId = gecIdObj.id_G;
                const gec = await Gec.findOne({ where: { id_G: gecId, status: null } });
                if (gec) {
                    filteredGecIds.push({ id_G: gecId });
                }
            }
    
            return res.status(200).json(filteredGecIds);
        } catch (e) {
            return res.status(500).json({ message: 'Ошибка при получении id_G по id_U', e });
        }
    }
}
module.exports = new compositionGecController()