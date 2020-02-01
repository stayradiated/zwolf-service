import createTurbineService from '@zwolf/turbine'
import createDriver, {
  SubscriptionDeliveryType,
} from '@zwolf/turbine-driver-google-cloud-pubsub'
import log from '@zwolf/log'

import {
  SERVICE_NAME,
  SERVICE_URL,
  SERVICE_ACCOUNT_EMAIL,
  ACK_DEADLINE_SECONDS,
} from './constants'

interface CreateServiceOptions {
  serviceName?: string,
  serviceUrl?: string,
  serviceAccountEmail?: string,
  ackDeadlineSeconds?: number,
}

const createService = (options: CreateServiceOptions = {}) => {
  const {
    serviceName = SERVICE_NAME,
    serviceUrl = SERVICE_URL,
    serviceAccountEmail = SERVICE_ACCOUNT_EMAIL,
    ackDeadlineSeconds = ACK_DEADLINE_SECONDS,
  } = options

  return createTurbineService({
    serviceName,
    driver: log(
      createDriver({
        deliveryType: SubscriptionDeliveryType.PUSH,
        pushEndpoint: serviceUrl,
        oidcToken: {
          serviceAccountEmail,
        },
        ackDeadlineSeconds,
      }),
    ),
  })
}

export { createService }
