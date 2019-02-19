import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/index/Login";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Login
    }
  ]
})
