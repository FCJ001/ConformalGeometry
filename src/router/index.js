import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/article'
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/Article.vue')
    // meta: {
    //   keepAlive: true
    // }
  },
  {
    path: '/admin/login',
    name: 'adminlogin',
    component: () => import('../admin/adminLogin.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../components/ArticleComponents/detail.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/admin/article',
    name: 'admin',
    component: () => import('../admin/articleEditor.vue'),
    redirect: '/admin/article/upload/articleManage',
    children: [
      {
        path: '/admin/article/upload/articleManage',
        name: 'articleManage',
        component: () => import('../admin/articleManage.vue')
      },
      {
        path: '/admin/article/upload/articlePublish',
        name: 'articlePublish',
        component: () => import('../admin/articlePublish.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
