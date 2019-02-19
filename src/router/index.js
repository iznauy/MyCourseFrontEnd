import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/index/Index"
import Login from "@/components/index/LoginPanel"
import Register from "@/components/index/RegisterPanel"
import Validation from "@/components/index/ValidationPanel"
import StudentMain from "@/components/student/StudentMain"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '',
          redirect: 'login'
        },
        {
          path: 'login',
          component: Login

        },
        {
          path: "register",
          component: Register
        },
        {
          path: "validation",
          component: Validation
        }
      ]
    },
    {
      path: '',
      redirect: 'index'
    },
    {
      path: '/worker',
      component: StudentMain
    }
  ]
})
