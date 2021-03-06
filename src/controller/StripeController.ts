import {getObjectStripe} from '../util/valuesUtils'
import {accountConect, charge, customer, linkStripe, response, statusCode, transfers} from '../@types'

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

  static async makePaymentStripe(charge: charge): Promise<response> {
    try {
      const stripe = getObjectStripe()
      const customer = await stripe.customers.create({
        email:charge.customer.email,
        name:charge.customer.name,
        phone:charge.customer.phone,
        source:charge.customer.source
      })

      const resp = await stripe.charges.create({
        amount: charge.amount,
        currency: charge.currency,
        customer:customer.id,
        description: charge.description,
      })

      if (resp.id) {
        console.dir({ code: statusCode.CREATED, response: resp })
        return { code: statusCode.CREATED, response: resp }
      } 
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

      if (respAccount.id) {
        console.dir({ code: statusCode.CREATED, response: respAccount })
        return { code: statusCode.CREATED, response: respAccount }
      }
      return {code:statusCode.BAD_REQUEST,response: respAccount}
    } catch (e) {
      return {
        code: statusCode.INTERNAL_SERVER_ERROR,
        response:e.toString()
      }
    }
  }

  static async createLink(params: linkStripe): Promise<response> {
    try {
      const stripe = getObjectStripe()
      const respLink = await stripe.accountLinks.create({
        refresh_url: params.refresh_url,
        return_url: params.return_url,
        type: 'account_onboarding',
        account: params.account
      })

      return respLink.url ? { code: statusCode.CREATED, response: respLink } : { code: statusCode.BAD_REQUEST, response: respLink }
    } catch (e) {
      return {code:statusCode.INTERNAL_SERVER_ERROR,response:e.toString()}
    }
  }

  static async getAllContacts(): Promise<response>{
    try{
      const stripe = getObjectStripe();
      const contactLists = await stripe.accounts.list();
      return contactLists.data.length > 0 ? {code: statusCode.ACEPTED,response:contactLists} : {code: statusCode.NOT_FOUND,response:'no contacts'}
    }catch(e){
      return {code:statusCode.INTERNAL_SERVER_ERROR,response:e.toString()}
    }
  }

  static async makeTransferToAccount(params:transfers): Promise<response>{
    try{
      const stripe = getObjectStripe();
      const resTrans = await stripe.transfers.create(params)
      return resTrans.id ? {code:statusCode.CREATED,response:resTrans} : {code:statusCode.BAD_REQUEST,response:resTrans}
    }catch(e){
      return {code:statusCode.INTERNAL_SERVER_ERROR,response:e.toString()}
    }
  }

  static async getAllTransfers(): Promise<response>{
    try{
      const stripe = getObjectStripe()
      const transfers = await stripe.transfers.list()
      return transfers.data.length > 0 ? {code:statusCode.ACEPTED,response:transfers} : {code:statusCode.NOT_FOUND,response:transfers}
    }catch (e) {
      return { code: statusCode.INTERNAL_SERVER_ERROR, response: e.toString() }
    }
  }

  static async createLinkLoginContact(accountConect:string): Promise<response>{
    try{
      const stripe = getObjectStripe()
      const link = await stripe.accounts.createLoginLink(accountConect)
      return link.url ? {code:statusCode.ACEPTED,response:link} : {code:statusCode.BAD_REQUEST,response:link}
    }catch (e) {
      return { code: statusCode.INTERNAL_SERVER_ERROR, response: e.toString() }
    }
  }
}

export default ManagementStripe
