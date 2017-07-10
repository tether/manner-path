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
  const staticRoutes = {}
  const dynamicRoutes = {}
  Object
    .keys(obj)
    .map(path => {
      const keys = []
      regexp(path, keys)
      if (!keys.length) staticRoutes[path] = obj[path]
      else {
        const level = path.split('/').length - 1
        dynamicRoutes[level] = obj[path]
        console.log(level, keys)
      }
    })
  return (url) => {
    let handler = staticRoutes[url]
    if (handler) handler()
    else {
      const level = url.split('/').length - 1
      dynamicRoutes[level]()
    }
  }
}
