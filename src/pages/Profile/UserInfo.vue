<template>
  <div>
    <header>
      <a href="javascript:void(0)" class="back" @click="$router.back()">
        <i class="iconfont icon-arrow_left"></i>
      </a>
      <p>个人中心</p>
    </header>

    <div class="content">
      <div class="detail">
        <img v-if="userInfo.pic" v-lazy="`https://sqqproject.oss-cn-hangzhou.aliyuncs.com/`+ userInfo.pic" alt="">
        <img v-else  v-lazy="imgStr" alt="" />
        <ul class="block">
          <li>
            昵称：
            <span>{{
              userInfo.realname ? userInfo.realname : "暂无昵称"
            }}</span>
          </li>
          <li>
            电话：
            <span>{{ userInfo.phone ? userInfo.phone : "暂无电话" }}</span>
          </li>
          <li>
            邮箱：
            <span>{{ userInfo.email ? userInfo.email : "暂无邮箱" }}</span>
          </li>
        </ul>
      </div>
      <!-- 判断下其他详情信息有没有更新完毕  如果更新完毕 出现更换头像按钮  否则不出现 -->
      <div v-if="userInfo.realname">
        <div class="form-group">
          <div class="col-sm-2 col-xs-offset-4">
            <label for="file" class="btn btn-default">更换头像</label>
            <input
              id="file"
              type="file"
              style="display: none"
              @change="onchangeImgFun"
            />
          </div>
        </div>
      </div>

      <div class="edit">
        <mt-button
          type="primary"
          style="width: 100%"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#myModal"
          >编辑资料</mt-button
        >

        <form @submit.prevent="updateUserInfo" method="post">
          <div class="modal fade" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    &times;
                  </button>
                  <h4 class="modal-title">编辑个人信息</h4>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label>昵称</label>
                    <!-- form-control  使元素宽度变为100%-->
                    <input
                      type="text"
                      class="form-control"
                      name="name"
                      placeholder="输入昵称"
                      required
                      v-if="!userInfo.username"
                      v-model="realname"
                    />
                    <input
                      type="text"
                      class="form-control"
                      name="name"
                      required
                      placeholder="输入昵称111"
                      v-model="user_name"
                      v-else
                    />
                  </div>
                  <div class="form-group">
                    <label>电话</label>
                    <input
                      type="tel"
                      class="form-control"
                      name="phone"
                      placeholder="输入电话"
                      required
                      pattern="^(\+86)?1\d{10}$"
                      v-model="phone"
                      v-if="!userInfo.username"
                    />
                    <input
                      type="tel"
                      class="form-control"
                      name="phone"
                      required
                      placeholder="输入电话111"
                      pattern="^(\+86)?1\d{10}$"
                      v-model="user_phone"
                      v-else
                    />
                  </div>
                  <div class="form-group">
                    <label>邮箱</label>
                    <input
                      type="text"
                      class="form-control"
                      name="address"
                      placeholder="输入邮箱"
                      required
                      v-if="!userInfo.username"
                      v-model="email"
                    />
                    <input
                      type="text"
                      class="form-control"
                      name="address"
                      placeholder="输入邮箱1111"
                      required
                      v-model="user_email"
                      v-else
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    class="btn btn-default"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    取消
                  </button>
                  <button class="btn btn-info">完成</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="login-out">
        <mt-button type="danger" style="width: 100%" @click="logout"
          >退出</mt-button
        >
      </div>
      <footer></footer>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
// 导入获取用户信息，添加用户信息，更新用户信息,更新用户头像接口
import { getUserInfo, insertUserInfo, updateUserInfo, updateUserPic} from "@/api/index.js";

//导入oss模块
import OSS from "ali-oss";
//配置阿里oss参数
const client = new OSS({
  accessKeyId: "xxxx", // 查看你自己的阿里云KEY
  accessKeySecret: "xxxx", // 查看自己的阿里云KEYSECRET
  bucket: "xxxx", // 你的 OSS bucket 名称
  region: "xxxx", // bucket 所在地址，我的是 华北2 北京
  // cname: true // 开启自定义域名上传
  // endpoint:"file.xxxx.live" // 自己的域名
});

export default {
  name: "UserInfo",
  components: {},
  data() {
    return {
      userInfo: {}, // 用户详情
      realname: "", // 用户名
      phone: "", // 手机号
      email: "", // 邮箱
      user_name: "", // 用户已有的昵称
      user_phone: "", // 用户已有的手机号
      user_email: "", // 用户已有的邮箱
      imgStr: require('./image/avatar.jpg'), // 上传图片的BASE64
    };
  },
  methods: {
    // 退出操作
    logout() {
      MessageBox.confirm("确定退出登录?").then(
        (action) => {
          // 分发退出动作
          this.$store.dispatch("logout");
          // 跳转到登录界面
          this.$router.push("/login");
        },
        (action) => {
          console.log("取消");
        }
      );
    },
    // 更新用户信息
    async updateUserInfo() {
      if (!this.userInfo.realname) {
        // console.log("添加");
        let realname = this.realname,
          phone = this.phone,
          email = this.email,
          username = this.$route.params.username;
        // console.log(realname, phone, email, username);
        let result = await insertUserInfo(realname, phone, email, username);
        // console.log(result)
        if (result.msg === "ok") {
          // 返回当前界面
          this.$router.go(0);
        }
      } else {
        // console.log("更 新");

        let user_name = this.user_name,
          user_phone = this.user_phone,
          user_email = this.user_email,
          username = this.$route.params.username;
        let result = await updateUserInfo(
          user_name,
          user_phone,
          user_email,
          username
        );
        // console.log(result)
        if (result.msg === "ok") {
          // 返回当前界面
          this.$router.go(0);
        }
      }
    },

    //更换头像
    async onchangeImgFun(e) {
      //file 是上传文件
      var file = e.target.files[0];
      //上传文件名字
      var fileNames = file.name;
      // console.log(file);
      // console.log(fileNames);
      // return;
      // 获取图片的大小，做大小限制有用
      let imgSize = file.size;
      // console.log(imgSize);
      var _this = this; // this指向问题，所以在外面先定义
      // 比如上传头像限制5M大小，这里获取的大小单位是b
      if (imgSize <= 5000 * 1024) {
        // 合格
        _this.errorStr = "";
        console.log("大小合适");
        // 开始渲染选择的图片
        // 本地路径方法 1
        // this.imgStr = window.URL.createObjectURL(e.target.files[0]);
        // console.log(window.URL.createObjectURL(e.target.files[0])); // 获取当前文件的信息
        // base64方法 2
        var reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result;
          // console.log(dataURL);
          _this.imgStr = dataURL;
          // 下面逻辑处理
        };
        //阿里oss上传头像
        // 上传文件,这里是上传到OSS
        //put是上传头像的核心方法
        //fileNames  上传头像的名字
        //上传头像的文件
        await client.put(fileNames, file).then((res) => {
          if (res.res.statusCode === 200) {
            // options.onSuccess(res);
            console.log("上传成功");
          } else {
            options.onError("上传失败");
          }
        });
        //调用后端接口代码位置,更新数据库的数据
        let result = await updateUserPic(fileNames, this.$route.params.username)
        if (result.msg === "ok") {
          this.$router.go(0);
        }
      } else {
        console.log("大小不合适");
        _this.errorStr = "图片大小超出范围";
      }
    },
  },
  // mounted
  async mounted() {
    let username = this.$route.params.username;
    // console.log(username)
    let result = await getUserInfo(username);
    // console.log("213", result);
    this.userInfo = result;
    // console.log(result)
    // 已有的用户信息
    this.user_name = result.realname;
    this.user_phone = result.phone;
    this.user_email = result.email;
  },
};
</script>

<style scoped>
@charset "utf-8";
body {
  margin: 0;
  padding: 0;
  background-color: #eeeeee;
  font-family: 微软雅黑;
}

ul {
  list-style: none;
  margin: 0 0 0 7.5em;
  padding: 0;
}

li {
  line-height: 18px;
}


header {
  width: 100%;
  height: 3em;
  background-color: #F457A3;
  color: white;
}

header p {
  text-align: center;
  line-height: 3em;
}

.content {
  width: 100%;
  background-color: #ffffff;
}

.detail {
  background-color: #ffffff;
  height: auto;
  margin-top: 1em;
  padding: 10px;
  position: relative;
}

.detail li,
.detail span {
  font-size: 14px;
  color: #666;
  line-height: 22px;
}

.edit {
  background-color: #ffffff;
  height: 2em;
  width: 100%;
  margin-top: 5em;
  clear: both;
}

.edit >>> label {
  margin: 0;
  font-weight: 300;
}

.login-out {
  background-color: #ffffff;
  height: 2em;
  width: 100%;
  margin-top: 5em;
  margin-bottom: 0.5em;
}

.footer {
  width: 100%;
  height: 2em;
  background-color: rgb(75, 75, 75);
}

img {
  width: 7em;
  border: 1px solid grey;
  position: absolute;
  top: 0.5em;
  left: 0.5em;
}

a {
  text-decoration: none;
  display: inline-block;
  height: 2em;
  text-align: center;
  width: 100%;
  line-height: 2em;
  color: black;
}

.block {
  display: inline-block;
  height: auto;
  word-wrap: break-word;
  width: auto;
}
.back {
  position: absolute;
  top: 5px;
  left: 0;
  text-align: left;
}
.icon-arrow_left {
  display: block;
  padding: 5px;
  font-size: 20px;
  color: #fff;
}
</style>