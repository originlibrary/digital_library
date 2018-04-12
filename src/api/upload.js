import fetch from '../utils/fetch'

/**
 * 上传文件
 * @param data
 * @returns {AxiosPromise<any>}
 */
export const upload = (data) => {
    return fetch({
        url: '/File/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

export const download = url => {
    fetch({
        url: url,
        method: 'get'
    })
}
