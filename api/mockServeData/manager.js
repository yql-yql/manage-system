/*
 * @Date: 2022-06-19 15:40:52
 * @LastEditTime: 2022-06-19 16:09:27
 */
import Mock from 'mockjs'

//get请求从config.url获取参数,post从config.body中获取参数

function param2obj(url) {
  const search = url.split('?')[1];
  console.log(search)
  if(!search){
    return {};
  }
  console.log(JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
    '"}'
  ))
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
    '"}'
  )
}

let List = [];
const count = 100;
for(let i = 0;i<count;i++){
  List.push(
    Mock.mock({
      id:Mock.Random.guid(),
      index:Mock.mock('@increment(1)'), 
      name:Mock.Random.cname(2,3),
      addr:Mock.mock('@city'),
      registDate:Mock.Random.datetime(),
      authority:'管理员'
    })
  )
}
export default {
  /**
   * 获取列表
   * 要带参数name, page, limit;name可以为空，page，limit有默认值
   * @param name,page,limit
   * @return {{code:number, count:number, data: *[]}}
   */

  getManagerList: config => {
    const {name, page=1, limit = 20, total} = param2obj(config.url);
    console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit,'total:' + total);
    //去掉不规范数据
    const mockList = List.filter(user => {
      if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false;
      return true;
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    // console.log(pageList)
    // pageList.map(item => {
    //   // item.add('age',getAge(item.birth))
    //   item.age = getAge(item.birth);
    // })
    console.log(pageList);
    return {
      code:20000,
      count:mockList.length,
      list:pageList
    }
  }
  }
