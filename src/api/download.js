import fetch from '../utils/fetch'

export const getMyDownload = data => {
    return fetch({
        url: '/Download/getMyDownload',
        method: 'post',
        data
    })
}
export const setScore = data => {
    return fetch({
        url: '/Download/setScore',
        method: 'post',
        data
    })
}
