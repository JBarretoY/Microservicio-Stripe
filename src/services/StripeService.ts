import ManagementStripe from '../controller/StripeController'
import { charge, customer } from '../@types'

class StripeService {
  static async getBalanceFromStripe() {
    return await ManagementStripe.getBalanceStripe()
  }

  static async createCustomerStripe(params: customer) {
    return await ManagementStripe.createCustomerStripe(params)
  }

  static async makeChargeStripe(params: charge) {
    return await ManagementStripe.makeChargeStripe(params)
  }
}

export default StripeService
