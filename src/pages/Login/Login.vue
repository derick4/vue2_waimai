<template>
  <div>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">起点外卖</h2>
          <div class="login_header_title">
            <a
              href="javascript:;"
              :class="{ on: loginway }"
              @click="loginway = true"
              >注册</a
            >
            <a
              href="javascript:;"
              :class="{ on: !loginway }"
              @click="loginway = false"
              >登录</a
            >
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="registor">
            <div :class="{ on: loginway }">
              <section class="login_message">
                <input
                  type="text"
                  maxlength="20"
                  placeholder="用户名"
                  v-model="registorusername"
                />
              </section>
              <section class="login_verification">
                <input
                  type="password"
                  maxlength="16"
                  placeholder="密码"
                  v-model="registorpwd"
                  v-if="!showpwd"
                />
                <input
                  type="text"
                  maxlength="16"
                  placeholder="密码"
                  v-model="registorpwd"
                  v-else
                />
                <div
                    class="switch_button"
                    :class="showpwd ? 'on' : 'off'"
                    @click="showpwd = !showpwd"
                  >
                    <div
                      class="switch_circle"
                      :class="{ right: showpwd }"
                    ></div>
                    <span class="switch_text"></span>
                  </div>
              </section>
              <button class="login_submit">注册</button>
            </div>
          </form>
          <form @submit.prevent="login">
            <div :class="{ on: !loginway }">
              <section>
                <section class="login_message">
                  <input
                    type="text"
                    maxlength="11"
                    placeholder="输入登录账号"
                    v-model="loginusername"
                  />
                </section>
                <section class="login_verification">
                  <input
                    type="text"
                    maxlength="8"
                    placeholder="输入登录密码"
                    v-if="showpwd"
                    v-model="loginpwd"
                  />
                  <input
                    type="password"
                    maxlength="8"
                    placeholder="输入登录密码"
                    v-else
                    v-model="loginpwd"
                  />

                  <div
                    class="switch_button"
                    :class="showpwd ? 'on' : 'off'"
                    @click="showpwd = !showpwd"
                  >
                    <div
                      class="switch_circle"
                      :class="{ right: showpwd }"
                    ></div>
                    <span class="switch_text"></span>
                  </div>
                </section>
              </section>
              <button class="login_submit">登录</button>
            </div>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
      <AlertTip v-show="showAlertTip" @closeTip="closeTip" :alertText="alertText"></AlertTip>
    </section>
  </div>
</template>
<script>
import { doregistor, dologin } from "@/api/index.js";

import AlertTip from "@/components/AlertTip/AlertTip.vue";

export default {
  components: {AlertTip},
  data() {
    return {
      loginway: false, //false为登录  true为注册
      showpwd: false, //false不显示密码 true显示密码
      registorusername: "", // 用户名
      registorpwd: "", // 密码
      showAlertTip: false, // 展示提示框
      alertText: '', // 提示信息
      loginusername: '', // 登录用户名
      loginpwd: '' // 登录密码
    };
  },
  methods: {
    // 注册
    async registor() {
      let username = this.registorusername;
      if (!/^\w{6,8}$/.test(username)) {
        // console.log("用户名不合法");
        this.showAlertTip = true;
        this.alertText = '用户名由6-8位字母数字下划线组成'
        return
      }
      let pwd = this.registorpwd;
      if (!/^\w{8,18}$/.test(pwd)) {
        // console.log("密码不合法");
        this.showAlertTip = true;
        this.alertText = '密码由8-18位字母数字下划线组成'
        return
      }
      let res = await doregistor(username, pwd);
      // console.log(res.msg)
      if (res.msg === "ok") {
        // 存储用户名
        this.$store.commit('getUsername', username)
        this.$router.push("/profile");
      }
    },
    // 关闭提示框
    closeTip() {
      this.showAlertTip = false
    },
    // 登录
    async login() {
      let uname = this.loginusername
      let pwd = this.loginpwd
      // console.log(uname, pwd)
      let res = await dologin(uname, pwd)
      if (res.msg === 'ok') {
        // 存储用户名
        this.$store.commit('getUsername', uname)
        this.$router.push('/profile')
      } else {
        this.alertText = '用户名或密码错误'
        this.showAlertTip = true
      }
    }
  },

};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #F457A3;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #F457A3;
            font-weight: 700;
            border-bottom: 2px solid #F457A3;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #F457A3;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #F457A3;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(15px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #F457A3;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #F457A3;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
