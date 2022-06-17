import axios from 'axios'
import config from '../config'

//对axios进行二次封装
//创建时先判断运行环境
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;

class HttpRequest {
  constructor(baseUrl){
    this.baseUrl = baseUrl;
  }
  //定义axios的相关配置
  getInsideConfig(){
    const config = {
      baseUrl:this.baseUrl,
      //请求头的信息
      header:{}
    }
    return config;
  }
  //拦截器函数
  //instance是axios的一个实例
  interceptors(instance){
    //添加请求拦截器
    instance.interceptors.request.use(config => {
      //在发送请求之前做些什么
      return config;
    },
    error => {
      //对错误请求做些什么
      return Promise.reject(error);
    });
    instance.interceptors.response.use(
      response => {
        //对响应数据做些什么
        console.log(response);
        return response;
      },
      error => {
        //对响应错误做些什么
        console.log(error)
        return Promise.reject(error);
      }
    )
  }
  request(options){
    const instance = axios.create();
    options = {...this.getInsideConfig(), ...options}
    this.interceptors(instance);
    return instance(options)
  }
}
export default new HttpRequest(baseUrl)