<template>
    <div>
        <div class="section">
            <div class="location">
                    <span>当前位置：</span>
                    <a href="/index.html">首页</a> &gt;
                    <a href="/cart.html">购物车</a>
                </div>
        </div>
        <!-- 订单信息 -->
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
                                <li class="active">
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
                    <div class="cart-box">

                        <el-form :model="orderInfo" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" label="right" status-icon>
                                <h2 class="slide-tit">
                                    <span>1、收货地址</span>
                                </h2>
                                <div class="form-box address-info">
                                    <el-form-item label="收货人姓名" prop="accept_name" style="width:1000px">
                                        <el-input v-model="orderInfo.accept_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区" prop="area" style="width:1000px" >
                                        <v-distpicker @selected="onSelected" :province="orderInfo.area.province.value" :city="orderInfo.area.city.value" :area="orderInfo.area.area.value"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address" style="width:1000px">
                                        <el-input v-model="orderInfo.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile" style="width:1000px">
                                        <el-input v-model="orderInfo.mobile"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" style="width:1000px">
                                        <el-input v-model="orderInfo.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" style="width:1000px">
                                        <el-input v-model="orderInfo.post_code"></el-input>
                                    </el-form-item>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio v-model="orderInfo.payment_id" label="6">在线支付</el-radio>
                                            <em>手续费：0.00元</em>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio-group v-model="orderInfo.express_id" @change="switchExpress">
                                            <el-radio label="1">顺丰 <em>费用：20.00元</em></el-radio>
                                            <el-radio label="2">圆通 <em>费用：10.00元</em></el-radio>
                                            <el-radio label="3">韵达 <em>费用：8.00元</em></el-radio>
                                        </el-radio-group>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="item in goodslist" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price * item.buycount }}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea v-model="orderInfo.message" name="message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{orderInfo.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderInfo.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{getsum}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <a id="btnSubmit" @click="goToOrder" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import {getLocalGoodsObj} from "../../common/localStorageHelper.js"

export default {
  // 注册
  components: { VDistpicker },
  created() {
    // 获取商品清单
    this.getGoodsListData();
  },
  data() {
    // 自定义属性
    var val_mobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        var erMobile = /^1(3[0-9]|5[189]|8[6789])[0-9]{8}$/;
        // console.log(erMobile.test(value));

        if (!erMobile.test(value)) {
          callback(new Error("非合法手机号"));
        }

        callback();
      }
    };
    return {
      totalCount:0,
      goodslist: [],
      radio: "1",
      orderInfo: {//shu这些数据就是要提交到后台去的
            accept_name: '赵坚强',//收货人姓名
            address: '中粮商务公园3栋1304',//详细地址
            mobile: '13812345678',//手机号码
            email: 'huangwei@itcast.cn',//电子邮箱
            post_code: '518000',//邮政编码
            area: { //所属区域
                province: { code: "440000", value: "广东省" },
                city: { code: "440300", value: "深圳市" },
                area: { code: "440306", value: "宝安区" }
            },
            payment_id: "6", //支付方式，暂时只支持在线支付
            express_id: "1",//1.顺丰 2.圆通 3.韵达
            expressMoment: 20,//运费，默认20元
            message: "请快点发货",//留言
            goodsAmount: 0,//纯粹的商品总价格，不含运费
            goodsids: '',//结算的商品id，多个之间用，分割
            cargoodsobj: {}//本地存储的要结算的商品对象
        },
      rules: {
        accept_name: [
          { required: true, message: "名字不能为空", trigger: "blur" }
        ],
        area: [
          { required: true, message: "所属区域不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "详细地址不能为空", trigger: "blur" }
        ],
        mobile: [{ required: true, validator: val_mobile, trigger: "blur" }]
      }
    };
  },
  computed:{
      getsum(){
          return this.orderInfo.expressMoment + this.orderInfo.goodsAmount
      }
  },
  methods: {
    onSelected(data) {
      this.orderInfo.area = data;
    },
    switchExpress(label) {
      switch (label) {
        case "1":
          this.orderInfo.expressMoment = 20;
          break;

        case "2":
          this.orderInfo.expressMoment = 10;
          break;

        case "3":
          this.orderInfo.expressMoment = 8;
          break;

        default:
          break;
      }
    },
    getGoodsListData() {
      const ids = this.$route.params.ids;
      
      this.orderInfo.goodsids = ids;

// 将字符串转成数组后变成对象
      const tempObj = {}
      const localGoods = getLocalGoodsObj();
      const idsArray = ids.split(",")
      for(const key in localGoods){
          if(idsArray.includes(key)){
              tempObj[key] = localGoods[key]
          }
      }
      this.orderInfo.cargoodsobj = tempObj
// 结束


      const url = `site/validate/order/getgoodslist/${ids}`

      this.axios.get(url).then(response=>{
          let tempCount = 0;
          let tempAmount = 0;
          console.log(response.data.message);

          response.data.message.forEach(item => {
              item.buycount = localGoods[item.id]
              tempCount += item.buycount;
              tempAmount += item.sell_price * item.buycount
          });

          this.goodslist = response.data.message;
          this.totalCount = tempCount;
          this.orderInfo.goodsAmount = tempAmount;

      })

    },

    // 提交订单
    goToOrder(){
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            // alert('submit!');
            // console.log(this.orderInfo);检查提交的数据

            const url = 'site/validate/order/setorder'

            this.axios.post(url,this.orderInfo).then(response=>{
                // console.log(response.data);
                if(response.data.status == 1){
                    this.$messahe.error('订单提交失败')
                }

                // console.log("////"+response.data.message.orderid)

                // 提交成功后删除id对应本地的数据
                const tempIdArray = this.$route.params.ids.split(",");
                tempIdArray.forEach(goodsId=>{
                    this.$store.commit('deleteGoodsById',goodsId)
                })

                // 跳转到支付页面
                this.$router.push({
                    path:`/site/payOrder/${response.data.message.orderid}`
                })
                
            })
            
          } else {
            this.$message.warning("请完善信息，再下单！")
          }
        });
    }
  }
};
</script>


 