// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import Vue2Filters from 'vue2-filters'
import moment from 'moment'

 
Vue.use(Vue2Filters)

Vue.use(VueMaterial)

Vue.config.productionTip = false

Vue.filter('ddmmyy', function(value){
    console.log('In ddmmyy filter')
    return moment(value).format("DD/MM/YY");
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


