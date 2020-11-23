import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Goods from '../components/Goods/goods.vue'
import User from '../components/User/user.vue'
import Data from '../components/Data/data.vue'
import GoodsStock from '../components/Goods/goodsStock.vue'
import Show from '../components/Music/show.vue'
import Musiclist from '../components/Music/musiclist.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/goods', component: Goods },
        { path: '/goodsStock', component: GoodsStock },
        { path: '/users', component: User },
        { path: '/data', component: Data },
        { path: '/show', component: Show },
        { path: '/musiclist', component: Musiclist }
      ]
    }
  ]
})
// 路由导航首位
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const succse = window.sessionStorage.getItem('login')
  if (!succse) {
    return next('login')
  } else {
    next()
  }
})

export default router
