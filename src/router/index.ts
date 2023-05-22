import { createRouter, createWebHistory  } from 'vue-router';

const routes = [
  {
    path: '/:chatId?',
    name: 'chat',
    component: () => import('@/views/chat/index.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;