<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边栏菜单栏 -->
      <el-aside width="200px">
        <subMenu></subMenu>
      </el-aside>
      <el-container>
        <!-- 顶部栏布局 -->
        <el-header>
          <el-row type="flex" justify="space-between" class="row-bg">
            <el-col>
              <div class="tubiao">图标</div>
            </el-col>
            <el-col>
              <div>有佳管理系统</div>
            </el-col>
            <el-col>
              <div class="tupiao">
                <el-avatar
                  shape="square"
                  fit="fit"
                  src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIzXDib7zrmdYxdEQpYk85B26DZAJS6PUJC7ic4Fydibdz9L2gU3hloPcibuyo0xAFztxqPbgdVWp1zpQ/132"
                ></el-avatar>
                <span calss="nickname">欢迎您:{{ userInfo.nickname }}</span
                >&nbsp;&nbsp;
                <span @click="quit" class="quit">退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <!-- 主体区域 -->
        <el-main> </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getLoginLog } from "@/api";
import subMenu from "../../components/subMenu";
import { mapState } from "vuex"; //引入userInfo，并将它的userInfo.nickname渲染到页面上
export default {
  mounted() {
    getLoginLog().then(res => {
      console.log(res);
    });
  },
  components: {
    subMenu
  },
  computed: {
    ...mapState(["userInfo"])
  },
  //   data() {
  //     return {
  //       isCollapse: true,
  //     };
  //   },
  //   methods: {
  //     handleOpen(key, keyPath) {
  //       console.log(key, keyPath);
  //     },
  //     handleClose(key, keyPath) {
  //       console.log(key, keyPath);
  //     },
  //   },

  methods: {
    quit() {
      //退出登入
      //1，清除token和userInfo
      //2.跳转到登入页
      localStorage.removeItem("qf2008-token");
      localStorage.removeItem("qf2008-userInfo");
      this.$router.push("/login");
    }
  }
};
</script>
<style>
.quit {
  cursor: pointer; /* 意思是啥，记得看看 */
  color: pink;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
/* 修改avatar样式 */
.el-avatar.el-avatar--square {
  vertical-align: middle;
  margin-right: 10px;
}

/* 顶部栏样式 */
.row-bg {
  background-color: greenyellow;
}
.tubiao {
  border-radius: 4px;
  min-height: 60px;
}
/* container样式 */
.el-header {
  background-color: #e9eef3;
  color: black;
  text-align: center;
  line-height: 60px;
  padding: 0;
}
/* .el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
} */

/* .el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
} */

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
