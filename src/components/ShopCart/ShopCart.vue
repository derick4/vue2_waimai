<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShowCart">
          <div class="logo-wrapper">
            <!-- highlight 高光 -->
            <div class="logo" :class="{ highlight: getTotalCount }">
              <!-- highlight 高光 -->
              <i
                class="iconfont icon-shopping_cart"
                :class="{ highlight: getTotalCount }"
              ></i>
            </div>
            <div class="num" v-if="getTotalCount">{{ getTotalCount }}</div>
          </div>
          <div class="price" :class="{ highlight: getTotalCount }">
            ￥{{ getTotalPrice }}
          </div>
          <div class="desc">另需配送费￥{{ shop.fee }} 元</div>
        </div>
        <div class="content-right">
          <!-- not-enough 不够起送; enough 可以起送-->
          <div class="pay" :class="payStatus" @click="account">
            {{ payText }}
          </div>
        </div>
      </div>
      <div class="shopcart-list" v-show="showCart">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearCart">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(item, index) of cartFoods" :key="index">
              <span class="name">{{ item.foodname }}</span>
              <div class="price">
                <span>￥{{ item.price }}</span>
              </div>
              <!-- 购物车加减商品 -->
              <div class="cartcontrol-wrapper">
                <CartControl :item="item" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 模态框 -->
    <div class="list-mask" @click="toggleShowCart" v-show="showCart"></div>
  </div>
</template>

<script>
// 获取商家
import { getShoplistone } from "@/api/index.js";
import { mapState, mapGetters } from "vuex";
import CartControl from "@/components/CartControl/CartControl";
import { MessageBox, Toast } from "mint-ui";

export default {
  components: {
    CartControl,
  },
  data() {
    return {
      shop: [],
      isShowCart: false, // 显示购物车
    };
  },
  // 获取商家配送费
  async mounted() {
    let id = this.$route.params.id;
    let result = await getShoplistone(id);
    // console.log(result)
    this.shop = result;
  },
  // 计算属性
  computed: {
    ...mapState(["cartFoods", 'username']),
    // 获取购物车总数量
    ...mapGetters(["getTotalCount"]),
    // 获取购物车总价格
    ...mapGetters(["getTotalPrice"]),
    // 展示购物车
    showCart() {
      // 如果购物车内没有商品，则隐藏
      if (this.getTotalCount == 0) {
        this.isShowCart = false;
        return false;
      }
      return this.isShowCart;
    },
    // 结算状态样式
    payStatus() {
      let { getTotalPrice } = this;
      let fee = this.shop.fee;
      // console.log(getTotalPrice,fee)
      return getTotalPrice < fee ? "not-enough" : "enough";
    },
    // 结算样式文字
    payText() {
      let { getTotalPrice } = this;
      let fee = this.shop.fee;
      if (getTotalPrice == 0) {
        return `还差${fee}元起送`;
      } else if (getTotalPrice < fee) {
        return `还差${fee - getTotalPrice}元起送`;
      } else {
        return "结算";
      }
    },
  },
  // 方法
  methods: {
    // 切换购物车的显示状态
    toggleShowCart() {
      this.isShowCart = !this.isShowCart;
    },
    // 清空购物车操作
    clearCart() {
      MessageBox.confirm("确定清空购物车？").then(
        (action) => {
          this.$store.dispatch("clearCart");
        },
        (action) => {
          console.log("取消");
        }
      );
    },
    //   结算提示文字
    account() {
      let { getTotalPrice } = this;
      let fee = this.shop.fee;
      // 判断总价和配送费的关系
      if (getTotalPrice == 0) {
        Toast(`还差${fee}元起送`);
      } else if (getTotalPrice < fee) {
        Toast(`还差${fee - getTotalPrice}元起送`);
      } else {
        if (this.username) {
          // 已登录跳转结算界面
          this.$router.push('/account/' + this.username)
          // 分发商家id给 mutations
          this.$store.commit('getShopId', this.shop.id)
        } else {
          // 未登录跳转登录界面
          this.$router.replace('/login')
        }
      }
      // 配送费
      this.$store.commit('getFee', fee)
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;

          &.highlight {
            background: #F457A3;
          }

          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
        color: #fff;

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: bottom;
        margin-bottom: 15px;
        margin-left: -45px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: #fff;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #F457A3;
          color: #fff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: $green;
        transition: all 0.4s linear;
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-100%);

    &.move-enter-active, &.move-leave-active {
      transition: transform 0.3s;
    }

    &.move-enter, &.move-leave-to {
      transform: translateY(0);
    }

    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
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
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>