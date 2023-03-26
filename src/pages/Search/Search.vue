<template>
  <section class="search">
    <!-- 头部 -->
    <Header :title="title">
      <a class="header_search" slot="left" @click="goBack">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </Header>
    <!-- 搜索框 -->
    <form class="search_form" @submit.prevent="searchFoods">
      <input
        type="search"
        name="search"
        placeholder="输入商家名称"
        class="search_input"
        autofocus
        v-model.trim="name"
      />
      <!-- <input type="submit" class="search_submit" value="搜索" /> -->
      <button type="submit" class="search_submit">
        <i class="iconfont icon-sousuo"></i>
      </button>
    </form>
    <!-- 检索列表 -->
    <!-- <ul>
      <li v-for="(item, index) in res" :key="index">
        <router-link 
        :to="`/shop/goods/` + item.id">
          {{item.shopname}}
        </router-link>
      </li>
      <router-view />
    </ul> -->
    <!-- 查找商家 -->
    <SearchShop v-if="name" :shoplists="res"/>
  </section>
</template>

<script>
// 头部
import Header from "@/components/Header/Header";
import SearchShop from '@/components/SearchShop/SearchShop'
import { getShopname } from "@/api/";
import { Toast } from 'mint-ui'

export default {
  name: "Search",
  data() {
    return {
      title: "搜索",
      name: "", // 搜索的关键字
      res: [], // 搜索栏上的商家列表
    };
  },
  // 方法
  methods: {
    goBack() {
      this.$router.back();
    },
    // 搜索
    async searchFoods() {
      if(!this.name) {
        Toast('请输入商家名称~')
        return
      }
      let res = await getShopname(this.name);
      // console.log(res)
      if(res.length == 0) {
        Toast('未找到该商家~')
        return
      }
      this.shoplists = res
      this.res = res;
    },
  },
  // 监听器
  watch: {
    async name(val) {
      let res = await getShopname(val);
      // console.log(res)
      this.res = res;
    },
  },
  components: {
    Header,
    SearchShop
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.icon-jiantou2 {
  color: #fff;
}

.search { // 搜索
  width: 100%;

  .search_form {
    clearFix();
    margin-top: 45px;
    background-color: #fff;
    padding: 12px 8px;

    input {
      height: 35px;
      padding: 0 4px;
      border-radius: 2px;
      outline: none;

      &.search_input {
        float: left;
        width: 79%;
        border: 4px solid #f2f2f2;
        font-size: 14px;
        color: #999;
        background-color: #f2f2f2;
        padding-left: 15px
      }
    }
    .search_submit {
      width: 40px;
      height: 34px;
      margin-left: 10px;
      font-size: 19px;
      color: #fff;
      background: #F457A3;
      border-radius: 3px;
      outline: none;
      border: none
    }
  }
}

ul {
  width: 75%;
  // padding 30px 15px
  margin: 10px 0 0 10px;
  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid #ddd;

  li {
    line-height: 25px;
    color: #666;
    font-size: 14px;

    a {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
