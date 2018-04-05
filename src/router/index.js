import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login/index.vue'
import HelloWorld from '../components/HelloWorld.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            redirect: '/helloWorld',
            component: Home,
            children: [
                {
                    path: '/helloWorld',
                    name: 'helloWorld',
                    component: HelloWorld
                },
                {
                    path: '/login',
                    name: 'login',
                    component: Login
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach((to, from) => {

})

export default router
