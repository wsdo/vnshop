import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import GoodsList from '@/view/GoodsList'
import User from '@/view/user/index'
import Cart from '@/view/cart'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'GoodsList',
            component: GoodsList
        },
        {
            path: '/cart', //?代表可写，也可以不写 /user/1
            component: Cart
        },
        {
            path: '/user/:stark?/:xiaorong?', //?代表可写，也可以不写 /user/1
            component: User
        },
    ]
})