import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/goal/:id',
    name: 'goal',
    component: () => import('@/views/Goal'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  const currentUser = await getCurrentUser()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (currentUser) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    currentUser && to.name === 'login' ? next({ name: 'home' }) : next()
  }
})

export default router
