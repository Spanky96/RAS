<template>
<div>
</div>
</template>

<script>
export default {
  name: "Aside",
  components: {},
   data () {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss">
</style>
