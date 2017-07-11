
/**
 * Test dependencies.
 */

const test = require('tape')
const path = require('..')

test('should execute root static path', assert => {
  assert.plan(1)
  const fn = () => {}
  const handler = path({
    '/': fn
  })
  const result = handler('/')
  assert.equal(result.arg, fn)
})


test('should execute static path', assert => {
  assert.plan(1)
  const fn = () => {}
  const handler = path({
    '/user': fn
  })
  const result = handler('/user')
  assert.equal(result.arg, fn)
})


test('should execute dynamic path', assert => {
  assert.plan(2)
  const fn = () => {}
  const handler = path({
    '/:type': fn
  })
  const result = handler('/user')
  assert.equal(result.arg, fn)
  assert.deepEqual(result.params, {
    type: 'user'
  })
})


test('should execute dynamic path with static root', assert => {
  assert.plan(2)
  const fn = () => {}
  const handler = path({
    '/user/:type': fn
  })
  const result = handler('/user/hello')
  assert.equal(result.arg, fn)
  assert.deepEqual(result.params, {
    type: 'hello'
  })
})


test('should pass params /:foo/bar', assert => {
  assert.plan(2)
  const fn = () => {}
  const handler = path({
    '/:foo/bar': fn
  })
  const result = handler('/hello/bar')
  assert.equal(result.arg, fn)
  assert.deepEqual(result.params, {
    foo: 'hello'
  })
})


test('should pass params /:foo/bar/:boop', assert => {
  assert.plan(2)
  const fn = () => {}
  const handler = path({
    '/:foo/bar/:boop': fn
  })
  const result = handler('/hello/bar/world')
  assert.equal(result.arg, fn)
  assert.deepEqual(result.params, {
    foo: 'hello',
    boop: 'world'
  })
})


test('should pass params /:foo/bar/:boop?', assert => {
  assert.plan(2)
  const fn = () => {}
  const handler = path({
    '/:foo/bar/:boop?': fn
  })
  const result = handler('/hello/bar')
  assert.equal(result.arg, fn)
  assert.deepEqual(result.params, {
    foo: 'hello'
  })
})


test('should pass params /:foo/bar/:boop*', assert => {
  assert.plan(2)
  const fn = () => {}
  const handler = path({
    '/:foo/bar/:boop*': fn
  })
  const result = handler('/hello/bar/world/beep')
  assert.equal(result.arg, fn)
  assert.deepEqual(result.params, {
    foo: 'hello',
    boop: ['world', 'beep']
  })
})


test('should pass params /:foo/bar/:boop+', assert => {
  assert.plan(2)
  const fn = () => {}
  const handler = path({
    '/:foo/bar/:boop+': fn
  })
  const result = handler('/hello/bar/world/beep')
  assert.equal(result.arg, fn)
  assert.deepEqual(result.params, {
    foo: 'hello',
    boop: ['world', 'beep']
  })
})


test('should trigger if url can not be decoded', assert => {
  assert.plan(1)
  const handler = path({
    '/:type': () => {}
  })
  try {
    handler('/%%')
  } catch (e) {
    assert.ok('error trigerred')
  }
})

test('should prefix routes', assert => {
  assert.plan(2)
  const fn = () => {}
  const handler = path({
    '/:type': fn
  }, '/user')
  const result = handler('/user/hello')
  assert.equal(result.arg, fn)
  assert.deepEqual(result.params, {
    type: 'hello'
  })
})
