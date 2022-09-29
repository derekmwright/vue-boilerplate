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
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: () => import('@/views/auth/Forgot.vue')
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

  // If someone has a valid login, they dont need these routes. They should logout first - redirect to dashboard.
  if (to.name == 'login' || to.name == 'register' || to.name == 'forgot') {
    try {
      await Auth.currentSession()
      router.push('dashboard')
    } catch {
      return true
    }
  }
})
