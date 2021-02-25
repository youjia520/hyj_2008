<template>
  <div class="login-page">
    <div class="left"></div>
    <div class="loginContainer">
      <h1 class="title">有佳的管理系统</h1>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm('loginForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <video
      class="bg_video"
      muted
      src="../../assets/video/bg_video.mp4"
      autoplay
      loop
      preload="auto"
    ></video>
    <!-- muted 规定视频的音频输出应该被静音
         autoplay 如果出现该属性，则视频在就绪后马上播放
         loop 如果出现该视频，则当媒介文件完成播放后再次开始播放
         preload 如果出现该属性，则视频在页面加载时进行加载，并预备播放
                 如果使用autoplay，则忽略该属性-->

    <!-- 三个el-form-item，代表有三个主要的部分，一个放用户名，一个放密码，一个放提交按钮 -->
  </div>
</template>

<script>
//登入逻辑的实现
//1.手机用户输入的username和password传递给后端
//2.登入通过后，将后端返回的token存到本地,跳转到本地
//3.每次请求的时候，携带token
//4.展示token校验正确的数据
//5.校验不通过，跳转到登入页

import { login } from "@/api";
import { mapMutations } from "vuex";
export default {
  data() {
    /**
     *
     * @param  {object}           rule 就是一个表单验证对象
     * @param  {String}           value 输入值
     * @param  {Function}         callback 校验通过不传参 不通过就传参
     */
    var validateUsername = (rule, value, callback) => {
      // console.log(rule);
      // console.log(value);//即为输入值
      //用户名正则，4到16位（字母，数字，下划线，减号）
      var uPattern = /^[a-zA-Z0-9_-]{3,16}$/;
      if (!uPattern.test(value)) {
        //value即为输入的值，这句话就是校验输入值的；取非就是说如果校验不通过
        callback("3到16位（字母，数字，下划线，减号）");
      } else {
        callback();
      }

      /*  这是一开始的一个校验写法
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.loginForm.password !== "") {
          this.$refs.loginForm.validateField("password");
        }
        callback();
      } 
    */
    };
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        //value即为输入的值
        callback("请输入密码");
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  /* 点击提交按钮，触发submitForm事件；通过this.$refs获取到一个值，if语句判断，如果本地校验通过，会发生的逻辑：
     1.打开登录页面加载动画（这部分elemnent ui上找，有很多效果图）
     2.login事件，传递账号和密码给后端，如果传输成功会发生的事：
                      one：服务器响应，关闭动画；
                      two：再次给判断，如果密码和账号正确，就会跳转到另一个页面，同时将后端返回的token数据保存到本地，
                      最后还有 this.$message.success("登录成功")会有效果出现，更好看一点
  */
  methods: {
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      // console.log(this.$refs[formName])
      //ref用于给组件或者dom元素注册引用信息，这些引用信息可以通过$refs获取
      //1.ref作用在dom元素上的时候，可以获取当前ref所在的真是的dom
      //2.作用在子组件上
      //3.ref虽然可以完成父子传值的过程，但获取到的是一个静态值，不会即使更新
      this.$refs[formName].validate(valid => {
        if (valid) {
          //代表本地校验通过
          //  console.log(this.loginForm.username,this.loginForm.password);

          //打开登录页面加载动画
          const loading = this.$loading({
            lock: true,
            text: "正在登录...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          login(this.loginForm.username, this.loginForm.password)
            .then(res => {
              //服务器响应，关闭动画
              loading.close();

              console.log(res);
              if (res.data.state) {
                //用户名和密码正确
                this.$message.success("登录成功");
                //再登陆请求成功后，会返回一个token值，用localstorage保存
                localStorage.setItem("qf2008-token", res.data.token);
                localStorage.setItem(
                  "qf2008-userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                //更改vuex中state["userInfo"]的值
                this.SET_USERINFO(res.data.userInfo);
                //跳转到主页
                this.$router.push("/home");
              } else {
                // alert("用户名密码错误");
                this.$message.error("用户名或密码错误");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.login-page {
  width: 100%;
  height: 100%;
  background: url("../../assets/imgs/bg.jpg");
  overflow: hidden;
}
.left {
  width: 50%;
  height: 100%;
  background-image: url("../../assets/imgs/bg2.png");
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: 60% 65%;
  position: absolute;
  opacity: 0.7;
}
.loginContainer {
  width: 400px;
  height: 480px;
  position: relative;
  top: 50%;
  left: 75%;
  position: absolute;
  transform: translate(-50%, -50%);
  background: rgba(83, 107, 182, 0.46);
  background: rgba(0, 0, 0, 0.2);
  z-index: 3;
  text-align: center;
}
.title {
  color: #fff;
  margin-top: 100px;
  margin-bottom: 50px;
}
/* .bg_video{
  display: block;
  margin: auto;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
} */
/* 表单样式 */
.el-form {
  width: 400px;
}
</style>
