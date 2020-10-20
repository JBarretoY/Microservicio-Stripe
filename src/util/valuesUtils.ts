import Stripe from 'stripe'
require('dotenv').config()

export function getObjectStripe(): Stripe {
  return new Stripe(
    process.env.API_KEY
      ? process.env.API_KEY
      : 'sk_test_51H0Tl9B8ktjqFg5R4UPFlD1fyBOEhJps56ONScNdYBkigU9xDtLlI8x05ZyLOJN9ZqzKp20dl5QeKdCdi1OY8d00001SsakuPL',
    {
      apiVersion: '2020-08-27',
    },
  )
}