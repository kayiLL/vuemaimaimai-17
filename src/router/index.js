import Vue from 'vue' //相当于Node中 var Vue = require('vue')
import VueRouter from 'vue-router'
//使用基于Vue的中间件
Vue.use(VueRouter)

import axios from 'axios'
axios.defaults.baseURL = 'http://47.106.148.205:8899'
axios.defaults.withCredentials = true
Vue.prototype.axios = axios


// 导入路由
//导入定义好的组件
// import goodslist from "../components/goods/goodslist.vue"
// import goodsinfo from "../components/goods/goodsinfo.vue"
// import shopcart from "../components/shopcart/shopcart.vue"
// import order from "../components/order/order.vue"
// import login from  "../components/account/login.vue"
// import payOrder from "../components/pay/payOrder.vue"
// import paySuccess from "../components/pay/paySuccess.vue"
// import vipCenter from "../components/vip/vipCenter.vue"
// import myOrderList from "../components/vip/myOrderList.vue"
// import myOrderOne from "../components/vip/myOrderOne.vue"

const goodslist = () => import("../components/goods/goodslist")
const shopcart = () => import("../components/shopcart/shopcart")
const goodsinfo = () => import("../components/goods/goodsinfo")
const order = () => import("../components/order/order")
const login = () => import("../components/account/login")
const payOrder = () => import("../components/pay/payOrder")
const paySuccess = () => import("../components/pay/paySuccess.vue")
const vipCenter = () => import("../components/vip/vipCenter.vue")
const myOrderList = () => import("../components/vip/myOrderList.vue")
const myOrderOne = () => import("../components/vip/myOrderOne.vue")

const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/site/goodslist'},
        {path:'/site/goodslist',component:goodslist},
        {path:'/site/goodsinfo/:goodsId',component:goodsinfo},
        {path:'/site/shopcart',component:shopcart},
        {path:'/site/oder/:ids',component:order,meta:{needLogin:true}},
        {path:'/site/login',component:login},
        {path:'/site/payOrder/:orderId',component:payOrder,meta:{needLogin:true}},
        {path:'/site/paySuccess',component:paySuccess,meta:{needLogin:true}},
        {path:'/site/vipCenter',component:vipCenter,meta:{needLogin:true}},
        {path:'/site/vipCenter/myOrderList',component:myOrderList,meta:{needLogin:true}},
        {path:'/site/vipCenter/myOrderOne/:orderId',component:myOrderOne,meta:{needLogin:true}},
    ]
})

/**
 * 这个导航守卫的方法,可以拦截到所有的路由跳转
 * 接下来就可以进行判断
 * 如果是不要权限的路劲,直接放过 next()
 * 如果需要权限的路劲,先判断是否登录过,如果登录过 next(),如果没有登录就跳转到登录
**/ 
router.beforeEach((to, from, next) => {
    if(to.path!='/site/login'){//你登陆之后要跳转到的组件
        localStorage.setItem('lastVisitPath',to.path)
    }

    if(to.meta.needLogin){//需要先判断是否登录的路径
        //使用axios发送请求，如果有登陆，直接过，没有登录，去登录页面
        axios.get('site/account/islogin').then(response=>{
            if(response.data.code == 'nologin'){//未登录
                router.push({path:'/site/login'})
            }else{
                next()
            }
        })
    }else{
        next()
    }
})

export default router