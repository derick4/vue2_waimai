<template>
  <section class="profile">
    <Header :title="title"/>

    <section class="profile-number">
      <!-- 判断是否为登录状态，登录则跳转详情页，未登录则跳转登录页 -->
      <router-link :to="username ? '/userinfo/'+username : '/login'" class="profile-link">
        <div class="profile_image">
          <!-- 使用一下获取头像的计算属性 -->
          <p v-show="false">{{getProfile}}</p>
          <img v-if="userMessage.pic" v-lazy="`https://sqqproject.oss-cn-hangzhou.aliyuncs.com/`+ userMessage.pic" alt="">
          <i v-else class="iconfont icon-person"></i>
        </div>
        <div class="user-info">
          <p class="user-info-top" v-if="username">{{username}}</p> 
          <p class="user-info-top" v-else>登录/注册</p> 
          <p>
            <span class="user-icon">
              <i class="iconfont icon-shouji icon-mobile"></i>
            </span>
            <span v-if="userMessage.phone" class="icon-mobile-number">{{userMessage.phone}}</span>
            <span v-else class="icon-mobile-number">暂无绑定手机号</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-jiantou1"></i>
        </span>
      </router-link>
    </section>
    <section class="profile_info_data border-1px">
      <ul class="info_data_list">
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>元</span>
          <span class="info_data_bottom">我的余额</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>张</span>
          <span class="info_data_bottom">优惠券</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>分</span>
          <span class="info_data_bottom">我的积分</span>
        </a>
      </ul>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 我的订单 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-order-s"></i>
        </span>
        <div class="my_order_div">
          <span>我的订单</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
      <!-- 积分商城 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-jifen"></i>
        </span>
        <div class="my_order_div">
          <span>积分商城</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
      <!-- 起点外卖会员卡 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-vip"></i>
        </span>
        <div class="my_order_div">
          <span>起点外卖会员卡</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 服务中心 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-fuwu"></i>
        </span>
        <div class="my_order_div">
          <span>服务中心</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
    </section>
    <mt-button type="danger" v-if="username" style="width: 100%" @click="logout">退出</mt-button>
  </section>
</template>


<script>
import Header from '../../components/Header/Header'
import {mapState} from 'vuex'

import {MessageBox} from 'mint-ui'

import {getUserInfo} from '@/api/'

export default {
  data() {
    return {
      title: '个人中心',
      userMessage: [], // 头像
    }
  },
  components: {
    Header
  },
  computed: {
    ...mapState(['username']),
    // 获取更新后的用户头像
    async getProfile() {
      let result = await getUserInfo(this.username)
      this.userMessage = result
    }
  },
  methods: {
    logout() {
      MessageBox.confirm('确定退出登录?').then(action => {
        this.$store.dispatch('logout')
      }, action => {
        console.log('取消')
      });
    }
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.profile { // 我的
  width: 100%;
  // 去掉滚动条隐藏溢出
  overflow: hidden;

  .profile-number {
    margin-top: 45.5px;

    .profile-link {
      clearFix();
      position: relative;
      display: block;
      background: #F457A3;
      padding: 20px 10px;

      .profile_image {
        float: left;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        vertical-align: top;

        img {
          width 180%
        }

        .icon-person {
          background: #e4e4e4;
          font-size: 62px;
        }
      }

      .user-info {
        float: left;
        margin-top: 8px;
        margin-left: 15px;
        position relative

        p {
          font-weight: 700;
          font-size: 18px;
          color: #fff;

          // &.user-info-top {
          //   // padding-bottom: 8px;
          // }

          .user-icon {
            position: absolute
            left: 0
            bottom: 24px
            display: inline-block;
            margin-left: -15px;
            margin-right: 5px;
            width: 20px;
            height: 20px;

            .icon-mobile {
              font-size: 30px;
              vertical-align: text-top;
            }
          }

          .icon-mobile-number {
            font-size: 14px;
            color: #fff;
            margin-left: 18px
          }
        }
      }

      .arrow {
        width: 12px;
        height: 12px;
        position: absolute;
        right: 15px;
        top: 40%;

        .icon-jiantou1 {
          color: #fff;
          font-size: 5px;
        }
      }
    }
  }

  .profile_info_data {
    bottom-border-1px(#e4e4e4);
    width: 100%;
    background: #fff;
    overflow: hidden;

    .info_data_list {
      clearFix();

      .info_data_link {
        float: left;
        width: 33%;
        text-align: center;
        border-right: 1px solid #f1f1f1;

        .info_data_top {
          display: block;
          width: 100%;
          font-size: 14px;
          color: #333;
          padding: 15px 5px 10px;

          span {
            display: inline-block;
            font-size: 30px;
            color: #f90;
            font-weight: 700;
            line-height: 30px;
          }
        }

        .info_data_bottom {
          display: inline-block;
          font-size: 14px;
          color: #666;
          font-weight: 400;
          padding-bottom: 10px;
        }
      }

      .info_data_link:nth-of-type(2) {
        .info_data_top {
          span {
            color: #ff5f3e;
          }
        }
      }

      .info_data_link:nth-of-type(3) {
        border: 0;

        .info_data_top {
          span {
            color: #6ac20b;
          }
        }
      }
    }
  }

  .profile_my_order {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .my_order {
      display: flex;
      align-items: center;
      padding-left: 15px;

      >span {
        display: flex;
        align-items: center;
        width: 20px;
        height: 20px;

        >.iconfont {
          margin-left: -10px;
          font-size: 30px;
        }

        .icon-order-s {
          color: #F457A3;
        }

        .icon-jifen {
          color: #ff5f3e;
        }

        .icon-vip {
          color: #f90;
        }

        .icon-fuwu {
          color: #F457A3;
        }
      }

      .my_order_div {
        width: 100%;
        border-bottom: 1px solid #f1f1f1;
        padding: 18px 10px 18px 0;
        font-size: 16px;
        color: #333;
        display: flex;
        justify-content: space-between;

        span {
          display: block;
        }

        .my_order_icon {
          width: 10px;
          height: 10px;

          .icon-jiantou1 {
            color: #bbb;
            font-size: 10px;
          }
        }
      }
    }
  }
}

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
      font-size: 25px;
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
      font-size: 20px;
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
</style>