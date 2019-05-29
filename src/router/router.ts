import Vue from 'vue';
import Router from 'vue-router';
import MuHost from '@/views/MuHost.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'MuHost' },
    },
    {
      name: 'MuHost',
      path: '/host',
      component: MuHost,
    },
  ],
});
