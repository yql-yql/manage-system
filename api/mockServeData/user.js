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

//计算年龄

function getAge(birthday)
{
  //出生时间 毫秒
  let birthDayTime = new Date(birthday).getTime(); 
  //当前时间 毫秒
  let nowTime = new Date().getTime(); 
  //一年毫秒数(365 * 86400000 = 31536000000)
  return Math.ceil((nowTime-birthDayTime)/31536000000);
}
let List = [];
const count = 200;
for(let i = 0;i<count;i++){
  List.push(
    Mock.mock({
      id:Mock.Random.guid(),
      name:Mock.Random.cname(),
      addr:Mock.mock('@county(true)'),
      // 'age|18-60':1,
      birth:Mock.Random.date(),
      // age:getAge(),
      sex:Mock.Random.integer(0, 1)
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

  getUserList: config => {
    const {name, page=1, limit = 20, total} = param2obj(config.url);
    console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit,'total:' + total);
    //去掉不规范数据
    const mockList = List.filter(user => {
      if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false;
      return true;
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    // console.log(pageList)
    pageList.map(item => {
      // item.add('age',getAge(item.birth))
      item.age = getAge(item.birth);
    })
    return {
      code:20000,
      count:mockList.length,
      list:pageList
    }
  },

/**
 * 增加用户
 * 
 */

  createUser:config => {
    const {name, addr, age, birth, sex} = JSON.parse(config.body);
    // console.log(JSON.parse(config.body));
    List.unshift({
      id:Mock.Random.guid(),
      name:name,
      addr:addr,
      age:age,
      birth:birth,
      sex:sex
    });
    return {
      code:20000,
      data:{
        message:'添加成功'
      }
    }
  },
  /**
   * 删除用户
   */
  deleteUser: config => {
    // const {id} = param2obj(config.url)
    const id = JSON.parse(config.body).params.id;
    // console.log(param2obj(config.url))
    // console.log("id", id)
    // const id = config.id;
    if(!id){
      return {
        code:999,
        message:'参数不正确'
      }
    }else{
      List = List.filter(u => u.id != id);
      return {
        code:20000,
        message:'删除成功！'
      }
    }
  },

  /**
   * 批量删除
   * 
   */

  batchremove: config => {
    let {ids} = param2obj(config.url);
    ids = ids.split(',');
    List = List.filter( u => !ids.includes(u.id));
    return {
      code:20000,
      data:{
        message:"成功删除" + ids.length + "条用户数据！"
      }
    }
  },

  /**
   * 修改用户数据
   */

  updateUser: config => {
    const {name, addr, age, birth, sex} = JSON.parse(config.body);
    const sex_num = parseInt(sex);
    List.some(u => {
      u.name = name;
      u.addr = addr;
      u.age = age;
      u.birth = birth;
      u.sex = sex_num;
      return true;
    });
    return {
      code:20000,
      data:{
        message:'编辑成功！'
      }
    }
  }
}