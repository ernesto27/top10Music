import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import HeaderElement from '@/components/HeaderElement'

Vue.use(Router)



Vue.component('headerElement', HeaderElement)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    }
  ]
})
