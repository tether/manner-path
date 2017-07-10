
/**
 * Test dependencies.
 */

const test = require('tape')
const path = require('..')

test('should execute root path', assert => {
  assert.plan(1)
  const handler = path({
    '/': () => {
      assert.ok('path executed')
    }
  })
  handler('/')
})
