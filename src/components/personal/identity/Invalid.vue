<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>失效身份证一致性验证</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="姓名" label-width="0" prop="name" class="form-item">
              <el-input v-model="inputFrom.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份证号码" label-width="0" prop="idCard" class="form-item">
              <el-input v-model="inputFrom.idCard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" align="bottom">
          <el-col :span="10">
            <el-form-item label="有效期起始日期" label-width="0" prop="beginDate" class="form-item">
              <el-date-picker type="date" v-model="inputFrom.beginDate"></el-date-picker>
            </el-form-item>
          </el-col>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '失效身份证一致性验证'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">匹配结果</td>
          <td><el-tag :type="result.success ? 'success': 'danger'" class="tag">{{result.success ? '一致': '不一致'}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>姓名</td>
          <td>{{result.name}}</td>
        </tr>
        <tr class="text-left">
          <td>身份证号码</td>
          <td>{{result.idCard}}</td>
        </tr>
        <tr class="text-left">
          <td>有效期起始日期</td>
          <td>{{result.beginDate}}</td>
        </tr>
      </table>
    </el-card>
    <!--TODO 接口实现后删除 主要用是用来告知如何处理result对象 -->
    <el-button type="primary" @click="onSuccess" round size="small">测试成功按钮</el-button>
    <el-button type="primary" @click="onFail" round size="small">测试失败按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'PersonalIdentityInvalid',
  components: {
  },
  data () {
    var idCardValidator = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入身份证号'));
      } else if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入合法的身份证号'));
      }
    };
    return {
      inputFrom: {
        name: '',
        idCard: '',
        beginDate: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idCard: [{ validator: idCardValidator, trigger: 'blur' }],
        beginDate: [{ required: true, message: '你选择起始日期', trigger: 'blur' }]
      },
      result: {
        example: true,
        success: true,
        name: '赵雷',
        idCard: '320281199606286774',
        beginDate: '2011-06-28'
      }
    };
  },
  methods: {
    onSubmit: function () {
      var vm = this;
      vm.$refs['inputFrom'].validate((valid) => {
        if (valid) {
          const loading = vm.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.2)'
          });
          var userInfo = vm.$db.getObject('user');
          vm.$http.get('api/ripcredit/idCardElements/result', {
            params: {
              username: userInfo.username,
              accessToken: userInfo.accessToken,
              name: vm.inputFrom.name,
              idCard: vm.inputFrom.idCard,
              beginDate: vm.inputFrom.beginDate
            }}).then(function (res) {
            if (res.data.code == '200') {
                console.log('1');
            } else {
              vm.$message({
                showClose: true,
                message: res.data.errorDesc,
                type: 'error',
                duration: '5000'
              });
            }
            loading.close();
          });
        }
      });
    },
    // TODO 接口实现后删除 主要用是用来告知如何处理result对象
    onSuccess: function () {
      this.result = {
        example: false,
        success: true,
        name: '赵雷',
        idCard: '320281199606286774',
        beginDate: '2011-06-28'
      };
    },
    onFail: function () {
      this.result = {
        example: false,
        success: false,
        name: '赵雷',
        idCard: '320281199606286000',
        beginDate: '2011-06-30'
      };
    }
  }
};
</script>
