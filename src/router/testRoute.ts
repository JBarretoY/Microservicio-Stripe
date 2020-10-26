import { Request, Router, Response } from 'express'

const route: Router = Router()

route.get('/', (_req: Request, res: Response) => {
  res.send('api Running').sendStatus(200)
})

route.get('/status', (_req: Request, res: Response) => {
  res.json(
    `Api Running in the IP: ${process.env.IP} and in the PORT: ${process.env.PORT}`,
  )
})

export const WebController: Router = route
