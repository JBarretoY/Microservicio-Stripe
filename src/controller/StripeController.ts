import { getObjectStripe } from '../util/valuesUtils'
import { charge, customer, errorResponse, response } from '../@types'
import { Stripe } from 'stripe'

class ManagementStripe {
  static async createCustomerStripe(customer: customer): Promise<response> {
    try {
      const stripe = getObjectStripe()
      const resp = await stripe.customers.create({
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
        description: 'client or consultant from consultaneo',
      })
      
      if (resp.id) return { code: 201, response: resp }
      else return { code: 400, response: resp }
    } catch (e) {
      return {
        code: 500,
        response: e.toString(),
      }
    }
  }

  static async makeChargeStripe(charge: charge): Promise<response> {
    try {
      const stripe = getObjectStripe()
      const resp = await stripe.charges.create({
        amount: charge.amount,
        currency: charge.currency,
        customer: charge.customer,
        source: charge.source,
        description: charge.description,
      })

      if (resp.id) return { code: 201, response: resp }
      else return { code: 400, response: resp }
    } catch (e) {
      return { code: 500, response: e.toString() }
    }
  }

  static async getBalanceStripe(): Promise<response> {
    try {
      const stripe = getObjectStripe()
      const resp = await stripe.balance.retrieve()
      if (resp.available) return { code: 201, response: resp }
      else return { code: 400, response: resp }
    } catch (e) {
      return {
        code: 500,
        response: e.toString(),
      }
    }
  }
}

export default ManagementStripe
