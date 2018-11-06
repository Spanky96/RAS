import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Login from '@/components/Login';
import ResetPassword from '@/components/ResetPassword';
import Guide from '@/components/Guide';
import PersonalIdentityIdCheck from '@/components/personal/identity/IdCheck';
import PersonalIdentityInvalid from '@/components/personal/identity/invalid';
import FaceTest from '@/components/faceTest/FaceTest';
import BankV3 from '@/components/personal/identity/BankV3';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [ // 这里就是二级路由的配置
        {
          path: 'guide',
          name: 'Guide',
          component: Guide
        },
        {
          path: 'personal/identity/idCheck',
          name: 'PersonalIdentityIdCheck',
          component: PersonalIdentityIdCheck
        },
        {
          path: 'personal/identity/invalid',
          name: 'PersonalIdentityInvalid',
          component: PersonalIdentityInvalid
        },
        {
          path: '/face-test',
          name: 'FaceTest',
          component: FaceTest
        },
        {
          path: 'personal/identity/bankV3',
          name: 'BankV3',
          component: BankV3
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/resetPassword',
      name: 'ResetPassword',
      component: ResetPassword
    }
  ]
});
