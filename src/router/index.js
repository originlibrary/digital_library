import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/login/index'
import Hello from '../views/Hello/index'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            redirect: '/Hello',
            component: Home,
            children: [
                {
                    path: '/Hello',
                    name: 'Hello',
                    component: Hello
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach((to, from) => {

})

export default router
