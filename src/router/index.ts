import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layouts/AppLayout.vue';
import FormView from '@/views/FormView.vue';
import PreviewView from '@/views/PreviewView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'Alef • Form',
          component: FormView,
        },
        {
          path: 'preview',
          name: 'Alef • Preview',
          component: PreviewView,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.name?.toString() || 'Alef';
  next();
});

export default router;
