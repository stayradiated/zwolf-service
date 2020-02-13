import createTurbineService from '@zwolf/turbine'
import createDriver, {
  SubscriptionDeliveryType,
  GoogleCloudPubSubService,
} from '@zwolf/turbine-driver-google-cloud-pubsub'
import log from '@zwolf/log'
import { Application } from 'express'

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
  expressServer?: Application,
}

const createService = (options: CreateServiceOptions = {}) => {
  const {
    serviceName = SERVICE_NAME,
    serviceUrl = SERVICE_URL,
    serviceAccountEmail = SERVICE_ACCOUNT_EMAIL,
    ackDeadlineSeconds = ACK_DEADLINE_SECONDS,
    expressServer,
  } = options

  return createTurbineService<GoogleCloudPubSubService>({
    serviceName,
    driver: log(
      createDriver({
        deliveryType: SubscriptionDeliveryType.PUSH,
        pushEndpoint: serviceUrl,
        oidcToken: {
          serviceAccountEmail,
        },
        ackDeadlineSeconds,
        expressServer,
      }),
    ),
  })
}

export { createService }
