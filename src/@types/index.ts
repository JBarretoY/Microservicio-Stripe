export interface connection {
  port: number
  host: string
}

export type customer = {
  name: string
  email: string
  phone: string
}

export type charge = {
  amount: number
  currency: string
  source: string
  description: string
  customer: string
}

export type response = {
  response: any
  code: number
}

export type errorResponse = {
  exception: any
  code: number
}

export type accountConect = {
  type: TYPE_ACCOUNT,
  country: string,
  email: string,
  capabilities:capabilities
}

export enum TYPE_ACCOUNT {
  CUSTOM = 'custom',
  EXPRESS = 'express',
  STANDARD = 'standard'
}

export type capabilities = {
  card_payments?: any
  transfers?: any
}

export enum statusCode{
  INTERNAL_SERVER_ERROR = 500,
  ACEPTED = 200,
  CREATED = 201,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  NOT_FOUND = 404
}

export type linkStripe = {
  account: string,
  refresh_url: string,
  return_url: string,
}

export type transfers = {
  amount:number,
  currency:string,
  destination:string,
  description:"This is a transfers from Consultaneo (ESCROW)"
}
