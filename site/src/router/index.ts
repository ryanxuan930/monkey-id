import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminView from '../views/AdminView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/',
        name: 'homePage',
        component: () => import('../views/home/HomePage.vue'),
      },
      {
        path: 'verify',
        name: 'verifyPage',
        component: () => import('../views/home/VerifyPage.vue'),
      },
    ],
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
      {
        path: 'done',
        name: 'donePage',
        component: () => import('../views/login/DonePage.vue'),
      },
      {
        path: 'reset',
        name: 'resetPage',
        component: () => import('../views/login/ResetPage.vue'),
      },
      {
        path: 'reset/password/:account/:token',
        name: 'resetPasswordPage',
        component: () => import('../views/login/VerifyPage.vue'),
      },
      {
        path: 'admin',
        name: 'adminLoginPage',
        component: () => import('../views/login/AdminPage.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    children: [
      {
        path: '/admin',
        name: 'adminHomePage',
        component: () => import('../views/admin/HomePage.vue'),
      },
      {
        path: '/admin/user',
        name: 'userListPage',
        component: () => import('../views/admin/UserPage.vue'),
      },
      {
        path: '/admin/user/:id',
        name: 'userDataPage',
        component: () => import('../views/admin/VerifyPage.vue'),
      },
      {
        path: '/admin/app',
        name: 'appListPage',
        component: () => import('../views/admin/AppPage.vue'),
      },
      {
        path: '/admin/app/add',
        name: 'addAppPage',
        component: () => import('../views/admin/app/AddAppPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
