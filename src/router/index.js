import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/index/Index"
import Login from "@/components/index/LoginPanel"
import Register from "@/components/index/RegisterPanel"
import Validation from "@/components/index/ValidationPanel"
import StudentMain from "@/components/student/StudentMain"
import StudentCourseList from "@/components/student/course/StudentCourseList";
import StudentInfo from "@/components/student/StudentInfo";
import TeacherMain from "@/components/teacher/TeacherMain";
import Forum from "@/components/forum/Forum";
import TeacherCourses from "@/components/teacher/course/TeacherCourses";
import TeacherInfo from "@/components/teacher/TeacherInfo";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminCourse from "@/components/admin/course/AdminCourse";
import AdminMain from "@/components/admin/AdminMain";
import AdminRelease from "@/components/admin/release/AdminRelease";
import ForumContent from "@/components/forum/ForumContent";
import Poster from "@/components/forum/Poster";
import StudentAvailableCourse from "@/components/student/course/StudentAvailableCourse";
import TeacherCourse from "@/components/teacher/courseInfo/TeacherCourse";
import StudentCourse from "@/components/student/courseInfo/StudentCourse";


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
          path: 'course/:id/:releaseId',
          component: StudentCourse
        },
        {
          path: 'myCourse',
          component: StudentCourseList
        },
        {
          path: 'allCourse',
          component: StudentAvailableCourse
        },
        {
          path: 'info',
          component: StudentInfo
        },
        {
          path: 'forum',
          component: Forum,
        },
        {
          path: "forum/:id",
          component: ForumContent
        },
        {
          path: "forum/:id/:posterId",
          component: Poster
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
          component: TeacherCourses
        },
        {
          path: 'course/:id',
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
