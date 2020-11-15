import { Request, Router, Response } from 'express'
import { accountConect, charge, customer, linkStripe, transfers } from '../@types'
import StripeService from '../services/StripeService'

const route: Router = Router()

route.post('/create-costumer', async (req: Request, res: Response) => {
  const rs = await StripeService.createCustomerStripe(<customer>req.body)
  res.statusCode = rs.code
  res.json(rs)
  return res
})

route.post('/create-charge', async (req: Request, res: Response) => {
  const rs = await StripeService.makeChargeStripe(<charge>req.body)
  res.statusCode = rs.code
  res.json(rs)
  return res
})

route.get('/get-balance', async (_req: Request, res: Response) => {
  const rs = await StripeService.getBalanceFromStripe()
  res.statusCode = rs.code
  res.json(rs)
  return res
})

route.post('/create-contact', async (req: Request, res: Response) => {
  console.dir(req.body)
  const rs = await StripeService.makeContactStripe(<accountConect>req.body)
  res.statusCode = rs.code
  res.json(rs)
  return res
})

route.post('/create-link', async (req: Request, res: Response) => {
  const rs = await StripeService.createLink(<linkStripe>req.body)
  res.statusCode = rs.code
  res.json(rs)
  return res
})

route.get('/get-contacts',async (_req: Request,res: Response) => {
  const rs = await StripeService.getAllContacts()
  res.statusCode = rs.code
  res.json(rs)
  return res
})

route.post('/make-transfers', async (req: Request,res: Response) => {
  const rs = await StripeService.makeTransferToAccount(<transfers>req.body)
  res.statusCode = rs.code
  res.json(rs)
  return res
})


export const routeStripe: Router = route
