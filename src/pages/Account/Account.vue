<template>
  <div>
    <Header :title="title">
      <nav class="shop-nav" slot="left">
        <a href="javascript:void(0)" class="back" @click="$router.back()">
          <i class="iconfont icon-arrow_left"></i>
        </a>
      </nav>
    </Header>
    <div style="width: 100%; height: 50px"></div>
    <div class="container">
      <button
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#myModal"
      >
        添加收货地址
      </button>
      <form @submit.prevent="addaddress" method="post">
        <div class="modal fade" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 class="modal-title">添加收货地址</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>姓名</label>
                  <!-- form-control  使元素宽度变为100%-->
                  <input
                    type="text"
                    class="form-control"
                    required
                    name="name"
                    placeholder="请输入姓名"
                    v-model="rname"
                  />
                </div>
                <div class="form-group">
                  <label>电话</label>
                  <input
                    type="text"
                    class="form-control"
                    name="phone"
                    pattern="^(\+86)?1\d{10}$"
                    required
                    placeholder="请输入电话"
                    v-model="phone"
                  />
                </div>
                <div class="form-group">
                  <label>配送地址</label>
                  <input
                    type="text"
                    class="form-control"
                    name="address"
                    required
                    placeholder="请输入配送地址"
                    v-model="address"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-default"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  取消
                </button>
                <button class="btn btn-info">
                  完成
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <h4>配送地址</h4>
    <div>
      <ul class="address-list">
        <li style="width: 100%; height: 30px" v-for="(item,index) in userAddress" :key="index">
          <span>{{item.realname}}-{{item.phone}}-{{item.address}}</span>
          <input id="radio" type="radio" v-model="select_address" :value="item.id"/>
        </li>
      </ul>
    </div>
    <h4>所购食品</h4>
    <div class="list-content">
      <ul>
        <li class="food" v-for="(item, index) in cartFoods" :key="index">
          <span class="name">{{item.foodname}}</span>
          <div class="price">
            <span>￥{{item.price}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <CartControl :item="item"/>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <a href="javascript:void(0)">总计:
        <span style="font-size: 20px;color: red;font-weight: bold">
          {{ parseInt(getTotalPrice) + parseInt(fee)}}
        </span>元
      </a>
      <button type="button" 
        class="btn btn-success" 
        style="float: right"
        @click="payStatus">
        {{payStatusText}}
      </button>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header/Header";
import CartControl from '@/components/CartControl/CartControl'
// 导入添加收货地址、获取收获地址、生成订单、生成订单详情接口
import { AddAddress,getAddAddress,AddOrder,AddOrderGoods } from "@/api/index.js";
import {mapState, mapGetters} from 'vuex'
import {Toast} from 'mint-ui'

export default {
  components: {
    Header,
    CartControl
  },
  // 局部刷新
  inject: ['reload'],
  data() {
    return {
      title: "结算页",
      rname: "", // 收货人
      phone: "", // 手机
      address: "", // 收货地址
      userAddress: '', // 用户收货地址
      select_address: '' // 是否选择收货地址
    };
  },
  // 计算属性
  computed: {
    // 获取购物车内的数据
    ...mapState(['cartFoods', 'fee', 'shopId']),
    // 获取购物车总价
    ...mapGetters(['getTotalPrice']),
    // 获取提交订单文字
    payStatusText() {
      let { getTotalPrice } = this
      if (getTotalPrice <= 0) {
        return '去加购商品'
      } else if (!this.select_address) {
        return `选择收货地址`
      } else {
        return `提交订单`
      }
    }
  }, 
  // 方法
  methods: {
    // 添加用户收货地址
    async addaddress() {
      let rname = this.rname,
        phone = this.phone,
        address = this.address,
        uname = this.$route.params.username;
      // console.log(rname,phone,address,uname);
      let result = await AddAddress(rname, phone, address, uname);
      if (result.msg === 'OK') {
        // 局部刷新
        this.reload()
        // 手动关闭模态框
        $('#myModal').modal('hide')
      }
    },
    // 提交订单状态文字
    async payStatus() {
      let { getTotalPrice } = this
      if (getTotalPrice <= 0) {
        Toast('去加购商品')
      } else if (!this.select_address) {
        Toast(`选择收货地址`)
      } else {
        // 生成订单
        let order_num = Math.floor(Math.random() * 10000)
        let address_id = this.select_address
        let food_totalprice = parseInt(this.getTotalPrice) + parseInt(this.fee)
        let username = this.$route.params.username
        let shop_id = this.shopId
        // console.log(order_num,address_id,food_totalprice,username)
        let res = await AddOrder(order_num,address_id,food_totalprice,username,shop_id)
        // console.log(res)
        if (res.msg === 'ok') {
          // 
          let orders_id = res.insertid
          // 遍历订单详情
          this.cartFoods.forEach( async item => {
            // console.log(item) // 每一项食品
            let foodname = item.foodname
            let pic = item.foodpic
            let count = item.count
            let result = await AddOrderGoods(foodname,pic,count,orders_id)
            // console.log(result)
          })
        }
        // 跳转到订单页面
        this.$router.replace('/order')
        // 清空购物车
        this.$store.dispatch("clearCart");
      }
    }
  },
  // 
  async mounted() {
    // 获取用户收货地址
    let username = this.$route.params.username;
    let result = await getAddAddress(username)
    this.userAddress = result
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.shop-nav {
  background-size: cover;
  background-repeat: no-repeat;
  // height: 50px;
  // padding: 5px 10px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #F457A3;
  }

  .back {
    position: absolute;
    top: 5px;
    left: 0;

    .icon-arrow_left {
      display: block;
      padding: 5px;
      font-size: 20px;
      color: #fff;
    }
  }
}

.list-content {
  padding: 0 18px;
  max-height: 217px;
  overflow: hidden;
  background: #fff;

  .food {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    bottom-border-1px(rgba(7, 17, 27, 0.1));

    .name {
      line-height: 24px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }

    .price {
      position: absolute;
      right: 90px;
      bottom: 12px;
      line-height: 24px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(240, 20, 20);
    }

    .cartcontrol-wrapper {
      position: absolute;
      right: 0;
      bottom: 6px;
    }
  }
}

.address-list
  margin-bottom 20px
  li 
    position relative
    line-height 30px
    font-size 12px
    color #666
    #radio
      position absolute
      right 0
      top 4px

ul
  padding 0 20px

h4
  font-weight bold
  color #000
  padding 0 15px

.footer
  padding 0 20px
</style>