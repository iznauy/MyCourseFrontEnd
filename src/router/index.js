import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/index/Index"
import Login from "@/components/index/LoginPanel"
import Register from "@/components/index/RegisterPanel"
import Validation from "@/components/index/ValidationPanel"
import StudentMain from "@/components/student/StudentMain"
import StudentCourse from "@/components/student/StudentCourse";
import StudentInfo from "@/components/student/StudentInfo";
import TeacherMain from "@/components/teacher/TeacherMain";
import Forum from "@/components/forum/Forum";
import TeacherCourse from "@/components/teacher/course/TeacherCourse";
import TeacherInfo from "@/components/teacher/TeacherInfo";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminCourse from "@/components/admin/course/AdminCourse";
import AdminMain from "@/components/admin/AdminMain";
import AdminRelease from "@/components/admin/release/AdminRelease";
import ForumContent from "@/components/forum/ForumContent";
import Poster from "@/components/forum/Poster";


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
      path: '/student',
      component: StudentMain,
      children: [
        {
          path: '',
          redirect: 'myCourse'
        },
        {
          path: 'myCourse',
          component: StudentCourse
        },
        {
          path: 'allCourse',
          component: StudentCourse
        },
        {
          path: 'info',
          component: StudentInfo
        },
        {
          path: 'forum',
          component: Forum
        }
      ]
    },
    {
      path: '/teacher',
      component: TeacherMain,
      children: [
        {
          path: '',
          redirect: 'myCourse'
        },
        {
          path: 'myCourse',
          component: TeacherCourse
        },
        {
          path: 'course',
          component: TeacherCourse
        },
        {
          path: 'info',
          component: TeacherInfo
        },
        {
          path: 'forum',
          component: Forum,
        }
      ]
    },
    {
      path: '/inside',
      component: AdminLogin,
    },
    {
      path: '/admin',
      component: AdminMain,
      children: [
        {
          path: '',
          redirect: 'checkCourse'
        },
        {
          path: 'checkCourse',
          component: AdminCourse
        },
        {
          path: 'checkRelease',
          component: AdminRelease
        },
        {
          path: 'statistics',
          component: AdminCourse
        }
      ]
    },
    {
      path: "/forum",
      component: Forum
    },
    {
      path: "/forum/:id",
      component: ForumContent
    },
    {
      path: "/forum/:id/:postId",
      component: Poster
    }
  ]
})
