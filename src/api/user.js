import fetch from '../utils/fetch'

export const login = para => {
    return new Promise((resolve, reject) => {
        if(!para) {
            reject()
        }else {
            setTimeout(() => {
                resolve({
                    id: '1232',
                    account: para.account,
                    name: 'admin',
                    role: '1'
                })
            }, 1000)
        }
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
