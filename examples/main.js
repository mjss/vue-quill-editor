import Vue from 'vue'
import App from './App.vue'

import "./main.css"
Vue.config.devtools = true

new Vue({
  render: h => h(App),
}).$mount('#editor-app')
