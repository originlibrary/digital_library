import fetch from '../utils/fetch'

export const getBookStrap = () => {
    return fetch({
        url: '/Book/getBookStrap',
        method: 'post',
        data: {}
    })
}
