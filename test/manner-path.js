
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

test('should pass params /:foo', assert => {
  assert.plan(1)
  const handler = path({
    '/:foo': (params) => {
      assert.deepEqual(params, {
        foo: 'hello'
      })
    }
  })
  handler('/hello')
})

test('should pass params /:foo/bar', assert => {
  assert.plan(1)
  const handler = path({
    '/:foo/bar': (params) => {
      assert.deepEqual(params, {
        foo: 'hello'
      })
    }
  })
  handler('/hello/bar')
})

test('should pass params /:foo/bar/:boop', assert => {
  assert.plan(1)
  const handler = path({
    '/:foo/bar/:boop': (params) => {
      assert.deepEqual(params, {
        foo: 'hello',
        boop: 'world'
      })
    }
  })
  handler('/hello/bar/world')
})

test('should pass params /:foo/bar/:boop?', assert => {
  assert.plan(1)
  const handler = path({
    '/:foo/bar/:boop?': (params) => {
      assert.deepEqual(params, {
        foo: 'hello'
      })
    }
  })
  handler('/hello/bar')
})

test('should pass params /:foo/bar/:boop*', assert => {
  assert.plan(1)
  const handler = path({
    '/:foo/bar/:boop?': (params) => {
      assert.deepEqual(params, {
        foo: 'hello',
        boop: ['world', 'beep']
      })
    }
  })
  handler('/hello/bar/world/beep')
})
