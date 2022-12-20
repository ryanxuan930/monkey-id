import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminView from '../views/AdminView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    children: [
      {
        path: '/login',
        name: 'loginPage',
        component: () => import('../views/login/LoginPage.vue'),
      },
      {
        path: 'signup',
        name: 'signupPage',
        component: () => import('../views/login/SignupPage.vue'),
      },
    ],
  },
  {
    path: '/verify',
    name: 'verifyPage',
    component: () => import('../views/VerifyView.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    children: [
      {
        path: 'login',
        name: 'adminLoginPage',
        component: () => import('../views/admin/LoginPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
