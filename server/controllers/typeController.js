const {Type} = require('../models/models')
const ApiError = require('../error/apiError.js')


class TypeController {

    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    async delete(req, res) {
        const {id} = req.query
        const type = await Type.findOne({where: {id : id}}).then(function(type) {
            return type.destroy();
        })
        return res.json(type)
    }
    async getAll(req, res) {
        const type = await Type.findAll()
        return res.json(type)
    }
}

module.exports = new TypeController()