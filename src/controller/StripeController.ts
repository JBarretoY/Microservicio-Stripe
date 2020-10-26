import { getObjectStripe } from '../util/valuesUtils'
import { accountConect, charge, customer, response, statusCode } from '../@types'

class ManagementStripe {
  static async createCustomerStripe(customer: customer): Promise<response> {
    try {
      const stripe = getObjectStripe()
      const resp = await stripe.customers.create({
        email: customer.email,
        name: customer.name,
        phone: customer.phone || undefined,
        description: 'client or consultant from consultaneo',
      })
      
      if (resp.id) return { code: statusCode.CREATED, response: resp }
      else return { code: statusCode.BAD_REQUEST, response: resp }
    } catch (e) {
      return {
        code: statusCode.INTERNAL_SERVER_ERROR,
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
        ///customer: charge.customer,
        source: charge.source,
        description: charge.description,
      })

      if (resp.id) return { code: statusCode.CREATED, response: resp }
      else return { code: statusCode.BAD_REQUEST, response: resp }
    } catch (e) {
      return { code: statusCode.INTERNAL_SERVER_ERROR, response: e.toString() }
    }
  }

  static async getBalanceStripe(): Promise<response> {
    try {
      const stripe = getObjectStripe()
      const resp = await stripe.balance.retrieve()
      if (resp.available) return { code: statusCode.ACEPTED, response: resp }
      else return { code: statusCode.BAD_REQUEST, response: resp }
    } catch (e) {
      return {
        code: statusCode.INTERNAL_SERVER_ERROR,
        response: e.toString(),
      }
    }
  }

  static async makeAccountStripeConnect(params:accountConect): Promise<response> {
    try {
      const stripe = getObjectStripe()
      const respAccount = await stripe.accounts.create(params)
      if (respAccount.id) return { code: statusCode.CREATED, response: respAccount }
      return {code:statusCode.BAD_REQUEST,response: respAccount}
    } catch (e) {
      return {
        code: statusCode.INTERNAL_SERVER_ERROR,
        response:e.toString()
      }
    }
  }
}

export default ManagementStripe
