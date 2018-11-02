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
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item :index="item.index" v-for="(item, index) in menu" :key="index" @click="changeView(index)">{{item.name}}</el-menu-item>
        </el-menu>
        <el-dropdown>
          <el-button class="dropdown-btn">
            <i class="el-icon-setting"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu background-color="#545c64" text-color="#fff"
            active-text-color="#ffd04b" class="el-menu-vertical-demo"
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
        <el-main :class="{collapse: isCollapse}"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import header from "./Header.vue";
  import aside from "./Aside.vue";

  export default {
    name: "Index",
    components: {
      "v-header": header,
      "v-aside": aside
    },

    data () {
      var menu = [
        {
          index: "1",
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
              {name: '失效身份证一致性验证', index: "/personal/identity/idCheck", icon: 'Id'},
              {name: '银行卡三要素', index: "2-1-3", icon: 'xinyongqia'},
              {name: '银行卡四要素', index: "2-1-4", icon: 'xinyongqia'},
              {name: '开户行查询', index: "2-1-5", icon: 'xinyongqia1'}
            ]},
            {name: '运营商验证',
            icon: 'yunyingshang',
            index: "2-2",
            subs: [
              {name: '运营商二要素认证', index: "2-2-1", icon: 'yunyingshang-xuanzhong'},
              {name: '运营商三要素认证', index: "2-2-2", icon: 'yunyingshang-xuanzhong'},
              {name: '运营商在网时长', index: "2-2-3", icon: 'iconfonticon-jianko'},
              {name: '运营商状态', index: "2-2-4", icon: 'iconfonticon-baobia'},
              {name: '运营商消费等级', index: "2-2-5", icon: 'jilu1'}
            ]},
            {name: '风险提示',
            index: "2-3",
            icon: 'risk',
            subs: [
              {name: '不良信息排查', index: "2-3-1", icon: 'fengxianfenxi'},
              {name: '个人负面排查', index: "2-3-2", icon: 'fengxianzhongxin'},
              {name: '个人黑名单综合', index: "2-3-4", icon: 'chakantiezigengduoheimingdan'},
              {name: '个人涉诉-A', index: "2-3-4", icon: 'renzhengshenhe'},
              {name: '多重借贷', index: "2-3-5", icon: 'duotoujiedai--'},
              {name: '个人信用认证', index: "2-3-6", icon: 'hetongpingshen'},
              {name: '失信联系人', index: "2-3-7", icon: '2shenfenzhenghaoma'}
            ]},
            {name: '交易信用信息',
            index: "2-4",
            icon: 'jiaoyi',
            subs: [
              {name: '芝麻分认证', index: "2-4-1", icon: 'logo'},
              {name: '消费等级', index: "2-4-2", icon: 'zongheyewutongji'},
              {name: '资产令牌', index: "2-4-3", icon: 'chuzheng'},
              {name: '航旅信息', index: "2-4-4", icon: 'lvyou'},
              {name: '银行卡交易信息', index: "2-4-5", icon: 'zhifuweikuan'},
              {name: '名下关联企业', index: "2-4-6", icon: 'qiyechaxun_huaban'}
            ]},
            {name: '爬虫数据类',
            icon: 'bug',
            index: "2-5",
            subs: [
              {name: '运营商信用报告', index: "2-5-1", icon: 'yunyingshang'},
              {name: '运营商报告', index: "2-5-2", icon: 'yunyingshang'},
              {name: '淘宝报告', index: "2-5-3", icon: 'unie651'},
              {name: '京东报告', index: "2-5-4", icon: 'jingdongbaitiao'},
              {name: '社保', index: "2-5-5", icon: 'renlishebao'},
              {name: '公积金', index: "2-5-6", icon: 'dkw_gongjijin'}
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
              {name: '企业工商数据查询', index: "3-1-1", icon: 'qiyechaxun_huaban'},
              {name: '统一社会信用代码信息', index: "3-1-2", icon: 'tixirenzheng'},
              {name: '行政许可信息', index: "3-1-3", icon: 'chuzheng'},
              {name: '企业经营异常名录', index: "3-1-4", icon: 'jilu1'}
            ]},
            {name: '风险提示',
            icon: 'shishifengxianqingdan',
            index: "3-2",
            subs: [
              {name: '企业涉诉查询-A', index: "3-2-1", icon: 'web-icon-'},
              {name: '企业涉诉查询-C', index: "3-2-2", icon: 'web-icon-'},
              {name: '法人负面信息', index: "3-2-3", icon: 'fengxianzhongxin'},
              {name: '重大税收违法案件警示', index: "3-2-4", icon: 'huaban'},
              {name: '政府采购严重违法失信名单', index: "3-2-5", icon: 'gongshangshixin'}
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
              {name: '行驶证信息查询', index: "4-1", icon: 'buhuanhangshizheng'},
              {name: '车辆详情查询（车牌）', index: "4-2", icon: 'chepai'},
              {name: '驾驶证扣分查询', index: "4-3", icon: 'chaxunjiashizhengxinxi'},
              {name: '出险记录', index: "4-4", icon: 'cheliangpengzhuang'},
              {name: '违章查询', index: "4-5", icon: 'weizhang'}
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
                {name: '个人综合报告', index: "5-1", icon: 'baogao-copy'},
                {name: '企业综合报告', index: "5-2", icon: 'icon-book'}
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
      changeView (menuIndex) {
        this.currentIndex = menuIndex;
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
    border-top: 1px solid #ffd04b;
    i {
      color: #fff;
      font-size: 18px;
      margin-right: 10px;
    }
  }
  .el-menu--vertical {
    i {
      color: #fff;
      font-size: 18px;
      margin-right: 10px;
    }
  }
  .el-header {
    padding: 0;
    display: flex;
    background: #545c64;
    font-size: 24px;
    line-height: 60px;
    text-align: center;
    color: white;
    .toggle-btn {
      width: 60px;
      border-left: 1px solid #ffd04b;
      cursor: pointer;
      i {
        font-size: 20px;
        line-height: 60px;
      }
    }
    .company-logo {
      width: 251px;
      &.collapse {
        width: 65px;
        color: #00edff;
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
    }
    margin-left: -50px;
  }
</style>
