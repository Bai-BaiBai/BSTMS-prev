import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Main from '../components/Main'
import Balance from '../components/Balance'
import UpdatePassword from '../components/UpdatePassword'
import SaveMoney from '../components/SaveMoney'
import GetMoney from '../components/GetMoney'
import Transfer from '../components/Transfer'
import Consult from '../components/Consult'
import ConsultBusiness from '../components/ConsultBusiness'
import ConsultRate from '../components/ConsultRate'
import CreateAccount from '../components/CreateAccount'
import ExchangeCurrency from '../components/ExchangeCurrency'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'balance',
          name: 'Balance',
          component: Balance
        },
        {
          path: 'updatePassword',
          name: 'UpdatePassword',
          component: UpdatePassword
        },
        {
          path: 'saveMoney',
          name: 'SaveMoney',
          component: SaveMoney
        },
        {
          path: 'getMoney',
          name: 'GetMoney',
          component: GetMoney
        },
        {
          path: 'transfer',
          name: 'Transfer',
          component: Transfer
        },
        {
          path: 'exchangeCurrency',
          name: 'ExchangeCurrency',
          component: ExchangeCurrency
        }
      ]
    },
    {
      path: '/consult',
      name: 'Consult',
      component: Consult,
      children: [
        {
          path: 'consultBusiness',
          name: 'ConsultBusiness',
          component: ConsultBusiness
        },
        {
          path: 'consultRate',
          name: 'ConsultRate',
          component: ConsultRate
        }
      ]
    },
    {
      path: '/createAccount',
      name: 'CreateAccount',
      component: CreateAccount
    }
  ]
})
