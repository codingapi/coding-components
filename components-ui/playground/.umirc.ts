import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  dva: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: 'CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: 'Dva示例',
      path: '/dva',
      routes: [
        {
          name: ' dva1',
          path: '/dva/test1',
          component: './dva/test1',
        },
        {
          name: ' dva2',
          path: '/dva/test2',
          component: './dva/test2',
        },
      ],
    },

    {
      name: 'Event实例',
      path: '/event',
      component: './event/index',
    },

    {
      name: 'Bean实例',
      path: '/bean',
      component: './bean/index',
    },

    {
      name: 'Avatar实例',
      path: '/avatar',
      component: './avatar/index',
    },
  ],
  npmClient: 'yarn',
});
