import createTurbineService from '@zwolf/turbine'
import createGoogleCloudPubsubDriver, {
  CreateDriverOptions,
  GoogleCloudPubSubService,
  SubscriptionDeliveryType,
} from '@zwolf/turbine-driver-google-cloud-pubsub'
import log from '@zwolf/log'
import { Application } from 'express'

import {
  SERVICE_NAME,
  SERVICE_URL,
  SERVICE_ACCOUNT_EMAIL,
  ACK_DEADLINE_SECONDS,
  TURBINE_AMQP_URL,
} from './constants'

interface CreateServiceOptions {
  serviceName?: string,
  serviceUrl?: string,
  serviceAccountEmail?: string,
  ackDeadlineSeconds?: number,
  expressServer?: Application,
}

const createDriver = (options: CreateDriverOptions) => {
  if (TURBINE_AMQP_URL != null) {
    console.info(`Connecting using AMQP via ${TURBINE_AMQP_URL}`)
    const amqplibDriver = require('@zwolf/turbine-driver-amqplib').default
    return amqplibDriver({
      url: TURBINE_AMQP_URL
    })
  }
  return createGoogleCloudPubsubDriver(options)
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
