/**
 * Dependencies.
 */

const regexp = require('path-to-regexp')


/**
 * Create path router.
 *
 *
 * Example
 *
 *  ```js
 *  route()
 *  ```
 * @param {Object} obj
 * @return {Function}
 * @api public
 */

module.exports = function (obj, prefix = '') {
  const staticRoutes = {}
  const dynamicRoutes = []
  Object
    .keys(obj)
    .map(path => {
      const keys = []
      const url = path
      path = prefix + path
      const match = regexp(path, keys)
      if (!keys.length) staticRoutes[path] = obj[path]
      else {
        // const params = path.split('/')
        // const level = params.length - 1
        dynamicRoutes.push({
          re: match,
          fn: obj[url],
          keys: keys
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
        if (match) {
          const params = {}
          layer.keys.map((key, idx) => {
            let param = match[idx + 1]
            if (param) {
              param = decodeURIComponent(param)
              if (key.repeat) param = param.split(key.delimiter)
              params[key.name] = param

            }
          })
          layer.fn(params)
        }
      })
      // const level = url.split('/').length - 1
      // dynamicRoutes[level]()
    }
  }
}
