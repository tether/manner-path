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
      if (!keys.length) {
        staticRoutes[normalize(path)] = obj[path]
      } else {
        dynamicRoutes.push({
          re: match,
          fn: obj[url],
          keys: keys
        })
      }
    })
  return (url) => {
    let handler = staticRoutes[normalize(url)]
    if (handler) {
      return {
        arg: handler
      }
    } else {
     for (var i = 0, l = dynamicRoutes.length; i < l; i++) {
       const layer = dynamicRoutes[i]
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
         return {
           arg: layer.fn,
           params: params
         }
         break
       }
     }
    }
  }
}


/**
 * Normalize path name.
 *
 * @param {String} pathname
 * @return {String}
 * @api private
 */

function normalize (pathname) {
  let suffix = pathname.substr(-1) !== '/' ? '/' : ''
  return pathname + suffix
}
