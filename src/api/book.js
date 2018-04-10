import fetch from '../utils/fetch'

export const getBookStrap = () => {
    return fetch({
        url: '/Book/getBookStrap',
        method: 'post',
        data: {}
    })
}

export const getDownloadTopFive = () => {
    return fetch({
        url: '/Book/getDownloadTopFive',
        method: 'post',
        data: {}
    })
}

export const getScoreTopFive = () => {
    return fetch({
        url: '/Book/getScoreTopFive',
        method: 'post',
        data: {}
    })
}

export const getRecommendTop = () => {
    return fetch({
        url: '/Book/getRecommendTop',
        method: 'post',
        data: {}
    })
}
