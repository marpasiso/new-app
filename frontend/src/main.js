import Vue from 'vue'
import App from './App'
import vuetify from './plugins/vuetify';

import store from './config/store'
import router from './config/router'

import './config/bootstrap'
import './config/msgs'
Vue.config.productionTip = false

new Vue({
	store,
	router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
