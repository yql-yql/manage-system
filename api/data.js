/*
 * @Date: 2022-06-09 14:27:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-16 15:19:57
 * @Description: 请填写简介
 */
import axios from './axios.js'
export const getMenu = (param) => {
  return axios.request({
    url:'/permission/getMenu',
    method:'post',
    data:param
  })
}
export const getData = () => {
  return axios.request({
    url:'/home/getData',
    method:'post'
  })
}
export const getUser = (params) => {
  return axios.request({
    url:'/user/getUser',
    method:'get',
    params
  })
}