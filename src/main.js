// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由插件
import VueRouter from 'vue-router'
// 引入路由配置文件
import router from './router'
// store
import store from './store'
// 按需引入 mint-ui 组件
import {Button} from 'mint-ui'
Vue.component(Button.name, Button)
// 关闭生产提示信息
Vue.config.productionTip = false

//屏蔽重复使用路由 push
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
    return originalPush.call(this, location).catch(err => err)
}
//屏蔽重复使用路由 replace
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location) {
    return originalReplace.call(this, location).catch(err => err)
}

// 图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from '../static/images/loading.gif' // 懒加载图片路径
Vue.use(VueLazyload, {
  loading
})  

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 注册路由
  router,
  // 注册sotre
  store
})
