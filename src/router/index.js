import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
  },
  {
    path: '/goal/:id',
    name: 'goal',
    component: () => import('@/views/Goal'),
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

export default router
