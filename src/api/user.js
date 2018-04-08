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
