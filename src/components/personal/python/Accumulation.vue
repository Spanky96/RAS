<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>公积金</span>
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
            <el-form-item label="所属机构" label-width="0" prop="org" class="form-item">
              <el-select v-model="orgArea" placeholder="所属省份" @change="inputFrom.org=undefined">
                <el-option v-for="(f, index) in fundList" :key="index" :label="f.name" :value="index"></el-option>
              </el-select>
              <el-select v-model="inputFrom.org" no-data-text="请先选择所属省份">
                <template v-if="!isNaN(orgArea)">
                  <el-option v-for="(o, index) in fundList[orgArea].childOrgs" :key="index" :label="o.name" :value="o.org_id"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end" align="bottom">
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" round size="small">执行查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card id="resultTable">
      <div slot="header" class="clearfix">
        <el-row type="flex" justify="space-between">
          <el-col :span="22"><span>{{result.example ? '查询样例': '查询结果'}}</span></el-col>
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '公积金'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">匹配结果</td>
          <td><el-tag type="success" class="tag">成功</el-tag></td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Accumulation',
  components: {
  },
  data () {
    return {
      inputFrom: {
        partnerUserId: '',
        org: ''
      },
      rules: {
        partnerUserId: [{ required: true, message: '请输入paetnerID', trigger: 'blur' }]
      },
      result: {
        example: true
      },
      fundList: [],
      orgArea: undefined
    };
  },
  methods: {
    onSubmit: function () {
      var vm = this;
      console.log(vm.$router);
      vm.$refs['inputFrom'].validate((valid) => {
        if (valid) {
        }
      });
    }
  },
  mounted: function () {
    var vm = this;
    vm.fundList = vm.$db.getObject('fundlist');
    if (!vm.fundList) {
      vm.$http.get('api/rip/fundlist', {
        headers: {
          authorization: vm.$db.get('authorization')
        }
        }).then(function (res) {
        vm.fundList = res.data.data;
        vm.$db.set('fundlist', vm.fundList);
      });
    }
  }
};
</script>
