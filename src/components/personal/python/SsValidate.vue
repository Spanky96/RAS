<template>
  <div>
    <el-form :model="form" status-icon size="small" label-width="0px" ref="form">
      <el-form-item v-for="(e, index) in type.keys" :key="index" :prop="e">
        <el-input :placeholder="'请输入' + labels[e]" v-model="form[e]"></el-input>
      </el-form-item>
    </el-form>
    <div class="img" v-if="json.picture">
      <img :src="'data:img/jpg;base64,' + json.picture" alt="图片无法显示">
    </div>
  </div>
</template>

<script>
export default {
  name: 'SsValidate',
  components: {
  },
  props: {
    json: {
      type: Object
    }
  },
  data () {
    const types = {
      MOBILE: {desc: '短信验证码', keys: ['captcha_mobile']},
      PICTURE: {desc: '图片验证码', keys: ['captcha_picture']},
      MOBILE_PICTURE: {desc: '短信和图片验证码', keys: ['captcha_mobile', 'captcha_picture']},
      PASSWORD: {desc: '密码', keys: ['password']},
      NAME: {desc: '姓名', keys: ['name']},
      IDCARD: {desc: '身份证', keys: ['idcard']},
      IDCARD_NAME: {desc: '身份证和姓名', keys: ['idcard', 'name']}
    };
    const labels = {
      captcha_mobile: '短信验证码',
      captcha_picture: '图片验证码',
      password: '密码',
      name: '姓名',
      idcard: '身份证和姓名'
    };
    var type = types[this.json.type];
    var form = {};
    type.keys.forEach(element => {
      form[element] = '';
    });
    return {
      labels, types, type, form
    };
  },
  watch: {
    json (n, old) {
      this.type = this.types[n.type];
    }
  }
};
</script>
