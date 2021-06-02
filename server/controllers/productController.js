const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/models')
const {ProductInfo} = require('../models/models')
const apiError = require('../error/apiError')



class ProductController {
    async create(req, res, next) {
        try {
            const {name, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'

            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const product = await Product.create({name, typeId, img: fileName})

            if(info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                })
            }

            return res.json(product)
        } catch(e) {
            return apiError.badRequest(e.message)
        }

    }
    async getAll(req, res) {
        let {typeId, limit, page} = req.query
        let products
        let offset

        page = page || 1;
        limit = limit || 6;
        offset = page * limit - limit

        if(!typeId) {
            products = await Product.findAndCountAll({limit, offset, include:{model:ProductInfo, as: 'info'}})
        }

        if(typeId) {
            products = await Product.findAndCountAll({where:{typeId}, limit, offset, include:{model:ProductInfo, as: 'info'}})
        }

        return res.json(products)

    }
    async delete(req, res) {
        const {id} = req.query
        const product = await Product.findOne({where: {id : id}}).then(function(type) {
            return product.destroy();
        })
        return res.json(product)
    }
    async getOne(req, res) {
        const {id} = req.params

        const product = await Product.findOne({where:{id: id}})
        return res.json(product)
    }
   

}

module.exports = new ProductController()