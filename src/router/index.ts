import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})