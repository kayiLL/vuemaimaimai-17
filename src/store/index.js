import Vue from 'vue'

// vuex 
import Vuex from 'vuex'
Vue.use(Vuex)


// 和vuex相关的
// 按需导入
import {
    addLocalGoods,
    updataLocalGoods,
    deleteLocalGoodsById,
    getTotalLocalCount
} from '../common/localStorageHelper'


const store = new Vuex.Store({
    state:{
        buyCount:0,//购买的总数量
    },
    getters:{
        getTotalGoodsCount(state){
            if(state.buyCount>0){//非第一次
                return state.buyCount
            }else{//第一次
                return getTotalLocalCount()
            }
        }
    },
    mutations:{
        // goods的格式如下 {goodsId:88,count:3}
        addGoods(state,goods){
            state.buyCount = addLocalGoods(goods)
        },
        // 修改商品数量
        updataGoods(state,goods){
            state.buyCount = updataLocalGoods(goods)
        },
        // 删除商品信息
        deleteGoodsById(state,goodsId){
            state.buyCount = deleteLocalGoodsById(goodsId)
        }
    }
})


export {store}