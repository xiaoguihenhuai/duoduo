<template>
  <el-container class="home-container">
    <el-header>
      <div class="title">
        <img src="../assets/logo.png" alt="" />
        <span>バックオフィス管理システム</span>
      </div>
      <el-button type="info" @click="loginOut">ログアウト</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-btn" @click="toggleBtn">
          |||
        </div>
        <!--侧边菜单-->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true"
        :collapse='isCollapse' :collapse-transition="false" :router="true" :default-active="activePath"
        >
          <el-submenu :index="item.id +''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children"
            :key="subItem.id" @click="savaStatus('/' + subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menulist: [],
      iconsObj: {
        101: 'el-icon-s-custom',
        105: 'el-icon-s-shop',
        107: 'el-icon-s-tools',
        109: 'el-icon-message-solid'

      },
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    loginOut () {
      window.sessionStorage.removeItem('login')
      this.$router.push('/login')
    },
    getMenuList () {
      this.$http.get('menulist.json').then((res) => {
        this.menulist = res.data.data
      })
    },
    // 菜单的折叠展开
    toggleBtn () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    savaStatus (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 27px;
}
.el-header .title {
  display: flex;
  align-items: center;
}

.el-header .title img {
  width: 50px;
  height: 50px;
}
.el-header .title span {
  margin-left: 10px;
}

.el-aside {
  background: #333744;
}
.el-aside .el-menu{
  border: none;
}
.el-aside .toggle-btn{
  background: #4a5064;
  text-align: center;
  line-height: 24px;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-main {
  background: #eee;
}
</style>
