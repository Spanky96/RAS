<template>
  <div>
    <h3 class="ss-title">{{json.data.name}}</h3>
    <el-form :model="form" status-icon size="small" label-width="100px" ref="form">
      <el-form-item v-for="(e, index) in entrys" :key="index" :prop="e.name" :label="e.label">
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
    return {
      entrys: this.json.data.tabs[0].entrys[0].parameters,
      form: {}
    };
  },
  watch: {
    json (n, old) {
      this.entrys = n.data.tabs[0].entrys[0].parameters;
      this.form = {};
    }
  }
};
</script>
<style scoped>
.ss-title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
