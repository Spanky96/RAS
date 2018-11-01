<template>
  <div>
    <el-container>
       <el-header>
        <div class="company-logo" :class="{collapse: isCollapse}">天眼大数据风控系统</div>
        <div class="toggle-btn" @click="isCollapse = !isCollapse;"><i class="el-icon-plus"></i></div>
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
            icon: 'unie650',
            index: "2-1",
            subs: [
              {name: '身份证二要素', index: '/personal/identity/idCheck', icon: 'shenfenxinxiyanzheng'},
              {name: '失效身份证一致性验证', index: "/personal/identity/idCheck", icon: 'farenshenfenzheng'},
              {name: '银行卡三要素', index: "2-1-3", icon: 'yinhangqia'},
              {name: '银行卡四要素', index: "2-1-4", icon: 'yinhangqia'},
              {name: '开户行查询', index: "2-1-5", icon: 'daxiaofei'}
            ]},
            {name: '运营商验证',
            icon: 'yunyingshang',
            index: "2-2",
            subs: [
              {name: '运营商二要素认证', index: "2-2-1", icon: 'yunyingshang'},
              {name: '运营商三要素认证', index: "2-2-2", icon: 'yunyingshang'},
              {name: '运营商在网时长', index: "2-2-3", icon: 'yunyingshang1'},
              {name: '运营商状态', index: "2-2-4", icon: 'dianshangshixin'},
              {name: '运营商消费等级', index: "2-2-5", icon: 'Analysis'}
            ]},
            {name: '风险提示',
            index: "2-3",
            icon: 'anfengxiantongji',
            subs: [
              {name: '不良信息排查', index: "2-3-1", icon: 'shixinren'},
              {name: '个人负面排查', index: "2-3-2", icon: 'fengxianzhongxin'},
              {name: '个人黑名单综合', index: "2-3-4", icon: 'unie650'},
              {name: '个人涉诉-A', index: "2-3-4", icon: 'shenfenxinxiyanzheng'},
              {name: '多重借贷', index: "2-3-5", icon: 'jiaoyixianxing'},
              {name: '个人信用认证', index: "2-3-6", icon: 'icon'},
              {name: '失信联系人', index: "2-3-7", icon: 'yunyingshang-xuanzhong1'}
            ]},
            {name: '交易信用信息',
            index: "2-4",
            icon: 'jiaoyixianxing',
            subs: [
              {name: '芝麻分认证', index: "2-4-1", icon: 'logo'},
              {name: '消费等级', index: "2-4-2", icon: 'Analysis'},
              {name: '资产令牌', index: "2-4-3", icon: 'lingpai'},
              {name: '航旅信息', index: "2-4-4", icon: 'lunchuan'},
              {name: '银行卡交易信息', index: "2-4-5", icon: 'gongjijindaikuan'},
              {name: '名下关联企业', index: "2-4-6", icon: 'shenfenxinxiyanzheng'}
            ]},
            {name: '爬虫数据类',
            icon: 'chongzi',
            index: "2-5",
            subs: [
              {name: '运营商信用报告', index: "2-5-1", icon: 'qiyegenjinguanli'},
              {name: '运营商报告', index: "2-5-2", icon: 'yunyingshang1'},
              {name: '淘宝报告', index: "2-5-3", icon: 'taobao'},
              {name: '京东报告', index: "2-5-4", icon: 'jingdongbaitiao'},
              {name: '社保', index: "2-5-5", icon: '13'},
              {name: '公积金', index: "2-5-6", icon: 'dkw_gongjijin'}
            ]}
          ]
        },
        {
          index: "3",
          name: '企业信息',
          functions: [
            {name: '工商信息',
            icon: 'qiyegenjinguanli',
            index: "3-1",
            subs: [
              {name: '企业工商数据查询', index: "3-1-1", icon: 'xiaofeijilu'},
              {name: '统一社会信用代码信息', index: "3-1-2", icon: 'qiyefuwu'},
              {name: '行政许可信息', index: "3-1-3", icon: 'shixinren'},
              {name: '企业经营异常名录', index: "3-1-4", icon: 'jiaoyiguanbi'}
            ]},
            {name: '风险提示',
            icon: 'shishifengxianqingdan',
            index: "3-2",
            subs: [
              {name: '企业涉诉查询-A', index: "3-2-1", icon: 'shixinren'},
              {name: '企业涉诉查询-C', index: "3-2-2", icon: 'shixinren'},
              {name: '法人负面信息', index: "3-2-3", icon: 'fengxianzhongxin'},
              {name: '重大税收违法案件警示', index: "3-2-4", icon: 'gongshangshixin-daikaifang'},
              {name: '政府采购严重违法失信名单', index: "3-2-5", icon: 'unie650'}
            ]}
          ]
        },
        {
          index: "4",
          name: '车辆信息',
          functions: [
            {name: '车辆信息',
            icon: 'cheliangziliaoshenhe',
            index: "4-1",
            subs: [
              {name: '行驶证信息查询', index: "4-1", icon: 'farenshenfenzheng'},
              {name: '车辆详情查询（车牌）', index: "4-2", icon: 'cheliangguohu'},
              {name: '驾驶证扣分查询', index: "4-3", icon: 'weizhang'},
              {name: '出险记录', index: "4-4", icon: 'fengxianyujing'},
              {name: '违章查询', index: "4-5", icon: '31weizhangkuaicha'}
            ]}
          ]
        },
        {
          index: "5",
          name: '综合报告',
          functions: [
            {
              name: '综合报告',
               icon: 'qiyexinxi',
              index: "5-1",
              subs: [
                {name: '个人综合报告', index: "5-1", icon: 'shenfenrenzheng'},
                {name: '企业综合报告', index: "5-2", icon: 'webicon07'}
              ]
            }
          ]
        }
      ];
      return {
        currentIndex: 1,
        menu: menu,
        defultActive: "1",
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
    }
  }
  .el-main {
    &.collapse {
      margin-left: -245px;
    }
    margin-left: -50px;
  }
</style>
