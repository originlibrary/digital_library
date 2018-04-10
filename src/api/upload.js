import axios from 'axios'

const config = callback => ({
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    onUploadProgress: progressEvent => {
        let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
        console.log('fuck', percentCompleted)
        callback(percentCompleted)
    }
})

/**
 * 上传文件
 * @param data
 * @param callback 上传进度回调
 * @returns {AxiosPromise<any>}
 */
export const upload = (data, callback) => {
    return axios.post('/api/upload', data, config(callback))
}
