import { Request, Router, Response } from 'express'
import { charge, customer } from '../@types'
import StripeService from '../services/StripeService'

const route: Router = Router()

route.post('/create-costumer', async (req: Request, res: Response) => {
  console.log('CONECTION IN COMMING: ' + req.ip)
  const rs = await StripeService.createCustomerStripe(<customer>req.body)
  return res.json(rs.response).status(rs.code)
})

route.post('/create-charge', async (req: Request, res: Response) => {
  const rs = await StripeService.makeChargeStripe(<charge>req.body)
  return res.json(rs.response).status(rs.code)
})

route.get('/get-balance', async (_req: Request, res: Response) => {
  const rs = await StripeService.getBalanceFromStripe()
  return res.json(rs.response).status(rs.code)
})

export const routeStripe: Router = route
