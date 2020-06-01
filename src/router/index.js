import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Reset from '@/components/Reset'
import Dashboard from '@/components/Dashboard'
import Team from '@/components/Team'
import Project from '@/components/Project'
import Proposal from '@/components/Proposal'
import Task from '@/components/Task'
import Notification from '@/components/Notification'
import Setting from '@/components/Setting'
import Backlog from '@/components/Backlog'
import Admin from '@/components/Admin'
import Comment from '@/components/Comment'

import firebase from 'firebase'
//import store from '@/vuex/store.js';


Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path : "/login",
      name : 'login',
      component : Login,
    },
    {
      path : "/signup",
      name : 'signup',
      component : Signup,
    },
    {
      path : "/reset",
      name : 'reset',
      component : Reset,
    },
    {
      path : "/dashboard",
      name : 'dashboard',
      component : Dashboard,
      meta:{
        requiresAuth:true
      }
    },
    {
      path : "/team",
      name : 'team',
      component : Team,
      meta:{
        requiresAuth:true
      }
    },
    {
      path : "/project",
      name : 'project',
      component : Project,
      meta:{
        requiresAuth:true
      }
    },
    {
      path : "/proposal",
      name : 'proposal',
      component : Proposal,
      meta:{
        requiresAuth:true
      }
    },
    {
      path : "/task",
      name : 'task',
      component : Task,
      meta:{
        requiresAuth:true
      }
    },
    {
      path : "/notification",
      name : 'notification',
      component : Notification,
      meta:{
        requiresAuth:true
      }
    },
    {
      path : "/setting",
      name : 'setting',
      component : Setting,
      meta:{
        requiresAuth:true
      }
    },
    {
      path : "/backlog",
      name : 'backlog',
      component : Backlog,
      meta:{
        requiresAuth:true
      }
    },
    {
      path : "/admin",
      name : 'admin',
      component : Admin,
      meta:{
        requiresAuth:true
      }
    },
    {
      path : "/comment",
      name : 'comment',
      component : Comment,
      meta:{
        requiresAuth:true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  //let adminAuth = (store.getters.userRole == 'Admin') ? true : false

  if(requiresAuth && !currentUser) {
    next('login')
  }
  else if(!requiresAuth && currentUser) {
    next('dashboard')
  }
  else {
    next()
  }
})//ROUTER

export default router
