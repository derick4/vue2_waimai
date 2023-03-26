<template>
  <div id="app">
    <!-- 路由视图展示 -->
    <div>
      <router-view v-if="isRouterAlive"></router-view>
    </div>
    <!-- 底部导航栏 -->
    <Footer v-show="$route.meta.isShowFooter"/>
  </div>
</template>

<script>
import Footer from './components/Footer/Footer'

export default {
  name: 'App',
  components: {
    Footer
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  // provide
  provide(){
    return {
      reload: this.reload
    }
  },
  // 方法
  methods: {
    reload(){
        this.isRouterAlive = false
        this.$nextTick( function () {
            this.isRouterAlive = true
        })
    }
  },
  // 获取 cookie
  mounted() {
    this.$store.dispatch('getCookie')
  }
}
</script>

<style lang="stylus">
/* 设置 1px 上下边框 */
@import './common/stylus/mixins.styl';

 /* 无法被动侦听事件preventDefault，是新版本chrome 浏览器报错。 */
* {
    touch-action: none
}
</style>
