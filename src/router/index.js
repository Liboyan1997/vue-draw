import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import draw1 from '../page/draw1.vue'
import draw2 from '../page/draw2.vue'
import draw3 from '../page/draw3.vue'
import home from '../page/home/index.vue'
// import win from '../page/win.vue'
import match from '../page/match.vue'
import best from '../page/best.vue'
import test from '../page/test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/one',
      name: 'draw1',
      component: draw1
    },
    {
      path: '/two',
      name: 'draw2',
      component: draw2
    },
    {
      path: '/three',
      name: 'draw3',
      component: draw3
    },
    // {
    //   path: '/win',
    //   name: 'win',
    //   component: win
    // },
    {
      path: '/best',
      name: 'best',
      component: best
    },
    {
      path: '/match',
      name: 'match',
      component: match
    },
    {
      path:"/",
      redirect:'/home'
    }
  ]
})
