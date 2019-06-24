import Vue from 'vue'
import VueRouter from 'vue-router'

import Analyze from '../views/view/Analyze.vue'
import Lastresult from '../views/view/Lastresult.vue'
import Home from '../views/view/Home.vue'
import Login from '../views/view/Login.vue'
import Signup from '../views/view/Signup.vue'
import DRAG_DROP from '../views/test/Drag_Drop.vue'
import Admin from '../views/test/admin.vue'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      component: Home,
    },
    { 
      path: '/analyze',
      component: Analyze,
    },
    { 
      path: '/lastresult',
      component: Lastresult,
    },
    { 
      path: '/login',
      component: Login,
    },
    { 
      path: '/signup',
      component: Signup,
    },
    {
      path: '/test',
      component: DRAG_DROP
    },
    {
      path: '/admin',
      component: Admin
    }
]

const router = new VueRouter({
    mode: 'history',
    routes, // routes: routes    
})

router.beforeEach((to,from,next)=>{
  console.log('beforeach to : ',to)
  next()
})

export default router