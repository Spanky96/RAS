<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  };
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar{
  width:8px;
  height:5px;
}
::-webkit-scrollbar-button,::-webkit-scrollbar-track{
  display:none;
}
::-webkit-scrollbar-track-piece{
  background:hsla(0,0%,77%,.38);
}
::-webkit-scrollbar-thumb{
  background:hsla(0,0%,72%,.67);
  border-radius:10px;
}
</style>
