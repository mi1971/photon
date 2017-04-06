import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Compare from '@/components/Compare'
import Repayments from '@/components/Repayments'
import Income from '@/components/Income'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/repayments',
      name: 'Repayments',
      component: Repayments
    },
    {
      path: '/compare',
      name: 'Compare',
      component: Compare
    },
    {
      path: '/income',
      name: 'Income',
      component: Income
    }
  ]
})
