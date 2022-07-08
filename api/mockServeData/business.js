/*
 * @Date: 2022-06-17 20:06:05
 * @LastEditTime: 2022-06-18 15:06:38
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

//拓展mock方法
Mock.Random.extend({
  phone: function () {
    let phonePrefixs = ['132', '135', '189','186','152','188','134'] // 自己写前缀哈
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
  }
})

Mock.Random.extend({
  class:function(){
    let classes = {
      '异国料理':['日韩料理','西餐','披萨意面','东南亚菜'],
      '快餐便当':['简餐','盖浇饭','米粉面馆','包子粥店','香锅砂锅','麻辣烫','饺子馄饨','汉堡','生煎锅贴','黄焖鸡米饭','烧腊饭','煲仔饭','咖喱饭'],
      '小吃夜宵':['小龙虾','地方小吃','烧烤','炸鸡炸串','鸭脖卤味','零食'],
      '果蔬生鲜':['水果','生鲜','蔬菜','海鲜水产'],
      '特色菜系':['川湘菜','其他菜系','江浙菜','粤菜',' 海鲜','火锅烤鱼','东北菜','西北菜','云南菜','新疆菜','鲁菜'],
      '商品超市':['超市','便利店','名酒坊','零食饮料','水站','茶','奶站','粮油','美妆母婴'],
      '鲜花蛋糕':['鲜花','蛋糕','面包'],
      '甜品饮品':['奶茶果汁','甜品','咖啡'],
    }
    let classOne = this.pick(Object.keys(classes));
    let classTwo = this.pick(classes[classOne]);
    return (classOne.toString() + '/' + classTwo.toString());
  }
})

let List = [];
const count = 5689;
for(let i = 0;i<count;i++){
  List.push(
    Mock.mock({
      id:Mock.Random.id(),
      title:Mock.Random.ctitle(2,6), 
      description:Mock.Random.cword(10,20),
      addr:Mock.mock('@county(true)'),
      tel:Mock.Random.phone(),
      'score|3-4.0-9': 1,
      'total|100-999999':1,
      class:Mock.Random.class(),
    })
  )
}

List.map(item => {
  
  item.goods = Mock.mock({
    'goods-title': Mock.Random.ctitle(2,6),
    'title':item.title,
    'goods-id':Mock.Random.id(),
    'goods-price|1-200':1,
    'id':item.id,
    'goods-description':Mock.Random.cword(6,15),
    'addr':item.addr,
    'goods-score|3-4.0-9':0.1,
    'goods-class':Mock.Random.ctitle(2,5),
    'goods-total|100-9999':1
  })
})
export default {
  /**
   * 获取列表
   * 要带参数name, page, limit;name可以为空，page，limit有默认值
   * @param name,page,limit
   * @return {{code:number, count:number, data: *[]}}
   */

  getBusinessList: config => {
    const {title, page=1, limit = 20, total} = param2obj(config.url);
    // console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit,'total:' + total);
    //去掉不规范数据
    const mockList = List.filter(user => {
      if (title && user.name.indexOf(title) === -1 && user.addr.indexOf(title) === -1) return false;
      return true;
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    // console.log(pageList)
    const goodsList = [];
    pageList.map(item => {
      goodsList.push(item.goods);
    });
    console.log(pageList);
    console.log('商品',goodsList)
    return {
      code:20000,
      count:mockList.length,
      list:pageList,
      goodsList:goodsList
    }
  },

/**
 * 增加商家
 * 
 */

  createBusiness:config => {
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
   * 删除商家
   */
  deleteBusiness: config => {
    const id = JSON.parse(config.body).params.id;
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
   * 修改商家数据
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