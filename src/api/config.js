import axios from "axios";
import router from "../router";
import ElementUI from "element-ui";

// import { config } from "vue/types/umd";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "/api" : "http://www.chst.vip";

axios.defaults.withCredentials = true; //允许请求携带认证

// //创建请求拦截器，可以给每个请求度携带上想要传递的内容
axios.interceptors.request.use(config => {
  console.log(config);
  //登入，注册是不需要携带token的,所以直接放行
  if (config.url == "/users/login") {
    return config;
  } else {
    let token = localStorage.getItem("qf2008-token");
    //config值是每一个请求对象
    config.headers["authorization"] = token;
    // //放行
    return config;
  }
});

//响应拦截：因为导航守卫仅仅只能拦截是否存在token的数据，如果有人在本地写了错误的token值在没有响应拦截的时候其实是可以进入的，
//但这样的行为是不对的，所以除了导航守卫还需要第二次响应拦截
axios.interceptors.response.use(config => {
  let { data } = config; //解构赋值 data=config.data
  if (data.code == "1004") {
    //在当前的后台api中1004代表token校验失败，提示错误，并且让页面跳转到登入页
    // alert("登陆信息失败，请重新登入")
    console.log(ElementUI);
    ElementUI.Message.error("登陆信息失效，请重新登陆");
    //如何跳转？用路由router，但要引入进来
    router.push("/login"); //这里为什么不用this.$router.push,因为this.$router指向vue实例，而这不是在vue中，而是在config.js中
  }
  return config;
});

axios.create({
  timeout: 4000
});

export default axios;
