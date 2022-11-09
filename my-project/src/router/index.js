import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import Tables from '../components/Tables';
import Charts from "../components/Charts";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/tables',
      name: 'Tables',
      component: Tables
    },
    {
      path: '/charts',
      name: 'Charts',
      component: Charts
    }
  ]
})
