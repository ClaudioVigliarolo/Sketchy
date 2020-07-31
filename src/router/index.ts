import Vue from 'vue';
import Router, { Route } from 'vue-router';
import Registration from '@/components/auth/Registration.vue';
import Login from '@/components/auth/Login.vue';
import MainPage from '@/components/MainPage.vue';
import { auth } from '../firebase';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Registration',
      component: Registration,
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router;
