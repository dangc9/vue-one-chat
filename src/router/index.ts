import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'chat',
    component: () => import('@/views/chat/index.vue')
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;