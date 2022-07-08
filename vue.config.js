/*
 * @Date: 2022-06-24 22:39:33
 * @LastEditTime: 2022-06-24 22:44:49
 */
//代理服务器进行跨域
module.exports = {
  devServer:{
    //本地地址
    host:'localhost',
    port:8080,
    proxy:{
      //"/api"会拦截以/api开头的接口，转而向目标地址发送请求
      '/api':{
        target:'https://elm.cangdu.org',
        changeOrigin:true//是否开启跨域
      }
    }
  }
}