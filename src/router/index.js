import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Login from '@/components/Login';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [ // 这里就是二级路由的配置，子页面换懒加载
        {
          path: 'guide',
          name: 'Guide',
          component: resolve => require(['@/components/Guide'], resolve)
        },
        {
          path: 'personal/identity/idCheck',
          name: 'PersonalIdentityIdCheck',
          component: resolve => require(['@/components/personal/identity/IdCheck'], resolve)
        },
        {
          path: 'personal/identity/invalid',
          name: 'PersonalIdentityInvalid',
          component: resolve => require(['@/components/personal/identity/Invalid'], resolve)
        },
        {
          path: '/face-test',
          name: 'FaceTest',
          component: resolve => require(['@/components/faceTest/FaceTest'], resolve)
        },
        {
          path: 'personal/identity/bankV3',
          name: 'BankV3',
          component: resolve => require(['@/components/personal/identity/BankV3'], resolve)
        },
        {
          path: 'personal/identity/bankV4',
          name: 'BankV4',
          component: resolve => require(['@/components/personal/identity/BankV4'], resolve)
        },
        {
          path: 'personal/identity/baseBank',
          name: 'BaseBank',
          component: resolve => require(['@/components/personal/identity/BaseBank'], resolve)
        },
        {
          path: 'personal/operators/operatorV2',
          name: 'OperatorV2',
          component: resolve => require(['@/components/personal/operators/OperatorV2'], resolve)
        },
        {
          path: 'personal/operators/operatorV3',
          name: 'OperatorV3',
          component: resolve => require(['@/components/personal/operators/OperatorV3'], resolve)
        },
        {
          path: 'personal/operators/inNetTime',
          name: 'InNetTime',
          component: resolve => require(['@/components/personal/operators/InNetTime'], resolve)
        },
        {
          path: 'personal/operators/inNetStatus',
          name: 'InNetStatus',
          component: resolve => require(['@/components/personal/operators/InNetStatus'], resolve)
        },
        {
          path: 'personal/operators/mobileConsume',
          name: 'MobileConsume',
          component: resolve => require(['@/components/personal/operators/MobileConsume'], resolve)
        },
        {
          path: 'personal/riskTips/negativeInfo',
          name: 'NegativeInfo',
          component: resolve => require(['@/components/personal/riskTips/NegativeInfo'], resolve)
        },
        {
          path: 'personal/riskTips/personalNegativeInfo',
          name: 'PersonalNegativeInfo',
          component: resolve => require(['@/components/personal/riskTips/PersonalNegativeInfo'], resolve)
        },
        {
          path: 'personal/riskTips/personalRiskInfo',
          name: 'PersonalRiskInfo',
          component: resolve => require(['@/components/personal/riskTips/PersonalRiskInfo'], resolve)
        },
        {
          path: 'personal/riskTips/personalLawsuitA',
          name: 'PersonalLawsuitA',
          component: resolve => require(['@/components/personal/riskTips/PersonalLawsuitA'], resolve)
        },
        {
          path: 'personal/riskTips/multipleLoan',
          name: 'MultipleLoan',
          component: resolve => require(['@/components/personal/riskTips/MultipleLoan'], resolve)
        },
        {
          path: 'personal/riskTips/individualCredit',
          name: 'IndividualCredit',
          component: resolve => require(['@/components/personal/riskTips/IndividualCredit'], resolve)
        },
        {
          path: 'personal/python/accumulation',
          name: 'IndividualCredit',
          component: resolve => require(['@/components/personal/python/Accumulation'], resolve)
        },
        {
          path: 'personal/python/alipay',
          name: 'IndividualCredit',
          component: resolve => require(['@/components/personal/python/AlipayReport'], resolve)
        },
        {
          path: 'personal/python/alitao',
          name: 'IndividualCredit',
          component: resolve => require(['@/components/personal/python/AlitaoReport'], resolve)
        },
        {
          path: 'personal/python/jd',
          name: 'IndividualCredit',
          component: resolve => require(['@/components/personal/python/JDReport'], resolve)
        },
        {
          path: 'personal/python/operatorCredit',
          name: 'IndividualCredit',
          component: resolve => require(['@/components/personal/python/OperatorCredit'], resolve)
        },
        {
          path: 'personal/python/operatorReport',
          name: 'IndividualCredit',
          component: resolve => require(['@/components/personal/python/OperatorReport'], resolve)
        },
        {
          path: 'personal/python/socialSecurity',
          name: 'IndividualCredit',
          component: resolve => require(['@/components/personal/python/SocialSecurity'], resolve)
        },
        {
          path: 'personal/python/zhima',
          name: 'IndividualCredit',
          component: resolve => require(['@/components/personal/python/Zhima'], resolve)
        },
        {
          path: 'personal/tradeCredit/ConsumptionLevel',
          name: 'ConsumptionLevel',
          component: resolve => require(['@/components/personal/tradeCredit/ConsumptionLevel'], resolve)
        },
        {
          path: 'personal/tradeCredit/AssetQuery',
          name: 'AssetQuery',
          component: resolve => require(['@/components/personal/tradeCredit/AssetQuery'], resolve)
        },
        {
          path: 'personal/tradeCredit/AirTravel',
          name: 'AirTravel',
          component: resolve => require(['@/components/personal/tradeCredit/AirTravel'], resolve)
        },
        {
          path: 'personal/tradeCredit/BankCardTransaction',
          name: 'BankCardTransaction',
          component: resolve => require(['@/components/personal/tradeCredit/BankCardTransaction'], resolve)
        },
        {
          path: 'enterpriseInfo/industryAndCommerce/BusinessData',
          name: 'BusinessData',
          component: resolve => require(['@/components/enterpriseInfo/industryAndCommerce/BusinessData'], resolve)
        },
        {
          path: 'personal/tradeCredit/PersonalEnterprise',
          name: 'PersonalEnterprise',
          component: resolve => require(['@/components/personal/tradeCredit/PersonalEnterprise'], resolve)
        },
        {
          path: 'carInfo/carInfoSon/VehicleLicenseInfo',
          name: 'VehicleLicenseInfo',
          component: resolve => require(['@/components/carInfo/carInfoSon/VehicleLicenseInfo'], resolve)
        },
        {
          path: 'carInfo/carInfoSon/VehicleDetails',
          name: 'VehicleDetails',
          component: resolve => require(['@/components/carInfo/carInfoSon/VehicleDetails'], resolve)
        },
        {
          path: 'carInfo/carInfoSon/LicenseDeductMarks',
          name: 'LicenseDeductMarks',
          component: resolve => require(['@/components/carInfo/carInfoSon/LicenseDeductMarks'], resolve)
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
      component: resolve => require(['@/components/ResetPassword'], resolve)
    }
  ]
});
