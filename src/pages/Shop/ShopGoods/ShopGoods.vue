<template>
  <div>
    <div class="goods">
      <div class="foods-wrapper">
        <ul ref="foodsUl" v-if="goods">
          <li class="food-list-hook" v-for="(item,index) of goods" :key="index">
            <!-- <h1 class="title">{{ item.foodname }}</h1> -->
            <ul>
              <li class="food-item bottom-border-1px">
                <div class="icon">
                  <img
                    width="57"
                    height="57"
                    :src="
                      `https://sqqproject.oss-cn-hangzhou.aliyuncs.com/` +
                      item.foodpic
                    "
                  />
                </div>
                <div class="content">
                  <h2 class="name">{{ item.foodname }}</h2>
                  <p class="desc">{{ item.descr }}</p>
                  <div class="extra">
                    <span class="count">月售10份</span>
                    <span>好评率90%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ item.price }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :item="item" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <ShopCart/>
  </div>
</template>


<script>
import { getGoods } from "@/api/";
// 加减组件
import CartControl from "@/components/CartControl/CartControl";
// 购物车结算组件
import ShopCart from "@/components/ShopCart/ShopCart";

export default {
  components: {
    CartControl,
    ShopCart,
  },
  data() {
    return {
      goods: [],
    };
  },
  // 获取食品信息
  async mounted() {
    let id = this.$route.params.id;
    let result = await getGoods(id);
    this.goods = result;
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 233px;
  width: 100%;
  background: #fff;
  overflow: hidden;
  padding-bottom 56px

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 46px;

          a {
            display: inline-block;
            width: 20px;
            height: 20px;
            background-color: #F457A3;
            color: #fff;
            border-radius: 50%;
            text-align: center;
            font-size: 22px;
            line-height: 20px;
          }
        }
      }
    }
  }
}
</style>
