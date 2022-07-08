/*
 * @Date: 2022-06-14 11:16:17
 * @LastEditTime: 2022-06-19 17:33:35
 */
import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home/index'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'user/index'
            },
            {
              path: '/business',
              name: 'business',
              label: '商铺管理',
              icon: 'video-play',
              url: 'business/index'
            },
            {
              path: '/goods',
              name: 'goods',
              label: '商品管理',
              icon: 'user',
              url: 'goods/index'
            },
            {
              path: '/order',
              name: 'order',
              label: '订单列表',
              icon: 'user',
              url: 'order/index'
            },
            {
              path: '/manager',
              name: 'manager',
              label: '管理员列表',
              icon: 'user',
              url: 'manager/index'
            },
            {
              path: '/edit',
              name: 'Edit',
              label: '编辑',
              icon: 'user',
              url: 'edit/index'
            },
            {
              label: '添加数据',
              icon: 'location',
              name:'add',
              path:'/add',
              children: [
                {
                  path: '/addBusiness',
                  name: 'addBusiness',
                  label: '添加商铺',
                  icon: 'setting',
                  url: 'add/addBusiness'
                },
                {
                  path: '/addGoods',
                  name: 'addGoods',
                  label: '添加商品',
                  icon: 'setting',
                  url: 'add/addGoods'
                },
              ]
            },
            {
              label: '其他',
              icon: 'location',
              name:'other',
              path:'/other',
              children: [
                {
                  path: '/description',
                  name: 'description',
                  label: '说明',
                  icon: 'setting',
                  url: 'other/description'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home/index'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'mall/index'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }
  }
}