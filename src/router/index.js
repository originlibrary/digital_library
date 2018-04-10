import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Home from '../views/Home'
import Index from '../views/login'
import Login from '../views/login/Login'
import Register from '../views/login/Register'
import Hello from '../views/Hello'
import Book from '../views/book'
import BookStrap from '../views/book/bookstrap'
import Download from '../views/download'
import User from '../views/user'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Index,
            redirect: '/login',
            children : [{
                path : '/login',
                name: 'login',
                component : Login
            },{
                path : '/register',
                name: 'register',
                component : Register
            }]
        },
        {
            path: '/Home',
            name: 'Home',
            redirect: '/Hello',
            meta: { label: '首页' },
            component: Home,
            children: [
                {
                    path: '/Hello',
                    meta: { label: '欢迎', index: 0},
                    name: 'Hello',
                    component: Hello
                },
                {
                    path: '/Book',
                    meta: { label: '图书', index: 1},
                    name: 'Book',
                    redirect: '/BookStrap',
                    component: Book,
                    children: [
                        {
                            path: '/BookStrap',
                            meta: { label: '图书', index: 1},
                            name: 'BookStrap',
                            component: BookStrap
                        }
                    ]
                },
                {
                    path: '/Download',
                    meta: { label: '下载', index: 2},
                    name: 'Download',
                    component: Download
                },
                {
                    path: '/User',
                    meta: { label: '用户管理', index: 3},
                    name: 'User',
                    component: User
                }
            ]
        }
    ]
})

const whiteList = ['/login', '/register']
const isInWhiteList = path => {
    let res = whiteList.filter(p => p === path)
    return res.length !== 0
}

const setForward = (from, to, cb) => {
    if(typeof from.meta.index !== 'undefined' && typeof to.meta.index !== 'undefined') {
        const tag = from.meta.index < to.meta.index ? 'forward' : 'back'
        store.dispatch('SetBackOrForward', tag).then(() => {
            cb && cb()
        })
    }else {
        cb && cb()
    }
}

router.beforeEach((to, from, next) => {
    //开启跳转过度条
    // NProgress.start()

    //登录判断
    if(isInWhiteList(to.path)) {
        next()
    }else {
        let loginUserId = sessionStorage.getItem('loginUserId')
        if(store.getters.id == loginUserId) {
            setForward(from, to, () => {
                next()
            })
        }else {
            store.dispatch('GetUserInfo', loginUserId).then(() => {
                next()
            }).catch(() => {
                // NProgress.done()
                next('/login')
            })
        }
    }
})

router.afterEach((to, from) => {
    //关闭跳转过度条
    // NProgress.done()
})

export default router
