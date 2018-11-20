<template>
  <div>
    <el-container>
       <el-header>
        <div class="company-logo" :class="{collapse: isCollapse}">天眼大数据风控系统</div>
        <div class="toggle-btn" @click="isCollapse = !isCollapse;"><i class="iconfont icon-zhankai"></i></div>
        <el-menu
          :default-active="defultActive"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#00142A"
          text-color="rgba(255, 255, 255, 0.65)"
          active-text-color="#409eff">
          <el-menu-item :index="item.index" v-for="(item, index) in menu" :key="index" @click="changeView(item, index)">{{item.name}}</el-menu-item>
        </el-menu>
        <el-dropdown @command="handleDropdownMenuCommand">
          <el-button class="dropdown-btn">
            <i class="el-icon-setting"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changePW">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu background-color="#00142A" text-color="rgba(255, 255, 255, 0.65)"
            active-text-color="#409eff" class="el-menu-vertical-demo"
            @open="handleOpen" @close="handleClose"
            :collapse="isCollapse">
              <el-submenu :index="func.index" v-for="(func, index) in menu[currentIndex].functions" :key="index">
                <template slot="title">
                  <i v-if="func.icon" class="iconfont" :class="'icon-' + func.icon"></i>
                  <span slot="title">{{func.name}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item :index="sub.index" v-for="(sub, index) in func.subs" :key="index" @click="linkView(sub.index)">
                    <i v-if="sub.icon" class="iconfont" :class="'icon-' + sub.icon"></i>{{sub.name}}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
        </el-aside>
        <el-main :class="{collapse: isCollapse}" class="mainbody sub-page"><router-view @print="print"></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: "Index",
    components: {},

    data () {
      var authorization = this.$db.get('authorization');
      if (!authorization) {
        this.$router.push({path: '/login'});
      }
      // index 为导航插件的必要项，我们同时也把它当作我们的路由path
      var menu = [
        {
          index: "/guide",
          name: '风控向导',
          link: 'guide'
        },
        {
          index: "2",
          name: '个人信息',
          functions: [
            {name: '身份核验',
            icon: '2shenfenzhenghaoma',
            index: "2-1",
            subs: [
              {name: '身份证二要素', index: '/personal/identity/idCheck', icon: 'shenfenxinxiyanzheng'},
              {name: '户籍信息验证', index: "/personal/identity/register", icon: '2shenfenzhenghaoma'},
              {name: '通行证一致性验证', index: "/personal/identity/PassCheck", icon: '2shenfenzhenghaoma'},
              {name: '失效身份证一致性验证', index: "/personal/identity/invalid", icon: 'Id'},
              {name: '银行卡三要素', index: "/personal/identity/bankV3", icon: 'xinyongqia'},
              {name: '银行卡四要素', index: "/personal/identity/bankV4", icon: 'xinyongqia'},
              {name: '开户行查询', index: "/personal/identity/baseBank", icon: 'xinyongqia1'}
            ]},
            {name: '运营商验证',
            icon: 'yunyingshang',
            index: "2-2",
            subs: [
              {name: '运营商二要素认证', index: "/personal/operators/operatorV2", icon: 'yunyingshang-xuanzhong'},
              {name: '运营商三要素认证', index: "/personal/operators/operatorV3", icon: 'yunyingshang-xuanzhong'},
              {name: '手机在网时长', index: "/personal/operators/inNetTime", icon: 'iconfonticon-jianko'},
              {name: '手机在网状态', index: "/personal/operators/inNetStatus", icon: 'iconfonticon-baobia'},
              {name: '手机消费档次', index: "/personal/operators/mobileConsume", icon: 'jilu1'},
              {name: '运营商手机位置核验', index: "/personal/operators/MobileAreaCheck", icon: 'yunyingshang-xuanzhong'}
            ]},
            {name: '风险提示',
            index: "2-3",
            icon: 'risk',
            subs: [
              {name: '综合风险报告', index: "/personal/riskTips/personalRiskInfo", icon: 'chakantiezigengduoheimingdan'},
              {name: '综合风险高级报告', index: "/personal/riskTips/HoneyPot", icon: 'hetongpingshen'},
              {name: '个人负面风险综合报告', index: "/personal/riskTips/personalNegativeInfo", icon: 'fengxianzhongxin'},
              {name: '不良信息排查', index: "/personal/riskTips/negativeInfo", icon: 'fengxianfenxi'},
              {name: '个人涉诉-A', index: "/personal/riskTips/personalLawsuitA", icon: 'renzhengshenhe'},
              {name: '多重借贷', index: "/personal/riskTips/multipleLoan", icon: 'duotoujiedai--'},
              {name: '名下关联企业', index: "/personal/tradeCredit/PersonalEnterprise", icon: 'qiyechaxun_huaban'}
              // {name: '个人信用认证', index: "/personal/riskTips/individualCredit", icon: 'hetongpingshen'},
              // {name: '失信执行', index: "/2-3-7", icon: '2shenfenzhenghaoma'}
            ]},
            {name: '交易信用信息',
            index: "2-4",
            icon: 'jiaoyi',
            subs: [
              {name: '消费等级', index: "/personal/tradeCredit/ConsumptionLevel", icon: 'zongheyewutongji'},
              {name: '资产令牌', index: "/personal/tradeCredit/AssetQuery", icon: 'chuzheng'},
              {name: '航旅信息', index: "/personal/tradeCredit/AirTravel", icon: 'lvyou'},
              {name: '银行卡交易信息', index: "/personal/tradeCredit/BankCardTransaction", icon: 'zhifuweikuan'}
            ]},
            {name: '爬虫数据类',
            icon: 'bug',
            index: "2-5",
            subs: [
              {name: '运营商信用报告高级版', index: "/personal/python/operatorReport", icon: 'yunyingshang'},
              {name: '运营商信用报告', index: "/personal/python/operatorCredit", icon: 'yunyingshang'},
              {name: '淘宝报告', index: "/personal/python/alitao", icon: 'unie651'},
              {name: '支付宝报告', index: "/personal/python/alipay", icon: 'zhifubao'},
              {name: '芝麻分认证', index: "/personal/python/zhima", icon: 'logo'},
              {name: '京东报告', index: "/personal/python/jd", icon: 'jingdongbaitiao'},
              {name: '社保', index: "/personal/python/socialSecurity", icon: 'renlishebao'},
              {name: '公积金', index: "/personal/python/accumulation", icon: 'dkw_gongjijin'}
            ]}
          ]
        },
        {
          index: "3",
          name: '企业信息',
          functions: [
            {name: '工商信息',
            icon: 'web-icon-',
            index: "3-1",
            subs: [
              {name: '企业工商数据查询', index: "/enterpriseInfo/industryAndCommerce/BusinessData", icon: 'qiyechaxun_huaban'},
              {name: '统一社会信用代码信息', index: "/enterpriseInfo/industryAndCommerce/UnifiedCredit", icon: 'tixirenzheng'},
              {name: '行政许可信息', index: "/enterpriseInfo/industryAndCommerce/AdministrativePermission", icon: 'chuzheng'},
              {name: '企业经营异常名录', index: "/enterpriseInfo/industryAndCommerce/EnterpriseOperationError", icon: 'jilu1'}
            ]},
            {name: '风险提示',
            icon: 'shishifengxianqingdan',
            index: "3-2",
            subs: [
              {name: '企业涉诉查询-A', index: "/enterpriseInfo/enterpriseRiskTips/EnterpriseLawsuitA", icon: 'web-icon-'},
              {name: '企业涉诉查询-C', index: "/enterpriseInfo/enterpriseRiskTips/EnterpriseLawsuitC", icon: 'web-icon-'},
              // {name: '法人负面信息', index: "3-2-3", icon: 'fengxianzhongxin'},
              {name: '重大税收违法案件警示', index: "/enterpriseInfo/enterpriseRiskTips/IllegalTax", icon: 'huaban'},
              {name: '政府采购严重违法失信名单', index: "/enterpriseInfo/enterpriseRiskTips/IllegalGovernmentProcurement", icon: 'gongshangshixin'}
            ]}
          ]
        },
        {
          index: "4",
          name: '车辆信息',
          functions: [
            {name: '车辆信息',
            icon: 'cheliangguanli',
            index: "4-1",
            subs: [
              {name: '行驶证信息查询', index: "/carInfo/carInfoSon/VehicleLicenseInfo", icon: 'buhuanhangshizheng'},
              {name: '车辆详情核验', index: "/carInfo/carInfoSon/VehicleDetails", icon: 'chepai'},
              {name: '驾驶证扣分查询', index: "/carInfo/carInfoSon/LicenseDeductMarks", icon: 'chaxunjiashizhengxinxi'},
              // {name: '出险记录（未开放）', index: "4-4", icon: 'cheliangpengzhuang'},
              {name: '车辆违章查询', index: "/carInfo/carInfoSon/VehicleViolation", icon: 'weizhang'}
            ]}
          ]
        },
        {
          index: "5",
          name: '综合报告',
          functions: [
            {
              name: '综合报告',
               icon: 'iconfonticon-dingwe',
              index: "5-1",
              subs: [
                {name: '个人综合报告', index: "/comprehensiveReport/comprehensiveReportSon/Person", icon: 'baogao-copy'},
                {name: '企业综合报告', index: "/comprehensiveReport/comprehensiveReportSon/Enterprise", icon: 'icon-book'}
              ]
            }
          ]
        }
      ];
      return {
        currentIndex: 1,
        menu: menu,
        defultActive: "2",
        isCollapse: false
      };
    },

    methods: {
      changeView (menuItem, menuIndex) {
        this.currentIndex = menuIndex;
        if (!menuItem.functions) {
          // menu 无子菜单
          this.isCollapse = true;
          this.$router.push({path: menuItem.index});
        }
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath);
      },
      linkView (key) {
        this.$router.push({path: key});
      },
      handleDropdownMenuCommand (command) {
        if (command === 'logout') {
          this.$db.remove('authorization');
          this.$router.push({path: '/login'});
        }
        if (command === 'changePW') {
          this.$router.push({path: '/resetPassword'});
        }
      },
      print: function (data) {
        this.$print(document.getElementById(data.dom || 'resultTable'), data.title);
      }
    }
  };

</script>
<style lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    min-height: 400px;
  }
  .el-menu-vertical-demo {
    border-right: 1px solid rgb(84, 92, 100);
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    i {
      font-size: 18px;
      margin-right: 10px;
    }
  }
  .el-menu-demo {
    &.el-menu--horizontal {
      border-bottom: none;
    }
    .el-menu-item.is-active {
      border-bottom: 4px solid #409EFF;
    }
  }
  .el-menu--vertical {
    i {
      font-size: 18px;
      margin-right: 10px;
    }
  }
  .el-header {
    padding: 0;
    display: flex;
    background: #00142A;
    font-size: 24px;
    line-height: 60px;
    text-align: center;
    color: white;
    .toggle-btn {
      width: 60px;
      cursor: pointer;
      i {
        font-size: 20px;
        line-height: 60px;
      }
    }
    .company-logo {
      background: #002140;
      width: 251px;
      &.collapse {
        width: 65px;
        color: #409eff;
      }
    }
    .el-menu-demo {
      flex-grow: 1;
      overflow: hidden;
    }
    .dropdown-btn {
      background: none;
      border: none;
      color: white;
      font-size: 25px;
      height: 55px;
      margin-right: 10px;
      line-height: 45px;
    }
  }
  .el-main {
    &.collapse {
      margin-left: -245px;
      left: 310px;
    }
    margin-left: -50px;
    left: 301px;
  }
  .sub-page {
    background: url(../assets/imgs/mainbody.png);
    position: absolute;
    right: 0;
    bottom: 0;
    top: 59px;
  }
</style>
