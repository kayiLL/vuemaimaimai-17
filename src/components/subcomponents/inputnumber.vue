<template>
    <div>
        <div @click="substrict" class="left">-</div>
        <div class="middle">{{count}}</div>
        <div @click="add" class="right">+</div>
    </div>
</template>

<style scoped>
    .left,.middle,.right{
        display: inline-block;
        border: 1px solid rgba(92,92,92,0.3);
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
    }
</style>

<script>
    export default {
        data(){
            return {
                count : 1,
            }
        },
        props:['goodsId','goodsCount'],//子组件
        created(){//生命周期钩子
        // 父组件传递回来的数量
        this.count = this.goodsCount
        },
        methods:{
            substrict(){
                if(this.count <=1 ) return
                this.count --
                this.notify()
            },
            add(){
                this.count ++
                this.notify()
            },
            notify(){
                const goods = {
                    goodsId:this.goodsId,
                    count:this.count
                }

                this.$emit("goodsCountChange",goods)
            }
        }
    }
</script>
