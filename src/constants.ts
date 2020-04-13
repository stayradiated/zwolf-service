import env from 'env-var'

export const TURBINE_AMQP_URL = env.get('TURBINE_AMQP_URL').asString()

export const SERVICE_NAME = env.get('SERVICE_NAME').required().asString()

export const SERVICE_ACCOUNT_EMAIL = env.get('SERVICE_ACCOUNT_EMAIL').asString()

export const SERVICE_URL = env.get('SERVICE_URL').asUrlString()

export const ACK_DEADLINE_SECONDS = env
  .get('ACK_DEADLINE_SECONDS')
  .default('60')
  .asInt()
