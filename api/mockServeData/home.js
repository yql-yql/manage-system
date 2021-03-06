//mock数据模拟
import Mock from 'mockjs'
//图表数据
let List = [];
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生100-1000的随机数，保留小数
    for(let i = 0; i<10;i++){
      List.push(
        Mock.mock({
          oppo:Mock.Random.float(100,1000,0,0),
          vivo:Mock.Random.float(100,1000,0,0),
          apple:Mock.Random.float(100,1000,0,0),
          华为:Mock.Random.float(100,1000,0,0),
          小米:Mock.Random.float(100,1000,0,0),
          三星:Mock.Random.float(100,1000,0,0),
          一加:Mock.Random.float(100,1000,0,0),
          荣耀:Mock.Random.float(100,1000,0,0)
        })
      )
    }
    return {
      code:20000,
      data:{
        //饼图
        videoData:[
          {
            name:'oppo',
            value:2999
          },
          {
            name:'vivo',
            value:2654
          },
          {
            name:'apple',
            value:5999
          },
          {
            name:'华为',
            value:4999
          },
          {
            name:'小米',
            value:2399
          },
          {
            name:'三星',
            value:4399
          },
          {
            name:'一加',
            value:3999
          },
          {
            name:'荣耀',
            value:1999
          }
        ],
        orderData:{
          data:[
            {
              oppo:1654,
              vivo:6542,
              apple:5643,
              华为:8674,
              小米:4564,
              三星:6543,
              一加:6544,
              荣耀:6543
            },
            {
              oppo:8643,
              vivo:3456,
              apple:3211,
              华为:6853,
              小米:9864,
              三星:8654,
              一加:5454,
              荣耀:2123
            },
            {
              oppo:8468,
              vivo:3213,
              apple:5125,
              华为:6212,
              小米:9245,
              三星:8542,
              一加:5784,
              荣耀:2456
            },
            {
              oppo:5689,
              vivo:5546,
              apple:5646,
              华为:3445,
              小米:2154,
              三星:2154,
              一加:1555,
              荣耀:2666
            },
            {
              oppo:6451,
              vivo:6561,
              apple:5656,
              华为:3445,
              小米:2556,
              三星:9523,
              一加:6541,
              荣耀:3265
            },
            {
              oppo:6541,
              vivo:1234,
              apple:4569,
              华为:3984,
              小米:3564,
              三星:4567,
              一加:8564,
              荣耀:1236
            },
            {
              oppo:1624,
              vivo:1234,
              apple:4568,
              华为:6874,
              小米:6543,
              三星:9743,
              一加:8756,
              荣耀:6562
            },
            {
              oppo:6520,
              vivo:5546,
              apple:5656,
              华为:6545,
              小米:2354,
              三星:4554,
              一加:3655,
              荣耀:4566
            }
          ],
          date:['20191001','20191002','20191003','20191004','20191005','20191006','20191007']
        },
        userData:[
          {
            date:'周一',
            new:5,
            activate:200
          },
          {
            date:'周二',
            new:10,
            activate:500
          },
          {
            date:'周三',
            new:12,
            activate:550
          },
          {
            date:'周四',
            new:60,
            activate:800
          },
          {
            date:'周五',
            new:65,
            activate:550
          },
          {
            date:'周六',
            new:53,
            activate:770
          },
          {
            date:'周日',
            new:33,
            activate:170
          },
      ],
        tableData:[
          {
            name:'oppo',
            todayBuy:100,
            monthBuy:300,
            totalBuy:400
          },
          {
            name:'vivo',
            todayBuy:100,
            monthBuy:300,
            totalBuy:600
          },
          {
            name:'apple',
            todayBuy:100,
            monthBuy:300,
            totalBuy:500
          },
          {
            name:'华为',
            todayBuy:100,
            monthBuy:300,
            totalBuy:600
          },
          {
            name:'小米',
            todayBuy:100,
            monthBuy:300,
            totalBuy:400
          },
          {
            name:'三星',
            todayBuy:100,
            monthBuy:300,
            totalBuy:500
          },
          {
            name:'一加',
            todayBuy:100,
            monthBuy:300,
            totalBuy:400
          },
          {
            name:'荣耀',
            todayBuy:100,
            monthBuy:300,
            totalBuy:700
          }
        ]
      }
    }
  }
}