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
  </div>
</template>

<script>
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
  methods: {
    submitForm(formName) {
      // console.log(this.$refs[formName])
      this.$refs[formName].validate(valid => {
        if (valid) {
          //代表本地校验通过
          alert("submit!");
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
