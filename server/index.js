require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookie = require("cookie-parser")
const authRouter = require('./routes/auth.routes')
const fileRouter = require('./routes/file.routes')

const port = process.env.port || 5000
const app = express()
const errorMidleware = require("./middlewares/error-middleware")


app.use(express.json())
app.use(cookie())
app.use(cors({
    credentials: true,
    origin: process.env.client_url
}))
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)
app.use(errorMidleware)



const start = async () => {
    try {
        await mongoose.connect(process.env.mongo)
        app.listen(port, () => {
            console.log('Server started at ' + port )
        })
    } catch (error) {
        console.log(error)
    }
}

start()