import {getObjectStripe} from "../util/valuesUtils";
import {charge, customer} from "../@types";


class ManagementStripe{
    static async createCustomerStripe(customer:customer){
        try{
            const stripe = getObjectStripe()
            return await stripe.customers.create({
                email:customer.email,
                name:customer.name,
                phone:customer.phone,
                description:"client or consultant from consultaneo"
            })
        }catch (e) {
            return e.toString()
        }
    }

    static async makeChargeStripe(charge:charge){
        try{
            const stripe = getObjectStripe()
            return await stripe.charges.create({
                amount:charge.amount,
                currency:charge.currency,
                customer:charge.customer,
                source:charge.source,
                description:charge.description
            })
        }catch (e) {
            return e.toString()
        }
    }
}

export default ManagementStripe