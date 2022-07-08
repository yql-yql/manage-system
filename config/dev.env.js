/*
 * @Date: 2022-06-22 16:49:00
 * @LastEditTime: 2022-06-22 16:49:00
 */
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
