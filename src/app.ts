import express from 'express'
import helmet from 'helmet'
import { WebController } from './router/testRoute'
import { connection } from './@types'
import { routeStripe } from './router/stripeRoute'
import morgan from 'morgan'
import cors from 'cors'
require('dotenv').config()
const listEndpoints = require('express-list-endpoints')
import * as bodyParser from "body-parser"

const app: express.Express = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(helmet())
app.use(cors())
app.use(WebController)
app.use(routeStripe)
app.use(morgan('dev'))

const connection: connection = {
  host: process.env.IP ? process.env.IP : '127.0.0.1',
  port: process.env.PORT ? Number.parseInt(process.env.PORT) : 8888,
}

console.log(listEndpoints(app))

app.listen(connection.port, connection.host, () => {
  console.log(
    `API RUNNING IN THE PORT ${connection.port} IN IP: ${connection.host}... -> http://${connection.host}:${connection.port}`,
  )
})
