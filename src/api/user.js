import fetch from '../utils/fetch'

export const login = data => {
    return fetch({
        url: '/user/login',
        method: 'post',
        data
    })
}

export const register = para => {
    return new Promise((resolve, reject) => {
        if(!para) {
            reject()
        }else {
            setTimeout(() => {
                resolve(1)
            }, 1000)
        }
    })
}

export const getUserInfo = para => {
    return new Promise((resolve, reject) => {
        if(!para) {
            reject()
        }else {
            setTimeout(() => {
                resolve({
                    id: para.id,
                    account: 'admin',
                    name: 'admin',
                    role: '1'
                })
            }, 1000)
        }
    })
}
