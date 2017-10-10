import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import GoodsList from '@/view/GoodsList'
import User from '@/view/user/index'
import Cart from '@/view/Cart'
import Address from '@/view/Address'
import OrderConfirm from '@/view/OrderConfirm'
import OrderSuccess from '@/view/OrderSuccess'

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
            path: '/address',
            component: Address
        },
        {
            path: '/orderConfirm',
            component: OrderConfirm
        },
        {
            path: '/orderSuccess',
            component: OrderSuccess
        },
        {
            path: '/user/:stark?/:xiaorong?', //?代表可写，也可以不写 /user/1
            component: User
        },
    ]
})