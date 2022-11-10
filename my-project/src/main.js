// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/style.scss';
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import ElementLocale from 'element-ui/lib/locale';

Vue.config.productionTip = false

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.use(Element, { ElementLocale });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
