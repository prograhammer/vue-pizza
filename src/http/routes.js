/**
 * Every route becomes a chunk, loaded only when used.
 * Reduces size of initial App load.
 */
const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/features/login/main.vue'),
    title: 'Login',
    layout: 'PublicLayout',
    isPublic: true
  },
  {
    name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/dashboard/main.vue'),
    title: 'Dashboard',
    layout: 'DefaultLayout',
    isPublic: false
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/dashboard/main.vue'),
    title: 'Dashboard',
    layout: 'DefaultLayout',
    isPublic: false
  },
  {
    name: 'account',
    path: '/account',
    component: () => import(/* webpackChunkName: "account" */ '@/features/account/main.vue'),
    title: 'Account',
    layout: 'DefaultLayout',
    isPublic: false
  },
  {
    name: 'tutorial',
    path: '/examples/tutorial',
    component: () => import(/* webpackChunkName: "tutorial" */ '@/features/tutorial/main.vue'),
    title: 'Tutorial',
    layout: 'DefaultLayout',
    isPublic: false
  },
  {
    name: 'wip',
    path: '/examples/wip',
    component: () => import(/* webpackChunkName: "wip" */ '@/features/wip/main.vue'),
    title: 'Wip',
    layout: 'DefaultLayout',
    isPublic: false
  }
]

export default routes
