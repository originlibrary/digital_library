import fetch from '../utils/fetch'

export const getBookStrap = () => {
    return fetch({
        url: '/Book/getBookStrap',
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
