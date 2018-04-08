import fetch from '../utils/fetch'

export const login = data => {
    return fetch({
        url: '/user/login',
        method: 'post',
        data
    })
}

export const register = data => {
    return fetch({
        url: '/user/register',
        method: 'post',
        data
    })
}

export const checkAccountAvailable = data => {
    return fetch({
        url: '/user/accountIsAvailable',
        method: 'post',
        data
    })
}

export const getUserInfo = data => {
    return fetch({
        url: '/user/getUserInfo',
        method: 'post',
        data
    })
}

export const getUserList = data => {
    return fetch({
        url: '/user/getUserList',
        method: 'post',
        data
    })
}

export const setHighRole = data => {
    return fetch({
        url: '/user/setHighRole',
        method: 'post',
        data
    })
}

export const deleteUser = data => {
    return fetch({
        url: '/user/deleteUser',
        method: 'post',
        data
    })
}
