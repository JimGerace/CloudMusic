import axios from 'axios'

export default function api(config){
    //创建axios实例
    const instance = axios.create({
        baseURL: '/api',
        timeout: 1000*60
    })

    //是否允许携带cookie
    instance.defaults.withCredentials = true

    //请求拦截器
    instance.interceptors.request.use(config => {
        return config
    }, error => {
        return Promise.reject(error)
    })

    //响应拦截器
    instance.interceptors.response.use(response => {
        return response
    }, error => {
        return Promise.reject(error)
    })

    //返回axios实例对象
    return instance(config)
}