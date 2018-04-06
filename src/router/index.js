import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Home from '../views/Home'
import Login from '../views/login'
import Hello from '../views/Hello'
import Book from '../views/book'
import Download from '../views/download'
import User from '../views/user'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            redirect: '/Hello',
            meta: { label: '首页' },
            component: Home,
            children: [
                {
                    path: '/Hello',
                    meta: { label: '欢迎' },
                    name: 'Hello',
                    component: Hello
                },
                {
                    path: '/Book',
                    meta: { label: '图书' },
                    name: 'Book',
                    component: Book
                },
                {
                    path: '/Download',
                    meta: { label: '下载' },
                    name: 'Download',
                    component: Download
                },
                {
                    path: '/User',
                    meta: { label: '用户管理' },
                    name: 'User',
                    component: User
                }
            ]
        },
        {
            path: '/Login',
            meta: { label: '登录' },
            name: 'Login',
            component: Login
        }
    ]
})

router.beforeEach((to, from, next) => {
    NProgress.start();
    console.log(to)
    if(to.name !== 'Login') {
        if(!store.getters.id || !store.getters.name || !store.getters.role) {
            // next({
            //     name: 'Login'
            // })
            next()
        }
    }else {
        next()
    }
})

router.afterEach((to, from) => {
    NProgress.done();
})

export default router
