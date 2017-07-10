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
  const dynamicRoutes = []
  Object
    .keys(obj)
    .map(path => {
      const keys = []
      const match = regexp(path, keys)
      if (!keys.length) staticRoutes[path] = obj[path]
      else {
        // const params = path.split('/')
        // const level = params.length - 1
        dynamicRoutes.push({
          re: match,
          fn: obj[path]
        })
        // if (level > keys.length) {
        //   console.log('whaaaat')
        //   console.log('params', params)
        // } else dynamicRoutes[level] = obj[path]
        // console.log(level, keys.length, keys)
      }
    })
  return (url) => {
    let handler = staticRoutes[url]
    if (handler) handler()
    else {
      dynamicRoutes.map(layer => {
        const match = layer.re.exec(url)
        if (match) layer.fn()
      })
      // const level = url.split('/').length - 1
      // dynamicRoutes[level]()
    }
  }
}
