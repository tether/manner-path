/**
 * Dependencies.
 */

const regexp = require('path-to-regexp')


/**
 * This is a simple description.
 *
 * @api public
 */

module.exports = function (obj) {
  const routes = {}
  const keys = []
  Object
    .keys(obj)
    .map(path => {
      const keys = []
      regexp(path, keys)
      if (!keys.length) {
        routes[path] = obj[path]
      }
      console.log(regexp(path, keys))
    })
  return (url) => {
    routes[url]()
  }
}
