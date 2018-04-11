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

export const getAllTypes = () => {
    return fetch({
        url: '/BookType/getAllTypes',
        method: 'post',
        data: {}
    })
}

export const deleteType = data => {
    return fetch({
        url: '/BookType/deleteType',
        method: 'post',
        data
    })
}

export const addType = data => {
    return fetch({
        url: '/BookType/addType',
        method: 'post',
        data
    })
}

export const updateType = data => {
    return fetch({
        url: '/BookType/updateType',
        method: 'post',
        data
    })
}

export const getBookByType = data => {
    return fetch({
        url: '/Book/getBookByType',
        method: 'post',
        data
    })
}

export const deleteBook = data => {
    return fetch({
        url: '/Book/deleteBook',
        method: 'post',
        data
    })
}

export const uploadBook = data => {
    return fetch({
        url: '/Book/uploadBook',
        method: 'post',
        data
    })
}

export const updateBook = data => {
    return fetch({
        url: '/Book/updateBook',
        method: 'post',
        data
    })
}

export const getBookDetailsById = data => {
    return fetch({
        url: '/Book/getBookDetailsById',
        method: 'post',
        data
    })
}

export const getTopFiveByType = data => {
    return fetch({
        url: '/Book/getTopFiveByType',
        method: 'post',
        data
    })
}
