<template>
  <section class="order">
    <Header :title="title">
      <a class="header_search" slot="left" @click="goBack">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </Header>
    <!-- 未登录展示 -->
    <section class="order_no_login" v-if="!username">
      <img src="./images/person.png" />
      <h3>登录后查看外卖订单</h3>
      <button @click="goLogin" style="background: #f457a3">立即登录</button>
    </section>
    <!-- 已经登录展示 -->
    <div v-else>
      <!-- 使用计算属性 -->
      <h2 v-show="false">{{ getOrders }}</h2>
      <div class="container" v-if="orders.length != 0">
        <h4>订单列表</h4>
        <table class="table table-striped">
          <tr>
            <th>订单号</th>
            <th>订单价格</th>
            <th>购买人</th>
            <th>操作</th>
          </tr>
          <tr v-for="item of orders" :key="item.id">
            <td>{{ item.order_num }}</td>
            <td>{{ item.food_totalprice }}</td>
            <td>{{ item.username }}</td>
            <td>
              <router-link
                :to="`/order/orderinfo/` + item.id"
                class="btn btn-info"
                data-toggle="collapse"
                href="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                查看
              </router-link>
              <a
                class="btn btn-success"
                data-toggle="modal"
                data-target="#exampleModal"
                data-whatever="@mdo"
                >评价
              </a>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <h4 class="modal-title" id="exampleModalLabel">
                        订单评价
                      </h4>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="form-group">
                          <label for="message-text" class="control-label"
                            >评价内容:</label
                          >
                          <textarea
                            class="form-control"
                            id="message-text"
                            v-model.lazy="comments"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-default"
                        data-dismiss="modal"
                      >
                        取消
                      </button>
                      <!-- 传入商家id -->
                      <button 
                        type="button" 
                        class="btn btn-info"
                        data-dismiss="modal"
                        @click="finished(item.shop_id)">
                        完成
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <!-- 展示路由 -->
        <router-view />
      </div>
      <div v-else class="no-order">
        <!-- <h4>当前账号暂无订单</h4> -->
        <img src="./images/no_order.jpg" alt="">
      </div>
    </div>
  </section>
</template>

<script>
// 导入bs中的js
import "../../../static/css/bs/js/jquery.min.js";
import "../../../static/css/bs/js/bootstrap.min.js";
import "../../../static/css/bs/js/holder.min.js";

import Header from "@/components/Header/Header";
import { mapState } from "vuex";
// 导入获取用户订单，添加用户评论, 获取用户详情接口
import { getUserOrders, addUserComments, getUserInfo } from "@/api/";
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      title: "我的订单",
      orders: [], // 订单列表
      comments: '', // 评价内容
    };
  },
  components: {
    Header,
  },
  // 计算属性
  computed: {
    ...mapState(["username"]),
    // 获取用户订单
    getOrders: async function () {
      // console.log(this.username)
      let res = await getUserOrders(this.username);
      // console.log(res);
      this.orders = res;
    },
  },
  // 方法
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    goBack() {
      this.$router.back();
    },
    doComment() {
      // console.log(this.orders.shop_id)
    },
    // 完成评价
    async finished(id) {
      // 手动关闭模态框
      $('#exampleModal').modal('hide')
      
      // 添加评论接口
      let user = this.username,
        content = this.comments,
        time = new Date(),
        user_pic = await getUserInfo(user)
      // 判断内容不能为空
      if(!content) {
        Toast('内容不能为空')
        return
      }
      let result = await addUserComments(user,content,id, time.toLocaleString(), user_pic.pic)
      if (result.msg == 'ok') {
        this.$router.push('/shop/ratings/' + id)
      }
    }
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../static/css/bs/css/bootstrap.min.css';
@import '../../common/stylus/mixins.styl';

.header {
  background-color: #F457A3;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 45px;

  .header_search {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 10%;
    height: 50%;

    .icon-sousuo {
      font-size: 22px;
      color: #fff;
    }

    .icon-jiantou2 {
      color: #fff;
    }
  }

  .header_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    color: #fff;
    text-align: center;

    .header_title_text {
      font-size: 18px;
      color: #fff;
      display: block;
    }
  }

  .header_login {
    font-size: 14px;
    color: #fff;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);

    .header_login_text {
      color: #fff;
    }
  }
}

/deep/ .table {
  margin: 0;
  text-align: center;
}

>>> .btn {
  padding: 5px;
}

.no-order {
  margin-top: 50px 
  padding 0 10px
  img {
    width: 100%;
    margin-top: 100px
  }
}

.container {
  h4 {
    font-size: 16px;
    font-weight: bold;
  }

  th {
    font-size: 14px;
    color: #333;
    text-align: center;
    font-weight bold
  }

  td {
    font-size: 14px;
    color: #777;
    line-height: 40px;

    a {
      font-size: 12px;
    }
  }
}

.order { // 订单
  width: 100%;

  .order_no_login {
    padding-top: 140px;
    width: 60%;
    margin: 0 auto;
    text-align: center;

    >img {
      display: block;
      width: 100%;
      height: 30%;
    }

    >h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
    }

    >button {
      display: inline-block;
      background: #02a774;
      font-size: 14px;
      color: #fff;
      border: 0;
      outline: none;
      border-radius: 5px;
      padding: 10px 20px;
    }
  }
}

.container {
  margin-top: 45px;
}
</style>