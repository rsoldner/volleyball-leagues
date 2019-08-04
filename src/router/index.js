import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Signup from '@/components/auth/Signup'
import EmailLogin from '@/components/auth/EmailLogin'
import Schedule from '@/components/Schedule'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'EmailLogin',
      component: EmailLogin
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: Schedule
    },
  ]
})
