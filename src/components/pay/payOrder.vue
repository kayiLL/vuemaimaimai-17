<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}{{orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <img id="imgLogo" src="../../statics/site/images/alipay.png" hidden>
                                <div id="container2">
                                    <canvas width="250" height="250"></canvas>
                                </div>
                                <!--文字logo-->
                                <!--
                                <div id="container">
                                    <canvas width="400" height="400"></canvas>
                                </div>
                                -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import "../../statics/site//js/jqplugins/qrcode/jqueryqr.js"

    export default {
        data(){
            return {
                orderInfo:{},
                intervalId:null,
            }
        },
        created(){
            this.getOrderInfoData()
            this.setIntervalOrder()
        },
        methods:{
            getOrderInfoData(){

                const url = `site/validate/order/getorder/${this.$route.params.orderId}`

                this.axios.get(url).then(response => {
                    if (response.data.message[0].status == 2) {
                        this.$router.push({ path: '/site/paySuccess' })
                    }

                    this.orderInfo = response.data.message[0]
                })
                

            },

            setIntervalOrder(){
                                
                this.intervalId = setInterval(()=>{
                    const url = `site/validate/order/getorder/${this.$route.params.orderId}`

                this.axios.get(url).then(response => {
                    if (response.data.message[0].status == 2) {
                        this.$router.push({ path: '/site/paySuccess' })
                    }
                })
                },3000)

            }
        },
        beforeDestroy(){
            clearInterval(this.intervalId)
        },
        mounted(){
            setInterval(()=>{
                $('#container2').erweima({
                        mode: 4,
                        mSize:30,
                        text:`http://47.106.148.205:8899/site/validate/pay/alipay/${this.$route.params.orderId}`,
                        image: $("#imgLogo")[0],
                    });
            },200)
        }
    }
</script>
