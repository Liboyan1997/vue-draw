import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import draw1 from '../page/test_draw_1.vue'
import draw2 from '../page/test_draw_2.vue'
import draw3 from '../page/test_draw_3.vue'
// import home from '../page/home/index.vue'
// import win from '../page/win.vue'
// import match from '../page/match.vue'
// import best from '../page/best.vue'
import test from '../page/test.vue'

Vue.use(Router)

export default new Router({
  routes: [
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

    {
      path:"/",
      redirect:'/three'
    }
  ]
})
