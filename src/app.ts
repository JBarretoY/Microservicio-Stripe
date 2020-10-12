import express from 'express'
import helmet from "helmet";
import {WebController} from "./router/testRoute";
import {connection} from "./@types";
require('dotenv').config()
const listEndpoints = require('express-list-endpoints')

const app:express.Express = express()
app.use(helmet())
app.use(WebController)

const connection:connection = {
    host:process.env.IP ? process.env.IP : '127.0.0.1',
    port:process.env.PORT ? Number.parseInt(process.env.PORT) : 8888
}

console.log(app)

app.listen(connection.port,connection.host,() => {
    console.log(`API RUNNING IN THE PORT ${connection.port} IN IP: ${connection.host}...`)
})