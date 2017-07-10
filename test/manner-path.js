
/**
 * Test dependencies.
 */

const test = require('tape')
const path = require('..')

test('should execute root static path', assert => {
  assert.plan(1)
  const handler = path({
    '/': () => {
      assert.ok('path executed')
    }
  })
  handler('/')
})


test('should execute static path', assert => {
  assert.plan(1)
  const handler = path({
    '/user': () => {
      assert.ok('path executed')
    }
  })
  handler('/user')
})


test('should execute dynamic path', assert => {
  assert.plan(1)
  const handler = path({
    '/:type': () => {
      assert.ok('path executed')
    }
  })
  handler('/user')
})


test('should execute dynamic path with static root', assert => {
  assert.plan(1)
  const handler = path({
    '/user/:type': () => {
      assert.ok('path executed')
    }
  })
  handler('/user/hello')
})
