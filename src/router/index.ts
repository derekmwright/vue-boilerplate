import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { Auth } from 'aws-amplify'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue'),
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  if (to.meta.requireAuth) {
    try {
      await Auth.currentSession()
    } catch {
      router.push('login')
    }
  }

  if (to.name == 'login') {
    try {
      await Auth.currentSession()
      router.push('dashboard')
    } catch {
      return true
    }
  }
})
