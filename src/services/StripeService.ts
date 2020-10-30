import ManagementStripe from '../controller/StripeController'
import { accountConect, charge, customer, linkStripe, person } from '../@types'

class StripeService {
  static async getBalanceFromStripe() {
    return await ManagementStripe.getBalanceStripe()
  }

  static async createCustomerStripe(params: customer) {
    return await ManagementStripe.createCustomerStripe(params)
  }

  static async makeChargeStripe(params: charge) {
    return await ManagementStripe.makePaymentStripe(params)
  }

  static async makeContactStripe(params: accountConect) {
    return await ManagementStripe.makeAccountStripeConnect(params)
  }

  static async cratePerson(params: person) {
    return await ManagementStripe.createPersonFromContact(params)
  }

  static async createLink(params: linkStripe) {
    return await ManagementStripe.createLink(params)
  }
}

export default StripeService
