<template>
  <div class="cartcontrol">
    <transition name="move">
        <div class="iconfont icon-remove_circle_outline" v-if="item.count" @click="update(false)"></div>
    </transition>
    <div class="cart-count" v-if="item.count">{{item.count}}</div>
    <div class="iconfont icon-add_circle" @click="update(true)"></div>
</div>
</template>

<script>
export default {
    props: {
        item: Object
    },
    methods: {
        // // 添加购物车
        // add() {
        //     if (!this.item.count) {
        //         // 编程响应式数据
        //         Vue.set(this.item, 'count', 1)
        //     } else {
        //         this.item.count++
        //     }
        // },
        // // 删除购物车
        // minus() {
        //     if (this.item.count) {
        //         this.item.count--
        //     }
        // }

        // 方法二
        update(isAdd) {
            this.$store.dispatch('doupdate', {isAdd, food: this.item})
        }
    }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color #F457A3
      &.move-enter-active, &.move-leave-active
        transition all 1s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 16px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color #F457A3
</style>