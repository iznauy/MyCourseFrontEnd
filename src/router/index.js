import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/index/Index";
import StudentNavi from '@/components/student/StudentNavi'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: StudentNavi
    }
  ]
})
