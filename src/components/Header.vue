<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss">
</style>
