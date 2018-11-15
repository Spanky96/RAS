<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>运营商报告</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm" size="mini">
        <el-row>
          <el-col :span="8">
            <el-form-item label="账号（运营商账号，例如移动手机号）" label-width="0" prop="name" class="form-item">
              <el-input v-model="inputFrom.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账号密码" label-width="0" prop="password" class="form-item">
              <el-input type="password" v-model="inputFrom.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="身份证号" label-width="0" prop="identityCardNo" class="form-item">
              <el-input v-model="inputFrom.identityCardNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="真实姓名" label-width="0" prop="identityName" class="form-item">
              <el-input v-model="inputFrom.identityName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="查询内容" label-width="0" prop="identityName" class="form-item">
              <el-checkbox-group v-model="inputFrom.contentType">
                <el-checkbox label="美食/餐厅线上活动" name="contentType"></el-checkbox>
                <el-checkbox label="地推活动" name="contentType"></el-checkbox>
                <el-checkbox label="线下主题活动" name="contentType"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="contentType"></el-checkbox>
              </el-checkbox-group>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '运营商报告'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td><el-tag type="success" class="tag">成功</el-tag></td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'OperatorReport',
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
      }
    };
  },
  methods: {
    onSubmit: function () {
      var vm = this;
      vm.$refs['inputFrom'].validate((valid) => {
        if (valid) {
          console.log(1);
        }
      });
    }
  }
};
</script>
