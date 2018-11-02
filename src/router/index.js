import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Login from '@/components/Login';
import IdCheck from '@/components/personal/identity/IdCheck';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [ // 这里就是二级路由的配置
        {
          path: 'personal/identity/idCheck',
          name: 'personal',
          component: IdCheck
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});
