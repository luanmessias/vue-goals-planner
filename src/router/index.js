import { createRouter, createWebHashHistory } from 'vue-router'

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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
