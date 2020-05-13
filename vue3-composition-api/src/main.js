import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi);

Vue.config.productionTip = false

Vue.prototype.$favorites = [];
Vue.prototype.$images = [];

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
