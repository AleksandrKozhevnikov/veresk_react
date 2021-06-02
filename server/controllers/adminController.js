const {Admin} = require('../models/models')
const apiError = require('../error/apiError')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateJwt = (id, login) => {
    return jwt.sign(
        {id, login},
        process.env.SECRET_KEY,
        {
            expiresIn: '24h',
        }
    )
}

class AdminController {
    async registration(req, res, next) {
        const {login, password} = req.body

        if(!login, !password) {
            return next(apiError.badRequest('Не указаны почта или пароль!'))
        }

        const candidate = await Admin.findOne({where: {login}})

        if(candidate) {
            return next(apiError.badRequest('Администратор с таким логином уже существует!'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const admin = await Admin.create({login, password: hashPassword})
        const token = generateJwt(admin.id, admin.login)

        return res.json({token})
    }
    async login(req, res, next) {
        const {login, password} = req.body

        const admin = Admin.findOne({where:{login}})

        if(!admin) {
            return next(apiError.badRequest('Такого администратора нет в системе!'))
        }

        const checkPassword = bcrypt.compareSync(password, admin.password)

        if(!checkPassword) {
            return next(apiError.badRequest('Неверный пароль!'))
        }

        const token = generateJwt(admin.id, admin.login)
        return res.json({token})

    }
    async check(req, res) {
        const token = generateJwt(admin.id, admin.login)
        return res.json({token})
    }
}

module.exports = new AdminController()