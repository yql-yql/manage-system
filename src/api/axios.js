/*
 * @Date: 2022-06-22 15:58:12
 * @LastEditTime: 2022-07-01 22:11:06
 */
/*
 * @Date: 2022-06-17 16:17:22
 * @LastEditTime: 2022-06-22 15:37:41
 */
import axios from 'axios'
// import {baseUrl, baseImgPath} from '../config/env'

//对axios进行二次封装
//创建时先判断运行环境
// const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;
const baseUrl = 'https://elm.cangdu.org';
// const baseUrl = '/api'
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "没有访问权限",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  405: "请求行中指定的请求方法不能被用于请求相应的资源。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

class HttpRequest {
  constructor(baseUrl){
    this.baseUrl = baseUrl;
    
  }
  //定义axios的相关配置
  getInsideConfig(){
    const config = {
      baseUrl:this.baseUrl,
      //请求头的信息
      header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    }
    return config;
  }
  //拦截器函数
  //instance是axios的一个实例
  interceptors(instance){
    //添加请求拦截器
    instance.interceptors.request.use(config => {
      //在发送请求之前做些什么
      config.url = config.baseUrl + config.url;
      return config;
    },
    error => {
      //对错误请求做些什么
      return Promise.reject(error);
    });
    instance.interceptors.response.use(
      response => {
        //对响应数据做些什么
        // console.log('响应的数据：')
        // console.log(response);
        return response;
      },
      error => {
        //对响应错误做些什么
        console.log('响应错误！')
        console.log(error)
        return Promise.reject(error);
      }
    )
  }
  request(options){
    const instance = axios.create();
    options = {...this.getInsideConfig(), ...options}
    console.log('options',options);
    this.interceptors(instance);
    return instance(options)
  }
}
export default new HttpRequest(baseUrl)