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
