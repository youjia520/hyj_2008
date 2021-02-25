import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/styles/base.css";
import "@/assets/styles/el-reset.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
Vue.use(ElementUI);

//路由前置钩子（导航守卫）
//为什么要用这个是因为login和home页面本应该先login，登陆成功进入home页；但现在直接输入hone的地址页可以进入，此时就需要导航守卫拦截一下
router.beforeEach((to, from, next) => {
  //to 到哪去 ；from：从哪来 next：放行
  //用户登陆成功之后，在localstorage中会有token存在
  let token = localStorage.getItem("qf2008-token");
  //通过判断token是否存在来确定是否登陆成功过
  if (token) {
    //token存在
    //如果是注册页面或者是登入页面，直接放行
    next();
  } else {
    //token不存在
    if (to.path === "/login") {
      //token不存在，但是是登入页就直接放行
      next();
    } else {
      //token不存在，也不是登入页，那就让它跳转到登入页
      next({ path: "/login" });
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
