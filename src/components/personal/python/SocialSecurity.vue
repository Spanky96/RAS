<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>社保</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="用户partnerID（手机号/身份证等）" label-width="0" prop="partnerUserId" class="form-item">
              <el-input maxlength="40" v-model="inputFrom.partnerUserId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="所属机构（灰色为不可用）" label-width="0" prop="org" class="form-item">
              <el-select v-model="orgArea" placeholder="所属省份" @change="inputFrom.org=undefined">
                <el-option v-for="(f, index) in socialsecurityList" :key="index" :label="f.name" :value="index"></el-option>
              </el-select>
              <el-select v-model="inputFrom.org" no-data-text="请先选择所属省份">
                <template v-if="!isNaN(orgArea)">
                  <el-option v-for="(o, index) in socialsecurityList[orgArea].childOrgs" :key="index" :label="o.name" :value="o.org_id" :disabled="o.status=='DISABLED'"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end" align="bottom">
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" round size="small">执行查询</el-button>
              <el-button type="primary" @click="inputOrgInfo" round size="small">获取机构信息</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card id="resultTable">
      <div slot="header" class="clearfix">
        <el-row type="flex" justify="space-between">
          <el-col :span="22"><span>{{result.example ? '查询样例': '查询结果'}}</span></el-col>
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '社保'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">匹配结果{{openId}}</td>
          <td><el-tag type="success" class="tag">成功</el-tag></td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
import SsLogin from './SsLogin';
export default {
  name: 'SocialSecurity',
  components: {
    SsLogin
  },
  data () {
    return {
      inputFrom: {
        partnerUserId: '',
        org: ''
      },
      rules: {
        partnerUserId: [{ required: true, message: '请输入paetnerID', trigger: 'blur' }],
        org: [{ required: true, message: '请选择' }]
      },
      result: {
        example: true
      },
      socialsecurityList: [],
      orgArea: undefined,
      openId: ''
    };
  },
  methods: {
    getOrgInfo: function () {
      var vm = this;
      var p = new Promise(function (resolve, reject) {
        vm.$http.get('api/rip/agencyInfo', {
        params: {
          organization_id: vm.inputFrom.org
        },
        headers: {
          authorization: vm.$db.get('authorization')
        }
        }).then(function (res) {
          resolve(res.data);
        });
      });
      return p;
    },
    inputOrgInfo: function () {
      var vm = this;
      vm.getOrgInfo().then(function (data) {
        const h = vm.$createElement;
        vm.$msgbox({
          title: '社保信息采集',
          message: h(SsLogin, { props: { json: data } }),
          showCancelButton: false,
          confirmButtonText: '提交',
          showClose: false,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          vm.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
      });
    },
    getOpenId: function () {
      var vm = this;
      var p = new Promise(function (resolve, reject) {
        vm.$http.get('api/rip/operatorReport', {
        params: {
          partner_user_id: vm.inputFrom.partnerUserId
        },
        headers: {
          authorization: vm.$db.get('authorization')
        }
        }).then(function (res) {
          console.log('获取openid：' + res.data.open_id);
          resolve(res.data);
        });
      });
      return p;
    }, 
    onSubmit: function () {
      var vm = this;
      vm.$refs['inputFrom'].validate((valid) => {
        if (valid) {
          vm.getOpenId().then(function (data) {
            vm.openId = data.open_id;
          });
        }
      });
    }
  },
  mounted: function () {
    var vm = this;
    vm.socialsecurityList = vm.$db.getObject('socialsecurityList');
    if (!vm.socialsecurityList) {
      vm.$http.get('api/rip/socialsecurityList', {
        headers: {
          authorization: vm.$db.get('authorization')
        }
        }).then(function (res) {
        vm.socialsecurityList = res.data.data;
        vm.$db.set('socialsecurityList', vm.socialsecurityList);
      });
    }
  }
};
</script>
