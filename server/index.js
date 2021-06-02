require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const error = require('./moddleware/errorHandlingMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)
app.use(cors())


app.use(error)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()
