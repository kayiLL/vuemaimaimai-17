<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 无商品是展示 -->
                                <tr v-if="goodslist.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 有商品是展示 -->
                                <tr v-for="item in goodslist" :key="item.id">
                                    <td width="48" align="center">
                                            <el-switch
                                                v-model="item.isSelected"
                                                active-color="#409eff"
                                                inactive-color="#555555">
                                          </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo">
                                            <img style="width:50px;height:50px;margin-right: 10px;" :src="item.img_url" alt="">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <inputnumber :goodsId="item.id" :goodsCount="item.buycount" @goodsCountChange="getchangeGoods"></inputnumber>
                                    </td>
                                    <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                                    <td width="54" align="center">
                                        <a href="javascript:void(0)" @click="deleteGoodsId(item.id)">删除</a>
                                        </td>
                                </tr>
                                
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="continueBuy">继续购物</button>
                            <button class="submit" @click="goToOrder">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { getLocalGoodsObj } from "../../common/localStorageHelper.js";
import inputnumber from "../subcomponents/inputnumber"
export default {
  data() {
    return {
      goodslist: []
    };
  },
  // 注册子组件
    components:{
        inputnumber
    },
  computed: {
    //   计算总数量
    getTotalCount() {
      let totalCount = 0;
      this.goodslist.forEach(item => {
          if(item.isSelected){
            totalCount += item.buycount;
          }

      });
      return totalCount;
    },
    
    //   计算总金额
    getTotalAmount(){
        let totalAmount = 0
        this.goodslist.forEach(item=>{
            if(item.isSelected){
                totalAmount += item.buycount * item.sell_price
            }
        })
        return totalAmount
    }
  },
  created() {
    this.getGoodsListData();
  },
  methods: {
    getGoodsListData() {
      // 1.获取localStorage中的商品信息
      const localGoodsObj = getLocalGoodsObj();
      // console.log(localGoodsObj);
      // 2.定义一个临时数组
      const tempArray = [];
      for (const key in localGoodsObj) {
        tempArray.push(key);
        // console.log(tempArray);
      }
      // 准备url
      const url = `site/comment/getshopcargoods/${tempArray.join(",")}`;
      // 放axios请求获取数据
      this.axios.get(url).then(response => {
        // console.log(response.data);
        response.data.message.forEach(item => {
          item.buycount = localGoodsObj[item.id];
          item.isSelected = true
        });

        this.goodslist = response.data.message;

        console.log(this.goodslist);
      });
    },

    // 接受处理子组件传回来的信息
    getchangeGoods(goods){
        // console.log(goods);
        // 1.更改this.goodslist数组中的值
        this.goodslist.forEach(item=>{
            if(item.id== goods.goodsId){
                item.buycount = goods.count
            }
        })

        // 调用vuex的updataGoods方法
        this.$store.commit('updataGoods',goods)
        
    },
    // 删除商品
    deleteGoodsId(goodsId){
        // console.log(goodsId);
        this.$confirm('是非删除该商品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        //   成功后处理
            // 根据id操作找对应的index
            const index = this.goodslist.findIndex(item=>{
                return item.id == goodsId
            })
            // console.log(index);

            // 删除index对应的数据
            this.goodslist.splice(index,1)

            // 调用vuex中根据id删除商品的方法
            this.$store.commit('deleteGoodsById',goodsId)
            
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
    },
    
    //继续购物
     continueBuy(){
         this.$router.push({ path: '/site/goodslist' })

     },

    // 立即结算
    goToOrder(){
        const tempArray = []

        this.goodslist.forEach(item=>{
            if(item.isSelected){
                tempArray.push(item.id)
            }
        })

        if (tempArray.length == 0 ){
            this.$message({
                message:'至少选着一件商品',
                type:'warning'
            });
            return
        }

        // console.log(tempArray);

        //通过编程式导航跳转 
        this.$router.push({path:`/site/oder/${tempArray.join(',')}`})
        
        
    }
  }
};
</script>
