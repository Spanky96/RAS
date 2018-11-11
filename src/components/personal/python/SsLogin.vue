<template>
  <div>
    {{json.data.name}}
    <el-form :model="form" status-icon size="small" lable-width="0px" ref="form">
      <el-form-item v-for="(e, index) in entrys" :key="index" :prop="e.name" >
        <el-input :placeholder="e.hint" v-model="form[e.name]"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SsLogin',
  components: {
  },
  props: {
    json: {
      type: Object
    }
  },
  data () {
    var entrys = this.json.data.tabs[0].entrys[0].parameters;
    return {
      entrys,
      form: {}
    };
  }
};
</script>
