import test from 'ava'

import { createService } from './index'

test('should create a service', (t) => {
  const testService = createService({
    serviceName: 'test-service',
    serviceUrl: 'https://test-service.app'
  })

  t.truthy(testService)
})
