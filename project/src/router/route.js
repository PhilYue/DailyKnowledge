import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login'
import resetLogin from '@/page/resetLogin'
import register from '@/page/register'
import index from '@/page/index'
import house from '@/page/house'
import house1 from '@/page/house/house1'
import trusteeship from '@/page/house/trusteeship'
import newHouse from '@/page/house/newHouse'
import rent from '@/page/rent'
import rent1 from '@/page/rent/rent1'
import sublet from '@/page/rent/sublet'
import reserveHouse from '@/page/rent/reserveHouse'
import lease from '@/page/rent/lease'
import contract from '@/page/rent/contract'
import cancelRent from '@/page/rent/cancelRent'
import deposit from '@/page/house/deposit'
import renew from '@/page/rent/renew'
import changeHouse from '@/page/rent/changeHouse'
import service from '@/page/service'
import repair from '@/page/service/repair'
import clean from '@/page/service/clean'
import maintain from '@/page/service/maintain'
import electric from '@/page/service/electric'
import lock from '@/page/service/lock'
import water from '@/page/service/water'
import table from '@/page/table'
import search from '@/page/search'
import accountReceivable from '@/page/table/accountReceivable'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/resetLogin',
      name: 'resetLogin',
      component: resetLogin
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/house',
      name: 'house',
      component: house,
      children: [
        {
          path: 'newHouse',
          name: 'newHouse',
          component: newHouse
        },
        {
          path: 'house1',
          name: 'house1',
          component: house1
        },
        {
          path: 'deposit',
          name: 'deposit',
          component: deposit
        },
        {
          path: 'trusteeship',
          name: 'trusteeship',
          component: trusteeship
        }
      ]
    },
    {
      path: '/service',
      name: 'service',
      component: service,
      children: [
        {
          path: 'repair',
          name: 'repair',
          component: repair
        },
        {
          path: 'clean',
          name: 'clean',
          component: clean
        },
        {
          path: 'maintain',
          name: 'maintain',
          component: maintain
        },
        {
          path: 'electric',
          name: 'electric',
          component: electric
        },
        {
          path: 'lock',
          name: 'lock',
          component: lock
        },
        {
          path: 'water',
          name: 'water',
          component: water
        }
      ]
    },
    {
      path: '/rent',
      name: 'rent',
      component: rent,
      children: [
        {
          path: 'lease',
          name: 'lease',
          component: lease
        },
        {
          path: 'rent1',
          name: 'rent1',
          component: rent1
        },
        {
          path: 'reserveHouse',
          name: 'reserveHouse',
          component: reserveHouse
        },
        {
          path: 'sublet',
          name: 'sublet',
          component: sublet
        },
        {
          path: 'contract',
          name: 'contract',
          component: contract
        },
        {
          path: 'cancelRent',
          name: 'cancelRent',
          component: cancelRent
        },
        {
          path: 'renew',
          name: 'renew',
          component: renew
        },
        {
          path: 'changeHouse',
          name: 'changeHouse',
          component: changeHouse
        }
      ]
    },
    {
      path: '/table',
      name: 'table',
      component: table,
      children: [
        {
          path: 'accountReceivable',
          name: 'accountReceivable',
          component: accountReceivable
        }
      ]
    }
  ]
})
