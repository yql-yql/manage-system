/*
 * @Date: 2022-06-17 16:17:22
 * @LastEditTime: 2022-06-19 16:09:56
 */

import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'
import businessApi from './mockServeData/business'
import managerApi from './mockServeData/manager'
Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock(/user\/add/, 'post',userApi.createUser)
Mock.mock(/user\/edit/, 'post',userApi.updateUser)
Mock.mock(/user\/getUser/, 'get',userApi.getUserList)
Mock.mock(/user\/del/, 'post',userApi.deleteUser)
Mock.mock(/permission\/getMenu/, 'post',permissionApi.getMenu)
Mock.mock(/business\/getBusiness/, 'get',businessApi.getBusinessList)
Mock.mock(/business\/del/, 'post',businessApi.deleteBusiness)
Mock.mock(/manager\/getManager/,managerApi.getManagerList)