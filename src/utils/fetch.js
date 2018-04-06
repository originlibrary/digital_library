import axios from 'axios'

const service = axios.create({
    baseURL: '/api',
    timeout: 10000
})

service.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json'

    return config
})


service.interceptors.response.use(response => {
    const result = response.data
    if(result.code === 200) {
        return Promise.resolve(result.data);
    }else {
        return Promise.reject(result.msg);
    }
}, error => {
    return Promise.reject(error);
})

export default service
