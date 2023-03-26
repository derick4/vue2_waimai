<template>
  <footer class="footer_guide border-1px">
    <!-- 绑定 类 on, on 是当前点击的元素,使用 $route.path 可以获取当前点击的路由地址 -->
    <a
      class="guide_item"
      @click="goTo('/msite')"
      :class="{ on: $route.path === '/msite' }"
    >
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </a>
    <a
      class="guide_item"
      @click="goTo('/search')"
      :class="{ on: $route.path === '/search' }"
    >
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </a>
    <a
      class="guide_item"
      @click="goTo('/order')"
      :class="{ on: $route.path === '/order' }"
    >
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </a>
    <a
      class="guide_item"
      @click="goTo('/profile')"
      :class="{ on: $route.path === '/profile' }"
    >
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </a>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  // 方法
  methods: {
    // 跳转路由
    goTo(url) {
      this.$router.push(url);
    },
  },
  // 生命周期函数
  mounted() {
    // console.log(this)
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
// 导入混合解决底部一像素上边框
@import '../../common/stylus/mixins.styl';

// 底部导航栏样式
.footer_guide { // footer
  top-border-1px(#e4e4e4);
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 60px;
  display: flex;

  .guide_item {
    display: flex;
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    color: #999999;

    &.on {
      color: #F457A3;
    }

    span {
      font-size: 12px;
      margin-top: 2px;
      margin-bottom: 2px;

      .iconfont {
        font-size: 22px;
      }
    }
  }
}
</style>