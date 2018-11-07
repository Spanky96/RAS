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
import BankV4 from '@/components/personal/identity/BankV4';
import BaseBank from '@/components/personal/identity/BaseBank';

import OperatorV2 from '@/components/personal/operators/OperatorV2';
import OperatorV3 from '@/components/personal/operators/OperatorV3';
import InNetTime from '@/components/personal/operators/InNetTime';
import InNetStatus from '@/components/personal/operators/InNetStatus';
import MobileConsume from '@/components/personal/operators/MobileConsume';

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
        },
        {
          path: 'personal/identity/bankV4',
          name: 'BankV4',
          component: BankV4
        },
        {
          path: 'personal/identity/baseBank',
          name: 'BaseBank',
          component: BaseBank
        },
        {
          path: 'personal/operators/operatorV2',
          name: 'OperatorV2',
          component: OperatorV2
        },
        {
          path: 'personal/operators/operatorV3',
          name: 'OperatorV3',
          component: OperatorV3
        },
        {
          path: 'personal/operators/inNetTime',
          name: 'InNetTime',
          component: InNetTime
        },
        {
          path: 'personal/operators/inNetStatus',
          name: 'InNetStatus',
          component: InNetStatus
        },
        {
          path: 'personal/operators/mobileConsume',
          name: 'MobileConsume',
          component: MobileConsume
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
