import Stripe from "stripe";
import { customer } from "../@types";
import { getObjectStripe } from "../util/valuesUtils";

export const createCustomer = async (params: customer): Promise <Stripe.Customer> => {
  const stripe = getObjectStripe()
  return await stripe.customers.create(params)
}