<template>
  <div class="collapse" id="collapseExample">
    <ul class="well">
      <li
        class="food-item bottom-border-1px"
        v-for="(item, index) in orderInfo"
        :key="index"
      >
        <div class="icon" v-if="item.pic">
          <img
            width="57"
            height="57"
            v-lazy="`https://sqqproject.oss-cn-hangzhou.aliyuncs.com/` + item.pic"
          />
        </div>
        <div class="content">
          <h2 class="name">{{ item.foodname }}</h2>
          <div class="cartcontrol-wrapper">数量:{{ item.count }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getOrderInfo } from "@/api/";

export default {
  data() {
    return {
      orderInfo: [],
    };
  },
  async mounted() {
    let order_id = this.$route.params.order_id;
    let res = await getOrderInfo(order_id);
    this.orderInfo = res;
    // console.log(res);
  },
  // 侦听器
  watch: {
    async $route(val) {
      let order_id = val.params.order_id;
      let res = await getOrderInfo(order_id);
      this.orderInfo = res;

      //   console.log(res);
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.well {
  padding: 0;
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
      bottom: 12px;
    }
  }
}
</style>