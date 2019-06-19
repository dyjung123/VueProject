import Vue from 'vue'
import VueRouter from 'vue-router'

import Analyze from '../views/Analyze.vue'
import Lastresult from '../views/Lastresult.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import DRAG_DROP from '../views/Drag_Drop.vue'
import Admin from '../views/admin.vue'

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