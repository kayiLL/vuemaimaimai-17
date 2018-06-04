/**
 * 导入App.vue 并且利用Vue框架把App.vue中内容渲染出来
 */
import Vue from 'vue' //相当于Node中 var Vue = require('vue')

import moment from "moment"

//导入App.vue
import App from './App.vue'

// 导入全局样式
import "./statics/site/css/style.css"




//elementUi
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

import {
    Button,
    Pagination,
    Input,
    InputNumber,
    Switch,
    Form,
    FormItem,
    Radio,
    RadioGroup,
    MessageBox,
    Message,
    Carousel,
    CarouselItem,
    Row,
    Col
} from 'element-ui'

Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm



// 懒加载
import VueLazyload from 'vue-lazyload'
const path = require('path')
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    // loading: path.join(__dirname,'src/statics/site/images/01.gif'),
    loading:require('../src/statics/site/images/01.gif'),
    attempt: 1
  })


  //定义全局过滤器
  Vue.filter('dateFmt',(input,formatStr="YYYY-MM-DD")=>{
    //   const lastFormatStr = formatStr || "YYYY-MM-DD";
      return moment(input).format(formatStr)

  })



// 导入路由
import router from "./router/index"

//导入vuex
import {store} from "./store/index"

new Vue({
    el:"#app",
    //参考:https://cn.vuejs.org/v2/guide/render-function.html
    render:function(createElement){
        return createElement(App)
    },
    router,
    store
})

