/*
 * @Date: 2022-06-22 15:23:01
 * @LastEditTime: 2022-06-30 20:31:37
 */
//使用真实接口
import axios from './axios.js'

/**
 * 登陆
 */
//post建议用data来接收参数
export const login = param => {
  return axios.request({
    url:'/admin/login',
    method:'post',
    data:param,
  })
}

/**
 * 退出
 */

export const signout = () => {
  return axios.request({
    url:'/admin/signout',
    method:'get',
  })
}
/**
 * 获取管理员信息
 */

export const getAdminInfo = () => {
  return axios.request({
    url:'/admin/info',
    method:'get',
  })
  
}

/**
 * api请求量
 */

export const apiCount = param => 
{
  return axios.request({
    url:"'/statis/api/' + param + '/count'",
    method:'get',
    param,
  })
}

/**
 * 所有api请求量
 */

export const apiAllCount = () => {
  return axios.request({
    url:'/statis/api/count',
    method:'get'
  })
}


/**
 * 所有api请求信息
 */

export const apiAllRecord = () => {
  return axios.request({
    url:'/statis/api/all',
    method:'get'
  })
}

/**
 * 用户注册量
 */

export const userCount = param => 
{
  return axios.request({
    url:'/statis/user/' + param + '/count',
    method:'get',
  })
}
/**
 * 某一天订单数量
 */

export const orderCount = param =>{
  return axios.request({
    url:'/statis/order/' + param + '/count',
    method:'get',
    param,
  })
}


/**
 * 某一天管理员注册量
 */

export const adminDayCount = param =>{
  return axios.request({
    url:'/statis/admin/' + param + '/count',
    method:'get',
    param,
  })
}
/**
 * 管理员列表
 */

export const adminList = params => {
  return axios.request({
    url:'/admin/all',
    params,
    method:'get'
  })
}

/**
 * 管理员数量
 */

export const adminCount = () => {
  return axios.request({
    url:'/admin/count',
    method:'get'
  })
}

/**
 * 获取定位城市
 */

export const cityGuess = () => {
  return axios.request({
    url:"/v1/cities",
    method:'get',
    params:{
      type:'guess'
    }
  })
}


/**
 * 添加商铺
 */

export const addShop = params => {
  return axios.request({
    url:'/shopping/addShop',
    method:'post',
    data:params
  })
}


/**
 * 获取搜索地址
 */

export const searchplace = params => {
  return axios.request({
    url:'/v1/pois',
    method:'get',
    params
  })
}


/**
 * 获取当前店铺食品种类
 */

export const getCategory =param => {
  return axios.request({
    url:'/shopping/getcategory/' + param,
    method:'get',
  })
}

/**
 * 添加食品种类
 */

export const addCategory = params => {
  return axios.request({
    url:'/shopping/addcategory',
    method:'post',
    data:params,
  })
}


/**
 * 添加食品
 */

export const addFood = params => {
  return axios.request({
    url:'/shopping/addfood',
    method:'post',
    data:params,
  })
}


/**
 * category 种类列表
 */

export const foodCategory = params => {
  return axios.request({
    url:'/shopping/v2/restaurant/category',
    method:"get",
    params
  })
}
/**
 * 获取餐馆列表
 */

export const getResturants = params => {
  return axios.request({
    url:'/shopping/restaurants',
    method:'get',
    params
  })
}


/**
 * 获取餐馆详细信息
 */

export const getResturantDetail = param => {
  return axios.request({
    url:'/shopping/restaurant/' + param,
    method:'get',
    param
  })
}

/**
 * 获取餐馆数量
 */

export const getResturantsCount = () => {
  return axios.request({
    url:'/shopping/restaurants/count',
    method:'get',
  })
}

/**
 * 更新餐馆信息
 */

export const updateResturant = params => {
  return axios.request({
    url:'/shopping/updateshop',
    method:'post',
    data:params
  })
}

/**
 * 删除餐馆
 */

export const deleteResturant = param => {
  return axios.request({
    url:'/shopping/restaurant/' + param,
    method:'Delete',
    param
  })
}

/**
 * 获取食品列表
 */

export const getFoods = params => {
  return axios.request({
    url:'/shopping/v2/foods',
    method:'get',
    params
  })
}

/**
 * 获取食品数量
 */

export const getFoodsCount = params => {
  return axios.request({
    url:'/shopping/v2/foods/count',
    method:'get',
    params
  })
}


/**
 * 获取menu列表
 */

export const getMenu = params => {
  return axios.request({
    url:'/shopping/v2/menu',
    method:'get',
    params
  })
}
/**
 * 获取menu详情
 */

export const getMenuById = param => {
  return axios.request({
    url:'/shopping/v2/menu/' + param,
    method:'get',
    param
  })
}
/**
 * 更新食品信息
 */

export const updateFood = params => {
  return axios.request({
    url:'/shopping/v2/updatefood',
    method:'post',
    params
  })
}

/**
 * 删除食品
 */

export const deleteFood = param => {
  return axios.request({
    url:'/shopping/v2/food/' + param,
    method:'delete',
    param
  })
}
/**
 * 获取用户列表
 */

export const getUserList = params => {
  return axios.request({
    url:'/v1/users/list',
    params,
    method:'get',
  })
}
/**
 * 获取用户数量
 */

export const getUserCount = () => {
  return axios.request({
    url:'/v1/users/count',
    method:'get',
  })
}

/**
 * 获取订单列表
 */

export const getOrderList = params => {
  return axios.request({
    url:'/bos/orders',
    method:'get',
    params
  })
}

/**
 * 获取订单数量
 */

export const getOrderCount = params => {
  return axios.request({
    url:'/bos/orders/count',
    method:'get',
    params
  })
}

/**
 * 获取用户信息
 */

export const getUserInfo = param => {
  return axios.request({
    url:'/v1/user/' + param,
    method:'get',
    param
  })
}

/**
 * 获取地址信息
 */

export const getAddressById = param => {
  return axios.request({
    url:'/v1/addresse/' + param,
    method:'get',
    param
  })
}

/**
 * 获取用户分布信息
 */

export const getUserCity = () => {
  return axios.request({
    url:'/v1/user/city/count',
    method:'get',
  })
}
