import ManagementStripe from '../controller/StripeController'
import { accountConect, charge, customer, linkStripe, transfers } from '../@types'

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

  static async createLink(params: linkStripe) {
    return await ManagementStripe.createLink(params)
  }

  static async getAllContacts(){
    return await ManagementStripe.getAllContacts()
  }

  static async makeTransferToAccount(params:transfers){
    return await ManagementStripe.makeTransferToAccount(params)
  }

  static async getAllTransfers(){
    return await ManagementStripe.getAllTransfers()
  }

  static async createLinkLogin(accountConect:string){
    return await ManagementStripe.createLinkLoginContact(accountConect)
  }
}

export default StripeService
